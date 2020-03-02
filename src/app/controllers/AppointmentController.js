import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'
import * as Yup from 'yup';

import Appointment from '../models/Appointment'
import Notification from '../schemas/Notification'
import User from '../models/User'
import File from '../models/File'

import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../lib/Queue'


class AppointmentController {

  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id','date'],
      limit: 20,              // only get 20 results per call
      offset: (page-1) * 20,  // calculate which section of results to be selected
      include: [
        {
          model: User, as: 'provider',
          attributes: ['id','name'],
          include: [
            {
              model: File, as: 'avatar',
              attributes: ['id','path','url']
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required()
    });

    if (! (await schema.isValid(req.body))) {
      return res.status(400).json( {error: 'Validation fails'} )
    }

    const { provider_id, date } = req.body;

    // check if provider ID is a provider
    const isProvider = await User.findOne( {where: { id: provider_id, provider: true }})

    if (!isProvider) {
      return res.status(401).json( { error: 'ID given does not match a provider'})
    }

    // parse text back to date with parseISO and round back to start of hour
    const hourStart = startOfHour(parseISO(date));

    // check if given date is prior to current date
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json( {error: 'Past date not allowed.'})
    }

    const checkAvailability = await Appointment.findOne( {
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (checkAvailability) {
      return res.status(400).json( { error: 'Appointment date with provider is already taken'})
    }

    // look for an existing appointment with same provider 
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart
    });

    /**
     * Notify provider of new appointment
     */

     const user = await User.findByPk(req.userId);
     const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", { locale: pt})

    await Notification.create({
      content: `Novo agendamento de ${user.name} para dia ${formattedDate}`,
      user: provider_id,
    })

    return res.json(appointment);

  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'client',
          attributes: ['name']
        }
      ]
    });

    if (appointment.user_id !=  req.userId) {
      return res.status(401).json({
        error: "Unable to cancel appointment. Permission denied."
      });
    }

    const dateWithSub = subHours(appointment.date, 2) // remove 2 hours from appointment time

    if( isBefore(dateWithSub, new Date())) {          // if appointment time is less than 2 hours away, do not cancel 
      return res.status(401).json({
        error: "Appointment can only be canceled up to 2 hours in advance"
      })
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    })

    return res.json(appointment);
  }
}

export default new AppointmentController();

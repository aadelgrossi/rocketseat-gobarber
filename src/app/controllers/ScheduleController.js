import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'

import Appointment from '../models/Appointment'
import User from '../models/User'

class ScheduleController {
  async index(req, res) {

    // check if provider ID is a provider
    const isProvider = await User.findOne( { where: { id: req.userId, provider: true }})

    if (!isProvider) {
      return res.status(401).json( {error: 'ID does not match a provider'})
    }

    // get current date in query params
    const { date } = req.query;
    const parsedDate = parseISO(date);

    // get all apointments between dates
    // 2019-06-22 00:00:00
    // 2019-06-22 23:59:59

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [ startOfDay(parsedDate), endOfDay(parsedDate) ]
        },
      },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User, as: 'client',
          attributes: ['name']
        }
      ]
    })

    return res.json(appointments);
  }
}

export default new ScheduleController();
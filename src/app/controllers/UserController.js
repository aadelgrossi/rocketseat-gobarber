import User from '../models/User'

class UserController {

  async store(req, res) {
    const userExists = await User.findOne( { where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json( {error: 'User already exists'} );
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // if user is changing email, make sure it is not in use
    if (email && (email != user.email)) {
      const userExists = await User.findOne( { where: { email: email } })
      if (userExists) {
        return res.status(400).json( { error: 'User already exists'} );
      }
    }

    // if user provides informs his current password incorrectly (apply AND condition to make sure oldPassword was sent)
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json( { error: 'Password does not match'} );
    } 

    //if user provides same password for old and new (password unchanged)
    if ( (await user.checkPassword(oldPassword)) == (await user.checkPassword(req.body.password)) ) {
      return res.status(401).json( { error: 'New password must be different'} );
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }

}

export default new UserController();
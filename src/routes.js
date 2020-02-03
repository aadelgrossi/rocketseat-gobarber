import { Router } from 'express'
import User from './app/models/User';

const routes = new Router();

// routes.get('/test', (req, res) => {
//   return res.json( {message: "Hello World 2"} )
// });

routes.get('/', async(req,res) => {
  const user = await User.create( 
    { 
      name: 'Andre Grossi', 
      email: 'andredg91@gmail.com', 
      password_hash: '12435485378'
    });
  return res.json(user);

});

export default routes;
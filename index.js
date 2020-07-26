import './setup/db'
import { server } from './setup/server'
import middlewares from './app/middlewares'
middlewares(server);
//server.start(() => console.log('Started !!'))

//sudo lsof -i :3001
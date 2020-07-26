import rotas from '../src'
import * as jwt from '../../setup/jwt'
import _auth from '../src/users/_auth'

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    const payload = await jwt.verify(token)
    const user = await _auth(payload.user)
    if (!user) {
      return res.send(401)
    }
    req.auth = user
    next()
  } catch (error) {
    console.log(error)
    res.json(401, {message:"não autorizado"})
  }
}

const middlewares = (server) => {

    // CORS, rateLimit, compression, logger, etc...

    server.get('/', async (req, res) => {
        try {
            res.json(200, "ok")
        } catch (error) {
            res.json(500, error)
        }
    });
    
    rotas(server, jwt, authMiddleware);
    server.start(() => console.log('Started !!'))
}
export default middlewares;
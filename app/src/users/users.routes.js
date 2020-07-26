import controller from './users.controller';

const users = (server, jwt, authMiddleware) => {
    
    let rota = '/users';

    server.get(`${rota}`, authMiddleware, async (req, res) => {
        try {
            await controller.getAll()
            .then((result) => {
                res.json(200, result)
            })
            .catch((e) => {
                res.json(500, e)
            });
        } catch (error) {
            console.log(error)
            res.json(500, {message:"recurso não disponível"})
        }
    });

    server.get(`${rota}/me`, authMiddleware, (req, res) => {
        res.send(req.auth)
    });

    server.post(`${rota}`, async (req, res) => {
        try {
            const { name, email, password } = req.body;
            await controller.create(name, email, password)
            .then((result) => {
                const { password, ...user } = result.toObject()
                const token = jwt.sign({ user: user.id })
                res.json(200, { user, token })
            })
            .catch((e) => {
                console.log(' __erro__',e)
                res.json(500, e)
            });
        } catch (error) {
            res.json(500, error)
        }
    });

    // Basic Auth
    server.get(`${rota}/login`, async (req, res) => {
        try {
            //const [hashType, hash] = req.headers.authorization.split(' ')
            const [, hash] = req.headers.authorization.split(' ')
            const [email, password] = Buffer.from(hash, 'base64')
                .toString()
                .split(':')
            await controller.login(email, password)
            .then((user) => {
                if (!user) {
                    return res.json(401)
                }
                const token = jwt.sign({ user: user.id })
                res.json(200, { user, token })
            })
            .catch((e) => {
                console.log(' __erro__',e)
                res.json(500, e)
            });
        } catch (error) {
            console.log(error)
            res.json(500, {message:"recurso não disponível"})
        }
    })

}
export default users;
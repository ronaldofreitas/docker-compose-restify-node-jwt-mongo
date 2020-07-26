import users from './users/users.routes';

const rotas = async (server, jwt, authMiddleware) => {
    await users(server, jwt, authMiddleware);
}
export default rotas;
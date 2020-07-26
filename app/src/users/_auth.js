import { UserModel } from './users.model';

const _auth = async (payloadUser) => {
    return await UserModel.findById(payloadUser);
}
export default _auth;
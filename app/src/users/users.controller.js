import { UserModel } from './users.model';

const controller = {
    async getAll() {
        return await UserModel.find();
    },
    async create( name, email, password ) {
        return await UserModel.create({ name, email, password });
    },
    async login( email, password ) {
        return await UserModel.findOne({ email, password });
    }
}
export default controller;
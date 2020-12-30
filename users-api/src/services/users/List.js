import BaseService from '../Base';
import dumpUser from '../../utils/dump';
import UserModel from '../../database/models/user';
import Joi from 'joi';
import Exception from '../../utils/Exception';

export default class UserList extends BaseService {
    constructor(...args) {
        super(...args);
    }

    async validate() {
        return Promise.resolve()
    }

    async execute() {
        const users = await UserModel.find({}).sort({ created_at: -1 })
        return {
            data: users.map((user) => dumpUser(user))
        }
    }

}
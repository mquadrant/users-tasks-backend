import BaseService from '../Base';
import dumpUser from '../../utils/dump';
import UserModel from '../../database/models/user';
import Joi from 'joi';
import Exception from '../../utils/Exception';

export default class UserCreate extends BaseService {

    constructor(...args) {
        super(...args);
    }

    async validate(data) {
        const ruleSchema = Joi.object({
            name: Joi.string().required()
        })
        const { error } = ruleSchema.validate(data)
        if (!error) return Promise.resolve(data)
        const exception = new Exception({
            code: error.message,
            fields: error
        });
        throw exception;
    }

    async execute(data) {
        const user = await UserModel.create(data)
        return {
            data: dumpUser(user)
        }
    }

}
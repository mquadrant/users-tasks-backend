import BaseService from '../Base';
import dumpTask from '../../utils/dump';
import UserModel from '../../database/models/user';
import Joi from 'joi';
import Exception from '../../utils/Exception';

export default class UserDelete extends BaseService {

    constructor(...args) {
        super(...args);
    }

    async validate(data) {
        const ruleSchema = Joi.object({
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'user id').required()
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
        const user = await UserModel.deleteOne({ _id: data.user_id })
        return {
            data: { message: `User ${data.user_id} deleted` }
        }
    }

}
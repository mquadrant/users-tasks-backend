import BaseService from '../Base';
import dumpTask from '../../util/dump';
import TaskModel from '../../database/models/task';
import Joi from 'joi';
import Exception from '../../util/Exception';

export default class TaskCreate extends BaseService {

    constructor(...args) {
        super(...args);
    }

    async validate(data) {
        const ruleSchema = Joi.object({
            description: Joi.string().required(),
            state: Joi.string().valid('todo', 'done').required(),
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'user id').required()
        })
        const { error } = ruleSchema.validate(data)
        if (error === null) return Promise.resolve(data)
        const exception = new Exception({
            code: error.message,
            fields: error
        });
        throw exception;
    }

    async execute(data) {
        console.log("The Data =====> ", data)
        // const task = await TaskModel.create(data.data)
        return {
            data: dumpTask(task)
        }
    }

}
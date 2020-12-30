import BaseService from '../Base';
import dumpTask from '../../utils/dump';
import TaskModel from '../../database/models/task';
import Joi from 'joi';
import Exception from '../../utils/Exception';

export default class TaskCreate extends BaseService {

    constructor(...args) {
        super(...args);
    }

    async validate(data) {
        const ruleSchema = Joi.object({
            description: Joi.string().required(),
            state: Joi.string().valid('todo', 'done'),
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
        const task = await TaskModel.create(data)
        console.log("THEHHEHEHEHEHEHEHE ETAS ", task)
        return {
            data: dumpTask(task)
        }
    }

}
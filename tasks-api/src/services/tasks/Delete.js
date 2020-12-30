import BaseService from '../Base';
import dumpTask from '../../utils/dump';
import TaskModel from '../../database/models/task';
import Joi from 'joi';
import Exception from '../../utils/Exception';

export default class TaskDelete extends BaseService {

    constructor(...args) {
        super(...args);
    }

    async validate(data) {
        const ruleSchema = Joi.object({
            task_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'task id').required(),
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
        const task = await TaskModel.findOneAndDelete({ _id: data.task_id, user_id: data.user_id })
        return {
            data: task
        }
    }

}
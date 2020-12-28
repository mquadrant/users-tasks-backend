import serviceUtil from '../util/utilService';

import TasksCreate from '../services/tasks/Create';
import TasksList from '../services/tasks/List';

export default {
    list: serviceUtil.makeServiceRunner(TasksList, req => ({ user_id: req.params.userId })),
    create: serviceUtil.makeServiceRunner(TasksCreate, req => req.body),
    update: serviceUtil.makeServiceRunner(TasksCreate, req => ({ user_id: req.params.userId, task_id: req.params.taskId, ...req.body })),
    delete: serviceUtil.makeServiceRunner(TasksCreate, req => req.body),
}


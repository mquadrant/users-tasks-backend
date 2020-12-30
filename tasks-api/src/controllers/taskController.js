import serviceUtil from '../utils/utilService';

import TasksCreate from '../services/tasks/Create';
import TasksList from '../services/tasks/List';
import TasksUpdate from '../services/tasks/Update';
import TasksDelete from '../services/tasks/Delete';

export default {
    list: serviceUtil.makeServiceRunner(TasksList, req => ({ user_id: req.params.userId })),
    create: serviceUtil.makeServiceRunner(TasksCreate, req => req.body),
    update: serviceUtil.makeServiceRunner(TasksUpdate, req => ({ user_id: req.params.userId, task_id: req.params.taskId, ...req.body })),
    delete: serviceUtil.makeServiceRunner(TasksDelete, req => ({ user_id: req.params.userId, task_id: req.params.taskId })),
}


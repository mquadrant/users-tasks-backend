import serviceUtil from '../utils/utilService';

import UsersCreate from '../services/users/Create';
import UsersList from '../services/users/List';
import UsersGet from '../services/users/Get';
import UsersUpdate from '../services/users/Update';
import UsersDelete from '../services/users/Delete';

export default {
    list: serviceUtil.makeServiceRunner(UsersList),
    get: serviceUtil.makeServiceRunner(UsersGet, req => ({ user_id: req.params.userId })),
    create: serviceUtil.makeServiceRunner(UsersCreate, req => req.body),
    update: serviceUtil.makeServiceRunner(UsersUpdate, req => ({ user_id: req.params.userId, ...req.body })),
    delete: serviceUtil.makeServiceRunner(UsersDelete, req => ({ user_id: req.params.userId })),
}


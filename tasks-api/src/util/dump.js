export function dumpTask(task) {
    return {
        id: task._id,
        description: task.description,
        state: task.state,
        user_id: task.user_id
    }
}
export default function dumpTask(task) {
    return {
        id: task._id,
        description: task.description,
        state: task.state,
        user_id: task.user_id,
        created_at: task.created_at,
        last_updated: task.last_updated
    }
}
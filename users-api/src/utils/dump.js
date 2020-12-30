export default function dumpUser(user) {
    return {
        id: user._id,
        name: user.name,
        created_at: user.created_at,
        last_updated: user.last_updated
    }
}
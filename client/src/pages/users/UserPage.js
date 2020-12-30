import React, { useState, useEffect } from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import { TiUserAdd } from 'react-icons/ti';
import UserCard from '../../components/UserCard/UserCard';
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';
import Axios from 'axios';

export default function UserPage() {
    const [state, setstate] = useState({
        users: [],
        loading: true
    })

    const [user, setUser] = useState({
        name: ""
    })

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setstate((prevState) => ({ ...prevState, loading: true }))
        Axios.get(`/api/users`).then(data => {
            const response = data.data
            if (response.status) {
                const users = response.data
                setstate({
                    users: users.map(({ name, ...res }) => {
                        return {
                            ...res,
                            name: name,
                            color: '#' + Math.floor(name.charCodeAt(0) * 100000).toString(16)
                        }
                    }),
                    loading: false
                })
            } else {
                setstate((prevState) => ({ ...prevState, loading: false }))
            }
        }).catch(() => setstate((prevState) => ({ ...prevState, loading: false })))
    }

    const createUser = (event) => {
        if (user && !!user.name) {
            Axios.post(`/api/users/create`, {name: user.name}).then(data => {
                const response = data.data
                if (response.status) {
                    setUser((prevState) => ({ ...prevState, name: "" }))
                    getUsers()
                }
            }).catch()
        }
    }

    const deleteUser = (userId) => {
        if (userId) {
            return Axios.post(`/api/users/delete/${userId}`).then(data => {
                const response = data.data
                if (response.status) {
                    getUsers()
                    return true
                }
            }).catch()
        }
    }

    const changehandler = (e) => {
        setUser({ ...state, [e.target.name]: e.target.value })
    }

    const updateHandler = (user, updatedUser) => {
        if (user) {
            return Axios.post(`/api/users/update/${user.id}`, updatedUser).then(data => {
                const response = data.data
                console.log("The New updated record =====> ", response)
                if (response.status) {
                    getUsers()
                }
            }).catch()
        }
    }

    return (
        <BaseLayout>
            <div className="container">
                <h3 className="title">Users</h3>
                <div className="add-section">
                    <input type="text" placeholder="Add New User" name="name" value={user.name} onChange={changehandler} />
                    <div className="icon" onClick={createUser}><TiUserAdd size="30" /></div>
                </div>
                <HorizontalLine />
                <div className="card-section">
                    {state.loading ? null : state.users.length ? state.users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={deleteUser} onUpdate={updateHandler} />
                    )) :
                        <div>No User Found. Add User!</div>
                    }

                </div>
            </div>
        </BaseLayout>
    )
}

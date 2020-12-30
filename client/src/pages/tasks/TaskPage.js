import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import { CgNotes } from 'react-icons/cg';
import { BiListUl, BiCheckShield } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { BsBackspace } from 'react-icons/bs';
import TaskContainer from '../../components/TaskContainer/TaskContainer';
import TaskList from '../../components/TaskList/TaskList';
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';
import Axios from 'axios';

export default function TaskPage(props) {
    let history = useHistory();
    const [state, setstate] = useState({
        userId: null,
        user: null,
        tasks: [],
        todo: [],
        done: [],
        userloading: true,
        taskloading: true
    })
    const [newtask, setNewtask] = useState({
        description: ''
    })

    useEffect(() => {
        setstate((prev) => ({ ...prev, userId: props.match.params.userId }))
        getUser(props.match.params.userId)
        getUserTask(props.match.params.userId)
    }, [props])

    const getUser = (userId) => {
        setstate((prevState) => ({ ...prevState, userloading: true }))
        Axios.get(`/api/users/${userId}`).then(data => {
            const response = data.data
            if (response.status) {
                const user = response.data
                setstate((prev) => ({
                    ...prev,
                    user,
                    userloading: false
                }))
            } else {
                setstate((prevState) => ({ ...prevState, userloading: false }))
            }
        }).catch(() => setstate((prevState) => ({ ...prevState, userloading: false })))
    }

    const getUserTask = (userId) => {
        setstate((prevState) => ({ ...prevState, taskloading: true }))
        Axios.get(`/api/tasks/${userId}`).then(data => {
            const response = data.data
            if (response.status) {
                const tasks = response.data
                setstate((prev) => ({
                    ...prev,
                    todo: tasks.filter(task => task.state === 'todo'),
                    done: tasks.filter(task => task.state === 'done'),
                    taskloading: false
                }))
            } else {
                setstate((prevState) => ({ ...prevState, taskloading: false }))
            }
        }).catch(() => setstate((prevState) => ({ ...prevState, taskloading: false })))
    }

    const addTask = (userId) => {
        if (userId && newtask.description) {
            Axios.post(`/api/tasks/create`, { description: newtask.description, user_id: userId }).then(data => {
                const response = data.data
                if (response.status) {
                    const task = response.data
                    setstate((prev) => ({
                        ...prev,
                        todo: [task, ...prev.todo],
                        loading: false
                    }))
                    setNewtask((prev) => ({
                        ...prev,
                        description: ""
                    }))
                }
            }).catch(() => { })
        }
    }

    const changehandler = (e) => {
        setNewtask({ ...newtask, [e.target.name]: e.target.value })
    }

    const onDelete = (task) => {
        const { user_id, id } = task
        if (task) {
            return Axios.post(`/api/tasks/delete/${user_id}/${id}`).then(data => {
                const response = data.data
                if (response.status) {
                    const dy = task.state === 'todo' ? 'todo' : 'done'
                    setstate((prev) => ({
                        ...prev,
                        [dy]: prev[dy].filter((tsk) => tsk.id !== task.id)
                    }))
                }
            }).catch()
        }
    }

    const updateHandler = (task, taskstate) => {
        if (task) {
            const taskcomplete = taskstate.completed ? 'done' : 'todo'
            return Axios.post(`/api/tasks/update/${task.user_id}/${task.id}`, { description: taskstate.description, state: taskcomplete }).then(data => {
                const response = data.data
                if (response.status) {
                    getUserTask(task.user_id)
                }
            }).catch()
        }
    }

    return (
        <BaseLayout style={{ height: '100%', justifyContent: 'none' }}>
            <div className="header-st">
                <BsBackspace size={25} onClick={() => history.push(`/users`)} />
                {state.user ? <div className='welcome-title'>{state.user.name}'s Tasks</div> : null}
            </div>
            <TaskContainer
                Icon={CgNotes}
                color="#40a5fb"
                title="ADD ITEM"
                style={{ height: 'auto' }}
            >
                <div className="add-field">
                    <div className="input-field">
                        <label>What do you want to do?</label>
                        <input type="text" name="description" value={newtask.description} onChange={changehandler} placeholder="I want to do something good" />
                    </div>
                    <div className="add-icon" onClick={() => addTask(state.userId)}>
                        <MdAdd />
                    </div>
                </div>
            </TaskContainer>
            <TaskContainer
                Icon={BiListUl}
                color="#feaf00"
                title="TODO LIST"
            >
                {
                    state.taskloading ? null : state.todo.length ?
                        state.todo.map((td) =>
                        (<React.Fragment key={td.id}>
                            <TaskList task={td} onDelete={onDelete} onUpdate={updateHandler} />
                            <HorizontalLine />
                        </React.Fragment>)) : <div>No task to do.</div>
                }
            </TaskContainer>
            <TaskContainer
                Icon={BiCheckShield}
                color="#50cd6b"
                title="COMPLETED"
            >
                {
                    state.taskloading ? null : state.done.length ?
                        state.done.map((dn) =>
                        (<React.Fragment key={dn.id} >
                            <TaskList light task={dn} onDelete={onDelete} />
                            <HorizontalLine />
                        </React.Fragment>)) : <div>No completed task yet.</div>
                }
            </TaskContainer>
        </BaseLayout>
    )
}

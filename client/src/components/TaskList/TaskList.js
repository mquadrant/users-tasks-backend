import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';

export default function TaskList(props) {
    const { light = false, task, onDelete, onUpdate } = props

    const [state, setstate] = useState({ description: task.description, completed: false })
    const [modal, setmodal] = useState(false)

    const onDeleteHandler = (task) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(task)
            }
        })
    }

    const changehandler = (event) => {
        const target = event.target;
        const value = target.name === 'completed' ? target.checked : target.value;
        const name = target.name;
        setstate({ ...state, [name]: value })
    }

    const updateHandler = (task, state) => {
        setmodal(false)
        onUpdate(task, state)
    }

    return (
        <div className="task-list">
            { light ? null : <div className="check"><AiOutlineCheck /></div>}
            <div className="description" style={light ? { color: "#45454594" } : {}}>{task.description}</div>
            { light ? null : <div className="edit" onClick={() => setmodal(true)}><MdEdit size={20} /></div>}
            <div className="delete" onClick={() => onDeleteHandler(task)} style={light ? { marginLeft: 'auto' } : {}}><MdDelete size={20} /></div>
            <Popup modal={true} open={modal} position="top top">
                <div className="modal-container" style={{ width: '400px' }}>
                    <input type="text" name="description" onChange={changehandler} value={state.description} />
                    <div className="checkmark">
                        <label>
                            <input type="checkbox" name="completed" value="value" checked={state.completed} onChange={changehandler} />
                            <span className="label">Completed ?</span>
                        </label>
                        <div className="update-btn" onClick={() => updateHandler(task, state)}>Update</div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}


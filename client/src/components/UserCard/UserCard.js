import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';

export default function UserCard({ user, onDelete, onUpdate }) {

    const history = useHistory();
    const [modal, setmodal] = useState(false)
    const [state, setstate] = useState({ name: user.name })

    const onHandleDelete = (e, userId) => {
        e.stopPropagation();
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
                onDelete(userId).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    )
                })

            }
        })
    }

    const changehandler = (event) => {
        const target = event.target;
        const name = target.name;
        setstate({ ...state, [name]: target.value })
    }

    const updateHandler = (user, update) => {
        onUpdate(user, update)
    }

    return (
        <div className="card" onClick={() => history.push(`/users/${user.id}`)}>
            <div className="inner-card">
                <div className="image-round" style={{ backgroundColor: `${user.color}` }}><span>{user.name[0].toUpperCase()}</span></div>
                <div className="details">
                    <div className="name">{user.name}</div>
                    <div className="created">{dayjs(user.created_at).format('MMM D, YYYY h:mm A')}</div>
                </div>
                <div className="update" onClick={(e) => {
                    e.stopPropagation();
                    setmodal(true)
                }}> <FiEdit2 size="20" /> </div>
                <div className="remove" onClick={(e) => onHandleDelete(e, user.id)}> <AiOutlineDelete size="20" /> </div>
                <div className="view"> <RiArrowRightSLine size="20" /> </div>
            </div>
            <Popup modal={true} open={modal} position="top top">
                <div className="modal-container" style={{ width: '400px' }}>
                    <input type="text" name="name" onChange={changehandler} value={state.name} />
                    <div className="checkmark">
                        <div className="update-btn" onClick={() => updateHandler(user, state)}>Update</div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

import React from 'react'
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';

export default function TaskContainer(props) {
    const { Icon, title, color, style } = props
    return (
        <div className="task-container" style={style ? style : {}}>
            <div className="header">
                <div className="icon-con" style={{backgroundColor: color || "#40a5fb"}}>
                    <Icon size={35} />
                </div>
                <div className="title">{title}</div>
            </div>
            <HorizontalLine style={{ width: '100%', margin: '0 auto' }} />
            {props.children}
        </div>
    )
}

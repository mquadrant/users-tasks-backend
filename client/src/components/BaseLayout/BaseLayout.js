import React from 'react'

export default function BaseLayer(props) {
    return (
        <div className='base' style={props.style ? props.style : {}}>
            {props.children}
        </div>
    )
}

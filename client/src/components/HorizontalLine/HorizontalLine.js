import React from 'react'

export default function HorizontalLine(props) {
    const {style = {}} = props
    return (
        <div className='h-line'>
            <hr style={style}/>
        </div>
    )
}

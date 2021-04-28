import React from 'react'
import "./Screen.css"

function Screen(props) {
    return (
        <div className="screen">
            {props.display}
        </div>
    )
}

export default Screen

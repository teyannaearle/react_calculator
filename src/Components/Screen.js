import React from 'react'
import "./Screen.css"

function Screen(props) {
    return (
        <div className="screen">
           <p> {props.display} </p>
        </div>
    )
}

export default Screen

import React from 'react'
import "./Screen.css"

function Screen(props) {
    let formatted = new Intl.NumberFormat("en");
    return (
        <div className="screen">
           <p> {formatted.format(props.display)} </p>
        </div>
    )
}

export default Screen

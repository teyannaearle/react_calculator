import React from 'react'
import "./Keypad.css"

function Keypad(props) {
   const {operator, numberClick, switcheroo, clear} = props

  const hitEqual = () => {
      props.equalPressed()
      props.calculate()
   }
 
   return (
      <>
      <button className="col1 operator" value="+" onClick={operator}>+</button> 
      <button className="col2 operator" value="-" onClick={operator}>-</button> 
      <button className="col3 operator" value="*" onClick={operator}>x</button> 
      <button className="col4 operator" value="/" onClick={operator}>÷</button> 
      <button className="col1" value="7" onClick={numberClick}>7</button> 
      <button className="col2" value="8" onClick={numberClick}>8</button> 
      <button className="col3" value="9" onClick={numberClick}>9</button> 
      <button className="col4 misc"  onClick={switcheroo}>+/-</button>
      <button className="col1" value="4" onClick={numberClick}>4</button> 
      <button className="col2" value="5" onClick={numberClick}>5</button> 
      <button className="col3" value="6" onClick={numberClick}>6</button> 
      <button className="col4 misc" onClick={clear}>AC</button> 
      <button className="col1" value="1" onClick={numberClick}>1</button> 
      <button className="col2" value="2" onClick={numberClick}>2</button> 
      <button className="col3" value="3" onClick={numberClick}>3</button>
      <button className="col4 misc" value="=" onClick={hitEqual}>=</button> 
      <button className="zero" value="0" onClick={numberClick}>0</button>    
     </>
   )
}

export default Keypad

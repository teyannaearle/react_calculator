import React, { Component } from "react";
import Keypad from "./Keypad";
import Screen from "./Screen";
import "./Calculator.css";

export class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: "0",
      operator: "",
      firstNum: 0,
      secondNum: 0, 
      calculated: false,
      wipeScreen: false,
      equalPressed: false,
      waitingForInput: false
    };
    this.answer = "";
    this.displayCopy = "";
    this.formatter = new Intl.NumberFormat("en");
  }

  handleClick = (e) => {
    this.state.wipeScreen ? this.displayNumber(e) : this.buildNumber(e);
  };

  displayNumber = (e) => {
    let input = e.target.value
         
    if (this.state.display !=="0" && input === "0"){
        this.setState({display: "0"})
        this.displayCopy=""
    }

    if (input !== "0"){
        this.displayCopy = input
        this.setState({display: this.formatter.format(input)})
    }     

    if (this.state.waitingForInput ){
        this.setState({secondNum: this.displayCopy})
    } else if (!this.state.waitingForInput && !this.state.calculated){
        this.setState({firstNum:this.displayCopy})

    } else if (!this.state.waitingForInput && this.state.calculated && this.state.equalPressed){
        this.setState({firstNum:this.displayCopy})
    } else {
        this.setState({secondNum: this.displayCopy})
    }

    this.setState({wipeScreen: false})

  };

  buildNumber = (e) => {
    this.displayCopy = this.displayCopy + e.target.value;
    this.setState({ display: this.formatter.format(this.displayCopy) });

    if (!this.state.waitingForInput) {
      this.setState({ firstNum: this.displayCopy });
    } else {
      this.setState({ secondNum: this.displayCopy });
    }

  };

  switcheroo = () => {
    if (this.state.display !== "0") {
      this.displayCopy = this.displayCopy * -1;
      this.setState({ display: this.formatter.format(this.displayCopy) });

        if (!this.state.waitingForInput) {
            this.setState({ firstNum: this.displayCopy });
        } else {
            this.setState({ secondNum: this.displayCopy });
        }    
    }

  };

  allClear = () => {
    this.answer = "";
    this.displayCopy = "";
    this.setState({ display: "0" });
    this.setState({ operator: "" });
    this.setState({ firstNum: 0 });
    this.setState({ secondNum: 0 });
    this.setState({ calculated: false });
    this.setState({ wipeScreen: false });
    this.setState({ waitingForInput: false });
  };

  operator = (e) => {
    this.setState({ waitingForInput: true });
    this.setState({ operator: e.target.value });
    this.setState({ calculated: false });
    this.setState({ equalPressed: false });

    if (this.state.firstNum === 0) {
      this.setState({ firstNum: this.displayCopy });
    } if (this.state.firstNum && this.state.secondNum) {
      this.calculate();
      this.setState({ waitingForInput: true });
    }

    this.setState({ wipeScreen: true });
  };

  calculate = () => {
    const { firstNum, secondNum } = this.state;
    const firstNumber = Number(firstNum);
    const secondNumber = Number(secondNum);

    if (secondNum) {
      let operator = this.state.operator;
      switch (operator) {
        case "+":
          this.answer = firstNumber + secondNumber;
          this.setState({ display: this.formatter.format(this.answer) });
          break;
        case "-":
          this.answer = firstNumber - secondNumber;
          this.setState({ display: this.formatter.format(this.answer) });
          break;
        case "/":
          this.answer = Math.floor(firstNumber / secondNumber);
          this.setState({ display: this.formatter.format(this.answer) });
          break;
        case "*":
          this.answer = firstNumber * secondNumber;
          this.setState({ display: this.formatter.format(this.answer) });
          break;
        default:
          break;
      }

      this.setState({ display: this.formatter.format(this.answer) });
      this.setState({ firstNum: this.answer });
      this.setState({ secondNum: 0 });
      this.setState({ waitingForInput: false });
      this.setState({ calculated: true });
      this.setState({ wipeScreen: true });
      this.displayCopy = this.answer;
    }
  };

  equalPressed = () => {
    this.setState({ equalPressed: true });
  };

  render() {
    return (
      <div className="calculator">
        <Screen display={this.state.display} />
        <Keypad
          numberClick={this.handleClick}
          switcheroo={this.switcheroo}
          clear={this.allClear}
          operator={this.operator}
          calculate={this.calculate}
          equalPressed={this.equalPressed}
        />
      </div>
    );
  }
}

export default Calculator;

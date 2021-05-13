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
      wipeScreen: true,
      equalPressed: false,
      waitingForInput: false,
    };
  }

  handleClick = (e) => {
    this.state.wipeScreen ? this.displayNumber(e) : this.buildNumber(e);
  };

  displayNumber = (e) => {
    const input = e.target.value;
    const { display } = this.state;

    if (display !== "0" && display !== 0 && input === "0") {
      this.setState({ display: "0", firstNum: "0" });
    }

    if (input !== "0") {
      this.setState(
        {
          display: input,
          wipeScreen: false,
        },
        function () {
          this.setNums();
        }
      );
    }
  };

  setNums = () => {
    const { display, calculated, equalPressed, waitingForInput } = this.state;

    if (waitingForInput) {
      this.setState({ secondNum: display });
    } else if (!waitingForInput && !calculated) {
      this.setState({ firstNum: display });
    } else if (!waitingForInput && calculated && equalPressed) {
      this.setState({ firstNum: display });
    } else {
      this.setState({ secondNum: display });
    }

    this.setState({ wipeScreen: false });
  };

  buildNumber = (e) => {
    const { display } = this.state;
    this.setState(
      {
        display: display + e.target.value,
      },
      function () {
        this.setNums();
      }
    );
  };

  switcheroo = () => {
    const { display } = this.state;

    if (display !== "0" && display !== 0) {
      this.setState(
        {
          display: display * -1,
        },
        function () {
          this.setNums();
        }
      );
    }
  };

  allClear = () => {
    this.setState({
      answer: "",
      display: "0",
      operator: "",
      firstNum: 0,
      secondNum: 0,
      calculated: false,
      wipeScreen: true,
      equalPressed: false,
      waitingForInput: false,
    });
  };

  operator = (e) => {
    const { firstNum, display, secondNum } = this.state;
    this.setState({
      waitingForInput: true,
      operator: e.target.value,
      calculated: false,
      equalPressed: false,
    });

    if (firstNum === 0) {
      this.setState({ firstNum: display });
    }
    if (firstNum && secondNum) {
      this.calculate();
      this.setState({ waitingForInput: true });
    }

    this.setState({ wipeScreen: true });
  };

  calculate = () => {
    const { firstNum, secondNum } = this.state;
    const firstNumber = Number(firstNum);
    const secondNumber = Number(secondNum);
    this.answer = "";

    if (secondNum) {
      let operator = this.state.operator;
      switch (operator) {
        case "+":
          this.answer = firstNumber + secondNumber;
          this.setState({ display: this.answer });
          break;
        case "-":
          this.answer = firstNumber - secondNumber;
          this.setState({ display: this.answer });
          break;
        case "/":
          this.answer = Math.floor(firstNumber / secondNumber);
          this.setState({ display: this.answer });
          break;
        case "*":
          this.answer = firstNumber * secondNumber;
          this.setState({ display: this.answer });
          break;
        default:
          break;
      }

      this.setState({
        display: this.answer,
        firstNum: this.answer,
        secondNum: 0,
        waitingForInput: false,
        calculated: true,
        wipeScreen: true,
      });
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

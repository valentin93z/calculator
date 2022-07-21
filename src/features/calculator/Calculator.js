import React, { useState } from "react";

export function Calculator() {

    const [formula, setFormula] = useState("");
    const [display, setDisplay] = useState(0);
    const [result, setResult] = useState(0);

    const maxDigitWarning = () => {
        const promVal = display;
        setDisplay("Digit Limit Met");
        setTimeout(() => setDisplay(promVal), 1000);
    }
    
    const handleNumber = (symbol) => {
        if (formula.includes("=")) {
            setFormula(symbol);
            setDisplay(symbol); 
        } else {
            if (display === 0) {
                if(!/[0]/.test(symbol)) {
                    setDisplay(symbol);
                    setFormula(symbol);
                }
            }
            else if (/[0-9.]/.test(display) && display.length < 21) {
                setDisplay(prev => prev + symbol);
                setFormula(prev => prev + symbol);
            }
            else if (/[*/+-]/.test(display)) {
                if (!/[0]/.test(symbol)) {
                    setDisplay(symbol);
                    setFormula(prev => prev + symbol);
                }
            }
            else if (display.length >= 21) {
                return maxDigitWarning();
            } else {
                setDisplay(prev => prev + symbol);
                setFormula(prev => prev + symbol);
            }
        }
    }

    const handleOperator = (operator) => {
        if (formula.includes("=")) {
            setDisplay(operator);
            setFormula(result + " " + operator + " ")
        } else {
            if(/[*/+-]/.test(display) && !/[-]/.test(operator)) {
                setDisplay(operator);
                setFormula(prev => prev.replace(/[*/+-]/g, operator));
            } else {
                setDisplay(operator);
                setFormula(prev => prev + " " + operator + " ");
            }
        }
    }

    const handleDecimal = () => {
        const arrFormula = formula.split(" ");
        const lastElementFormula = arrFormula[arrFormula.length-1];

        if (display === 0) {
            setDisplay("0.");
            setFormula("0.");
        }
    else if (/[*/+-]/.test(display)) {
            setDisplay("0.");
            setFormula(prev => prev + "0.");
        } else {
            if (!lastElementFormula.includes(".")) {
                setFormula(prev => prev + ".");
            }
    
            if (!display.includes(".")) {
                setDisplay(prev => prev + ".");
            }
        }
    }

    const equals = () => {
        setDisplay(eval(formula));
        setFormula(prev => prev + " " + "=" + " " + eval(formula));
        setResult(eval(formula));
    }

    const clearAll = () => {
        setFormula("");
        setDisplay(0);
    }

    return (
        <div className="Calculator">
            <div className="cons">
                <div className="formula">{formula}</div>
                <div className="display" id="display">{display}</div>
            </div>
            <div className="pad">
                <button onClick={clearAll} id="clear" value="AC">AC</button>
                <button onClick={() => handleOperator("*")} id="multiply" value="x">x</button>
                <button onClick={() => handleOperator("/")} id="divide" value="/">/</button>
                <button onClick={() => handleNumber("7")} id="seven" value="7">7</button>
                <button onClick={() => handleNumber("8")} id="eight" value="8">8</button>
                <button onClick={() => handleNumber("9")} id="nine" value="9">9</button>
                <button onClick={() => handleOperator("-")} id="subtract" value="-">-</button>
                <button onClick={() => handleNumber("4")} id="four" value="4">4</button>
                <button onClick={() => handleNumber("5")} id="five" value="5">5</button>
                <button onClick={() => handleNumber("6")} id="six" value="6">6</button>
                <button onClick={() => handleOperator("+")} id="add" value="+">+</button>
                <button onClick={() => handleNumber("1")} id="one" value="1">1</button>
                <button onClick={() => handleNumber("2")}id="two" value="2">2</button>
                <button onClick={() => handleNumber("3")} id="three" value="3">3</button>
                <button onClick={equals} id="equals" value="=">=</button>
                <button onClick={() => handleNumber("0")} id="zero" value="0">0</button>
                <button onClick={() => handleDecimal(".")} id="decimal" value=".">.</button>
            </div>
        </div>
    )
}
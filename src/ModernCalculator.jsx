import React, { useState, useEffect } from 'react';
import './ModernCalculator.css';

const ModernCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        inputOperation(key);
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === '.') {
        inputDecimal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      
      // Add to history
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [calculation, ...prev.slice(0, 4)]); // Keep last 5 calculations

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const performCalculation = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const formatDisplay = (value) => {
    if (value.length > 12) {
      return parseFloat(value).toExponential(6);
    }
    return value;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Display */}
        <div className="display-section">
          <div className="history">
            {history.length > 0 && (
              <div className="last-calculation">{history[0]}</div>
            )}
          </div>
          <div className="main-display">
            {formatDisplay(display)}
          </div>
        </div>

        {/* Button Grid */}
        <div className="button-grid">
          {/* Row 1 */}
          <button className="btn function" onClick={clear}>AC</button>
          <button className="btn function" onClick={toggleSign}>±</button>
          <button className="btn function" onClick={percentage}>%</button>
          <button className="btn operator" onClick={() => inputOperation('/')}>÷</button>

          {/* Row 2 */}
          <button className="btn number" onClick={() => inputNumber('7')}>7</button>
          <button className="btn number" onClick={() => inputNumber('8')}>8</button>
          <button className="btn number" onClick={() => inputNumber('9')}>9</button>
          <button className="btn operator" onClick={() => inputOperation('*')}>×</button>

          {/* Row 3 */}
          <button className="btn number" onClick={() => inputNumber('4')}>4</button>
          <button className="btn number" onClick={() => inputNumber('5')}>5</button>
          <button className="btn number" onClick={() => inputNumber('6')}>6</button>
          <button className="btn operator" onClick={() => inputOperation('-')}>−</button>

          {/* Row 4 */}
          <button className="btn number" onClick={() => inputNumber('1')}>1</button>
          <button className="btn number" onClick={() => inputNumber('2')}>2</button>
          <button className="btn number" onClick={() => inputNumber('3')}>3</button>
          <button className="btn operator" onClick={() => inputOperation('+')}>+</button>

          {/* Row 5 */}
          <button className="btn number zero" onClick={() => inputNumber('0')}>0</button>
          <button className="btn number" onClick={inputDecimal}>.</button>
          <button className="btn backspace" onClick={backspace}>⌫</button>
          <button className="btn equals" onClick={calculate}>=</button>
        </div>

        {/* History Panel */}
        {history.length > 0 && (
          <div className="history-panel">
            <h4>Recent Calculations</h4>
            {history.slice(0, 3).map((calc, index) => (
              <div key={index} className="history-item">
                {calc}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernCalculator;
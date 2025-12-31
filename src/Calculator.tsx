import React, { useState } from "react";
import "./calculator.css";

export default function Calculator() {
  const [display, setDisplay] = useState("0");

  function handleClick(value: string) {
    // Clear
    if (value === "C") {
      setDisplay("0");
      return;
    }

    // Evaluate expression safely
    if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(display);
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    // Replace leading 0
    if (display === "0") {
      setDisplay(value);
      return;
    }

    setDisplay(display + value);
  }

  const buttons = [
    "C", "/", "*", "←",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", ".",
    "0", "00", "=", 
  ];

  return (
    <div className="calc-wrapper">
      <div className="calculator">
        <div className="display">{display}</div>

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={btn === "=" ? "equals" : btn === "C" ? "clear" : ""}
              onClick={() => {
                if (btn === "←") {
                  setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
                } else {
                  handleClick(btn);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


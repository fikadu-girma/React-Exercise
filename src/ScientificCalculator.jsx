import { useReducer, useEffect, useRef, useState } from "react";

const initialState = {
  expression: "",
  result: "",
  error: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        expression: state.expression + action.payload,
        error: null,
      };

    case "CLEAR":
      return initialState;

    case "DELETE":
      return {
        ...state,
        expression: state.expression.slice(0, -1),
      };

    case "CALCULATE":
      try {
        const evalResult = eval(state.expression);
        return {
          ...state,
          result: evalResult.toString(),
          error: null,
        };
      } catch {
        return { ...state, error: "Invalid Expression" };
      }

    case "SCIENTIFIC":
      try {
        const value = eval(state.expression || "0");
        let sciResult;

        switch (action.payload) {
          case "sin":
            sciResult = Math.sin(value);
            break;
          case "cos":
            sciResult = Math.cos(value);
            break;
          case "tan":
            sciResult = Math.tan(value);
            break;
          case "sqrt":
            sciResult = Math.sqrt(value);
            break;
          case "square":
            sciResult = value * value;
            break;
          default:
            return state;
        }

        return {
          ...state,
          expression: sciResult.toString(),
          result: "",
        };
      } catch {
        return { ...state, error: "Math Error" };
      }

    default:
      return state;
  }
}

function ScientificCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const inputRef = useRef(null);
  const [theme, setTheme] = useState("light");

  /* useEffect → focus input */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={`calculator ${theme}`}>
      <h2>Scientific Calculator</h2>

      <input
        ref={inputRef}
        value={state.expression}
        readOnly
        placeholder="0"
      />

      <div className="result">{state.result}</div>

      {state.error && <div style={{ color: "red" }}>{state.error}</div>}

      <div className="buttons">
        {"1234567890+-*/.".split("").map((btn) => (
          <button key={btn} onClick={() => dispatch({ type: "ADD", payload: btn })}>
            {btn}
          </button>
        ))}

        <button onClick={() => dispatch({ type: "SCIENTIFIC", payload: "sin" })}>sin</button>
        <button onClick={() => dispatch({ type: "SCIENTIFIC", payload: "cos" })}>cos</button>
        <button onClick={() => dispatch({ type: "SCIENTIFIC", payload: "tan" })}>tan</button>
        <button onClick={() => dispatch({ type: "SCIENTIFIC", payload: "sqrt" })}>√</button>
        <button onClick={() => dispatch({ type: "SCIENTIFIC", payload: "square" })}>x²</button>

        <button onClick={() => dispatch({ type: "CALCULATE" })}>=</button>
        <button onClick={() => dispatch({ type: "DELETE" })}>DEL</button>
        <button onClick={() => dispatch({ type: "CLEAR" })}>C</button>
      </div>

      <button onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ScientificCalculator;

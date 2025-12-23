import { useReducer } from "react";

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: "INCREMENT" | "DECREMENT";
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };

    case "DECREMENT":
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
}

function DemoReducer() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <div className="tutorial">
      <div>Count: {state.count}</div>

      {state.error && (
        <div style={{ color: "red" }}>Error: {state.error}</div>
      )}

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increment
      </button>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
    </div>
  );
}

export default DemoReducer;

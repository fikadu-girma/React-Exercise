import { useReducer } from "react";

const initialState = {
  name: "",
  age: 18,
  isOnline: false,
};

function profileReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    case "SET_AGE":
      return {
        ...state,
        age: action.payload,
      };

    case "TOGGLE_STATUS":
      return {
        ...state,
        isOnline: !state.isOnline,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function UserProfile() {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>User Profile</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />

      <br /><br />

      <input
        type="number"
        value={state.age}
        onChange={(e) =>
          dispatch({ type: "SET_AGE", payload: Number(e.target.value) })
        }
      />

      <br /><br />

      <p>Status: {state.isOnline ? "🟢 Online" : "🔴 Offline"}</p>

      <button onClick={() => dispatch({ type: "TOGGLE_STATUS" })}>
        Toggle Status
      </button>

      <br /><br />

      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset Profile
      </button>
    </div>
  );
}

export default UserProfile;

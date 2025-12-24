import { useState, useEffect, useRef } from "react";
import "./index.css";

function TempConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const celsiusRef = useRef(null);

  useEffect(() => {
    celsiusRef.current.focus();
  }, []);

  const handleCelsiusChange = (value) => {
    setCelsius(value);

    if (value === "") {
      setFahrenheit("");
      return;
    }

    const f = (value * 9) / 5 + 32;
    setFahrenheit(f.toFixed(2));
  };

  const handleFahrenheitChange = (value) => {
    setFahrenheit(value);

    if (value === "") {
      setCelsius("");
      return;
    }

    const c = ((value - 32) * 5) / 9;
    setCelsius(c.toFixed(2));
  };

  const reset = () => {
    setCelsius("");
    setFahrenheit("");
    celsiusRef.current.focus();
  };

  return (
    <div className="temp-container">
      <h2>🌡️ Temperature Converter</h2>

      <div className="input-group">
        <label>Celsius (°C)</label>
        <input
          ref={celsiusRef}
          type="number"
          value={celsius}
          onChange={(e) => handleCelsiusChange(e.target.value)}
          placeholder="Enter °C"
        />
      </div>

      <div className="input-group">
        <label>Fahrenheit (°F)</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={(e) => handleFahrenheitChange(e.target.value)}
          placeholder="Enter °F"
        />
      </div>

      <button className="btn" onClick={reset}>
        Reset
      </button>

      <div className="note">Enter a value in either field to convert.</div>
    </div>
  );
}

export default TempConverter;

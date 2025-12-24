import { useState, useEffect, useRef } from "react";

function TempConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const celsiusRef = useRef(null);

  // Auto-focus Celsius input on load
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
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>Temperature Converter</h2>

      <label>Celsius (°C)</label>
      <input
        ref={celsiusRef}
        type="number"
        value={celsius}
        onChange={(e) => handleCelsiusChange(e.target.value)}
        placeholder="Enter °C"
      />

      <br /><br />

      <label>Fahrenheit (°F)</label>
      <input
        type="number"
        value={fahrenheit}
        onChange={(e) => handleFahrenheitChange(e.target.value)}
        placeholder="Enter °F"
      />

      <br /><br />

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default TempConverter;

import { useState, useEffect, useRef } from "react";

function BMIcalc() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const heightRef = useRef(null);

  // Auto-focus height input
  useEffect(() => {
    heightRef.current.focus();
  }, []);

  const calculateBMI = () => {
    if (!height || !weight) {
      setBmi(null);
      setCategory("Please enter valid height and weight");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (
      weight /
      (heightInMeters * heightInMeters)
    ).toFixed(2);

    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Normal");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    heightRef.current.focus();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>BMI Calculator</h2>

      <input
        ref={heightRef}
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <br /><br />

      <button onClick={calculateBMI}>Calculate</button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        Reset
      </button>

      <br /><br />

      {bmi && (
        <>
          <div><strong>BMI:</strong> {bmi}</div>
          <div><strong>Category:</strong> {category}</div>
        </>
      )}

      {!bmi && category && (
        <div style={{ color: "red" }}>{category}</div>
      )}
    </div>
  );
}

export default BMIcalc;

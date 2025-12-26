import { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);           
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);

    startTimeRef.current = Date.now() - time;

    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (!isRunning) return;
    setLaps(prev => [...prev, time]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:` +
           `${String(seconds).padStart(2, "0")}.` +
           `${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>⏱ Stopwatch</h2>

      <div style={styles.time}>{formatTime(time)}</div>

      <div style={styles.buttons}>
        {!isRunning ? (
          <button style={styles.btnPrimary} onClick={start}>Start</button>
        ) : (
          <button style={styles.btnWarning} onClick={pause}>Pause</button>
        )}

        <button style={styles.btnSecondary} onClick={reset}>Reset</button>
        <button style={styles.btnAccent} onClick={addLap} disabled={!isRunning}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div style={styles.lapList}>
          <h4>Laps</h4>
          {laps.map((lap, i) => (
            <div key={i} style={styles.lapItem}>
              Lap {i + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 360,
    margin: "40px auto",
    padding: "20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#1f2937,#111827)",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,.4)",
    fontFamily: "system-ui, sans-serif"
  },
  title: { marginBottom: 10 },
  time: {
    fontSize: "2.6rem",
    fontWeight: "700",
    letterSpacing: "1px",
    margin: "10px 0 20px"
  },
  buttons: { display: "flex", gap: 10, justifyContent: "center" },
  btnPrimary: customBtn("#22c55e"),
  btnWarning: customBtn("#facc15"),
  btnSecondary: customBtn("#6b7280"),
  btnAccent: customBtn("#38bdf8"),
  lapList: { marginTop: 20, textAlign: "left" },
  lapItem: {
    padding: "6px 10px",
    borderRadius: 8,
    background: "#020617",
    marginTop: 6,
    border: "1px solid #1f2937"
  }
};

function customBtn(color) {
  return {
    padding: "8px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: color,
    color: "#000",
    fontWeight: 600
  };
}

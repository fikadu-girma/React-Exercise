import { useState, useRef, useEffect } from "react";

export default function StopwatchTimer() {
  const [mode, setMode] = useState("stopwatch");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const [inputMin, setInputMin] = useState("");
  const [inputSec, setInputSec] = useState("");
  const [initialCountdown, setInitialCountdown] = useState(0);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Stopwatch
  const startStopwatch = () => {
    if (isRunning) return;
    setIsRunning(true);

    startTimeRef.current = Date.now() - time;

    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const addLap = () => {
    if (!isRunning || mode !== "stopwatch") return;
    setLaps(prev => [...prev, time]);
  };

  // Countdown
  const startCountdown = () => {
    if (isRunning) return;

    const totalMs =
      (Number(inputMin || 0) * 60 + Number(inputSec || 0)) * 1000;

    if (!totalMs) return alert("Enter a valid time");

    if (!time) {
      setTime(totalMs);
      setInitialCountdown(totalMs);
    }

    setIsRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const remaining = initialCountdown - (Date.now() - startTimeRef.current);

      if (remaining <= 0) {
        setTime(0);
        setIsRunning(false);
        clearInterval(intervalRef.current);
        alert("⏰ Time’s up!");
      } else {
        setTime(remaining);
      }
    }, 50);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTime(0);
    setLaps([]);
    setInitialCountdown(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  // Format mm:ss.ms
  const formatTime = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const ms2 = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(ms2).padStart(2,"0")}`;
  };

  // -------- 🎨 Dynamic Background Color Logic --------
  let backgroundColor = "#22c55e"; // default green

  if (mode === "countdown" && initialCountdown > 0) {
    const ratio = time / initialCountdown;

    if (ratio <= 0.10) {
      backgroundColor = "#ef4444"; // RED (≤10%)
    } else if (ratio <= 0.50) {
      backgroundColor = "#3b82f6"; // BLUE (≤50%)
    } else {
      backgroundColor = "#22c55e"; // GREEN ( >50% )
    }
  }

  return (
    <div style={{ ...styles.wrapper, background: backgroundColor }}>
      <h2 style={styles.title}>⏱ Stopwatch & ⏳ Countdown</h2>

      <div style={styles.modeSwitch}>
        <button
          style={mode === "stopwatch" ? styles.activeTab : styles.tab}
          onClick={() => { reset(); setMode("stopwatch"); }}
        >
          Stopwatch
        </button>

        <button
          style={mode === "countdown" ? styles.activeTab : styles.tab}
          onClick={() => { reset(); setMode("countdown"); }}
        >
          Countdown
        </button>
      </div>

      <div style={styles.time}>{formatTime(time)}</div>

      {mode === "countdown" && (
        <div style={styles.inputRow}>
          <input
            type="number"
            placeholder="Min"
            value={inputMin}
            onChange={e => setInputMin(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Sec"
            value={inputSec}
            onChange={e => setInputSec(e.target.value)}
            style={styles.input}
          />
        </div>
      )}

      <div style={styles.buttons}>
        {!isRunning ? (
          mode === "stopwatch"
            ? <button style={styles.btnPrimary} onClick={startStopwatch}>Start</button>
            : <button style={styles.btnPrimary} onClick={startCountdown}>Start</button>
        ) : (
          <button style={styles.btnWarning} onClick={pause}>Pause</button>
        )}

        <button style={styles.btnSecondary} onClick={reset}>Reset</button>

        {mode === "stopwatch" && (
          <button style={styles.btnAccent} onClick={addLap} disabled={!isRunning}>
            Lap
          </button>
        )}
      </div>

      {mode === "stopwatch" && laps.length > 0 && (
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

// ---------- Styles ----------
const styles = {
  wrapper: {
    maxWidth: 420,
    margin: "40px auto",
    padding: "22px",
    borderRadius: "16px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,.45)",
    fontFamily: "system-ui, sans-serif",
    transition: "background .3s ease"
  },
  title: { marginBottom: 10 },
  modeSwitch: { display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 },
  tab: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
    cursor: "pointer"
  },
  activeTab: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "none",
    background: "#38bdf8",
    color: "#000",
    fontWeight: 700
  },
  time: { fontSize: "2.6rem", fontWeight: 700, margin: "10px 0 18px" },
  inputRow: { display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 },
  input: {
    width: 70, padding: 8, borderRadius: 10,
    border: "1px solid #334155", background: "#020617",
    color: "#fff", textAlign: "center"
  },
  buttons: { display: "flex", gap: 10, justifyContent: "center" },
  btnPrimary: btn("#22c55e"),
  btnWarning: btn("#facc15"),
  btnSecondary: btn("#6b7280"),
  btnAccent: btn("#38bdf8"),
  lapList: { marginTop: 18, textAlign: "left" },
  lapItem: {
    padding: "6px 10px",
    borderRadius: 8,
    background: "#020617",
    marginTop: 6,
    border: "1px solid #1f2937"
  }
};

function btn(color) {
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

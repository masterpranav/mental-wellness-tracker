"use client";

import { useEffect, useMemo, useState } from "react";

type Entry = {
  date: string;
  mood: number;
  stress: number;
  focus: number;
  energy: number;
};

const STORAGE_KEY = "mindmate_entries";

export default function Home() {
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [focus, setFocus] = useState(5);
  const [energy, setEnergy] = useState(5);

  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    const newEntry: Entry = {
      date: new Date().toLocaleDateString(),
      mood,
      stress,
      focus,
      energy,
    };

    const updated = [newEntry, ...entries];

    setEntries(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const burnoutRisk = useMemo(() => {
    const score =
      stress * 0.5 +
      (10 - energy) * 0.3 +
      (10 - focus) * 0.2;

    if (score > 7) return "🔴 High";
    if (score > 4) return "🟡 Moderate";

    return "🟢 Low";
  }, [stress, focus, energy]);

  const averages = useMemo(() => {
    if (!entries.length) {
      return {
        mood: 0,
        stress: 0,
        focus: 0,
        energy: 0,
      };
    }

    const total = entries.reduce(
      (acc, item) => ({
        mood: acc.mood + item.mood,
        stress: acc.stress + item.stress,
        focus: acc.focus + item.focus,
        energy: acc.energy + item.energy,
      }),
      {
        mood: 0,
        stress: 0,
        focus: 0,
        energy: 0,
      }
    );

    return {
      mood: (total.mood / entries.length).toFixed(1),
      stress: (total.stress / entries.length).toFixed(1),
      focus: (total.focus / entries.length).toFixed(1),
      energy: (total.energy / entries.length).toFixed(1),
    };
  }, [entries]);

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1>🧠 MindMate AI</h1>

      <p>
        Daily Mental Wellness Tracker
      </p>

      <hr />

      <h2>Today's Check-In</h2>

      <label>Mood: {mood}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={mood}
        onChange={(e) =>
          setMood(Number(e.target.value))
        }
      />

      <br />

      <label>Stress: {stress}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={stress}
        onChange={(e) =>
          setStress(Number(e.target.value))
        }
      />

      <br />

      <label>Focus: {focus}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={focus}
        onChange={(e) =>
          setFocus(Number(e.target.value))
        }
      />

      <br />

      <label>Energy: {energy}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={energy}
        onChange={(e) =>
          setEnergy(Number(e.target.value))
        }
      />

      <br />
      <br />

      <button
        onClick={saveEntry}
        style={{
          padding: "12px",
          cursor: "pointer",
        }}
      >
        Save Check-In
      </button>

      <hr />

      <h2>Burnout Risk</h2>
      <h3>{burnoutRisk}</h3>

      <hr />

      <h2>Analytics</h2>

      <p>
        Average Mood: {averages.mood}
      </p>

      <p>
        Average Stress: {averages.stress}
      </p>

      <p>
        Average Focus: {averages.focus}
      </p>

      <p>
        Average Energy: {averages.energy}
      </p>

      <hr />

      <h2>History</h2>

      {entries.length === 0 && (
        <p>No entries yet.</p>
      )}

      {entries.map((entry, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #444",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{entry.date}</strong>

          <p>
            Mood {entry.mood} | Stress{" "}
            {entry.stress} | Focus{" "}
            {entry.focus} | Energy{" "}
            {entry.energy}
          </p>
        </div>
      ))}
    </main>
  );
}

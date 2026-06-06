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
  const [tab, setTab] = useState("dashboard");

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
    const entry: Entry = {
      date: new Date().toLocaleDateString(),
      mood,
      stress,
      focus,
      energy,
    };

    const updated = [entry, ...entries];

    setEntries(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const averages = useMemo(() => {
    if (!entries.length) return null;

    const totals = entries.reduce(
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
      mood: (
        totals.mood / entries.length
      ).toFixed(1),

      stress: (
        totals.stress / entries.length
      ).toFixed(1),

      focus: (
        totals.focus / entries.length
      ).toFixed(1),

      energy: (
        totals.energy / entries.length
      ).toFixed(1),
    };
  }, [entries]);

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "Arial",
      }}
    >
      <header>
        <h1>🧠 MindMate AI</h1>

        <p>
          AI-powered mental wellness tracker
          for competitive exam students.
        </p>
      </header>

      <nav
        aria-label="Main Navigation"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          aria-label="Open Dashboard"
          onClick={() =>
            setTab("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          aria-label="Open Trends"
          onClick={() =>
            setTab("trends")
          }
        >
          Trends
        </button>

        <button
          aria-label="Open Contact Page"
          onClick={() =>
            setTab("contact")
          }
        >
          Contact Us
        </button>
      </nav>

      {tab === "dashboard" && (
        <section>
          <h2>Daily Wellness Check-In</h2>

          <div>
            <label htmlFor="mood-slider">
              Mood Level: {mood}
            </label>

            <br />

            <input
              id="mood-slider"
              aria-label="Mood Level"
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) =>
                setMood(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <br />

          <div>
            <label htmlFor="stress-slider">
              Stress Level: {stress}
            </label>

            <br />

            <input
              id="stress-slider"
              aria-label="Stress Level"
              type="range"
              min="1"
              max="10"
              value={stress}
              onChange={(e) =>
                setStress(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <br />

          <div>
            <label htmlFor="focus-slider">
              Focus Level: {focus}
            </label>

            <br />

            <input
              id="focus-slider"
              aria-label="Focus Level"
              type="range"
              min="1"
              max="10"
              value={focus}
              onChange={(e) =>
                setFocus(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <br />

          <div>
            <label htmlFor="energy-slider">
              Energy Level: {energy}
            </label>

            <br />

            <input
              id="energy-slider"
              aria-label="Energy Level"
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) =>
                setEnergy(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <br />

          <button
            aria-label="Save wellness check-in"
            onClick={saveEntry}
          >
            Save Check-In
          </button>

          <section
            aria-labelledby="analytics-heading"
            style={{
              marginTop: "30px",
            }}
          >
            <h2 id="analytics-heading">
              Analytics
            </h2>

            {!averages && (
              <p>
                No analytics available yet.
              </p>
            )}

            {averages && (
              <>
                <p>
                  Average Mood:{" "}
                  {averages.mood}
                </p>

                <p>
                  Average Stress:{" "}
                  {averages.stress}
                </p>

                <p>
                  Average Focus:{" "}
                  {averages.focus}
                </p>

                <p>
                  Average Energy:{" "}
                  {averages.energy}
                </p>
              </>
            )}
          </section>
        </section>
      )}

      {tab === "trends" && (
        <section>
          <h2>Wellness Trends</h2>

          {entries.length === 0 && (
            <p>
              No historical data available.
            </p>
          )}

          {entries.map(
            (entry, index) => (
              <article
                key={index}
                style={{
                  border:
                    "1px solid #ddd",
                  padding: "12px",
                  marginBottom: "10px",
                }}
              >
                <strong>
                  {entry.date}
                </strong>

                <p>
                  Mood: {entry.mood}
                </p>

                <p>
                  Stress:{" "}
                  {entry.stress}
                </p>

                <p>
                  Focus: {entry.focus}
                </p>

                <p>
                  Energy:{" "}
                  {entry.energy}
                </p>
              </article>
            )
          )}
        </section>
      )}

      {tab === "contact" && (
        <section>
          <h2>Contact Us</h2>

          <p>
            Need mental wellness
            consultation?
          </p>

          <p>
            Phone:
            +91-XXXXXXXXXX
          </p>

          <p>
            Email:
            help@mindmate.ai
          </p>

          <p>
            Availability:
            Monday-Friday,
            9:00 AM - 6:00 PM
          </p>
        </section>
      )}
    </main>
  );
}
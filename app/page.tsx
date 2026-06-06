"use client";

import { useEffect, useMemo, useState } from "react";

import MoodSelector from "../components/MoodSelector";
import FeedbackForm from "../components/FeedbackForm";

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

  const [exam, setExam] = useState("JEE");
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

    alert("Check-in saved successfully.");
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
      }}
    >
      <header>
        <h1>🧠 MindMate AI</h1>

        <p>
          Mental Wellness Companion for
          Competitive Exam Aspirants
        </p>
      </header>

      <nav
        aria-label="Main Navigation"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() =>
            setTab("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            setTab("trends")
          }
        >
          Trends
        </button>

        <button
          onClick={() =>
            setTab("feedback")
          }
        >
          Feedback
        </button>

        <button
          onClick={() =>
            setTab("contact")
          }
        >
          Contact Us
        </button>
      </nav>

      {tab === "dashboard" && (
        <section>
          <h2>Daily Check-In</h2>

          <label htmlFor="exam">
            Exam Preparation
          </label>

          <br />

          <select
            id="exam"
            value={exam}
            onChange={(e) =>
              setExam(e.target.value)
            }
          >
            <option>JEE</option>
            <option>NEET</option>
            <option>UPSC</option>
            <option>CAT</option>
            <option>GATE</option>
          </select>

          <br />
          <br />

          <MoodSelector
            selected={mood}
            onSelect={setMood}
          />

          <br />

          <label htmlFor="stress">
            Stress Level: {stress}
          </label>

          <input
            id="stress"
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

          <br />
          <br />

          <label htmlFor="focus">
            Focus Level: {focus}
          </label>

          <input
            id="focus"
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

          <br />
          <br />

          <label htmlFor="energy">
            Energy Level: {energy}
          </label>

          <input
            id="energy"
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

          <br />
          <br />

          <button
            aria-label="Save wellness check-in"
            onClick={saveEntry}
          >
            Save Check-In
          </button>

          <hr />

          <h2>Analytics</h2>

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
      )}

      {tab === "trends" && (
        <section>
          <h2>Wellness Trends</h2>

          {entries.length === 0 && (
            <p>
              No trend data available.
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

      {tab === "feedback" && (
        <FeedbackForm />
      )}

      {tab === "contact" && (
        <section>
          <h2>
            Consultation Request
          </h2>

          <form>
            <input
              type="text"
              placeholder="Your Name"
            />

            <br />
            <br />

            <input
              type="email"
              placeholder="Email Address"
            />

            <br />
            <br />

            <textarea
              rows={5}
              placeholder="Describe your concern"
            />

            <br />
            <br />

            <button type="submit">
              Request Consultation
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
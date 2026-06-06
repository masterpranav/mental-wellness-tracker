"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] =
    useState("");

  const saveFeedback = () => {
    const existing =
      JSON.parse(
        localStorage.getItem(
          "feedback"
        ) || "[]"
      );

    existing.push({
      date: new Date(),
      feedback,
    });

    localStorage.setItem(
      "feedback",
      JSON.stringify(existing)
    );

    alert(
      "Thank you for your feedback!"
    );

    setFeedback("");
  };

  return (
    <section>
      <h2>Feedback</h2>

      <p>
        Help us improve your
        wellness experience.
      </p>

      <textarea
        id="feedback"
        aria-label="Feedback"
        rows={5}
        style={{
          width: "100%",
        }}
        value={feedback}
        onChange={(e) =>
          setFeedback(e.target.value)
        }
      />

      <br />

      <button
        aria-label="Submit Feedback"
        onClick={saveFeedback}
      >
        Submit Feedback
      </button>
    </section>
  );
}
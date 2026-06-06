"use client";

import { useState } from "react";

export default function JournalForm() {
  const [text, setText] =
    useState("");

  const save = () => {
    const existing =
      JSON.parse(
        localStorage.getItem(
          "journals"
        ) || "[]"
      );

    existing.push({
      date: new Date(),
      text,
    });

    localStorage.setItem(
      "journals",
      JSON.stringify(existing)
    );

    setText("");
  };

  return (
    <>
      <textarea
        rows={6}
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={save}>
        Save Journal
      </button>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function Trends() {
  const [entries, setEntries] =
    useState<any[]>([]);

  useEffect(() => {
    const data =
      localStorage.getItem(
        "mindmate_entries"
      );

    if (data)
      setEntries(JSON.parse(data));
  }, []);

  return (
    <main>
      <h1>Wellness Trends</h1>

      {entries.map((e, index) => (
        <div key={index}>
          {e.date} | Mood {e.mood}
          | Stress {e.stress}
        </div>
      ))}
    </main>
  );
}
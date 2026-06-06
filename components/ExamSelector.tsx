"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function ExamSelector({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label htmlFor="exam">
        Exam Preparation
      </label>

      <select
        id="exam"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <option>JEE</option>
        <option>NEET</option>
        <option>UPSC</option>
        <option>CAT</option>
        <option>GATE</option>
      </select>
    </div>
  );
}
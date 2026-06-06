export function clamp(
    value: number,
    min: number,
    max: number
  ) {
    return Math.min(
      Math.max(value, min),
      max
    );
  }
  
  export function validateMood(
    value: number
  ) {
    return clamp(value, 1, 10);
  }
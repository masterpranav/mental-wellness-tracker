export function calculateBurnout(
    stress: number,
    focus: number,
    energy: number
  ) {
    const score =
      stress * 0.5 +
      (10 - focus) * 0.2 +
      (10 - energy) * 0.3;
  
    if (score > 7) return "HIGH";
  
    if (score > 4)
      return "MODERATE";
  
    return "LOW";
  }
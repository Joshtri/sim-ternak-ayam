export const getPerformanceColor = (rating: string) => {
  switch (rating.toLowerCase()) {
    case "sangat baik":
      return "success";
    case "baik":
      return "primary";
    case "cukup":
      return "warning";
    case "kurang":
      return "danger";
    default:
      return "default";
  }
};

// Helper function to get productivity score color
export const getProductivityColor = (score: number) => {
  if (score >= 80) return "success";
  if (score >= 60) return "primary";
  if (score >= 40) return "warning";

  return "danger";
};

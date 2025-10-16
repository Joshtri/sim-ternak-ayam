// Helper function to get health status color
export const getHealthStatusColor = (persentaseMortalitas: number) => {
  if (persentaseMortalitas < 5) return "success"; // Baik
  if (persentaseMortalitas <= 10) return "warning"; // Sedang

  return "danger"; // Buruk
};

// Helper function to get health status label
export const getHealthStatusLabel = (persentaseMortalitas: number) => {
  if (persentaseMortalitas < 5) return "Baik";
  if (persentaseMortalitas <= 10) return "Sedang";

  return "Buruk";
};

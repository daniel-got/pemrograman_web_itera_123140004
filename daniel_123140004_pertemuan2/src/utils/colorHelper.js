export const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };
  return colors[priority] || colors.medium;
};

export const getThemeClasses = (isDarkMode) => ({
  bg: isDarkMode ? 'bg-dark' : 'bg-light',
  card: isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark',
  input: isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-secondary'
});

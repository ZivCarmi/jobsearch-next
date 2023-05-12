const useRandomColor = () => {
  const colors = ["var(--orange)", "var(--purple)", "var(--purple-2nd)"];

  const chosenColor = colors[Math.floor(Math.random() * colors.length)];

  return chosenColor;
};

export default useRandomColor;

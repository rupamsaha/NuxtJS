export default (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

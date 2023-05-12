export const formatSelectOptions = (options) => {
  return Object.keys(options).map((key) => ({
    value: key,
    label: options[key],
  }));
};

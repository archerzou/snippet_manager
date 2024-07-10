export const capitalizeFirstOccurrence = (str: string) => {
  if (!str) return str; // If the string is empty, return it as is.

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str; // If no non-space characters are found, return the string as is.
};

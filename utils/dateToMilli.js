function convertToMilliseconds(datetimeString) {
  // Convert the datetime string to a Date object
  const date = new Date(datetimeString);

  // Return the milliseconds since Unix epoch
  return date.getTime();
}

export { convertToMilliseconds };

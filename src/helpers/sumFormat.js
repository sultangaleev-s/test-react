export const sumFormat = (value) => {
  return String(value).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
};

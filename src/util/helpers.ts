const sanitizeLastNonNumericChar = (value:string) => {
  if (isNaN(parseInt(value[value.length-1]))) {
    value = value.substring(0, value.length-1);
  }

  return value;
}

const Months = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

const formatPrettyDate = (theDate:Date) => {
  const d = new Date(theDate);
  const formatted = `${Months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return formatted;
}

export {
  sanitizeLastNonNumericChar,
  formatPrettyDate
};

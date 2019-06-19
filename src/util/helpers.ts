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

const formatPrettyDate = (theDate:Date|null) => {
  if (!theDate) return 'never';
  const d = new Date(theDate);
  const hours = d.getHours();
  const ampm = hours > 12 ? 'PM' : 'AM';
  const h = hours > 12 ? hours - 12 : hours;
  const minutes = d.getMinutes();
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = d.getSeconds();
  const s = seconds < 10 ? `0${seconds}` : seconds;
  const formatted = `${Months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${h}:${m}:${s} ${ampm}`;
  return formatted;
}

export {
  sanitizeLastNonNumericChar,
  formatPrettyDate
};

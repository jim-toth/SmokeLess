export default sanitizeLastNonNumericChar = (value) => {
  if (isNaN(parseInt(value[value.length-1]))) {
    value = value.substring(0, value.length-1);
  }

  return value;
}
import { SmokeLogEntry } from '../common/SmokeLogEntry';

const Months = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

type formatPrettyDateOptions = { shortMonthName?: boolean, timeOnly?: boolean };
const formatPrettyDate = (theDate:Date|null, options?:formatPrettyDateOptions) => {
  if (!theDate) return 'never';
  const d = new Date(theDate);
  const hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours > 12 ? hours - 12 : hours;
  const minutes = d.getMinutes();
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = d.getSeconds();
  const s = seconds < 10 ? `0${seconds}` : seconds;
  
  let formattedDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  if (options && !options.shortMonthName) {
    formattedDate = `${Months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  let formattedTime = `${h}:${m}:${s} ${ampm}`;
  
  if (options && options.timeOnly) {
    return formattedTime;
  }
  
  return `${formattedDate} at ${formattedTime}`;
}

const boolToIntString = (theBool:boolean) => {
  if (theBool) {
    return '1';
  } else {
    return '0';
  }
}

const intStringToBool = (theIntString:string) => {
  if (theIntString === '1') {
    return true;
  } else {
    return false;
  }
}

const sortSmokeLogEntriesDesc = (a:SmokeLogEntry, b:SmokeLogEntry) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
}

export {
  formatPrettyDate,
  boolToIntString,
  intStringToBool,
  sortSmokeLogEntriesDesc
};

import { AsyncStorage } from 'react-native';

const SmokeLogKey = '@SmokeLess:smokes';

const SmokeLogKeys = [ SmokeLogKey ];

type SmokeLogEntry = {
  timestamp: Date;
  cheated: boolean;
};

const fetchSmokeLogEntries = async () : Promise<SmokeLogEntry[]> => {
  let logs = [];

  try {
    let logsJson = await AsyncStorage.getItem(SmokeLogKey);
    if (logsJson) {
      logs = JSON.parse(logsJson);

      if (!logs) {
        logs = [];
      }
    }
  } catch (error) {
    console.error('Error fetching smoke log entries', error);
  }

  return logs;
}

const createSmokeLogEntry = async (smokeDateTime:Date, cheated:boolean) : Promise<void> => {
  let logs = await fetchSmokeLogEntries();
  logs.push({ timestamp: smokeDateTime, cheated });
  
  try {
    await AsyncStorage.setItem(SmokeLogKey, JSON.stringify(logs));
  } catch (error) {
    console.error('Error logging smoke:', smokeDateTime, error);
  }
}

const fetchLastSmokeDateTime = async () : Promise<Date> => {
  let lastSmokeDateTime = new Date();

  try {
    let logs = await fetchSmokeLogEntries();
    let latestLogEntry = logs[logs.length - 1];
    if (latestLogEntry) {
      lastSmokeDateTime = latestLogEntry.timestamp;
    }
    
  } catch (error) {
    console.error('Error fetching last smoke datetime', error);
  }

  return lastSmokeDateTime;
}

const resetSmokeLog = async () => {
  try {
    await AsyncStorage.multiRemove(SmokeLogKeys);
  } catch (error) {
    console.error('Error resetting smoke log:', error);
  }
}

export {
  fetchLastSmokeDateTime,
  fetchSmokeLogEntries,
  createSmokeLogEntry,
  resetSmokeLog
}

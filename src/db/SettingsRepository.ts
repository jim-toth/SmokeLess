import { AsyncStorage } from 'react-native';

type Settings = {
  durationIncrease?: string;
  durationBetweenSmokes?: string;
}

const updateSettings = async (settings:Settings) => {
  try {
    if (settings.durationIncrease) {
      await AsyncStorage.setItem('@SmokeLess:settings:durationIncrease', settings.durationIncrease);
    }
    if (settings.durationBetweenSmokes) {
      await AsyncStorage.setItem('@SmokeLess:settings:durationBetweenSmokes', settings.durationBetweenSmokes);
    }
  } catch (error) {
    console.error('Error saving settings:', settings, error);
  }
}

const fetchSettings = async () : Promise<Settings> => {
  try {
    let durationIncrease = await AsyncStorage.getItem('@SmokeLess:settings:durationIncrease');
    let durationBetweenSmokes = await AsyncStorage.getItem('@SmokeLess:settings:durationBetweenSmokes');
    return {
      durationIncrease: durationIncrease !== null ? durationIncrease : undefined,
      durationBetweenSmokes: durationBetweenSmokes !== null ? durationBetweenSmokes : undefined
    };
  } catch (error) {
    console.error('Error fetching settings', error);
  }

  return {};
}

export {
  updateSettings,
  fetchSettings
}

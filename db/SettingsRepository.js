import {AsyncStorage} from 'react-native';

const updateSettings = async (settings) => {
  try {
    await AsyncStorage.setItem('@SmokeLess:settings:durationIncrease', settings.durationIncrease);
    await AsyncStorage.setItem('@SmokeLess:settings:durationBetweenSmokes', settings.durationBetweenSmokes);
  } catch (error) {
    console.error('Error saving settings', error);
  }
}

const fetchSettings = async (settings) => {
  try {
    const settings = {
      durationIncrease: await AsyncStorage.getItem('@SmokeLess:settings:durationIncrease'),
      durationBetweenSmokes: await AsyncStorage.getItem('@SmokeLess:settings:durationBetweenSmokes')
    };

    if (settings !== null) {
      return settings;
    }
  } catch (error) {
    console.error('Error fetching settings', error);
    return null;
  }
}

export {
  updateSettings,
  fetchSettings
}

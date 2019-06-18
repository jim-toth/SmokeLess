import { AsyncStorage } from 'react-native';

type Settings = {
  durationIncrease?: string;
  durationBetweenSmokes?: string;
}

const SettingsDurationIncreaseKey = '@SmokeLess:settings:durationIncrease';
const SettingsDurationKey = '@SmokeLess:settings:durationBetweenSmokes';

const SettingsKeys = [ SettingsDurationIncreaseKey, SettingsDurationKey ];

const updateSettings = async (settings:Settings) => {
  try {
    if (settings.durationIncrease) {
      await AsyncStorage.setItem(SettingsDurationIncreaseKey, settings.durationIncrease);
    }
    if (settings.durationBetweenSmokes) {
      await AsyncStorage.setItem(SettingsDurationKey, settings.durationBetweenSmokes);
    }
  } catch (error) {
    console.error('Error saving settings:', settings, error);
  }
}

const fetchSettings = async () : Promise<Settings> => {
  try {
    let durationIncrease = await AsyncStorage.getItem(SettingsDurationIncreaseKey);
    let durationBetweenSmokes = await AsyncStorage.getItem(SettingsDurationKey);
    return {
      durationIncrease: durationIncrease !== null ? durationIncrease : undefined,
      durationBetweenSmokes: durationBetweenSmokes !== null ? durationBetweenSmokes : undefined
    };
  } catch (error) {
    console.error('Error fetching settings', error);
  }

  return {};
}

const resetSettings = async () => {
  try {
    await AsyncStorage.multiRemove(SettingsKeys);
  } catch (error) {
    console.error('Error resetting settings:', error);
  }
}

export {
  updateSettings,
  fetchSettings,
  resetSettings
}

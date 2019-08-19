import AsyncStorage from '@react-native-community/async-storage';

import { boolToIntString, intStringToBool } from '../util/helpers';

type Settings = {
  durationIncrease?: number;
  durationBetweenSmokes?: number;
}

const SettingsDurationIncreaseKey = '@SmokeLess:settings:durationIncrease';
const SettingsDurationKey = '@SmokeLess:settings:durationBetweenSmokes';
const SettingsWelcomeCompletedKey = '@SmokeLess:settings:welcomeCompleted';

const SettingsKeys = [
  SettingsDurationIncreaseKey,
  SettingsDurationKey,
  SettingsWelcomeCompletedKey
];

const updateWelcomeCompleted = async (welcomeCompleted:boolean) => {
  try {
    await AsyncStorage.setItem(SettingsWelcomeCompletedKey, boolToIntString(welcomeCompleted));
  } catch (error) {
    console.error('Error saving welcome completed flag:', welcomeCompleted, error);
  }
}

const updateSettings = async (settings:Settings) => {
  try {
    if (settings.durationIncrease) {
      await AsyncStorage.setItem(SettingsDurationIncreaseKey, settings.durationIncrease.toString());
    }
    if (settings.durationBetweenSmokes) {
      await AsyncStorage.setItem(SettingsDurationKey, settings.durationBetweenSmokes.toString());
    }
  } catch (error) {
    console.error('Error saving settings:', settings, error);
  }
}

const fetchWelcomeCompleted = async () : Promise<boolean> => {
  try {
    let welcomeCompleted = await AsyncStorage.getItem(SettingsWelcomeCompletedKey);

    if (welcomeCompleted !== null) {
      return intStringToBool(welcomeCompleted);
    }
  } catch (error) {
    console.error('Error fetching welcome completed flag:', error);
  }

  return false;
}

const fetchSettings = async () : Promise<Settings> => {
  try {
    let durationIncrease = await AsyncStorage.getItem(SettingsDurationIncreaseKey);
    let durationBetweenSmokes = await AsyncStorage.getItem(SettingsDurationKey);
    return {
      durationIncrease: durationIncrease !== null ? parseInt(durationIncrease) : undefined,
      durationBetweenSmokes: durationBetweenSmokes !== null ? parseInt(durationBetweenSmokes) : undefined
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
  resetSettings,
  updateWelcomeCompleted,
  fetchWelcomeCompleted
}

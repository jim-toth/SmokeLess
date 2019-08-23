import Config, { NativeConfig } from 'react-native-config';

let _config:NativeConfig = {};

for (let key of Object.keys(Config)) {
  if (Config[key] === "true") {
    _config[key] = true;
  } else if (Config[key] === "false") {
    _config[key] = false;
  } else {
    _config[key] = Config[key];
  }
}

export default { ..._config };

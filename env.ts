import { Constants } from "expo";

const ENV = {
  dev: {
    dev: true,
    enableAds: false,
    adMob: {
      afterSmokeAdId: 'ca-app-pub-3940256099942544/1033173712' // ADMOB TEST ID
    }
  },
  staging: {
    dev: false,
    enableAds: true,
    adMob: {
      afterSmokeAdId: 'ca-app-pub-3940256099942544/1033173712' // ADMOB TEST ID
    }
  },
  prod: {
    dev: false,
    enableAds: true,
    adMob: {
      afterSmokeAdId: 'ca-app-pub-5329539233531847/9594334162' // KelMoria ID
    }
  }
 };

 const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  } else {
    return ENV.dev;
  }
 };
 
 export default getEnvVars;

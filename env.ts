// import { Constants } from "expo";
// TODO -> fix this to not rely on expo library

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

 const getEnvVars = () => {
  // if (__DEV__ || !Constants.manifest) {
    return ENV.dev;
  // } else if (Constants.manifest && Constants.manifest.releaseChannel === 'staging') {
  //   return ENV.staging;
  // } else if (Constants.manifest && Constants.manifest.releaseChannel === 'prod') {
  //   return ENV.prod;
  // } else {
  //   return ENV.dev;
  // }
 };
 
 export default getEnvVars;

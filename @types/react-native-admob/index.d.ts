declare module 'react-native-admob' {
  export class AdMobInterstitial {
    static simulatorId: string;

    static setTestDevices: (deviceIds:string[]) => void;
    static setAdUnitID: (adUnitId:string) => void;
    static requestAd: () => Promise<void>;
    static showAd: () => Promise<void>;
  }
}

const constPaths = () => {
  const configs = {
    development: {
      API_URL: 'http://localhost:4000',
      WS_URL: 'wss://backend.stg.dronline.me',
      FIREBASE_API_KEY: 'AIzaSyBq_MsiXxx_J1FgXQUpPDEXbWMzVaFTLqc',
      FIREBASE_AUTH_DOMAIN: 'dronline-appunite.firebaseapp.com',
      FIREBASE_DATABSE_URL: 'https://dronline-appunite.firebaseapp.com',
      FIREBASE_PROJECT_ID: 'dronline-appunite',
      FIREBASE_STORAGE_BUCKET: 'dronline-appunite.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '309203489426',
      FIREBASE_PUBLIC_VAPID_KEY: 'BJPeOlPkPUXrhZInwYLtc-4HcuZyfrZddS8tBkF-TnIpFD-6tanSvmy_ce5vmdkF8sp3ik1zXXK8W49XZMYsidA'
    },

    testing: {
      API_URL: 'https://backend.stg.dronline.me',
      WS_URL: 'wss://backend.stg.dronline.me',
      FIREBASE_API_KEY: 'AIzaSyBq_MsiXxx_J1FgXQUpPDEXbWMzVaFTLqc',
      FIREBASE_AUTH_DOMAIN: 'dronline-appunite.firebaseapp.com',
      FIREBASE_DATABSE_URL: 'https://dronline-appunite.firebaseapp.com',
      FIREBASE_PROJECT_ID: 'dronline-appunite',
      FIREBASE_STORAGE_BUCKET: 'dronline-appunite.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '309203489426',
      FIREBASE_PUBLIC_VAPID_KEY: 'BJPeOlPkPUXrhZInwYLtc-4HcuZyfrZddS8tBkF-TnIpFD-6tanSvmy_ce5vmdkF8sp3ik1zXXK8W49XZMYsidA'
    },

    production: {
      API_URL: 'https://backend.dronline.me',
      WS_URL: 'wss://backend.dronline.me',
      FIREBASE_API_KEY: 'AIzaSyCMukeys0-Pyvv5bf5VDTQuYTUzPCC93CU',
      FIREBASE_AUTH_DOMAIN: 'dronline-221818.firebaseapp.com',
      FIREBASE_DATABSE_URL: 'https://dronline-221818.firebaseapp.com',
      FIREBASE_PROJECT_ID: 'dronline-221818',
      FIREBASE_STORAGE_BUCKET: 'dronline-221818.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '253819861912',
      FIREBASE_PUBLIC_VAPID_KEY: 'BLR5AOvlIEwpfcHIQuzvlEzOSz4PB_1rQPncWf4Rggipfkr1BKXNfJ9BJVXSY-7Kw8XfI1JbNGZTsAlLyI3tjQM'
    }
  };

  const defaults = (process.env.NODE_ENV in configs)
    ? configs[process.env.NODE_ENV]
    : configs.development;

  return window.ENV !== '$ENV'
    ? { ...defaults, ...JSON.parse(window.ENV) }
    : defaults;
};

export default constPaths();

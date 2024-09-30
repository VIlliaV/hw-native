import 'dotenv/config';

export default {
  expo: {
    name: 'hw-native',
    slug: 'hw-native',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      softwareKeyboardLayoutMode: 'pan',
      package: 'com.villiav.hwnative',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/Inter-Medium.ttf',
            './assets/fonts/Roboto-Bold.ttf',
            './assets/fonts/Roboto-Medium.ttf',
            './assets/fonts/Roboto-Regular.ttf',
          ],
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '1f34a6f1-a55d-4b92-9ada-1dd5748d1f9c',
      },
    },
  },
};

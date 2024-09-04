import { StyleSheet, Platform } from 'react-native';
import { color } from './color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: 16,
  },
  image: {
    position: 'relative',
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  bg_image: {
    flex: 1,
    position: 'relative',
  },
  popUp: {
    position: 'relative',
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlignVertical: 'bottom',
  },
  textInput: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    lineHeight: 19,
  },
  button: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    color: color.bg,
    backgroundColor: color.accent,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 35,
    color: color.primary,
    //? just for test:
    // ...Platform.select({
    //   ios: {
    //     fontSize: 30,
    //   },
    //   android: {
    //     fontFamily: "Roboto-Medium",
    //   },
    // }),
  },
  headerTitle: {
    color: color.primary,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.408,
  },

  subText: {
    color: color.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    fontStyle: 'normal',
  },
  positionCenter: ({ width, height }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width,
    height: height,
    transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }],
  }),
});

import ProfileScreen from '../screens/homeMainScreens/ProfileScreen';
import PostsScreen from '../screens/homeMainScreens/PostsScreen';
import CreatePostsScreen from '../screens/homeMainScreens/CreatePostsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsSVG from '../components/SVGComponents/PostsSVG';
import { color, styles } from '../style';
import CreatePostSVG from '../components/SVGComponents/CreatePostSVG';
import ProfileSVG from '../components/SVGComponents/ProfileSVG';
import { View } from 'react-native';
import ExitButton from '../components/buttons/ExitButton';
import BackButton from '../components/buttons/BackButton';

const Home = () => {
  const HomeTab = createBottomTabNavigator();

  return (
    <HomeTab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        headerStyle: {
          height: 88,
        },
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color }) => {
          const icons = {
            PostsScreen: PostsSVG,
            CreatePostsScreen: CreatePostSVG,
            ProfileScreen: ProfileSVG,
          };

          const IconName = icons[route.name] || PostsSVG;

          return (
            <View style={styleHome.tab(color)}>
              <IconName fill={color} />
            </View>
          );
        },
        tabBarStyle: {
          ...styleHome.tabBarStyle,
        },
        tabBarActiveTintColor: color.accent,
        tabBarInactiveTintColor: color.bg,
        tabBarShowLabel: false,
      })}
    >
      <HomeTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: 'Публікації',
          headerRight: () => <ExitButton />,
        }}
      />
      <HomeTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          tabBarStyle: {
            position: 'absolute',
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            border: 0,
            overflow: 'hidden',
          },
          headerLeft: () => <BackButton />,
        }}
      />
      <HomeTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeTab.Navigator>
  );
};

export default Home;

const styleHome = {
  tab: color => ({
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: color,
  }),
  tabBarStyle: {
    height: 83,
  },
};

import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsSVG from "../../components/SVGComponents/PostsSVG";
import { color } from "../../style/color";
import CreatePostSVG from "../../components/SVGComponents/CreatePostSVG";
import ProfileSVG from "../../components/SVGComponents/ProfileSVG";
import { View, Text } from "react-native";
import { styles } from "../../style/styles";
import ExitButton from "../../components/buttons/ExitButton";
import BackButton from "../../components/buttons/BackButton";

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
        headerTitleAlign: "center",
        tabBarIcon: ({ color }) => {
          let IconName;
          if (route.name === "PostsScreen") {
            IconName = PostsSVG;
          } else if (route.name === "CreatePostsScreen") {
            IconName = CreatePostSVG;
          } else IconName = ProfileSVG;

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
          title: "Публікації",
          headerRight: () => <ExitButton />,
        }}
      />
      <HomeTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          // headerLeft: () => <BackButton />,
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
  tab: (color) => ({
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: color,
  }),
  tabBarStyle: {
    height: 83,
    shadowColor: "rgba(0, 0, 0, 0.30)",
    shadowOffset: { width: 0, height: -0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
};

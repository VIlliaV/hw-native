import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsSVG from "../../components/SVGComponents/PostsSVG";
import { color } from "../../style/color";
import CreatePostSVG from "../../components/SVGComponents/CreatePostSVG";
import ProfileSVG from "../../components/SVGComponents/ProfileSVG";

const Home = () => {
  const HomeTab = createBottomTabNavigator();
  return (
    <HomeTab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconName;
          if (route.name === "PostsScreen") {
            IconName = PostsSVG;
          } else if (route.name === "CreatePostsScreen") {
            IconName = CreatePostSVG;
          } else IconName = ProfileSVG;

          return <IconName fill={color} />;
        },
        tabBarActiveTintColor: color.accent,
        tabBarInactiveTintColor: color.bg,
        tabBarShowLabel: false,
      })}
    >
      <HomeTab.Screen name="PostsScreen" component={PostsScreen} />
      <HomeTab.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <HomeTab.Screen name="ProfileScreen" component={ProfileScreen} />
    </HomeTab.Navigator>
  );
};

export default Home;

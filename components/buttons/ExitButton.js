import { TouchableOpacity } from "react-native-gesture-handler";
import ExitSVG from "../SVGComponents/ExitSVG";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../utils/hooks/useAuth";

const ExitButton = () => {
  const { signOutUser } = useAuth();
  const navigation = useNavigation();

  const onPress = () => {
    signOutUser();
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 16 }}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <ExitSVG />
    </TouchableOpacity>
  );
};

export default ExitButton;

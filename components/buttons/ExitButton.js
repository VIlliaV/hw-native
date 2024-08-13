import { TouchableOpacity } from "react-native-gesture-handler";
import ExitSVG from "../SVGComponents/ExitSVG";
import { useNavigation } from "@react-navigation/native";

const ExitButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 16 }}
      activeOpacity={0.6}
      onPress={() => navigation.navigate("Login")}
    >
      <ExitSVG />
    </TouchableOpacity>
  );
};

export default ExitButton;

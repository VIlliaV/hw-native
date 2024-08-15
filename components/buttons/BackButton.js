import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native-gesture-handler";
import BackSVG from "../SVGComponents/BackSVG";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 16 }}
      activeOpacity={0.6}
      onPress={() => navigation.goBack()}
    >
      <BackSVG />
    </TouchableOpacity>
  );
};

export default BackButton;

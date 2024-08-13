import { View, TouchableOpacity, Text, Platform } from "react-native";
import { styles } from "../style/styles";
import { color } from "../style/color";
import AddSVG from "./SVGComponents/AddSVG";
import DeleteSVG from "./SVGComponents/DeleteSVG";
import { useState } from "react";

const ProfileBox = ({ route, children }) => {
  const [isAvatarAdd, setIsAvatarAdd] = useState(false);
  return (
    <View style={styles.popUp}>
      {route.name !== "Login" && (
        <View style={styleProfileBox.avatarBox}>
          <View style={styleProfileBox.buttonAvatar(isAvatarAdd)}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setIsAvatarAdd(!isAvatarAdd)}
            >
              {!isAvatarAdd ? (
                <AddSVG fill={color.accent} bg={color.bg} />
              ) : (
                <DeleteSVG
                  fill={color.placeholder}
                  bg={color.bg}
                  border={color.border}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Text style={styleProfileBox.titleAuth(route.name)}>
        {route.name !== "Login" ? "Реєстрація" : "Увійти"}
      </Text>
      <>{children}</>
    </View>
  );
};

export default ProfileBox;

const styleProfileBox = {
  avatarBox: {
    backgroundColor: color.bg_secondary,
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
    borderRadius: 16,
    transform: [{ translateX: -60 }],
    zIndex: 1,
  },
  buttonAvatar: (isAvatarAdd) => ({
    position: "absolute",
    bottom: isAvatarAdd ? 8 : 14,
    right: isAvatarAdd ? -18 : -13,
  }),
  titleAuth: (routeName) => ({
    ...styles.title,
    marginBottom: 32,
    marginTop: routeName !== "Login" ? 92 : 32,
  }),
};

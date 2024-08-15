import { Text, View } from "react-native";
import CommentSVG from "../SVGComponents/CommentSVG";
import { styles } from "../../style/styles";
import { color } from "../../style/color";
import LikeSVG from "../SVGComponents/LikeSVG";

const Social = ({ amount = 5, social = "comment" }) => {
  const socialIcon = {
    comment: CommentSVG,
    like: LikeSVG,
  };

  const IconName = socialIcon[social];

  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <IconName amount={amount} />
      <Text
        style={{
          ...styles.text,
          textAlignVertical: "none",
          color: amount > 0 ? color.primary : color.placeholder,
        }}
      >
        {amount}
      </Text>
    </View>
  );
};

export default Social;

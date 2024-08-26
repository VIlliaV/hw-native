import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeadContainer from "../../components/HeadContainer";
import postPhoto from "../../assets/image/postPhoto.jpg";
import { styles } from "../../style/styles";
import { formatDate } from "../../utils/formatDate";
import { color } from "../../style/color";
import avatar from "../../assets/image/avatarImage.jpg";
import { useState } from "react";
import SendSVG from "../../components/SVGComponents/SendSVG";

const jsonCommentsData = require("../../base/comments.json");

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  const { comments } = jsonCommentsData;

  const sendComment = () => {
    Keyboard.dismiss();
  };

  return (
    <HeadContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : -140}
      >
        <FlatList
          data={comments}
          style={{ minHeight: "100%" }}
          ListFooterComponent={
            <View style={{ height: 50, marginBottom: 34 }}></View>
          }
          ListHeaderComponent={
            <Image
              source={postPhoto}
              resizeMode="cover"
              style={{
                ...styles.image,
                marginBottom: 32,
              }}
            />
          }
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection:
                  item.holderComment === "email@example.com"
                    ? "row-reverse"
                    : "row",
                ...styleComments.flatItem,
              }}
            >
              <Image
                source={avatar}
                resizeMode="cover"
                style={{ ...styleComments.avatar }}
              />

              <View style={{ ...styleComments.commentBox }}>
                <Text style={{ ...styleComments.commentText }}>
                  {item.comment}
                </Text>
                <Text
                  style={{
                    ...styleComments.commentDate,
                    textAlign:
                      item.holderComment === "email@example.com" ? "" : "right",
                  }}
                >
                  {formatDate(item.dateComment)}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={{ ...styleComments.sendBox }}>
          <TextInput
            placeholder="Коментувати..."
            placeholderTextColor={color.placeholder}
            value={comment}
            onChangeText={(value) => setComment(value)}
            multiline={true}
            textAlignVertical="top"
            // onSubmitEditing={sendComment}
            style={{ ...styleComments.sendInput }}
          />
          <TouchableOpacity
            style={{ ...styleComments.sendSVG }}
            activeOpacity={0.6}
            onPress={sendComment}
          >
            <SendSVG />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </HeadContainer>
  );
};

export default CommentsScreen;

const styleComments = {
  flatItem: {
    gap: 16,
    display: "flex",
    marginBottom: 24,
  },

  avatar: { borderRadius: 28, width: 28, height: 28 },
  commentBox: {
    flex: 1,
    padding: 16,
    backgroundColor: " rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentText: {
    color: color.primary,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    color: color.placeholder,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
  },

  sendBox: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: color.bg,
    paddingBottom: 34,
    zIndex: 100,
    overflow: "hidden",
  },

  sendInput: {
    width: "100%",
    maxHeight: 100,
    padding: 16,
    paddingRight: 50,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: color.primary,
    borderColor: color.placeholder,
    borderWidth: 1,
    lineHeight: 19,
    borderRadius: 50,
    overflow: "hidden",
  },

  sendSVG: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -17 }],
  },
};

const inputCommentProps = {
  placeholder: "Коментувати...",
  placeholderTextColor: color.placeholder,
  autoCapitalize: "none",
  autoComplete: Platform.OS === "ios" ? "nickname" : "username-new",
  textContentType: "nickname",
  clearButtonMode: "always",
  contextMenuHidden: true,
};

import {
  Button,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HeadContainer from "../../components/HeadContainer";
import postPhoto from "../../assets/image/postPhoto.jpg";
import { styles } from "../../style/styles";
import { formatDate } from "../../utils/formatDate";
import { color } from "../../style/color";
import avatar from "../../assets/image/avatarImage.jpg";
import { useEffect, useState } from "react";

const jsonCommentsData = require("../../base/comments.json");

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  const { comments } = jsonCommentsData;

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
            <View
              style={{
                height: 50,
                marginBottom: 34,
              }}
            ></View>
          }
          ListHeaderComponent={
            <Image
              source={postPhoto}
              resizeMode="cover"
              style={{
                ...styles.image,
                borderRadius: 8,
                width: "100%",
                // height: 240,
                marginBottom: 32,
              }}
            />
          }
          renderItem={({ item }) => (
            <View
              style={{
                gap: 16,
                display: "flex",
                flexDirection:
                  item.holderComment === "email@example.com"
                    ? "row-reverse"
                    : "row",
                marginBottom: 24,
              }}
            >
              <Image
                source={avatar}
                resizeMode="cover"
                style={{
                  borderRadius: 28,
                  width: 28,
                  height: 28,
                }}
              />

              <View
                style={{
                  backgroundColor: " rgba(0, 0, 0, 0.03)",
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                  borderBottomLeftRadius: 6,
                  padding: 16,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: color.primary,
                    fontFamily: "Roboto-Regular",
                    fontSize: 13,
                    lineHeight: 18,
                    marginBottom: 8,
                  }}
                >
                  {item.comment}
                </Text>
                <Text
                  style={{
                    color: color.placeholder,
                    fontFamily: "Roboto-Regular",
                    fontSize: 10,
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
        {/* </View> */}

        <View
          style={{
            width: "100%",
            // styleAuth.passwordBox
            // borderWidth: 1,
            position: "absolute",
            bottom: 0,
            // left: "50%",
            // transform: [{ translateX: -35 }],

            // height: 50,
            // borderRadius: 20,
            backgroundColor: color.bg,
            // marginBottom: 34,
            paddingBottom: 34,
            // alignItems: "center",
            zIndex: 100,
          }}
        >
          <TextInput
            // {...inputPasswordProps}
            // secureTextEntry={isPasswordHide}
            placeholder="Коментувати..."
            placeholderTextColor={color.placeholder}
            value={comment}
            onChangeText={(value) => setComment(value)}
            // onFocus={() => {
            //   setInputOnFocus(inputPasswordProps.placeholder);
            // }}
            // onBlur={() => {
            //   setInputOnFocus(null);
            // }}
            onSubmitEditing={Keyboard.dismiss}
            style={{
              // ...styleAuth.inputAuth({
              //   inputOnFocus,
              //   type: inputPasswordProps.placeholder,
              // }),
              width: "100%",
              padding: 16,
              // marginBottom: 16,
              fontFamily: "Inter-Medium",
              fontSize: 16,
              color: color.primary,
              borderColor: color.placeholder,
              borderWidth: 1,
              lineHeight: 19,
              // marginBottom: 15,
              height: 50,
              borderRadius: 50,
            }}
          />
          {/* <TouchableOpacity
            style={
              {
                // styleAuth.showPassword
              }
            }
            activeOpacity={0.6}
          >
            <Text
              onPress={() => {}}
              style={{ ...styles.text, color: color.secondary }}
            >
              текст
            </Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </HeadContainer>
  );
};

export default CommentsScreen;

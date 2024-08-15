// import { Image, Text, View } from "react-native";
import HeadContainer from "../../components/HeadContainer";
import Post from "../../components/Posts/Post";
import PostHolder from "../../components/Posts/PostHolder";

const PostsScreen = () => {
  return (
    <HeadContainer>
      <PostHolder />
      <Post />
    </HeadContainer>
  );
};

export default PostsScreen;

const stylePosts = {};

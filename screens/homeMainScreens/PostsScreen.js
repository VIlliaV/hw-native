// import { Image, Text, View } from "react-native";
import HeadContainer from "../../components/HeadContainer";
import Post from "../../components/posts/Post";
import PostHolder from "../../components/posts/PostHolder";

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

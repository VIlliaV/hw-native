import HeadContainer from "../../components/HeadContainer";
import PostHolder from "../../components/posts/PostHolder";
import Post from "../../components/posts/Post";

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

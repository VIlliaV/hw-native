import HeadContainer from "../../components/HeadContainer";
import PostHolder from "../../components/post/PostHolder";
import PostList from "../../components/post/PostList";

const PostsScreen = () => {
  return (
    <HeadContainer>
      <PostHolder />
      <PostList />
    </HeadContainer>
  );
};

export default PostsScreen;

const stylePosts = {};

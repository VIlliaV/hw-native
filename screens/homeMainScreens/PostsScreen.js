import HeadContainer from "../../components/HeadContainer";
import PostHolder from "../../components/posts/PostHolder";
import PostList from "../../components/posts/PostList";

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

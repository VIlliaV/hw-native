import { FlatList } from "react-native";

import Post from "./Post";

const jsonData = require("../../base/posts.json");

const PostList = ({ showCity = true }) => {
  const { posts } = jsonData;

  return (
    <FlatList
      data={posts}
      // style={{ marginTop: 100 }}
      renderItem={({ item }) => <Post item={item} showCity={showCity} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PostList;
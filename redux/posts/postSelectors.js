export const selectPosts = state => state.posts.posts;
export const selectPostsError = state => state.posts.postError;
export const selectPostsOwners = state => state.posts.postsOwners;
export const selectIsLoadingPostsOwners = state => state.posts.isLoading.postsOwners;
export const selectIsLoadingPosts = state => state.posts.isLoading.posts;
export const selectIsLoadingComments = state => state.posts.isLoadingComments;

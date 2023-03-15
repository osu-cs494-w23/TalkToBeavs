import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setAllPosts: (state, action) => {
            state.posts = action.payload
        },
        upvotePost: (state, action) => {
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id
            )
            if (index !== -1) {
                state.posts[index].rating += 1
                // TODO:
                // update the state.posts[index].rating += 1 in the MongoDB right here
            }
        },
        downvotePost: (state, action) => {
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id
            )
            if (index !== -1) {
                state.posts[index].rating -= 1
                // TODO:
                // update the state.posts[index].rating -= 1 in the MongoDB right here
            }
        },
    },
    setAllPosts: (state, action) => {
      state.posts = action.payload;
    },
    upvotePost: (state, action) => {
      console.log(action.payload)
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index].rating += 1;
        // TODO:
        // update the state.posts[index].rating += 1 in the MongoDB right here
      }
    },
    downvotePost: (state, action) => {
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index].rating -= 1;
        // TODO:
        // update the state.posts[index].rating -= 1 in the MongoDB right here
      }
    },
  },
);

export const { addPost, setAllPosts, upvotePost, downvotePost } =
    feedSlice.actions

export const selectAllPosts = (state) => state.posts

export default feedSlice.reducer

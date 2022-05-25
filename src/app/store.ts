import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user-detail/userSlice'
import fileSlice from '../features/image-list/fileSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    files: fileSlice,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
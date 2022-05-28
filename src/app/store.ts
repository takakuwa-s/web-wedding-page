import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user-detail/userSlice'
import fileSlice from '../features/image-list/fileSlice'
import adminUserSlice from '../features/admin-users/adminUsersSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    files: fileSlice,
    adminUsers: adminUserSlice,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
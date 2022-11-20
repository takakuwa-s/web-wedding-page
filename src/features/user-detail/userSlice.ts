import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initUser, User } from '../../common/dto/user'

// Define a type for the slice state
interface UserState {
  user: User
  fetched: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  user: initUser(),
  fetched: false,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUserAndFetched: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.fetched = action.payload.fetched;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, updateUserAndFetched } = userSlice.actions

export default userSlice.reducer
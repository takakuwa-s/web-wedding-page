import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initUser, User } from '../../common/dto/user'

// Define a type for the slice state
interface UserState {
  val: User
}

// Define the initial state using that type
const initialState: UserState = {
  val: initUser(),
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUser: (state, action: PayloadAction<User>) => {
      state.val = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../common/dto/user';

// Define a type for the slice state
interface AdminUserState {
  val: User[],
  searchParam: string
}

// Define the initial state using that type
const initialState: AdminUserState = {
  val: [],
  searchParam: ",",
}

export const adminUserSlice = createSlice({
  name: 'adminUsers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateAdminUsers: (state, action: PayloadAction<User[]>) => {
      state.val = action.payload;
    },
    patchAdminUsers: (state, action: PayloadAction<{id: string, field: string, val: any}>) => {
      state.val = state.val.map(u => {
        if (u.id === action.payload.id) {
          u[action.payload.field] = action.payload.val;
        }
        return u;
      });
    },
    updateSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateAdminUsers, patchAdminUsers, updateSearchParam } = adminUserSlice.actions

export default adminUserSlice.reducer
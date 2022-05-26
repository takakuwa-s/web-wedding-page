import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { File } from "./../../common/dto/file";

// Define a type for the slice state
interface FileState {
  reload: boolean;
  val: File[]
}

// Define the initial state using that type
const initialState: FileState = {
  reload: false,
  val: [],
}

export const fileSlice = createSlice({
  name: 'file',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFiles: (state, action: PayloadAction<File[]>) => {
      state.val = action.payload;
      state.reload = false;
    },
    updateReload: (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateFiles, updateReload} = fileSlice.actions

export default fileSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { File } from "./../../common/dto/file";

// Define a type for the slice state
interface FileState {
  reload: boolean;
  all: File[]
  my: File[]
  rank: File[]
}

// Define the initial state using that type
const initialState: FileState = {
  reload: false,
  all: [],
  my: [],
  rank: [],
}

export const fileSlice = createSlice({
  name: 'file',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFilesForAll: (state, action: PayloadAction<File[]>) => {
      state.all = action.payload;
      state.reload = false;
    },
    updateFilesForMy: (state, action: PayloadAction<File[]>) => {
      state.my = action.payload;
    },
    updateFilesForRank: (state, action: PayloadAction<File[]>) => {
      state.rank = action.payload;
    },
    updateReload: (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateFilesForAll, updateFilesForMy, updateFilesForRank, updateReload} = fileSlice.actions

export default fileSlice.reducer
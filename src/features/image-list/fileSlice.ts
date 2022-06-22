import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { File } from "./../../common/dto/file";

// Define a type for the slice state
interface FileState {
  files: File[],
  alertMsg: string,
}

// Define the initial state using that type
const initialState: FileState = {
  files: [],
  alertMsg: "",
}

export const fileSlice = createSlice({
  name: 'file',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    updateAlertMsg: (state, action: PayloadAction<string>) => {
      state.alertMsg = action.payload;
    },
    updateFilesAndAlertMsg: (state, action: PayloadAction<FileState>) => {
      state.files = action.payload.files;
      state.alertMsg = action.payload.alertMsg;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateFiles, updateAlertMsg, updateFilesAndAlertMsg } = fileSlice.actions

export default fileSlice.reducer
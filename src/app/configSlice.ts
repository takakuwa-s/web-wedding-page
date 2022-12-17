import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Config, initConfig } from '../common/dto/config'

// Define a type for the slice state
interface ConfigState {
  config: Config
  fetched: boolean
}

// Define the initial state using that type
const initialState: ConfigState = {
  config: initConfig(),
  fetched: false,
}

export const configSlice = createSlice({
  name: 'config',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateConfigAndFetched: (state, action: PayloadAction<ConfigState>) => {
      state.config = action.payload.config;
      state.fetched = action.payload.fetched;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateConfigAndFetched } = configSlice.actions

export default configSlice.reducer
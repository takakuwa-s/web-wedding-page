import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface informationPanelState {
  show: boolean;
  id: string;
}

// Define the initial state using that type
const initialState: informationPanelState = {
  show: false,
  id: ""
}

export const informationPanelSlice = createSlice({
  name: 'informationPanelSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    switchShow: state => {
      state.show = !state.show;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { switchShow, setShow, setId } = informationPanelSlice.actions

export default informationPanelSlice.reducer
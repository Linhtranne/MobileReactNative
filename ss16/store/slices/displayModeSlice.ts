import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DisplayMode = 'list' | 'grid';

interface DisplayModeState {
  mode: DisplayMode;
}

const initialState: DisplayModeState = {
  mode: 'list',
};

const displayModeSlice = createSlice({
  name: 'displayMode',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<DisplayMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'list' ? 'grid' : 'list';
    },
  },
});

export const { setMode, toggleMode } = displayModeSlice.actions;
export default displayModeSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RandomListState {
  numbers: number[];
}

const initialState: RandomListState = {
  numbers: [],
};

function generateRandomList(length = 10, min = 1, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

const randomListSlice = createSlice({
  name: 'randomList',
  initialState,
  reducers: {
    generate: (state, action: PayloadAction<{ length?: number; min?: number; max?: number }>) => {
      const { length = 10, min = 1, max = 100 } = action.payload || {};
      state.numbers = generateRandomList(length, min, max);
    },
    clear: (state) => {
      state.numbers = [];
    },
  }, 
});

export const { generate, clear } = randomListSlice.actions;
export default randomListSlice.reducer;

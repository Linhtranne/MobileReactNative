import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: number;
  name: string;
  liked: boolean;
  likes: number;
}

interface FavoriteAccountsState {
  accounts: Account[];
}

const initialState: FavoriteAccountsState = {
  accounts: [
    { id: 1, name: 'Nguyễn Văn A', liked: false, likes: 0 },
    { id: 2, name: 'Trần Thị B', liked: false, likes: 0 },
    { id: 3, name: 'Lê Văn C', liked: false, likes: 0 },
    { id: 4, name: 'Phạm Thị D', liked: false, likes: 0 },
  ],
};

const favoriteAccountsSlice = createSlice({
  name: 'favoriteAccounts',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const acc = state.accounts.find(a => a.id === action.payload);
      if (acc) {
        acc.liked = !acc.liked;
        acc.likes += acc.liked ? 1 : -1;
        if (acc.likes < 0) acc.likes = 0;
      }
    },
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const { toggleLike, setAccounts } = favoriteAccountsSlice.actions;
export default favoriteAccountsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import positionsReducer from './slices/positionsSlice';
import counterReducer from './slices/counterSlice';
import randomListReducer from './slices/randomListSlice';
import displayModeReducer from './slices/displayModeSlice';
import favoriteAccountsReducer from './slices/favoriteAccountsSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    positions: positionsReducer,
    counter: counterReducer,
    randomList: randomListReducer,
    displayMode: displayModeReducer,
  favoriteAccounts: favoriteAccountsReducer,
  language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

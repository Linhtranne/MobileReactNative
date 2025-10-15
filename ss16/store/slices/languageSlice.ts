import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'vi';

interface LanguageState {
  lang: Language;
}

const initialState: LanguageState = {
  lang: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
    },
    toggleLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'vi' : 'en';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;

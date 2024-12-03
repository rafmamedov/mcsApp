import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

// Створення slice для користувача
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

// Експорт дій для використання у компонентах
export const { setUserInfo, clearUserInfo } = userSlice.actions;

// Експорт ред'юсера для підключення до Store
export default userSlice.reducer;

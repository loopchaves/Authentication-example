import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  name: '',
  email: '',
  emailVerified: true,
  creationDate: '',
  lastLogin: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setEmail: (state, action) => { state.email = action.payload },
    confirmEmail: (state) => { state.emailVerified = true },
    addUser: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.creationDate = action.payload.creationDate;
      state.lastLogin = action.payload.lastLogin;
    },
    removeUser: (state) => {
      state.uid = '';
      state.name = '';
      state.email = '';
      state.emailVerified = true;
      state.creationDate = '';
      state.lastLogin = '';
    }
  }
});

export const { setName, setEmail, confirmEmail, addUser, removeUser } = userSlice.actions;

export const getUid = (state) => state.user.uid;
export const getName = (state) => state.user.name;
export const getEmail = (state) => state.user.email;
export const getEmailVerified = (state) => state.user.emailVerified;
export const getCreationDate = (state) => state.user.creationDate;
export const getLastLogin = (state) => state.user.lastLogin;
export const getUser = (state) => state.user;

export default userSlice.reducer;

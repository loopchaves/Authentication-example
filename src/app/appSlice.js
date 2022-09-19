import { auth } from "../firebaseCfg";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode
} from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  language: 'en',
  alert: undefined,
  user: undefined
}

const userPattern = (currentUser) => {
  return {
    uid: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    emailVerified: currentUser.emailVerified,
    creationDate: new Date(parseInt(currentUser.metadata.createdAt)).toLocaleString(),
    lastLogin: new Date(parseInt(currentUser.metadata.lastLoginAt)).toLocaleString()
  }
}

export const checkUser = createAsyncThunk(
  'app/checkUser',
  async () => {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        currentUser ? resolve(userPattern(currentUser)) : resolve();
      });
    });
    return user;
  }
);

export const tryLogin = createAsyncThunk(
  'app/tryLogin',
  async (values) => {
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    return userPattern(userCredential.user);
  }
);

export const trySignup = createAsyncThunk(
  'app/trySignup',
  async (values) => {
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(userCredential.user, { displayName: values.name });
    await sendEmailVerification(userCredential.user);
    return userPattern(userCredential.user);
  }
);

export const verifyPasswordCode = createAsyncThunk(
  'app/verifyPasswordCode',
  async (actionCode) => {
    const email = await verifyPasswordResetCode(auth, actionCode);
    return email;
  }
);

export const tryPasswordReset = createAsyncThunk(
  'app/tryPasswordReset',
  async (values) => {
    await confirmPasswordReset(auth, values.actionCode, values.newPassword);
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.newPassword);
    return userPattern(userCredential.user);
  }
);

export const verifyEmailCode = createAsyncThunk(
  'app/verifyEmailCode',
  async (actionCode) => {
    await applyActionCode(auth, actionCode);
    await auth.currentUser?.reload();
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },
    setAlert: (state, action) => { state.alert = action.payload },
    setUserName: (state, action) => { state.user.name = action.payload },
    setUserEmail: (state, action) => { state.user.email = action.payload },
    setUser: (state, action) => { state.user = action.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => { state.loading = true })
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action.payload) state.user = action.payload;
        state.loading = false;
      });

    builder
      .addCase(tryLogin.pending, (state) => { state.loading = true })
      .addCase(tryLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(tryLogin.rejected, (state, action) => {
        state.loading = false;
        state.alert = { msg: action.error.code, type: 'error' }
      });

    builder
      .addCase(trySignup.pending, (state) => { state.loading = true })
      .addCase(trySignup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(trySignup.rejected, (state, action) => {
        state.loading = false;
        state.alert = { msg: action.error.code, type: 'error' }
      });

    builder
      .addCase(verifyPasswordCode.pending, (state) => { state.loading = true })
      .addCase(verifyPasswordCode.fulfilled, (state) => { state.loading = false })
      .addCase(verifyPasswordCode.rejected, (state, action) => {
        state.loading = false;
        state.alert = { msg: action.error.code, type: 'error' }
      });

    builder
      .addCase(tryPasswordReset.pending, (state) => { state.loading = true })
      .addCase(tryPasswordReset.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.alert = { msg: 'updatePassword', type: 'notice' }
      })
      .addCase(tryPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.alert = { msg: action.error.code, type: 'error' }
      })

    builder
      .addCase(verifyEmailCode.pending, (state) => { state.loading = true })
      .addCase(verifyEmailCode.fulfilled, (state) => {
        state.loading = false;
        state.alert = { msg: 'emailVerified', type: 'notice' }
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.loading = false;
        state.alert = { msg: action.error.code, type: 'error' }
      });
  }
});

export const {
  setLoading,
  setLanguage,
  setAlert,
  setUserName,
  setUserEmail,
  setUser
} = appSlice.actions;

export const getLoading = (state) => state.app.loading;
export const getLanguage = (state) => state.app.language;
export const getAlert = (state) => state.app.alert;
export const getUser = (state) => state.app.user;
export const getEmailVerified = (state) => state.app.user.emailVerified;

export default appSlice.reducer;

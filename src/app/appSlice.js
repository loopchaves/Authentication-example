import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handlerVerifyUser,
  handlerVerifyPasswordCode,
  handlerVerifyEmailCode,
  handlerTryLogin,
  handlerTryLogout,
  handlerTrySignup,
  handlerTryPasswordReset,
  handlerTrySendPasswordResetEmail,
  handlerTryEditUser
} from "./appModel";

const initialState = {
  loading: true,
  language: 'en',
  alert: null,
  user: null
}

const showError = (state, action) => {
  state.loading = false;
  state.alert = { msg: action.error.code, type: 'error' }
}

const showNotice = (state, notice) => {
  state.loading = false;
  state.alert = { msg: notice, type: 'notice' }
}

const submitForm = (state) => {
  state.alert = null;
  state.loading = true;
}

const changeUser = (state, action, notice) => {
  state.user = action.payload;
  if (!action.payload) state.loading = false;
  if (notice) state.alert = { msg: notice, type: 'notice' }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },
    setAlert: (state, action) => { state.alert = action.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.fulfilled, (state, action) => {
        if (!action.payload) state.loading = false;
        changeUser(state, action, null);
      })

      .addCase(verifyPasswordCode.fulfilled, (state) => { state.loading = false })
      .addCase(verifyPasswordCode.rejected, (state, action) => { showError(state, action) })

      .addCase(verifyEmailCode.fulfilled, (state) => { state.alert = { msg: 'emailVerified', type: 'notice' } })
      .addCase(verifyEmailCode.rejected, (state, action) => { showError(state, action) })

      .addCase(tryLogin.pending, (state) => { submitForm(state) })
      .addCase(tryLogin.fulfilled, (state, action) => { changeUser(state, action, null) })
      .addCase(tryLogin.rejected, (state, action) => { showError(state, action) })

      .addCase(tryLogout.pending, (state) => { submitForm(state) })
      .addCase(tryLogout.fulfilled, (state, action) => { changeUser(state, action, null) })
      .addCase(tryLogout.rejected, (state, action) => { showError(state, action) })

      .addCase(trySignup.pending, (state) => { submitForm(state) })
      .addCase(trySignup.fulfilled, (state, action) => { changeUser(state, action, null) })
      .addCase(trySignup.rejected, (state, action) => { showError(state, action) })

      .addCase(tryPasswordReset.pending, (state) => { submitForm(state) })
      .addCase(tryPasswordReset.fulfilled, (state, action) => { changeUser(state, action, 'updatePassword') })
      .addCase(tryPasswordReset.rejected, (state, action) => { showError(state, action) })

      .addCase(trySendPasswordResetEmail.pending, (state) => { submitForm(state) })
      .addCase(trySendPasswordResetEmail.fulfilled, (state) => { showNotice(state, 'verifyYourEmail'); })
      .addCase(trySendPasswordResetEmail.rejected, (state, action) => { showError(state, action) })

      .addCase(tryEditUser.pending, (state) => { submitForm(state) })
      .addCase(tryEditUser.fulfilled, (state, action) => { changeUser(state, action, 'profileEdited') })
      .addCase(tryEditUser.rejected, (state, action) => { showError(state, action) })
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

export const verifyUser = createAsyncThunk('app/verifyUser', () => handlerVerifyUser());
export const verifyPasswordCode = createAsyncThunk('app/verifyPasswordCode', (actionCode) => handlerVerifyPasswordCode(actionCode));
export const verifyEmailCode = createAsyncThunk('app/verifyEmailCode', (actionCode) => handlerVerifyEmailCode(actionCode));

export const tryLogin = createAsyncThunk('app/tryLogin', (values) => handlerTryLogin(values));
export const tryLogout = createAsyncThunk('app/tryLogout', () => handlerTryLogout());
export const trySignup = createAsyncThunk('app/trySignup', (values) => handlerTrySignup(values));
export const tryPasswordReset = createAsyncThunk('app/tryPasswordReset', (values) => handlerTryPasswordReset(values));
export const trySendPasswordResetEmail = createAsyncThunk('app/trySendPasswordResetEmail', (values) => handlerTrySendPasswordResetEmail(values));
export const tryEditUser = createAsyncThunk('app/tryEditUser', (values, initialValues) => handlerTryEditUser(values, initialValues));

export const getLoading = (state) => state.app.loading;

export default appSlice.reducer;

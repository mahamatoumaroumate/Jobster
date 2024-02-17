import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './userThunk'
export const registerUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
  }
)
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI)
  }
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI)
  }
)

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      removeUserFromLocalStorage()
      state.isSidebarOpen = false
      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Hello There ${user.name}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`User Updated`)
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})
export const { toggleSideBar, logoutUser } = userSlice.actions
export default userSlice.reducer

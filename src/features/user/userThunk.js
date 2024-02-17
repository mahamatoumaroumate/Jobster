import { customFetch } from '../../utils/axios'
import { clearAllJobsState } from '../alljobs/alljobsSlice'
import { clearInput } from '../job/jobSlice'
import { logoutUser } from './userSlice'
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message))
    thunkAPI.dispatch(clearAllJobsState())
    thunkAPI.dispatch(clearInput())
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

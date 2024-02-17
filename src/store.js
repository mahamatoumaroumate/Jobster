import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import jobSlice from './features/job/jobSlice'
import allJobsSlice from './features/alljobs/alljobsSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
})

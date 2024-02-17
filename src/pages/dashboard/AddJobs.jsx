import { FormRow, FormRowSelect } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearInput,
  createJob,
  handleChangeJob,
  editJob,
} from '../../features/job/jobSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
const AddJobs = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)
  const handleJobChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChangeJob({ name, value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('Please All The Fields')
      return
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      )
      return
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChangeJob({ name: 'jobLocation', value: user.location }))
    }
  }, [])
  return (
    <Wrapper>
      <form className='from'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobChange}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobChange}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobChange}
          />
          <FormRowSelect
            name='status'
            value={status}
            labelText='status'
            handleChange={handleJobChange}
            list={statusOptions}
          />
          <FormRowSelect
            name='jobType'
            value={jobType}
            labelText='jobType'
            handleChange={handleJobChange}
            list={jobTypeOptions}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearInput())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'submitting' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJobs

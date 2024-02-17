import { useEffect } from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { getAllJobs } from '../features/alljobs/alljobsSlice'
import PageContainer from './PageContainer'
const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchType,
    searchStatus,
    sort,
  } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center='center' />
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Job To Display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs}Job {jobs.length > 1 && 's'}Found{' '}
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageContainer />}
    </Wrapper>
  )
}
export default JobsContainer

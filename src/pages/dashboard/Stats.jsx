import { useEffect } from 'react'
import StatsContainer from '../../components/StatsContainer'
import ChartsContainer from '../../components/ChartsContainer'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/alljobs/alljobsSlice'
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showStats())
  }, [])
  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 1 && <ChartsContainer />}
    </>
  )
}
export default Stats

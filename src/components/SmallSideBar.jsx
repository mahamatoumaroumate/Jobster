import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar } from '../features/user/userSlice'
import NavLinks from './NavLinks'

const SmallSideBar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(toggleSideBar())
  }
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' onClick={toggle} className='close-btn'>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSideBar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSideBar

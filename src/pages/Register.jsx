import { useState, useEffect } from 'react'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, loginUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState(
    user
      ? { name: user.name, email: user.email, password: user.password }
      : initialState
  )
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields')
      return
    }
    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
  }
  const toggleIsMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              type='text'
              value={values.name}
              name='name'
              onChange={handleChange}
              className='form-input'
            />
          </div>
        )}
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            email
          </label>
          <input
            type='email'
            value={values.email}
            name='email'
            onChange={handleChange}
            className='form-input'
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            password
          </label>
          <input
            type='password'
            value={values.password}
            name='password'
            onChange={handleChange}
            className='form-input'
          />
        </div>
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'Submit'}
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {isLoading ? 'loading...' : 'Demo App'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet' : 'Already a member'}
          <button className='member-btn' type='button' onClick={toggleIsMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register

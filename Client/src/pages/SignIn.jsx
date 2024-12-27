import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInApi } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '~/redux/user/userSlice'
import OAuth from '~/components/OAuth'

function SignIn() {
  const [formData, setFormData] = useState({})
  // const [errorMessages, setErrorMessages] = useState(null)
  // const [loading, setLoading] = useState(false)
  const { loading, error: errorMessages } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required'))
    }
    try {
      dispatch(signInStart())
      const res = await signInApi(formData)
      if (!res) {
        dispatch(signInFailure('Invalid email or password'))
        return
      }
      if (res)
        dispatch(signInSuccess(res))
        navigate('/')
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(signInFailure(error.response.data.message))
      }
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Kiu's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            Welcome to Kiu's Blog. Here you can read about my thoughts on various topics.
          </p>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='Name@gmail.com' id='email' onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' className='w-full mt-5' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' /> 
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5' >
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'> Sign Up</Link>
          </div>
          {
            errorMessages && (
              <Alert color='failure' className='mt-5'>
                {errorMessages}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn
import React from 'react'

const Login = () => {
  return (
    <form className='login'>
        <h1>Login</h1>
        <input required type="text" placeholder='Username' />
        <input required type="password" name="" id="" placeholder='Password' />
        <button>Login</button>
    </form>
  )
}

export default Login
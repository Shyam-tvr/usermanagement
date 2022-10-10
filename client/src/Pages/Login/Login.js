import React, { useState } from 'react'
import{useNavigate} from 'react-router-dom'
import {isExpired} from 'react-jwt'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async(e)=>{

    e.preventDefault()                                     
    let res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    res = await res.json()
    console.log(res);
    if (res.error) {
      setError(res.error)
    } else if(res.user.role === 'admin' && res.token) {
      localStorage.setItem('user-token', res.token)
      navigate('/admin')
    } else if(res.user.role === 'user' && res.token) {
      localStorage.setItem('user-token', res.token)
      navigate('/')
    } else{
      navigate('/login')
    }
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control mt-1"
              onChange={(e)=>{setPassword(e.target.value) }}
              placeholder="Enter password"
            />
          </div>
          <p className='text-center text-danger mt-2'>{error}</p>
          <div className="d-grid gap-2 mt-3 mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
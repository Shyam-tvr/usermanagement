import React, { useState } from 'react'
import{useNavigate} from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const res =await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,password
      })
    })
    const status = await res.json()
    if(status.status){
      navigate('/login')
    }else if(status.error){
      setError(status.error)
    }
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="Text"
              value={name}
              className="form-control mt-1"
              onChange={(e)=>{setName(e.target.value);}}
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control mt-1"
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Password"
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

export default Signup

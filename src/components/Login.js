import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import userData from '../users/users.json'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors,setFormErrors] = useState({})
  const {userDispatch} = useContext(UserContext)
//   console.log(userData)

  const errors = {}
  const runValidation = ()=>{
    if(username.length === 0){
      errors.username = "*Username is required"
    }
    if(password.length === 0){
      errors.password = "*Password is required"
    }
    setFormErrors(errors)
    return errors
  }

  useEffect(()=>{
    (async()=>{
      JSON.parse(localStorage.getItem('user'))
    })()
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const errors = runValidation()
    if(Object.entries(errors).length===0){
        const user = userData.find(ele => ele.username ===username && ele.password === password)
        // console.log('user',user)
        if(user) {
            const formData = {
              id : user.id,
              username,
              password
            }
            userDispatch({type:'REGISTER_USER',payload: formData})
            localStorage.setItem('user',JSON.stringify({id:formData.id,name:formData.username}))
            const myVotes = JSON.parse(localStorage.getItem('votes'))
            userDispatch({type: 'GET_MY_VOTES',payload:myVotes})
            navigate('/dishes')
        }else {
            errors.username = 'Invalid Email or Password'
            errors.password = 'Invalid Email or Password'
        }
    }
    const user = JSON.parse(localStorage.getItem('user'))
    userDispatch({type:'GET_USER',payload:user})
  }
  return (
    <div className="container mt-5" style={{width:'500px'}}>
      <div className="card">
        <div className="card-header">
          <h4>Login Page</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label> <br/>
              <input
                type="text"
                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              {formErrors.username && (
                <div className="invalid-feedback">{formErrors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

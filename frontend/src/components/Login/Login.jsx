import React, {useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import axios from '../../config'
import Spinner from '../LoadingSpinner/LoadingSpinner'
import {setCookie, removeCookie} from '../../Utils/Cookie/Cookie';

function Login(props) {
  const [user, setUser]=useState('');
  const [password, setPassword]=useState('');
  const [err, setErr]=useState('')
  const {setLoginLoading, setLoginSuccess, setUserData, loginLoading, setCart}=props;
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoginLoading(true);
    axios.post('/api/users/login',{user, password}).then(
      res=>{
        removeCookie('usrin');
        setCookie('usrin', JSON.stringify(res.data));
        setUserData(res.data);
        setLoginSuccess(true);
        setLoginLoading(false);
        axios.post('/api/your-saved-cart', {username:res.data.username}).then(
          response=>{
            setCart(response.data.cart);
          },
          error=>{
            setErr(error.message);
          }
        )
      },
      err=>{
        setLoginLoading(false);
        setErr(err.message);
      }
    )
  }
  return (
    <div className='loginWrapper'>
      <form className='loginContainer' onSubmit={handleSubmit}>
        <div className='user'><span>Username:</span><input type="text" placeholder='username' onChange={e=>setUser(e.target.value)}/></div>
        <div className='password'><span>Password:</span><input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/></div>
        <input type="submit" value="Log in" className='submit'/>{loginLoading?<span><Spinner /></span>:err?<span>{err}</span>:<span></span>}
        <div className='signupLink'>Don't have an account?<Link to='/signup'>signup</Link></div>
      </form>
    </div>
  )
}

export default Login
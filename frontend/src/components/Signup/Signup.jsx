import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import './Signup.css'
// import axios from '../../config'
import axios from 'axios'
import Spinner from '../LoadingSpinner/LoadingSpinner'

function Signup(props) {
  const {setSignupLoading, setSignupSuccess, signupLoading}=props;
  const passwordEle=useRef();
  const confirmEle=useRef();
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [phone, setPhone]=useState(0);
  const [shipping, setShipping]=useState('');
  const [err, setErr]=useState('');
  const handleOnBlur=()=>{
    if(passwordEle.current.value!==confirmEle.current.value){
      alert("password not match")
    }
  }
  const checkUsername=(v)=>{
    if(v.length<8){
      alert('username is too short');
    }
  }
  const checkNumber=(v)=>{
    if(!/[0-9]{10}/.test(v)){
      alert('invalid phone number');
    } 
  }
  const checkEmail=(v)=>{
    if(!/[A-Za-z\d-_.]{5,20}@[A-Za-z\d-_.]{5,20}/.test(v)){
      return alert('invalid email');
    }
  }
  const checkPassword=(v)=>{
    if(!/[A-Z]/.test(v)){
      alert('there should be at least one uppercase letter in your password');
    }else if(!/[0-9]/.test(v)){
      alert('there should be at least one number in your usernmae');
    } else if(v.length<10){
      alert('username is too short');
    } else if(!/[~@#$%^&*_-]/.test(v)){
      alert('there should be at least 1 special symbol(~!@#$%^&*_-) in your password');
    } else if(!/[a-z]/.test(v)){
      alert('there should be at leats one lowercase letter in your password');
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setSignupLoading(true);
    axios.post('/api/users/signup',{username,password,email, phone, shipping}).then(
      res=>{
        setSignupLoading(false);
        setSignupSuccess(true);
      },
      err=>{
        setSignupLoading(false);
        setErr(err.message);
      }
    )
  }
  return (
    <div className='signupWrapper'>
      <form className='loginContainer' onSubmit={handleSubmit}>
        <div className='user'><span>Username:</span><input type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}} required onBlur={e=>{return checkUsername(e.target.value)}}/></div>
        <div className='password'><span>Password:</span><input type="password" placeholder='password' ref={passwordEle} onChange={e=>{setPassword(e.target.value)}} required onBlur={e=>{return checkPassword(e.target.value)}}/></div>
        <div className='password'><span className='wrap'>Confirm Password:</span><input type="password" placeholder='confirm password' ref={confirmEle} onBlur={handleOnBlur}/></div>
        <div className='user'><span>Email:</span><input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required onBlur={e=>{return checkEmail(e.target.value)}}/></div>
        <div className='user'><span>Phone:</span><input type="text" placeholder='Phone number' onChange={(e)=>{setPhone(e.target.value)}} required onBlur={e=>{return checkNumber(e.target.value)}}/></div>
        <div className='user'><span>Shipping:</span><input type="text" placeholder='Delivery address' onChange={(e)=>{setShipping(e.target.value)}} required/></div>
        <input value="submit" className='submit' type='submit' />{signupLoading?<span><Spinner /></span>:err?<span>{err}</span>:<span></span>}
        <div className='signupLink'>Already have an account?<Link to='/login'>login</Link></div>
      </form>
    </div>
  )
  
}

export default Signup
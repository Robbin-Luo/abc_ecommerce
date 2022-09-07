import React from 'react'
import './Header.css'
import { BiSearch } from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {GoSignOut} from 'react-icons/go'
import {removeCookie} from '../../Utils/Cookie/Cookie'

function Header(props) {
  const {loginSuccess, userData, setLoginSuccess, setUserData, setCart}=props;
  return (
    <header>
        <div className='headerCore'>
          <Link to='/'>
            <img src='https://res.cloudinary.com/dgs2mhdes/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1660712699/Ecommerce_images/logo/logo_dxwvfa.jpg' alt='ABC_trade logo'></img>
          </Link>
          <div className='search'>
            <input type='text' placeholder='Search our products'></input>
            <span><BiSearch /></span>
          </div>
          {
            loginSuccess? <div className='login'>
                            {
                              userData.isAdmin? <Link to='/admin' style={{textDecoration:"none", fontSize:'14px', marginRight:'12px'}}>
                                                  Admin Enrty
                                                </Link>:<span></span>
                            }
                            <Link className='user' to='/order-history' style={{textDecoration:"none", marginRight:'8px', borderRight:'1px solid white'}}>
                              {userData.username}
                            </Link>
                            <Link to='/products' onClick={()=>{setLoginSuccess(false); setUserData({}); removeCookie('usrin'); setCart([])}} >
                              <span><GoSignOut style={{position:'relative', top:'4px'}}/>logout</span>
                            </Link>
                          </div>:
                          <div className='login'>
                            <Link to='/login'>
                              <span>login</span>
                            </Link>
                            <Link to='/signup'>
                              <span>signup</span>
                            </Link>
                          </div>
          }
        </div>
      </header>
  )
}

export default Header
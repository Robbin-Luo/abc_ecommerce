import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Checkout from './components/Checkout/Checkout'
import Introduction from './components/Introduction/Introduction';
import AdminProducts from './components/AdminProducts/AdminProducts';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { getCookie } from './Utils/Cookie/Cookie';
import Admin from './components/Admin/Admin'
import AdminModify from './components/AdminModify/AdminModify';
import Delivery from './components/Delivery/Delivery';
import './App.css'
import axios from 'axios'
// import { axiosInstance } from './config';

export default function App() {
  const checkUser=getCookie('usrin');
  const [userData, setUserData]=useState(checkUser===undefined?{}:JSON.parse(checkUser));
  const [signupLoading, setSignupLoading]=useState(false);
  const [signupSuccess, setSignupSuccess]=useState(false);
  const [loginLoading, setLoginLoading]=useState(false);
  const [loginSuccess, setLoginSuccess]=useState(checkUser===undefined?false:true);
  const [cart, setCart]=useState([]);

  const [clientId, setClientId]=useState('');
  useEffect(()=>{
    const fetchEnv=async()=>{
      try{
        const result=await axios.get('/process-env');
        setClientId(result.data);
      }catch(error){
        console.log(error.message);
      }
    }
    fetchEnv();
  },[])
  console.log(clientId);
  
  useEffect(()=>{
      axios.post('/api/your-saved-cart', {username:userData.username}).then(
        res=>{
          setCart(res.data.cart)
        },
        err=>{
          setCart([]);
        }
      )
  },[userData])
  
  const addToCart=(p, quantity)=>{
    let foundItem=cart.find(item=>{
      return item.product.slug===p.product.slug
    });

    if(!foundItem){
      let newCart=[...cart, {category:p.category, product:p.product, quantity:quantity}];
      setCart(newCart);
    } else {
      let newFoundItem={category:p.category, product:p.product, quantity:foundItem.quantity+quantity};
      let index=cart.indexOf(foundItem);
      cart.splice(index, 1, newFoundItem);
      setCart([...cart]);
      
    }
  }

  return (
    <div className='appWrapper'>
      <BrowserRouter>
        <Header userData={userData} loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess} setUserData={setUserData} setCart={setCart}/>
        <Link to='/cart' className='cart'><AiOutlineShoppingCart /><div>{cart?cart.length:0}</div></Link>
        <Routes>
          <Route path='/delivery' element={<Delivery userData={userData}/>}></Route>
          <Route path='/admin/modify-a-product' element={<AdminModify />}></Route>
          <Route path='/admin/addnewproduct' element={<AdminProducts />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart} username={userData.username} clientId={clientId}/>}></Route>
          <Route path='/login' element={loginSuccess?<Navigate to='/products'/>:<Login setLoginLoading={setLoginLoading} setLoginSuccess={setLoginSuccess} setUserData={setUserData} loginLoading={loginLoading} setCart={setCart}/>}>
          </Route>
          <Route path='/signup' element={signupSuccess?<Navigate to='/login' />:<Signup signupLoading={signupLoading} setSignupLoading={setSignupLoading} setSignupSuccess={setSignupSuccess}/>}>
          </Route>
          <Route path='/' element={<Introduction />}></Route>
          <Route path='/products' element={<Main />}></Route>
          <Route path='/products/:category' element={<Category />}></Route>
          <Route path='/products/:category/:slug' element={<Product addToCart={addToCart}/>}></Route>
          <Route path='/cart' element={<Cart cart={cart} addToCart={addToCart} setCart={setCart}  userData={userData}/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

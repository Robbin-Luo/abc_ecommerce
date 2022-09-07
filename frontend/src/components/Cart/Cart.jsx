import React from 'react'
import './Cart.css'
import {AiFillPlusCircle} from 'react-icons/ai';
import {AiFillMinusCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {MdDelete} from 'react-icons/md';
import axios from 'axios'
// import axios from '../../config'
function Cart(props) {
  const {cart, addToCart, setCart, userData}=props;
  let quantity=cart.reduce((total, current)=>{
    return total+current.quantity;
  },0);
  let totalPrice=cart.reduce((total, current)=>{
    return total+current.product.price*current.quantity;
  },0);

  const handlePlus=(item)=>{
    return ()=>{
      if(item.quantity<item.product.inStock){
        addToCart(item, 1)
      } else {
        alert('not enought stock')
      }
    }
  }
  const handleMinus=(item)=>{
    return ()=>{
      if(item.quantity>=2){
        addToCart(item, -1)
      } 
    }
  }
  const handleDeleteItem=(item)=>{
    
    return ()=>{
      const restItems=cart.filter(i=>{
        return i!==item;
      });
      setCart(restItems);
    }
  }
  const saveCart=async()=>{
    axios.post('/api/your-cart',{username:userData.username, cart}).then(
      res=>{
        alert(`${userData.username}'s cart saved`)
      },
      err=>{
        console.log(err.response);
      }
    )
  }

  return  cart.length===0? <h2 className='empty'>your cart is empty</h2>:
  <div className="cartWrapper">
            <Link to='/products' className='more'>shopping more</Link>
            <h1>Your shopping cart</h1>
            {
              cart.map(item=>{
                return  <div className="item" key={item.product.slug}>
                          <Link to={`/products/${item.category}/${item.product.slug}`}>
                            <div><img src={item.product.image} alt={item.product.name}></img></div>
                            <div>{item.product.name}</div>
                          </Link>
                          <div className="price">${item.product.price}</div>
                          <div className="changeQuantity">
                            <div onClick={handlePlus(item)}><AiFillPlusCircle /></div>
                            <div>{item.quantity}</div>
                            <div onClick={handleMinus(item)}><AiFillMinusCircle /></div>
                          </div>
                          
                          <div className="delete" onClick={handleDeleteItem(item)}><MdDelete /></div>
                        </div>
              })
            }
            <div className="total">
              <div>total items: {cart.length}</div>
              <div>total quantity: {quantity}</div>
              <div>total price: ${totalPrice}</div>
            </div>
            <Link to='/delivery'>
              <button className="checkout" onClick={saveCart}>Proceed to shipping</button>
            </Link>
          </div>
}

export default Cart
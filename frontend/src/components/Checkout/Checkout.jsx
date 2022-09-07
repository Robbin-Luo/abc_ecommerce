import React, {useState} from 'react'
import './Checkout.css'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import axios from 'axios'
// import axios from '../../config'

function Checkout(props) {
  const {cart, setCart, username, clientId}=props;
  const [err, setErr]=useState('');
  

  const total=cart.reduce((total, current)=>{
    return total+current.product.price*current.quantity;
  },0)
  const items=cart.map(item=>{
    return item.product.name + 'X' + item.quantity;
  },0).join(', ').substring(0,10)
  
  


  return (
    <div className='checkoutContainer'>
      <div className='checkoutBox'>
        <div>Total: ${total}</div>
        {err?<p>{err}</p>:''}
        <PayPalScriptProvider options={{'client-id': clientId}}>
          <PayPalButtons 
            createOrder={(data,actions)=>{
              const order= actions.order.create({
                purchase_units:[
                  {
                    description: items+'...',
                    amount:{
                      value: total
                    }
                  }
                ]
              })
              console.log(order);
              return order;
            }}
            onApprove={async(data,actions)=>{
              const order=await actions.order.capture();
              console.log(order);
              axios.post('/api/your-cart', {username, cart, paid:true} ).then(
                res=>{setCart([])},
                err=>setErr(err.message)
              )
              
              alert('Thank you for purchasing from ABC Trades')
            }}
            onCancel={()=>{setErr('Payment is not successful')}}
            onError={(err)=>setErr(err.message)}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

export default Checkout
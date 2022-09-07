import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Delivery.css'

function Delivery(props) {
  const {userData}=props;
  const [address, setAddress]=useState('');
  return (
    <div className='deliveryWrapper'>
      <div className='deliveryBox'>
        {userData.shipping.length===0?  <div >
                                          <p>Type in your delivery address here</p>
                                          <input className='input' type='text' onChange={e=>setAddress(e.target.value)}></input>
                                        </div>:
                                        <div>
                                          {userData.shipping.map(add=>{
                                            return  <div key={add}>
                                                      <input type="radio" name={userData.shipping.indexOf(add)} id={userData.shipping.indexOf(add)} />
                                                      <label htmlFor={userData.shipping.indexOf(add)}>{add}</label>
                                                    </div>
                                          })}
                                          <p>Use a new address?</p>
                                          <input type='text' className='input' onChange={e=>setAddress(e.target.value)} value={address}></input>
                                        </div>
                                        }
        <Link to='/checkout'><button>Proceed to checkout</button></Link>
      </div>
    </div>
  )
}

export default Delivery
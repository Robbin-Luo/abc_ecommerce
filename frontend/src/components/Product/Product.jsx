import React, {useReducer, useEffect, useState} from 'react'
import './Product.css'
import { useParams, Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import axios from 'axios'
// import axios from '../../config'

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST": return ({...state, isLoading:true});
    case "FETCH_SUCCESS": return ({...state, isLoading:false, product:action.payload});
    case "FETCH_FAIL": return ({...state, isLoading:false, product:action.payload});
    default: return state;
  }
}
function Product(props) {
  const params=useParams();
  const {category, slug}=params;
  const [{product, isLoading, error}, dispatch]=useReducer(reducer, {
    isLoading:true,
    product: {},
    error:""
  })
  useEffect(()=>{
    const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST"});
      axios.get(`/api/products/${category}/${slug}`).then(
          res=>{
            dispatch({type:"FETCH_SUCCESS", payload:res.data});

          },
          err=>{
            dispatch({type:"FETCH_FAIL", payload:err.message});
          }
        )
      }
      fetchData();
    
  },[category, slug]);
  const [quantity, setQuantity]=useState(1);

  const increment = () => {
    if(quantity<product.product.inStock){
      setQuantity(quantity+1);
    } else {
      alert('not enought stock')
    }
  }
  const decrement = () => {
    if(quantity>=2){
      setQuantity(quantity-1);
    }
  }
  const handleAddToCart=(p, q)=>{
    return ()=>{
      props.addToCart(p,q);
      setQuantity(1);
    }
    
  }

  return ( isLoading?<div style={{minHeight:"90vh", lineHeight:'90vh'}}><LoadingSpinner /></div>:error?<h1 style={{minHeight:"100vh"}}>{error}</h1>:
    <div className='productContainer'>
      <div style={{marginBottom:"1rem"}}><Link to='/products'>all products</Link><span> &gt; </span><Link to={`/products/${category}`}>{category}</Link><span> &gt; </span><span>{product.product.slug}</span></div>
      <h1>{product.product.name}</h1><hr></hr>
      <div className='imgContainer'><img src={product.product.image}  alt={product.product.slug}></img></div>
      <div className="proInfo">
            <h2>{product.product.name}</h2><hr></hr>
            <Rating rating={product.product.rating} numOfReviews={product.product.numOfReviews} /><hr></hr>
            <p>Price: ${product.product.price}</p><hr></hr>
            <p>Description: {product.product.description}</p><hr></hr>
            <div className="right">
              <div className="color">
                specification:  {product.product.inStock<=0?<span style={{ color: "red" }}>out of stock</span>:<span></span>}
              </div>
              <div className="buttons">
                {/* {product.product.specification.map(spec => {
                  return <button key={spec.weight}>
                    {spec.weight}
                  </button>
                })} */}
              </div>
            </div>
            <div className="addCart">
              <div className="left">
                <button onClick={handleAddToCart(product, quantity)}>Add to cart</button>
                <div className='quantity'>{quantity}</div>
                <div className="increAndDecre">
                  <div onClick={increment}>+</div><hr></hr><div onClick={decrement}>-</div>
                </div>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default Product
import React, { useReducer, useEffect } from 'react'
import './Main.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import {Link} from 'react-router-dom'
import axios from "axios"
// import axios from '../../config'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': return { ...state, isLoading: true };
    case 'FETCH_SUCCESS': return { ...state, isLoading: false, products: action.payload };
    case 'FETCH_FAIL': return { ...state, isLoading: false, error: action.payload };
    default: return state;
  }
}
function Main() {

  const [{ products, isLoading, error }, dispatch] = useReducer(reducer, {
    products: [],
    isLoading: true,
    error: ''
  })
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      axios.get('/api/products').then(
        res=>{
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        },
        err=>{
          dispatch({ type: 'FETCH_FAIL', payload: err.message })
        }
      )
    }
    fetchProducts();
  }, []);

  return (
    isLoading?<div style={{minHeight:"90vh", lineHeight:'90vh'}}><LoadingSpinner /></div>:error?<h1 style={{minHeight:"100vh"}}>{error}</h1>:
    <main>
      <h1>our products</h1>
      {
        products.map(cate=>{
          return <div className='categoryWrapper' key={cate.category}>
          <h3 className='categoryTitle'><Link to={`/products/${cate.category}`}>{cate.category}</Link></h3>
          <div className='productWrapper'>
            {
              cate.products.map(item => {
                return <Link className='product' to={`/products/${cate.category}/${item.product.slug}`} key={item.product.slug}>
                  <div className='imgWrapper'>
                    <img className='productImg' src={item.product.image} alt={item.product.slug} />
                  </div>
                  <div className='productName'>{item.product.name}</div>
                </Link>
              })
            }
          </div>
        </div>

        })
      }
    </main>
  )
}

export default Main
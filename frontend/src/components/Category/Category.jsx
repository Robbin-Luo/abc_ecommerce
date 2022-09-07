import React, { useEffect, useReducer } from 'react'
import './Category.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios'
// import axios from '../../config'

function Category() {
  const params=useParams();
  const {category}=params;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST': return { ...state, isLoading: true };
      case 'FETCH_SUCCESS': return { ...state, isLoading: false, products: action.payload };
      case 'FETCH_FAIL': return { ...state, isLoading: false, error: action.payload };
      default: return state;
    }
  }

  const [{ products, isLoading, error }, dispatch] = useReducer(reducer, {
    products: [],
    isLoading: true,
    error: ''
  })
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
    axios.get(`/api/products/${category}`).then(
        res=>{
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        },
        err=>{
          dispatch({ type: 'FETCH_FAIL', payload: err.message })
        }
      )}
    fetchProducts();
  }, [category]);

  return (
    isLoading?<div style={{minHeight:"90vh", lineHeight:'90vh'}}><LoadingSpinner /></div>:error?<h1 style={{minHeight:"100vh"}}>{error}</h1>:
    <div className='categoryWrapper'>
      <div style={{marginBottom:"1rem"}}><Link to='/products'>all products</Link><span> &gt; </span><span>{category}</span></div>
      <h1>Metal products</h1>
      <div className='productWrapper'>
      {
        products.map(item => {
          return <div className='product' key={item.product.slug}>
              <div className='imgWrapper'>
                <Link to={`/products/${category}/${item.product.slug}`}><img src={item.product.image} alt={item.product.slug} /></Link>
              </div>
              <div className='productName'><Link to={`/products/${category}/${item.product.slug}`}>{item.product.name}</Link></div>
            </div>
          
        })
      }
      </div>
    </div>
  )
}

export default Category
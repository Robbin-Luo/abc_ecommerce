import React, {useState} from 'react'
import './AdminModify.css'
import axios from 'axios'
// import axios from '../../config'
import {Link} from 'react-router-dom'
import Spinner from '../LoadingSpinner/LoadingSpinner';

function AdminModify() {
  const [searchItem, setSeacrchItem]=useState('');
  const [foundProduct, setFoundProduct]=useState({product:{}});
  const [newPrice, setNewPrice]=useState(0);
  const [newQuantity, setNewQuantity]=useState(0);
  const [searchLoading, setSearchLoading]=useState(false);
  const [errSearch,setErrSearch]=useState('');
  const [errModify, setErrmodify]=useState('');
  const [modifyLoading, setModifyLoading]=useState(false);
  const [modifySuccess, setModifySuccess]=useState(false);

  const checkQuantity=(v)=>{
    if(v%1!==0){
      alert('new quantity should be an integer');
    }
  }
  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchLoading(true);
    axios.post('/products/search-product', {searchItem}).then(
      res=>{
        setSearchLoading(false);
        setFoundProduct(res.data);
        setErrSearch('');
      },
      err=>{
        setSearchLoading(false);
        setErrSearch(err.response.data.message || err.message);
      }
    )
  }
    const {image, slug, name, price, inStock}=foundProduct.product;
  
  const handleModify=(e)=>{
    e.preventDefault();
    setModifyLoading(true);
    axios.post('/api/products/modify-a-product', {slug, newPrice, newQuantity}).then(
      res=>{
        setModifyLoading(false);
        setErrmodify('');
        setModifySuccess(true);
      },
      err=>{
        setModifyLoading(false);
        setErrmodify(err.response.data.message || err.message);
      }
    )

  }
  
  
  return (
    <div className='modifyWrapper'>
      <div className='modifyBox'>
        <form className='searchBox' onSubmit={handleSearch}>
          <input type='text' placeholder="search with product's slug" onChange={e=>{setSeacrchItem(e.target.value)}}></input><input type="submit" value='Search'/>
        </form>
        {errSearch?<div>{errSearch}</div>:searchLoading?<Spinner />:foundProduct.product!=={}?
          
          <div className='foundProduct'>
            <div className='imgWrapper'><Link to={`/product/${foundProduct.category}/${slug}`}><img src={image} alt={name}></img></Link></div>
            <div className='productName'><Link to={`/product/${foundProduct.category}/${slug}`}>{name}</Link> </div>
            <div className='currentPrice'>{price}</div>
            <div className='currentQuantity'>{inStock}</div>
          </div>:<div></div>
        }
        <form className='modiBox' onSubmit={handleModify}>
          <div className='priceBox'><span>New price:</span><input type='number' onChange={e=>{setNewPrice(e.target.value)}}></input></div>
          <div className='quantityBox'><span>New stock:</span><input type='number' onChange={e=>{setNewQuantity(e.target.value)}} onBlur={e=>{return checkQuantity(e.target.value)}}></input></div>
          {modifyLoading?<Spinner />:errModify?<div>{errModify}</div>:modifySuccess?<div>update product information success</div>:<div></div>}
          <input type='submit' value='submit' /> 
        </form>
      </div>
    </div>
  )
}

export default AdminModify
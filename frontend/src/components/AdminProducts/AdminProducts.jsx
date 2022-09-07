import React, {useState} from 'react'
import Spinner from '../LoadingSpinner/LoadingSpinner'
import './AdminProducts.css'
import axios from 'axios'
// import axios from '../../config'

function AdminProducts() {
  const [category, setCategory]=useState('')
  const [name, setName]=useState('')
  const [slug, setSlug]=useState('')
  const [image, setImage]=useState('')
  const [price, setPrice]=useState(1)
  const [spec, setSpec]=useState('')
  const [stock, setStock]=useState(1)
  const [brand, setBrand]=useState('')
  const [desc, setDesc]=useState('')
  const [creatNewLoading, setCreateNewLoading]=useState(false);

  const handleSubmit=async(e)=>{
    console.log(category, name, slug);
    e.preventDefault();
    setCreateNewLoading(true);
    axios.post('/api/newproduct', {category, name, slug, image, price, spec, stock, brand, desc}).then(
      res=>{
        setCreateNewLoading(false);
        alert(`${name} was created successfully`)
      },
      err=>{
        setCreateNewLoading(false);
        alert(err.message)
      }
    )
  }
  return (
    <div className='adminProduct'>
      <form className='adminProductForm' onSubmit={handleSubmit}>
        <div className='inputWrapper'><span>Category:</span><input type="text" placeholder='product category' onChange={(e)=>{setCategory(e.target.value)}} required value={category}/></div>
        <div className='inputWrapper'><span>Name:</span><input type="text" placeholder='product name' onChange={e=>{setName(e.target.value)}} required value={name}/></div>
        <div className='inputWrapper'><span>Slug:</span><input type="text" placeholder='xx-xx or xx_xx' onChange={e=>{setSlug(e.target.value)}} required value={slug}/></div>
        <div className='inputWrapper'><span>Image:</span><textarea placeholder='image URL' onChange={(e)=>{setImage(e.target.value)}} required value={image}/></div>
        <div className='inputWrapper'><span>Price:</span><input type="text" placeholder='price' onChange={(e)=>{setPrice(e.target.value)}} required value={price}/></div>
        <div className='inputWrapper'><span>Specification:</span><input type="text" placeholder='product spec' onChange={(e)=>{setSpec(e.target.value)}} required value={spec}/></div>
        <div className='inputWrapper'><span>Stock:</span><input type="text" placeholder='stock' onChange={(e)=>{setStock(e.target.value)}} required value={stock}/></div>
        <div className='inputWrapper'><span>Brand:</span><input type="text" placeholder='brand' onChange={(e)=>{setBrand(e.target.value)}} required value={brand}/></div>
        <div className='inputWrapper'><span>Description:</span><textarea placeholder='description' onChange={(e)=>{setDesc(e.target.value)}} required value={desc}/></div>
        <input value="submit" className='submit' type='submit' />{creatNewLoading?<span><Spinner /></span>:<span></span>}
      </form>
    </div>
  )
}

export default AdminProducts
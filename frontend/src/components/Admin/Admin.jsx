import React from 'react'
import {Link} from 'react-router-dom'
import './Admin.css'

function Admin() {
  return (
    <div className='adminWrapper'>
      <div className='adminBox'>
        <Link to='/admin/addnewproduct'>Add a new product</Link>
        <Link to='/admin/modify-a-product'>Modify the information of an exsiting product</Link>
      </div>

    </div>
  )
}

export default Admin
import React from 'react'
import './Introduction.css'
import { Link } from 'react-router-dom'

function Introduction() {
  return (
    <div className='intro'>
      <Link to='/products' className='ourProducts'> 
        <h1>Our products</h1>
      </Link>
      <h3>ABC Trade is a large building material supplier located in Dandenong South, Melbourne</h3>
    </div>

  )
}

export default Introduction
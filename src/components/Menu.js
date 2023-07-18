import React from 'react'
import '../styles/menu.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Menu () {
  const history = useHistory()
  return (
    <div className='menu-container'>
      <div className='menu-head'>Menu</div>
      <div className='menu-options'>
        <p
          onClick={() => history.push('/')}
        >Main</p>
        <p
          onClick={() => history.push('/history')}
        >History</p>
        <p
          onClick={() => history.push('/about')}
        >About</p>
      </div>
    </div>
  )
}

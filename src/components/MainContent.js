import React from 'react'
import Chat from './Chat'
import '../styles/mainContent.css'
import Menu from './Menu'

export default function MainContent () {
  return (
    <div className='main-content-container'>
      <Menu />
      <Chat />
    </div>
  )
}

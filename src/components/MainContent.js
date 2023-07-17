import React from 'react'
import Chat from './Chat'
import History from './History'
import Menu from './Menu'
import '../styles/mainContent.css'

export default function MainContent () {
  return (
    <div className='main-content-container'>
      <Menu />
      <History />
      <Chat />
    </div>
  )
}

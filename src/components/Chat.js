import React from 'react'
import '../styles/chat.css'

export default function Chat () {
  return (
    <div className='chat-container'>
      <div className='chat-message-bot-avatar'>.</div>
      <div className='chat-message-container'></div>
      <div className='chat-message-input-container'>
        <input type="text" />
      </div>
    </div>
  )
}

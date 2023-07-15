import React from 'react'
import '../styles/chat.css'
import Message from './Message'

export default function Chat () {
  const messages = [
    { id: 1, user: 'rodrigo', text: 'alo' },
    { id: 2, user: 'bot', text: 'vamo que vamo' }
  ]
  return (
    <div className='chat-container'>
      <div className='chat-message-bot-avatar'>.</div>
      <div className='chat-message-container'>
        {messages.map((m) => (
          <Message key={m.id} message={ m }/>
        ))}

      </div>
      <div className='chat-message-input-container'>
        <input type="text" />
      </div>
    </div>
  )
}

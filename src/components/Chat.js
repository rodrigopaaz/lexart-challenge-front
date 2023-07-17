import React, { useState } from 'react'
import '../styles/chat.css'
import { chatBot } from '../utils/chatBot'
import Message from './Message'

export default function Chat () {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const handleMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      user: 'rodrigo',
      text
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setText('')

    if (updatedMessages.length >= 1) {
      const botResponse = {
        id: updatedMessages.length + 1,
        user: 'bot',
        text: chatBot(updatedMessages)
      }
      setMessages([...updatedMessages, botResponse])
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-message-bot-avatar'>.</div>
      <div className='chat-message-container'>
        {messages.map((m) => (
          <Message key={m.id} message={ m }/>
        ))}

      </div>
      <div className='chat-message-input-container'>
        <input type="text" value={text}
          onChange={({ target: { value } }) => setText(value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') handleMessage()
          }}
        />
        <button
          onClick={() => handleMessage()}
        >send</button>
      </div>
    </div>
  )
}

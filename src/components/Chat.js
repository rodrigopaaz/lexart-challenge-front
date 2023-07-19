import React, { useContext, useState } from 'react'
import '../styles/chat.css'
import { chatBot } from '../utils/chatBot'
import Message from './Message'
import { BiSend } from 'react-icons/bi'
import AppContext from '../context/Context'

export default function Chat () {
  const [text, setText] = useState('')
  const { messages, setMessages } = useContext(AppContext)

  const handleMessage = async () => {
    const newMessage = {
      id: messages.length + 1,
      user: 'rodrigo',
      text
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setText('')
    const host = process.env.REACT_APP_API_URL
    if (updatedMessages.length >= 1) {
      const message = await chatBot(updatedMessages, host)

      if (Array.isArray(message)) {
        const botResponses = message.map((response, index) => ({
          id: updatedMessages.length + index + 1,
          user: 'bot',
          link: response.url,
          text: response.message
        }))
        setMessages([...updatedMessages, ...botResponses])
      } else {
        const botResponse = {
          id: updatedMessages.length + 1,
          user: 'bot',
          text: message
        }
        setMessages([...updatedMessages, botResponse])
      }
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-message-bot-avatar'>.</div>
      <div className='chat-message-container'>
        {messages.map((m) => (
          <Message key={m.id + m.text} message={ m }/>
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
          className='chat-send-button'
          onClick={() => handleMessage()}
        ><BiSend /></button>
      </div>
    </div>
  )
}

import React from 'react'
import '../styles/message.css'

export default function Message (data) {
  const { message } = data
  const classAlign = message.user === 'bot' ? 'left' : 'right'
  return (
    <div className={`message-container-${classAlign}`}>
      <div>
        {message.text}
      </div>
    </div>

  )
}

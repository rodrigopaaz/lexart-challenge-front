import React from 'react'
import '../styles/message.css'

export default function Message (user) {
  const classAlign = user === 'bot' ? 'left' : 'right'
  return (
    <div className={`message-container-${classAlign}`}>Message</div>

  )
}

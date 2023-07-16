import React from 'react'
import '../styles/message.css'

export default function Message (data) {
  const { message } = data
  const classAlign = message.user === 'bot' ? 'left' : 'right'
  const isMessageArray = Array.isArray(message.text)

  return (
    <div className={`message-container-${classAlign}`}>
      <div className={isMessageArray ? 'message-container-vertical' : null}>
        {isMessageArray
          ? (
            <ul>
              {message.text.map(({ message, url }, index) => (
                <li key={index}>
                  <a href={url} target='_blank' rel="noreferrer">{message}</a>
                </li>
              ))}
            </ul>
          )
          : (
            message.text
          )}
      </div>
    </div>
  )
}

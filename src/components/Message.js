import React from 'react'
import PropTypes from 'prop-types'
import '../styles/message.css'

export default function Message ({ message }) {
  const classAlign = message.user === 'bot' ? 'left' : 'right'
  console.log(message)

  return (
    <div className={`message-container-${classAlign}`}>
      <div className={message?.link ? 'message-container-vertical' : null}>
        {message?.link
          ? (
            <a href={message.link} target='_blank' rel='noreferrer'>
              {message.text}
            </a>
          )
          : (
            message.text
          )}
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.string.isRequired,
    link: PropTypes.string,
    text: PropTypes.string.isRequired
  }).isRequired
}

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import '../styles/message.css'
import AppContext from '../context/Context'

export default function Message ({ message }) {
  const classAlign = message.user === 'bot' ? 'left' : 'right'
  const { messages, setMessages } = useContext(AppContext)

  const hangleMessage = (mess) => {
    switch (true) {
    case mess.includes('Do you want to apply for a loan?'):
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'bot',
        text: 'Great! You are interested in applying for a loan. Please visit our website to proceed.'
      }])
      break
    case mess.includes('Loan conditions'):
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'bot',
        text: 'We have great loan conditions, please visit our web site, we have competitive interest rates, flexible terms, and fast approval process.'
      }])
      break

    default:
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'bot',
        text: "If you need any assistance or have questions, we're here to help, visit our website! Our dedicated team is ready to provide personalized support tailored to your needs."
      }])
    }
  }
  return (
    <div className={`message-container-${classAlign}`}>
      <div className={message?.link ? 'message-container-custom' : null}>
        {message?.link
          ? (
            <a onClick={() => hangleMessage(message.text)} target='_blank' rel='noreferrer'>
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

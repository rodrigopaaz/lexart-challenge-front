import React from 'react'
import '../styles/history.css'
import Menu from '../components/Menu'
import '../styles/about.css'

export default function About () {
  return (
    <div className='about-container'>
      <Menu />
      <div className='about-contant'>
        <h4>About</h4>
        <p>
        In this project, I have developed a chatbot that provides
        tailored responses based on specific messages received.
        To ensure personalized assistance, user login is required.
        If the user is not registered, they will be prompted to create
        an account.<br />
          <br />

Once logged in, users will have access to three service options,
each accompanied by a customized message. When the conversation concludes,
typing goodbye will trigger the storage of the conversation in a secure
 database. <br />
          <br />
 Users can retrieve and download their conversation history from
 the history menu.
        </p>
      </div>
    </div>
  )
}

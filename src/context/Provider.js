import React, { useMemo, useState } from 'react'
import AppContext from './Context'

// eslint-disable-next-line react/prop-types
export default function AppProvider ({ children }) {
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([])

  const data = useMemo(
    () => ({
      user,
      setUser,
      messages,
      setMessages
    }), [
      user,
      setUser,
      messages,
      setMessages
    ]
  )
  return (
    <AppContext.Provider value ={data}>
      {children}
    </AppContext.Provider>
  )
}

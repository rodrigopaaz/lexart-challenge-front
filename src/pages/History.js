import React, { useEffect, useState } from 'react'
import '../styles/history.css'
import Menu from '../components/Menu'
import { getFiles } from '../services/request'

export default function History () {
  const [cards, setCards] = useState([])

  const getItems = async (userId) => {
    try {
      const { data } = await getFiles(userId)
      setCards(data.messageIds)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    getItems(data.id)
  }, [])

  return (
    <div className='history-container'>
      <Menu />
      {cards
        ? <div className='history-contant'>
          <div>
            <h4>History</h4>
            {cards.map((c) => {
              return (<div className='history-card' key={c.id}>
                {<a href={`http://localhost:3001/message/${c.id}`} target='_blank' rel="noreferrer">{c.fileName}
                </a>}
              </div>)
            })}
          </div>
        </div>
        : <div className='history-contant'><p>Nada foi encontrado!</p></div>}
    </div>
  )
}

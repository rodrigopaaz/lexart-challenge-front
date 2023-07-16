import React from 'react'
import { CSVLink } from 'react-csv'

const csvCreator = (messages) => {
  console.log(messages)
  const csvData = [
    ['ID', 'User', 'Text'],
    ...messages.map(({ id, user, text }) => [id, user, decodeURIComponent(text)])
  ]

  return (
    <CSVLink data={csvData} filename="output.csv">
      Click to download your CSV file
    </CSVLink>
  )
}

export default csvCreator

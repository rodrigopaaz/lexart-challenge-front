import axios from 'axios'
import { getFiles } from '../services/request'

const csvCreator = async (jsonData, host) => {
  const { id: userId, name } = JSON.parse(localStorage.getItem('user'))
  const { data } = await getFiles(userId, host)
  console.log(data)
  const csvData = [
    ['ID', 'User', 'Text'],
    ...jsonData.map(({ id, user, text }) => [id, user, text])
  ]

  const csvContent = csvData.map(row => row.join(',')).join('\n')
  const csvBlob = new Blob([csvContent], { type: 'text/csv' })

  const fileName = `Conversation - ${name}#${data.messageIds.length + 1} - 
  ${new Date().toLocaleDateString()} 
  ${new Date().toLocaleTimeString().substring(0, 5)}`

  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('file', csvBlob, 'output.csv')
  formData.append('fileName', fileName)
  const server = `${host}/message` || 'http://localhost:3001/message'
  try {
    const response = await axios.post(server, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      return `Thank you for reaching out to us! We appreciate your 
      interaction and value your conversation. 
      Your inquiry and our responses have been recorded and saved in our 
      conversation history for future reference.`
    } else {
      throw new Error('Failed to upload file')
    }
  } catch (error) {
    return 'Failed to upload file'
  }
}

export default csvCreator

import axios from 'axios'

const csvCreator = async (jsonData, userId) => {
  const csvData = [
    ['ID', 'User', 'Text'],
    ...jsonData.map(({ id, user, text }) => [id, user, text])
  ]

  const csvContent = csvData.map(row => row.join(',')).join('\n')
  const csvBlob = new Blob([csvContent], { type: 'text/csv' })

  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('file', csvBlob, 'output.csv')

  try {
    const response = await axios.post('http://localhost:3001/message', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      return 'File uploaded successfully'
    } else {
      throw new Error('Failed to upload file')
    }
  } catch (error) {
    return 'Failed to upload file'
  }
}

export default csvCreator

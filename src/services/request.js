import axios from 'axios'

const getFiles = async (userId, setHost) => {
  const host = setHost || 'http://localhost:3001'

  const files = await axios.get(`${host}/user/${userId}`)
  return files
}

const login = async (email, password, setHost) => {
  const host = setHost || 'http://localhost:3001'
  const { data } = await axios({
    method: 'post',
    url: `${host}/user`,
    data: {
      email,
      password
    }
  })
  localStorage.setItem('user', JSON.stringify(data))
}

const register = async (username, email, password, setHost) => {
  const host = setHost || 'http://localhost:3001'
  const { data } = await axios({
    method: 'post',
    url: `${host}/register`,
    data: {
      username,
      password,
      email
    }
  })
  localStorage.setItem('user', JSON.stringify(data))
}

const remove = async (id, setHost) => {
  const host = setHost || 'http://localhost:3001'
  const data = await axios({
    method: 'delete',
    url: `${host}/products/${id}`,
    data: {
      id
    }
  })
  return data
}

export { getFiles, login, register, remove }

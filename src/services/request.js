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
    url: `${host}/login`,
    data: {
      email,
      password
    }
  })
  return data
}

const register = async (name, email, password, setHost) => {
  const host = setHost || 'http://localhost:3001'
  const { data } = await axios({
    method: 'post',
    url: `${host}/user`,
    data: {
      name,
      password,
      email
    }
  })
  return data
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

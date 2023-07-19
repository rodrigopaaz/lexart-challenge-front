const { login, register } = require('../services/request')
const { default: csvCreator } = require('./csvCreator')

const stages = {
  isRegistered: true,
  intro: false,
  name: false,
  email: false,
  password: false,
  loanOffer: false,
  endConversation: false
}

let host = ''

const intro = (message) => {
  const terms = ['hello', 'goodbye', 'good', 'i want']
  for (const term of terms) {
    if (message.toLowerCase().includes(term)) {
      switch (term) {
      case 'hello':
        stages.intro = true
        return 'Hello! How can I assist you? If you are already registered, please type your email followed by your password to start a conversation. If you are not registered, type "create user".'
      case 'goodbye':
        stages.intro = true
        return 'Welcome! If you are already registered, please type your email followed by your password to start a conversation. If you are not registered, type "create user". Alternatively, you can type "goodbye" to end this conversation.'
      case 'good':
        stages.intro = true
        return 'Welcome! If you are already registered, please type your email followed by your password to start a conversation. If you are not registered, type "create user". Let me know what would be good for you.'
      default:
        stages.intro = true
        return 'Welcome! If you are already registered, please type your email followed by your password to start a conversation. If you are not registered, type "create user". Let me know what you want.'
      }
    }
  }
  return 'Sorry, I didn\'t understand. Please let me know what you want or what would be good for you.'
}

const validateName = async (name) => {
  const nameRegex = /^.{2,}$/
  const isValid = nameRegex.test(name)
  if (!isValid) return 'Please enter a valid name with at least 2 characters!'
  stages.name = name
  return 'Now, please enter your email'
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(email)
  if (!isValid) return 'Please enter a valid email address!'
  stages.email = email
  return 'Now, please enter your password.'
}

const validatePassword = async (password) => {
  const passwordRegex = /^.{6,}$/
  const isValid = passwordRegex.test(password)
  if (!isValid) return 'Please enter a password with at least 6 characters!'
  stages.password = password
  try {
    if (stages.isRegistered) {
      const user = await login(stages.email, stages.password, host)
      stages.name = user.name
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      const user = await register(stages.name, stages.email, stages.password, host)
      localStorage.setItem('user', JSON.stringify(user))
    }
    return `Glad to see you here ${stages.name}, How can I assist you?`
  } catch (error) {
    return 'An error happened during your login, are you registered? if you are not registered type "create user"'
  }
}

const offersALoan = (message) => {
  if (message.includes('loan')) {
    stages.loanOffer = true
    return [
      { message: 'a - Do you want to apply for a loan?', url: '#' },
      { message: 'b - Loan conditions', url: '#' },
      { message: 'c - Help', url: '#' },
      { message: 'Click a message above for personal assistance' }
    ]
  }
  return 'Sorry, I didn\'t understand what you want.'
}

export const chatBot = async (allMessages, server) => {
  host = server
  const lastMessage = allMessages[allMessages.length - 1]
  switch (true) {
  case typeof lastMessage.text === 'string' && lastMessage.text.toLowerCase().includes('create user'):
    stages.isRegistered = false
    stages.email = false
    stages.password = false
    return 'Please enter your name.'
  case !stages.intro:
    return intro(lastMessage.text)
  case !stages.isRegistered && !stages.name:
    return validateName(lastMessage.text)
  case (!stages.isRegistered && !stages.email) || !stages.email:
    return validateEmail(lastMessage.text)
  case (!stages.isRegistered && !stages.password) || !stages.password:
    return await validatePassword(lastMessage.text)
  case !stages.loanOffer:
    return offersALoan(lastMessage.text)
  case !stages.endConversation:
    if (lastMessage.text.toLowerCase().includes('goodbye')) {
      stages.endConversation = true
      return await csvCreator(allMessages, host)
    }
    return "Sorry, I didn't understand. Please let me know what you want or what would be good for you."
  default:
    return await csvCreator(allMessages, host)
  }
}

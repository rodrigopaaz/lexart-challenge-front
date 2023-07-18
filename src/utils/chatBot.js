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

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(email)
  if (!isValid) return 'Please enter a valid email address!'
  stages.email = email
  return 'Now, please enter your password.'
}

const validatePassword = (password) => {
  const passwordRegex = /^.{6,}$/
  const isValid = passwordRegex.test(password)
  if (!isValid) return 'Please enter a password with at least 6 characters!'
  stages.password = password
  return 'How can I assist you?'
}

const offersALoan = (message) => {
  if (message.includes('loan')) {
    stages.loanOffer = true
    return [
      { message: 'Do you want to apply for a loan?', url: 'https://www.globo.com' },
      { message: 'Loan conditions', url: 'https://www.g1.com' },
      { message: 'Help', url: 'https://www.instagram.com' }
    ]
  }
  return 'Sorry, I didn\'t understand what you want.'
}

const chatBot = async (allMessages) => {
  const lastMessage = allMessages[allMessages.length - 1]
  switch (true) {
  case typeof lastMessage.text === 'string' && lastMessage.text.toLowerCase().includes('create user'):
    stages.isRegistered = false
    return 'Please enter your name.'
  case !stages.isRegistered && !stages.email:
    stages.name = lastMessage.text
    return validateEmail(lastMessage.text)
  case !stages.isRegistered && !stages.password:
    return validatePassword(lastMessage.text)
  case !stages.intro:
    return intro(lastMessage.text)
  case !stages.email:
    return validateEmail(lastMessage.text)
  case !stages.password:
    return validatePassword(lastMessage.text)
  case !stages.loanOffer:
    return offersALoan(lastMessage.text)
  case !stages.endConversation:
    if (lastMessage.text.toLowerCase().includes('goodbye')) {
      stages.endConversation = true
      return await csvCreator(allMessages, 1)
    }
    return "Sorry, I didn't understand. Please let me know what you want or what would be good for you."
  default:
    return await csvCreator(allMessages, 1)
  }
}

module.exports = { chatBot, intro, offersALoan }

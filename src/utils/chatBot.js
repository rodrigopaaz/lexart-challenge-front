const intro = (message) => {
  const terms = ['hello', 'goodbye', 'good', 'i want']
  for (let i = 0; i < terms.length; i++) {
    const term = terms[i]
    if (message.toLowerCase().includes(term)) {
      switch (term) {
      case 'hello':
        return 'Hello!, how can i help you, type your user and password to start a conversation.'
      case 'goodbye':
        return "You've just arrived, type your user and password to start a converstion. Or type 'good bye' to end this conversation."
      case 'good':
        return 'Type your user and password to start a converstion, then tell me what would be good for you.'

      default:
        return 'Type your user and password to start a converstion, then tell me what you want.'
      }
    }
  }
  return 'Sorry, i didnt understood what you said, tell me what you want or what would be good for you.'
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const validate = emailRegex.test(email)
  console.log(validate)
  console.log(email)
  if (!validate) return 'Please type a valid e-mail!'
  localStorage.setItem('user', JSON.stringify({ email }))
  return 'Now type your password'
}

const validatePassword = (password) => {
  const passwordRegex = /^.{6,}$/
  const validate = passwordRegex.test(password)
  if (!validate) return 'Please type password bigger or equal than 6 characteres!'
  const user = JSON.parse(localStorage.getItem('user'))
  localStorage.setItem('user', JSON.stringify({ ...user, password }))
  return 'how can help you?'
}

const offersALoan = (message) => {
  if (message.includes('loan')) {
    return [
      { message: 'Do you want to apply for a loan?', url: 'https://www.globo.com' },
      { message: 'Loan conditions', url: 'https://www.g1.com' },
      { message: 'Help', url: 'https://www.instagram.com' }
    ]
  }
  return 'Sorry i didnt understood what you want'
}

const endConversation = (message) => {
  return 'Thank you for your attention'
}

const chatBot = (allMessages) => {
  const lastMessages = allMessages[allMessages.length - 1]
  if (lastMessages.length === 1) return intro(lastMessages.text)
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user || !user.email) {
    return validateEmail(lastMessages.text,
      lastMessages.password)
  }
  if (!user || !user.password) {
    return validatePassword(lastMessages.text,
      lastMessages.password)
  }
  if (allMessages.length >= 2 && lastMessages.text.includes('goodbye')) {
    localStorage.setItem('history', JSON.stringify(allMessages))
    return endConversation(lastMessages.text)
  }
  if (lastMessages) {
    return offersALoan(lastMessages.text)
  }
}

module.exports = { chatBot, intro, offersALoan }

const sendBtn = document.querySelector(
  '.ph-paper-plane-right-fill'
).parentElement
const inputMessage = document.querySelector('.input')
const chat = document.querySelector('.app__chat-messages')

inputMessage.addEventListener('keyup', (e) => {
  inputMessage.style.height = '1.4rem'
  let scHeight = e.target.scrollHeight
  inputMessage.style.height = `${scHeight / 10}rem`
})

sendBtn.addEventListener('click', () => {
  if (inputMessage.value.trim().length === 0) return
  const newText = inputMessage.value.replace(/(?:\r\n|\r|\n)/g, '<br>')
  sendMessage(newText)
  replyMessage('Bora então')
})

function sendMessage(message) {
  inputMessage.value = ''
  inputMessage.style.height = '1.4rem'
  if (chat.lastElementChild.classList.contains('messages--right')) {
    const sentence = buildMessageSentence(message, 'right')
    chat.lastElementChild.appendChild(sentence)
    return
  }

  const messageBox = buildMessage(message, 'right', true)
  chat.appendChild(messageBox)
}

function buildMessageSentence(sentence, position, isFirst = false) {
  const messageSentence = document.createElement('p')
  const classList = isFirst
    ? [
        'messages__sentence',
        'messages__sentence--first',
        `messages__sentence--first-${position}`,
        `messages__sentence--${position}`,
      ]
    : ['messages__sentence', `messages__sentence--${position}`]
  messageSentence.classList.add(...classList)
  messageSentence.innerHTML = sentence

  return messageSentence
}

function buildMessageBox(position) {
  const messageBox = document.createElement('div')
  messageBox.classList.add(
    'messages',
    'messages--width',
    `messages--${position}`
  )

  return messageBox
}

function buildMessage(sentence, position, isFirst = false) {
  const messageBox = buildMessageBox(position)
  const messageUserAndTime = getUserAndTime(position)
  const messageSentence = buildMessageSentence(sentence, position, isFirst)
  messageBox.appendChild(messageUserAndTime)
  messageBox.appendChild(messageSentence)

  return messageBox
}

function replyMessage(message) {
  const messageBox = buildMessage(message, 'left', true)
  chat.appendChild(messageBox)
}

function getUserAndTime(position) {
  const user = document
    .querySelector('.profile__name')
    .textContent.split(' ')[0]
  const messageTime = document.createElement('span')
  messageTime.classList.add('messages__time')
  messageTime.textContent =
    (position === 'right' ? 'Você' : user) + ` - ${getCurrentTime()}`
  return messageTime
}

function getCurrentTime() {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, 0)
  const minutes = String(date.getMinutes()).padStart(2, 0)
  return `${hours}:${minutes}`
}

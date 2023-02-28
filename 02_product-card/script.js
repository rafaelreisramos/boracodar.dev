const rotateIcon = document.querySelector('.rotate')
const cardImg = document.querySelector('img')
const closeIcon = document.querySelector('.close')

rotateIcon.addEventListener('click', () => {
  cardImg.setAttribute('src', './assets/images/couch.gif')
  rotateIcon.style.visibility = 'hidden'
  closeIcon.style.visibility = 'visible'
})

closeIcon.addEventListener('click', () => {
  cardImg.setAttribute('src', './assets/images/couch.png')
  closeIcon.style.visibility = 'hidden'
  rotateIcon.style.visibility = 'visible'
})

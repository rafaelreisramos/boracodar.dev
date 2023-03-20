const emailInput = document.querySelector('.input__email')
const passwordInput = document.querySelector('.input__password')
const passwordBtn = document.querySelector('.btn--toggle')
const passwordIcon = document.querySelector('.icon')
const submitBtn = document.querySelector('.btn--submit')
const form = document.querySelector('.form')

function togglePasswordVisibility() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'
    passwordIcon.src = '/assets/eye.svg'
    return
  }
  passwordInput.type = 'password'
  passwordIcon.src = '/assets/eye-off.svg'
}

function enablePasswordInput() {
  if (emailInput.validity.valid) {
    passwordBtn.removeAttribute('disabled')
    passwordInput.removeAttribute('disabled')
    return
  }
  passwordInput.setAttribute('disabled', true)
  passwordBtn.setAttribute('disabled', true)
}

function formSubmit(event) {
  event.preventDefault()
  const email = form.elements.email.value
  const password = form.elements.password.value
  console.log(`email: ${email}, password: ${password}`)
  location.reload()
}

passwordBtn.addEventListener('click', togglePasswordVisibility)
emailInput.addEventListener('input', enablePasswordInput)
form.addEventListener('submit', formSubmit)

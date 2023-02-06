const btns = document.querySelectorAll('.btn')

for (const btn of btns) {
  btn.addEventListener('click', addRipple)
}

function addRipple(event) {
  const btn = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(btn.clientWidth, btn.clientHeight)
  circle.style.width = circle.style.height = `${diameter / 10}rem`
  circle.classList.add('btn--ripple')

  const ripple = btn.getElementsByClassName('btn--ripple')[0]
  if (ripple) {
    ripple.remove()
  }

  btn.appendChild(circle)
}

const carousel = document.querySelector('.carousel')
const carouselItems = document.querySelectorAll('.carousel__item')
const timeDisplay = document.querySelector('time')

const carouselItemHeight = carouselItems[0].clientHeight

const itemsGap =
  carouselItems[1].offsetTop - carouselItems[0].offsetTop - carouselItemHeight

carousel.addEventListener('scroll', (event) => {
  const scrollTop = event.currentTarget.scrollTop
  const selectdItemWithNoGap = Math.floor(scrollTop / carouselItemHeight)
  const selectedItem = Math.floor(
    (scrollTop - selectdItemWithNoGap * itemsGap) / carouselItemHeight
  )

  carouselItems.forEach((item, index) =>
    item.setAttribute('data-dimmed', index !== selectedItem)
  )
})

const date = new Date()
timeDisplay.innerText = new Intl.DateTimeFormat('pt-br', {
  hour: 'numeric',
  minute: 'numeric',
}).format(date)

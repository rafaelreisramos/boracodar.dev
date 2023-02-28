const cardsContainer = document.querySelector('.content__cards')
const cardTemplate = document.querySelector('#card-template')

const optionTemplate = document.querySelector('#option-template')
const select = document.querySelector('.select')

const searchForm = document.querySelector('.search')

function updateCard(info) {
  const cardNode = cardTemplate.content.cloneNode(true)
  cardNode.querySelector('.card__img').src = info.img_url
  cardNode.querySelector('.card__img').alt = info.img_description
  cardNode.querySelector('.card__title').innerText = info.name
  cardNode.querySelector('.card__info p').innerText = info.description
  cardNode.querySelector('.card__location span').innerText = info.location
  cardsContainer.append(cardNode)
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const block = document.querySelector('.input').value.toLowerCase()
  const city = document.querySelector('.select').value

  if (!block && !city) {
    loadCards(blocks)
    return
  }

  let filteredBlocks = JSON.parse(JSON.stringify(blocks))
  if (block) {
    filteredBlocks = blocks.filter((item) =>
      item.name.toLowerCase().includes(block) ? item : ''
    )
  }

  if (city) {
    filteredBlocks = filteredBlocks.filter((item) => item.locationSlug === city)
  }

  loadCards(filteredBlocks)
  searchForm.reset()
})

function loadCards(items) {
  cardsContainer.innerHTML = ''
  items.forEach((item) => updateCard(item))
}

function fillOptions(items) {
  const locations = new Set(items.map((item) => `${item.city} - ${item.state}`))
  locations.forEach((location) => {
    const optionNode = optionTemplate.content.cloneNode(true)
    optionNode.querySelector('option').innerText = location
    optionNode.querySelector('option').value = slugify(location.toLowerCase())
    select.append(optionNode)
  })
}

let blocks = []
fetch('./data.json')
  .then((response) => response.json())
  .then((items) => {
    blocks = items.map((item) => ({
      ...item,
      location: `${item.city} - ${item.state}`,
      locationSlug: slugify(`${item.city} - ${item.state}`.toLowerCase()),
    }))

    fillOptions(blocks)
    loadCards(blocks)
  })

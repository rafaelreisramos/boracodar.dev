var selectElements = document.querySelectorAll('.select')

selectElements.forEach(updateFlag)

selectElements.forEach((select) =>
  select.addEventListener('change', (event) => updateFlag(event.target))
)

function updateFlag(element) {
  const spanFlagElement = element.previousElementSibling
  spanFlagElement.className = `flag fi fi-${element.value} fis`
}

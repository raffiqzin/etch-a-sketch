// fetch all the html elements
const gridContainer = document.querySelector('.grid-container')
// const colorPicker = document.querySelector('#color-picker')
const blackButton = document.querySelector('#black')
const gayButton = document.querySelector('#gay')
const eraseButton = document.querySelector('#erase')
const clearButton = document.querySelector('#clear')
const gridSlider = document.querySelector('#size-slider')
const newSize = document.querySelector('#col-x-row')

// create div grids
let defaultNum = 16
let isMouseDown = false

function gridDivs(num) {
  gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`

  for (let i = 0; i < num * num; i++) {
    const divs = document.createElement('div')
    divs.classList.add('box')
    divs.addEventListener('mousedown', (e) => {
      isMouseDown = true
      paintGrid(e)
    })
    divs.addEventListener('mouseover', paintGrid)
    divs.addEventListener('mouseup', paintGrid)
    gridContainer.appendChild(divs)
  }
}

window.onload = () => {
  gridDivs(defaultNum)
}

// update grid size
gridSlider.onmousemove = (e) => newSizeValue(e.target.value)
gridSlider.onchange = (e) => changeSize(e.target.value)

let currentGridSize = defaultNum

function newGridSize(newSize) {
  currentGridSize = newSize
}

function changeSize(value) {
  newGridSize(value)
  newSizeValue(value)
  resetGrid()
}

function newSizeValue(value) {
  newSize.innerHTML = `${value} x ${value}`
}

// reset grid
clearButton.onclick = () => resetGrid()

function clearAllGrid() {
  gridContainer.innerHTML = ''
}

function resetGrid() {
  clearAllGrid()
  gridDivs(currentGridSize)
}

// Paint the grid
const defaultColor = '#000000'
let currentColor = defaultColor

gayButton.onclick = () => setCurrentColor('rainbow')
eraseButton.onclick = () => setCurrentColor('white')
blackButton.onclick = () => setCurrentColor('black')

function setCurrentColor(newColor) {
  currentColor = newColor
}

function paintGrid(event) {
  if (!isMouseDown) return
  if (currentColor === 'rainbow') {
    event.target.style.backgroundColor = `hsl(${
      Math.random() * 360
    }, 100%, 50%)`
  }
  if (currentColor === 'white') {
    event.target.style.backgroundColor = '#FFFFFF'
  }
  if (currentColor === 'black') {
    event.target.style.backgroundColor = currentColor
  }
}


// Stop painting function

function stopPainting() {
  isMouseDown = false
}

document.addEventListener('mouseup', stopPainting)

// Creating variable for container of grid squares.
const grid = document.querySelector('#grid');
let gridSize = parseInt(getComputedStyle(grid).width);

// Updates grid size when window size changes.
function updateGridSize() {
    gridSize = parseInt(getComputedStyle(grid).width);
}

// Updates square size when window size changes.
function updateSquareSize() {
    let gridDimension = Math.sqrt(grid.childElementCount);
    let squareSize = gridSize / gridDimension;
    root.style.setProperty('--square-size', squareSize + 'px');
}

window.addEventListener('resize', updateGridSize);
window.addEventListener('resize', updateSquareSize);

// Root variable to access CSS variables.
const root = document.documentElement;

// Initializing Rainbow Mode as off.
let isRainbowMode = false;

// Function to create grid squares.
function createGridSquares(gridDimension) {
    // Determinining what size the squares should be.
    const squareSize = gridSize / gridDimension;

    // Changing size of squares in CSS.
    root.style.setProperty('--square-size', squareSize + 'px');

    // Determining how many squares we need to create.
    const totalNumOfSquares = gridDimension * gridDimension;
    for (let i = 1; i <= totalNumOfSquares; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        // Adding event listeners to each grid square to fill in.
        if (isRainbowMode) { // If Rainbow Mode is active, squares will init with random hover colors.
            gridSquare.addEventListener('pointerover', setRandomSquareColor);
            gridSquare.addEventListener('touchmove', setRandomSquareColor);
        }
        
        gridSquare.addEventListener('pointerover', addFilledClass);
        gridSquare.addEventListener('touchmove', addFilledClass);

        grid.appendChild(gridSquare);
    }
}

function addFilledClass(e) {
    if (e.type === 'touchmove') {
        let touchedSquare = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (touchedSquare.classList.contains('grid-square')) {
            touchedSquare.classList.add('grid-square-filled');
        }
    }
    e.target.classList.add('grid-square-filled');
}

// Function to clear grid.
function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function promptForGridDimension() {
    let gridDimension = parseInt(prompt('How many squares per side would you like on your new grid?', 16));
    
    // Making sure user enters a valid number.
    while (gridDimension > 100 | isNaN(gridDimension)) {
        alert('Please enter a number no greater than 100!');
        gridDimension = parseInt(prompt('How many squares per side would you like on your new grid?', 16));
    }

    return gridDimension;
}

// Storing clear button and adding click listener
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    clearGrid();
    let gridDimension = promptForGridDimension();
    createGridSquares(gridDimension);
});

// Setting the intial grid to be 16x16.
createGridSquares(16);

// Rainbow Mode.
function generateRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let randomColor = `rgb(${r}, ${g}, ${b})`;
    return randomColor; 
}

function setRandomSquareColor(e) {
    let randomColor = generateRandomColor();

    if (e.type === 'touchmove') {
        let touchedSquare = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (touchedSquare.classList.contains('grid-square')) {
            touchedSquare.style.setProperty('--square-color', randomColor);
        }
    }

    e.target.style.setProperty('--square-color', randomColor);
}

function toggleRainbowMode(e) {
    isRainbowMode = !isRainbowMode;
    if (isRainbowMode) {
        grid.childNodes.forEach(gridSquare => {
            gridSquare.addEventListener('pointerover', setRandomSquareColor);
            gridSquare.addEventListener('touchmove', setRandomSquareColor);
        });
        e.target.classList.add('active-rainbow-mode');
    } else {
        grid.childNodes.forEach(gridSquare => {
            gridSquare.removeEventListener('pointerover', setRandomSquareColor);
            gridSquare.removeEventListener('touchmove', setRandomSquareColor);
        });
        e.target.classList.remove('active-rainbow-mode');
    }
}

// Storing Rainbow Mode button and adding event listener.
const rainbowModeButton = document.querySelector('#rainbow-mode');
rainbowModeButton.addEventListener('click', toggleRainbowMode)
// Creating variables for container of grid squares...
const grid = document.querySelector('#grid');
// ...And root to access CSS variables.
const root = document.documentElement;

// Initializing Rainbow Mode as off.
let isRainbowMode = false;

// Function to create grid squares.
function createGridSquares(gridDimension) {
    // Determinining what size the squares should be.
    const squareSize = 500 / gridDimension;

    // Changing size of squares in CSS.
    root.style.setProperty('--square-size', squareSize + 'px');

    // Determining how many squares we need to create.
    const totalNumOfSquares = gridDimension * gridDimension;
    for (let i = 1; i <= totalNumOfSquares; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        // Adding event listeners to each grid square to fill in.
        if (isRainbowMode) { // If Rainbow Mode is active, squares will init with random hover colors.
            gridSquare.addEventListener('mouseover', setRandomSquareColor);
        }
        
        gridSquare.addEventListener('mouseover', addFilledClass);

        grid.appendChild(gridSquare);
    }
}

function addFilledClass(e) {
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
    e.target.style.setProperty('--square-color', randomColor);
}

function toggleRainbowMode(e) {
    isRainbowMode = !isRainbowMode;
    if (isRainbowMode) {
        grid.childNodes.forEach(gridSquare => gridSquare.addEventListener(
            'mouseover', setRandomSquareColor
        ));
        e.target.classList.add('active-rainbow-mode');
    } else {
        grid.childNodes.forEach(gridSquare => gridSquare.removeEventListener(
            'mouseover', setRandomSquareColor
        ));
        e.target.classList.remove('active-rainbow-mode');
    }
}

// Storing Rainbow Mode button and adding event listener.
const rainbowModeButton = document.querySelector('#rainbow-mode');
rainbowModeButton.addEventListener('click', toggleRainbowMode)
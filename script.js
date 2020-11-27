// Selecting container of grid squares.
const grid = document.querySelector('#grid');

// Creating 16x16 grid squares.
for (let i = 1; i <= 256; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    grid.appendChild(gridSquare);
}

function addFilledClass(e) {
    e.target.classList.add('grid-square-filled');
}

// Adding event listeners to each grid square to fill in.
grid.childNodes.forEach(gridSquare => 
    gridSquare.addEventListener('mouseover', addFilledClass)
);

// Function to clear grid.
// function clearGrid(e) {
//     grid.childNodes.forEach(gridSquare =>
//         gridSquare.)
// }

const clearButton = document.querySelector('#clear');
// clearButton.addEventListener('click')
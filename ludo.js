// Select DOM elements
const redPiece = document.getElementById('red-piece');
const greenPiece = document.getElementById('green-piece');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const diceResult = document.getElementById('dice-result');
const currentPlayerDisplay = document.getElementById('current-player');
const diceRollSound = document.getElementById('dice-roll-sound');
const pieceKickSound = document.getElementById('piece-kick-sound');
const winSound = document.getElementById('win-sound');

// Game state variables
let currentPlayer = 'Red';
let redPosition = 0; 
let greenPosition = 0;
const boardSize = 25;

// Dice rolling function
function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = diceValue;

    diceRollSound.play();

    if (currentPlayer === 'Red') {
        movePiece(redPiece, diceValue, 'Red');
    } else {
        movePiece(greenPiece, diceValue, 'Green');
    }

    switchPlayer();
}

// Move player's piece based on dice roll
function movePiece(piece, diceValue, player) {
    if (player === 'Red') {
        redPosition += diceValue;
        if (redPosition >= boardSize) {
            winGame('Red');
        }
        updatePiecePosition(piece, redPosition);
    } else if (player === 'Green') {
        greenPosition += diceValue;
        if (greenPosition >= boardSize) {
            winGame('Green');
        }
        updatePiecePosition(piece, greenPosition);
    }

    // Check if pieces land on the same position
    if (redPosition === greenPosition) {
        if (player === 'Red') {
            greenPosition = 0;
        } else {
            redPosition = 0;
        }
        updatePiecePosition(piece, player === 'Red' ? greenPiece : redPiece, 0);
        pieceKickSound.play();
    }
}

// Update piece position on the grid
function updatePiecePosition(piece, position) {
    const cell = document.querySelector(`[data-index='${position}']`);
    piece.style.top = `${cell.offsetTop}px`;
    piece.style.left = `${cell.offsetLeft}px`;
}

// Switch to other player's turn
function switchPlayer() {
    currentPlayer = currentPlayer === 'Red' ? 'Green' : 'Red';
    currentPlayerDisplay.textContent = currentPlayer;
}

// Win the game
function winGame(player) {
    alert(`${player} wins!`);
    winSound.play();
    resetGame();
}

// Reset the game
function resetGame() {
    redPosition = 0;
    greenPosition = 0;
    updatePiecePosition(redPiece, redPosition);
    updatePiecePosition(greenPiece, greenPosition);
    currentPlayer = 'Red';
    currentPlayerDisplay.textContent = 'Red';
}

// Event listener for the dice roll button
rollDiceBtn.addEventListener('click', rollDice);

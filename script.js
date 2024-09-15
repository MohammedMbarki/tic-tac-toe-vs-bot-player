const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.getElementById('restart');
const vsBotBtn = document.getElementById('vsBot');
const vsPlayerBtn = document.getElementById('vsPlayer');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playAgainstBot = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleClick(e) {
    const cellIndex = e.target.getAttribute('data-index');
    
    if (board[cellIndex] !== '' || !gameActive) return;

    updateBoard(cellIndex, currentPlayer);
    checkWinner();

    if (gameActive && playAgainstBot && currentPlayer === 'O') {
        setTimeout(botTurn, 500); // Bot plays after 0.5s
    }
}

// Bot randomly picks an available cell
function botTurn() {
    let availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    
    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    updateBoard(randomIndex, 'O');
    checkWinner();
}

// Update the board with the current player's move
function updateBoard(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if there's a winner or a tie
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = 'It\'s a Tie!';
        gameActive = false;
        return;
    }
}

// Restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}

// Switch to "vs Bot" mode
function switchToBotMode() {
    playAgainstBot = true;
    vsBotBtn.classList.add('primary');
    vsPlayerBtn.classList.remove('primary');
    restartGame();
}

// Switch to "vs Player" mode
function switchToPlayerMode() {
    playAgainstBot = false;
    vsPlayerBtn.classList.add('primary');
    vsBotBtn.classList.remove('primary');
    restartGame();
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
vsBotBtn.addEventListener('click', switchToBotMode);
vsPlayerBtn.addEventListener('click', switchToPlayerMode);

let currentPlayer = 'X';
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            statusDisplay.textContent = `Player ${cells[a].textContent} wins!`;
            return true;
        }
    }

    // Check for draw
    const isDraw = [...cells].every(cell => cell.textContent);
    if (isDraw) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
        return true;
    }

    return false;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            if (!checkWinner()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
});

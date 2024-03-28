// DOM Elements
const resetBtn = document.querySelector('.reset-btn');
const startBtn = document.querySelector('.start-btn');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const gameState = document.querySelector('.game-state');
const grid = document.querySelector('.grid');

const scoreBoard = document.querySelector('.score-wrap')
const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');

// Initial UI State
resetBtn.style.display = 'none';

// Game Board Module
const gameBoard = (() => {
    let board = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]];

    let currentPlayer = 'X';

    let playerScores = {
        'X': 0,
        'O': 0
    }

    // Function to update score
    const updateScore = () => {
        
        if (checkWin()) {
            playerScores[currentPlayer] += 1;

            p1Score.textContent = playerScores['X'];
            p2Score.textContent = playerScores['O'];
        }

    };

    // Function to update game state display
    const updateGameStateDisplay = (message = null) => {
        let displayMessage = message;

        if (!displayMessage) {
        const playerName = currentPlayer === 'X' ? player1.value : player2.value;
        displayMessage = `It's your turn, ${playerName}`;

        }

        gameState.textContent = displayMessage;

        console.log('game state updated');

    }

    // Game control functions
    const reset = () => {
        board = board.map(row => row.map(() => null));
        currentPlayer = 'X';
        updateGameStateDisplay();
    };

    const makeMove = (row, col) => {
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === null) {
            board[row][col] = currentPlayer;
        
            if (checkWin()) {
                const winnerName = currentPlayer === 'X' ? player1.value : player2.value;
                updateGameStateDisplay(`${winnerName} is the winner!`);
                console.log(`${currentPlayer} is the winner!`);
                updateScore();
                return 'win';
            } else if (checkDraw()) {
                updateGameStateDisplay(`It's a draw!`);
                console.log(`It's a draw!`);
                return 'draw';
            } 
            return true;

        }

        return false;

    }

    // Win condition checks
    const checkWin = () => {

        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== null) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== null) {
                return true;
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
            return true;
        }

        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== null) {
            return true;
        }

        return false;

    };

    // Draw condition check
    const checkDraw = () => {
        if (checkWin()) {
            return false;
        }
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    const getCurrentPlayer = () => currentPlayer;

    const togglePlayer = () => {
        if (!checkWin() && !checkDraw()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStateDisplay();

        }
    }

    // Expose public methods
    return { reset, makeMove, checkWin, checkDraw, getCurrentPlayer, togglePlayer, updateGameStateDisplay };

})();

// Renders game UI
const renderGame = () => {

    grid.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.className = 'row';
    

        for (let j = 0; j < 3; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.className = 'gridSquare';

            if (i === 0) gridSquare.classList.add('top-border');
            if (i === 2) gridSquare.classList.add('bottom-border');
            if (j === 0) gridSquare.classList.add('left-border');
            if (j === 2) gridSquare.classList.add('right-border');

            row.appendChild(gridSquare);
            gridSquare.addEventListener('click', () => {

                gridSquare.textContent = gameBoard.getCurrentPlayer();
                if(gameBoard.makeMove(i, j) !== false) {

                    gameBoard.togglePlayer();

                }

            }, { once: true });
        };

    grid.appendChild(row);  

    console.log('gameboard is rendered')

    }

}

// Clear board logic
const clearBoard = () => {
    const sqaures = document.querySelectorAll('.gridSquare');
    sqaures.forEach(square => {
        square.textContent = null;
    })
};


// Event listeners
startBtn.addEventListener('click', () => {
    if (player1.value !== '' && player2.value !== '') {
    renderGame();
    console.log('game has started');
    
    player1.style.display = 'none';
    player2.style.display = 'none';
    startBtn.style.display = 'none';
    scoreBoard.style.display = 'flex';


    resetBtn.style.display = 'block';
    gameBoard.updateGameStateDisplay();

    } else {
        alert('You must enter player names before you can start!');
    }
})

resetBtn.addEventListener('click', () => {
    clearBoard();
    gameBoard.reset();
    renderGame();
    console.log('game has been reset');
});


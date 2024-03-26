const resetBtn = document.querySelector('.reset-btn');
const startBtn = document.querySelector('.start-btn');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const gameState = document.querySelector('.game-state');
resetBtn.style.display = 'none';

// make it so start button doesnt work until player1 and 2 have been filled out
// reset button doesnt work until checkWin of checkDraw is true
// player1 and 2 values are stored in variables and used to say who's turn it is

const gameBoard = (() => {
    let board = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]];

    let currentPlayer = 'X';

    const updateGameStateDisplay = () => {
        const playerName = currentPlayer === 'X' ? player1.value : player2.value;
        gameState.textContent = `It's your turn, ${playerName}`;
        console.log('game state updated');
    }

    const reset = () => {
        board = board.map(row => row.map(() => null));
        currentPlayer = 'X';
    };

    const makeMove = (row, col) => {
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === null) {
            board[row][col] = currentPlayer;
        
            if (checkWin()) {
                console.log(`${currentPlayer} is the winner!`);
                return 'win';
            } else if (checkDraw()) {
                console.log(`It's a draw!`);
                return 'draw';
            } 

            return true;

        }

        return false;

    }

    const getCurrentPlayer = () => currentPlayer;

    const printBoard = () => {
        console.log(board.map(row => row.join(' | ')).join('\n'))
    }

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

    const togglePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStateDisplay();
    }

    return { reset, makeMove, printBoard, checkWin, checkDraw, getCurrentPlayer, togglePlayer, updateGameStateDisplay };

})();

const grid = document.querySelector('.grid');

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

            });
        };

    grid.appendChild(row);  

    console.log('gameboard is rendered')

    }

}



const clearBoard = () => {
    const sqaures = document.querySelectorAll('.gridSquare');
    sqaures.forEach(square => {
        square.textContent = null;
    })
};

startBtn.addEventListener('click', () => {
    if (player1.value !== '' && player2.value !== '') {
    renderGame();
    console.log('game has started');
    
    player1.style.display = 'none';
    player2.style.display = 'none';
    startBtn.style.display = 'none';

    resetBtn.style.display = 'block';
    gameBoard.updateGameStateDisplay();

    } else {
        alert('You must enter player names before you can start!');
    }
})

resetBtn.addEventListener('click', () => {
    clearBoard();
    gameBoard.reset();
    console.log('game has been reset');
});

const player = (name, symbol, score) => {

    return {
        name, symbol, score
        }
};




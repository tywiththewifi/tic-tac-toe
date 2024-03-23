const gameBoard = (() => {
    let board = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]];


        const reset = () => {
            board = board.map(row => row.map(() => null));
        };

        const makeMove = (row, col, symbol) => {
            if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === null) {
                board[row][col] = symbol;
                return true;
            }
            return false;
        }

        const printBoard = () => {
            console.log(board.map(row => row.join(' | ')).join('\n'))
        }

        const checkWin = () => {

            for (let row = 0; row < 3; row++) {
                if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== '') {
                    return true;
                }
            }

            for (let col = 0; col < 3; col++) {
                if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== '') {
                    return true;
                }
            }

            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
                return true;
            }

            if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '') {
                return true;
            }

            return false;


        };

        return { reset, makeMove, printBoard, checkWin };

})();

const player = (name, symbol, score) => {

    return {
        name, symbol, score
        }
    };



const GameBoard = (function(){
    const Board = new Array(9).fill(null);
    function markSlot(slot, symbol = null) {
        Board[slot] = symbol;
    }
    function getBoard() {
        return Board;
    }
    return {markSlot, getBoard}
})()

const PlayGame = (function(){
    const players = [
        {
            name: 'Player 1',
            symbol: 'X'
        },
        {
            name: 'Player 2',
            symbol: 'O'
        }
    ]
    let currentPlayer;
    let winner;
    let finalMessage;
    const status = document.querySelector('#status');
    currentPlayer = players[0];
    status.textContent = `${currentPlayer.name}'s turn`;

    const resetBtn = document.querySelector('button');
    resetBtn.addEventListener('click', resetGame);

    const domBoard = document.getElementById('board');
    domBoard.addEventListener('click', boardListener)

    function boardListener(e) {
        const slot = parseInt(e.target.id);
        const currentBoard = GameBoard.getBoard();
        if(currentBoard[slot] !== null) {
            return;
        }
        GameBoard.markSlot(slot, currentPlayer.symbol);
        document.getElementById(e.target.id).innerText = currentPlayer.symbol;
        if(winCheck()) {
            declareResult();
            return;
        }
        currentPlayer = (currentPlayer === players[0])? players[1] : players[0];
        status.textContent = `${currentPlayer.name}'s turn`;
    }

    function winCheck() {
        const cb = GameBoard.getBoard(); //currentBoard
        if((cb[0]===cb[1] && cb[1]===cb[2] && cb[2]!==null) || (cb[3]===cb[4] && cb[4]===cb[5] && cb[5]!==null) ||
            (cb[6]===cb[7] && cb[7]===cb[8] && cb[8]!==null) || (cb[0]===cb[3] && cb[3]===cb[6] && cb[6]!==null) ||
            (cb[1]===cb[4] && cb[4]===cb[7] && cb[7]!==null) || (cb[2]===cb[5] && cb[5]===cb[8] && cb[8]!==null) ||
            (cb[0]===cb[4] && cb[4]===cb[8] && cb[8]!==null) || (cb[2]===cb[4] && cb[4]===cb[6] && cb[6]!==null)
        ) {
            winner = currentPlayer;
        } else if (cb[0] && cb[1] && cb[2] && cb[3] && cb[4] && cb[5] && cb[6] && cb[7] && cb[8]) {
            winner = 'tie';
        } else {
            winner = null;
        }
        return winner;
    }

    function declareResult() {
        domBoard.removeEventListener('click', boardListener);
        if(winner === players[0] || winner === players[1]) {
            finalMessage = `${winner.name} wins the game!`
        } else if(winner === 'tie') {
            finalMessage = "Can you believe it? It's a tie!"
        } else {
            finalMessage = "There was an error in the game"
        }
        status.textContent = finalMessage;
    }

    function resetGame() {
        location.reload()
    }
})()
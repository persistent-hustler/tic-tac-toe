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

    while(!winCheck()) {
        currentPlayer = (currentPlayer === players[0])? players[1] : players[0];
        const slot = +prompt(`${currentPlayer.name}'s turn`);
        const currentBoard = GameBoard.getBoard();
        if(currentBoard[slot] !== null) {
            console.log('Pick an unpicked number between 0 and 8')
            continue;
        }
        GameBoard.markSlot(slot, currentPlayer.symbol);
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

    if(winner === players[0] || winner === players[1]) {
        finalMessage = `${winner.name} wins the game!`
    } else if(winner === 'tie') {
        finalMessage = "Can you believe it? It's a tie!"
    } else {
        finalMessage = "There was an error in the game"
    }

    console.log(finalMessage)
})()
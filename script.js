/*
GameBoard -> Board, Win Check, {Marking function(n,symbol)}
PlayGame -> Players, Symbols
Display Controller
*/

const GameBoard = (function(){
    const Board = new Array(9).fill(null);
    function markSlot(slot, symbol = null) {
        Board[slot] = symbol;
    }
    function logBoard() {
        console.log(Board)
    }
    return {markSlot, logBoard}
})()
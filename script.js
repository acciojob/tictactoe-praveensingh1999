//your JS code here. If required.
const submitButton = document.getElementById('submit');
const inputSection = document.querySelector('#inputdata');
const gameSection = document.querySelector('.game-section');
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let players = [];
let currentPlayer = 0;
let board = Array(9).fill(null);

const winningCombination = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let winnerdata = null;

function handleCellClick(index){
    if(board[index] || checkWinner()) return;

    board[index] = currentPlayer === 0 ? 'X' : 'O';
    document.getElementById(index).textContent = board[index];

    if(checkWinner()){
        messageElement.textContent = `${players[currentPlayer]} congratulations you won!`;
        for(let i=0;i<winnerdata.length;i++){
            document.getElementById(`${winnerdata[i]}`).style.backgroundColor = "violet";
        }
    } else if(board.every(cell => cell)){
        messageElement.textContent = "It's a Draw!";
    } else {
        currentPlayer = 1 - currentPlayer;
        messageElement.textContent = `${players[currentPlayer]}, you're up`;
    }
}

function checkWinner() {
    const symbol = currentPlayer === 0 ? 'X' : 'O';
    return winningCombination.some(combination => {
        if (combination.every(index => board[index] === symbol)) {
            winnerdata = combination; 
            return true;
        }
        return false;
    });
}

document.querySelector("#submit").addEventListener('click', () => {
    const player1 = document.getElementById('player-1').value.trim();
    const player2 = document.getElementById('player-2').value.trim();

    if(!player1 || !player2) return; 

    players = [player1, player2];
    currentPlayer = 0;
    board.fill(null);
    winnerdata = null;

    for(let i = 0; i < 9; i++){
        const cell = document.getElementById(i);
        cell.textContent = '';
        cell.style.backgroundColor = ''; // reset old winner colors
        cell.replaceWith(cell.cloneNode(true)); // removes old listeners
        document.getElementById(i).addEventListener('click', () => handleCellClick(i));
    }

    inputSection.style.display = "none";
    gameSection.style.display = "block";
    messageElement.textContent = `${players[currentPlayer]}, you're up`;
});

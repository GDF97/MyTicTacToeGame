const X_ClASS = 'x';
const CIRCLE_CLASS = 'circle';
const messageBox = document.querySelector('.message-box');
const messageWinner = document.querySelector('.message-winner');
const restartButton = document.querySelector('.restartButton');
const cellElements = document.querySelectorAll('.cell');
let circle_Turn
const WINS_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

StartGame();

function StartGame(){
    circle_Turn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_ClASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleClick, {once: true});
    })
    messageBox.classList.remove('active');
}

function handleClick(e){
    cell = e.target;
    const currentPlayer = circle_Turn ? CIRCLE_CLASS : X_ClASS;
    PlayerMark(cell, currentPlayer);
    if(WinnerCase(currentPlayer)){
        EndGame(false);
    }
    else if(draw()){
        EndGame(true);
    }
    else{
        SwitchPlayers();
    }
}

function PlayerMark(cell, currentPlayer){
    cell.classList.add(currentPlayer);
}

function SwitchPlayers(){
    circle_Turn = !circle_Turn;
}

function WinnerCase(currentPlayer){
    return WINS_COMBINATION.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

function EndGame(draw){
    if(draw){
        messageBox.classList.add('active');
        messageWinner.innerHTML = 'EMPATE'
    }
    else{
        messageBox.classList.add('active')
        messageWinner.innerHTML = circle_Turn ? "O Venceu!!!" : "X Venceu";
    }
}

function draw(){
    return[...cellElements].every(cell =>{
        return cell.classList.contains(X_ClASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

restartButton.addEventListener('click', ()=>{
    window.location.href = "index.html";
})
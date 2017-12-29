var board = document.querySelector('.board-js');
var allCells = document.querySelectorAll('td');
var BOMB;
var matrixOrigin = [
    [1, 1, 1, ''],
    [1, BOMB, 1, ''],
    [1, 1, 2, 1],
    ['', '', 1, BOMB]
];
var visitedCells = 0;
var infor = document.getElementById('note');
var again = document.getElementById('restart');

board.addEventListener('click', displayCell);
restart.addEventListener('click', restartGame);
document.body.addEventListener('click', checkTarget);

function displayCell(event) {
    if (event.target.matches('td')) {
        checkVisitedCell(event);
        var value = getCell(event);
        switch (value) {
            case '':
                note.textContent = '';
                event.target.style.backgroundColor = '#51cab4';
                event.target.setAttribute('data-status', 'visited');
                break;
            case BOMB:
                note.style.color = 'white';
                note.textContent = '¡Ha explotado!';
                showMatrix(event);
                board.removeEventListener('click', displayCell);
                document.body.removeEventListener('click', checkTarget);
                break;
            default:
                note.textContent = '';
                event.target.textContent = value;
                event.target.setAttribute('data-status', 'visited');
        }
        event.stopPropagation();
        checkWinner(event);
    } else {
        checkTarget(event);
    }
}

function checkTarget(event) {
    note.textContent = 'Sigue jugando';
    event.stopPropagation();
}

function getCell(event) {
    var row = parseInt(event.target.parentElement.dataset.row) - 1;
    var column = parseInt(event.target.dataset.column) - 1;
    return matrixOrigin[row][column];
}

function checkVisitedCell(event) {
    if (event.target.dataset.status != 'visited')
        visitedCells++;
}

function showMatrix(event) {
    for (var i = 0; i < matrixOrigin.length; i++) {
        for (var j = 0; j < matrixOrigin[i].length; j++) {
            if (matrixOrigin[i][j] == BOMB) {
                allCells[i * 4 + j].style.backgroundImage = 'assets/images/bomba.png';
                allCells[i * 4 + j].className = 'bomb';
            }
        }
    }
}

function checkWinner(event) {
    var bombCells = allCells.length - visitedCells;
    if (bombCells == 2) {
        note.style.color = '#0D6866';
        note.textContent = '¡Ganaste!';
        board.removeEventListener('click', displayCell);
        document.body.removeEventListener('click', checkTarget);
    }
}

function restartGame(event) {
    visitedCells = 0;
    note.textContent = '';
    for (var i = 0; i < allCells.length; i++) {
        allCells[i].className = '';
        allCells[i].textContent = '';
        allCells[i].style.backgroundColor = '';
        allCells[i].removeAttribute('data-status');
    }
    event.stopPropagation();
    board.addEventListener('click', displayCell);
    document.body.addEventListener('click', checkTarget);
}
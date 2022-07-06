const playerClassX = 'x'
const playerClassO = 'circle'
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const boardElement = document.getElementById("boardi")

let isPlayer_O_Turn = false;

startGame()

restartButton.addEventListener('click', startGame)

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
    } else {
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerClassX) || cell.classList.contains(playerClassO)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
    boardElement.classList.remove(playerClassX)
    boardElement.classList.remove(playerClassO)

    if (isPlayer_O_Turn) {
        boardElement.classList.add(playerClassO)
    } else {
        boardElement.classList.add(playerClassX)
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function handleCellclick(evt) {
    const cell = evt.target
    const currentClass = isPlayer_O_Turn ? playerClassO : playerClassX
    placeMark(cell, currentClass)
    
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function startGame() {
    isPlayer_O_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerClassX)
        cell.classList.remove(playerClassO)
        cell.removeEventListener('click', handleCellclick)
        cell.addEventListener('click', handleCellclick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
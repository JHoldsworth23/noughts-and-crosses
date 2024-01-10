const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    }

    return { getSymbol };
}

const gameboard = (function () {

    const grid = ['', '', '', '', '', '', '', '', ''];

    const setSymbol = (index, symbol) => {
        if (index > grid.length) return;
        grid[index] = symbol; 
    }; 

    const getSymbol = (index) => {
        if (index > grid.length) return;
        return grid[index]
    }
    
    return { setSymbol, getSymbol };
})();

const displayGame = (function () {

    const divElements = document.querySelectorAll('.grid-items');
    const restartBtn = document.querySelector('.restart');

    divElements.forEach((div) => {
        div.addEventListener('click', (e) => {
            div.textContent = gameplay.playRound(parseInt(e.target.dataset.index));
            updateGameDisplay();
        });
    });

    restartBtn.addEventListener('click', () => {
        for (let i = 0; i < divElements.length; i++) {
            divElements[i].textContent = '';
        }
    });

    const updateGameDisplay = () => {
        for (let i = 0; i < divElements.length; i++) {
            divElements[i].textContent = gameboard.getSymbol(i);
        }
    }

    return { updateGameDisplay };
})();

const gameplay = (function () {
    
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const playRound = (index) => {
        gameboard.setSymbol(index, currentPlayer());
        round++;
    }

    const currentPlayer = () => {
        return round % 2 === 0 ? playerO.getSymbol() : playerX.getSymbol();
    }

    return { playRound };
})();
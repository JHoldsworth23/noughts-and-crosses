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
    };

    const resetGrid = () => {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = '';
        }
    };
    
    return { setSymbol, getSymbol, resetGrid };
})();

const displayGame = (function () {

    const divElements = document.querySelectorAll('.grid-items');
    const restartBtn = document.querySelector('.restart');
    // message document query selector

    divElements.forEach((div) => {
        div.addEventListener('click', (e) => {
            if (e.target.textContent !== "") return;
            div.textContent = gameplay.playRound(parseInt(e.target.dataset.index));
            updateGameDisplay();
        });
    });

    restartBtn.addEventListener('click', () => {
        gameboard.resetGrid();
        updateGameDisplay();
    });

    const updateGameDisplay = () => {
        for (let i = 0; i < divElements.length; i++) {
            divElements[i].textContent = gameboard.getSymbol(i);
        }
    }

    // MESSAGE

    return { updateGameDisplay };
})();

const gameplay = (function () {
    
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const playRound = (index) => {
        gameboard.setSymbol(index, currentPlayer());
        if (round > 4 && checkWinPattern(index)) {
            // display a message to announce the winner
            isOver = true;
            return;
        }
        if (round === 9) {
            // display a message to announce it's a draw
            isOver = true;
            return;
        }
        // announce the next player
        round++;
    }

    const currentPlayer = () => {
        return round % 2 === 0 ? playerO.getSymbol() : playerX.getSymbol();
    }

    const checkWinPattern = () => {}

    return { playRound };
})();
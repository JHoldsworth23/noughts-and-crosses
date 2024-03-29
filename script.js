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
        return grid[index];
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
    const message = document.querySelector('.message');

    divElements.forEach((div) => {
        div.addEventListener('click', (e) => {
            if (gameplay.isGameOver() || e.target.textContent !== "") return;
            div.textContent = gameplay.playRound(parseInt(e.target.dataset.index));
            updateGameDisplay();
        });
    });

    restartBtn.addEventListener('click', () => {
        gameboard.resetGrid();
        gameplay.resetGame();
        displayMessage("Player X's turn");
        updateGameDisplay();
    });

    const updateGameDisplay = () => {
        for (let i = 0; i < divElements.length; i++) {
            divElements[i].textContent = gameboard.getSymbol(i);
            divElements[i].style.color = gameboard.getSymbol(i) === 'X' ? '#DC143C' : '#008B8B';
        }
    }

    const displayMessage = (text) => {
        message.textContent = text;
    }

    const displayResult = (winner) => {
        if (winner === "draw") {
            message.textContent = "It's a draw!";
        } else {
            message.textContent = `Player ${winner} has won!`;
        }
    }

    return { displayMessage, displayResult };
})();

const gameplay = (function () {
    
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const playRound = (index) => {
        gameboard.setSymbol(index, currentPlayer());
        if (round > 4 && checkWinPattern(index)) {
            displayGame.displayResult(currentPlayer());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayGame.displayResult("draw");
            isOver = true;
            return;
        }
        round++;
        displayGame.displayMessage(`Player ${currentPlayer()}'s turn`);
    }

    const currentPlayer = () => {
        return round % 2 === 0 ? playerO.getSymbol() : playerX.getSymbol();
    }

    const checkWinPattern = (index) => {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningPatterns
            .filter((combination) => combination.includes(index))
            .some((possibleCombo) => possibleCombo.every((index) => gameboard.getSymbol(index) === currentPlayer()));
    }

    const isGameOver = () => {
        return isOver;
    }

    const resetGame = () => {
        round = 1;
        isOver = false;
    }

    return { playRound, isGameOver, resetGame };
})();

const copyright = document.querySelector('.copyright');
const date = new Date();
copyright.textContent = `Copyright ©️ ${date.getFullYear()} JHoldsworth23`

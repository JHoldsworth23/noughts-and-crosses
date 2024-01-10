const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    }

    return { getSymbol };
}

const displayGame = (function () {

    const divElements = document.querySelectorAll('.grid-items');
    const restartBtn = document.querySelector('.restart');

    divElements.forEach((div) => {
        div.addEventListener('click', () => {
            div.textContent = 'X';
        });
    });

    restartBtn.addEventListener('click', () => {
        for (let i = 0; i < divElements.length; i++) {
            divElements[i].textContent = '';
        }
    });

})();

const gameplay = (function () {
    
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    console.log(playerX.getSymbol());
})();
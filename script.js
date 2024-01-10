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
    
    const playerX = 'X';
    const playerO = 'O';
    let round = 1;
    let isOver = false;

})();
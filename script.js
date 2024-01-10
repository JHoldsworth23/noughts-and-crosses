const gameplay = (function () {

    const divElements = document.querySelectorAll('.grid-items');

    divElements.forEach((div) => {
        div.addEventListener('click', () => {
            div.textContent = 'X';
        });
    });

})();
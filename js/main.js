'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.querySelector('.tic-tac-toe__start-btn'),
        gameArea = document.querySelector('.tic-tac-toe__game-area');
    let flag = 0;

    let winArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    function clearArr(arr) {
        arr.forEach(item => {
            for (let i = 0; i < item.length; i++) {
                item[i] = 0;
            }
        });
    }

    function showHideScreens(screenToHide, screenToShow) {
        document.querySelector(screenToHide).style.display = 'none';
        document.querySelector(screenToShow).style.display = 'block';
    }

    startBtn.addEventListener('click', () => {
        showHideScreens('.first-screen', '.second-screen');
    });

    function resetGame(selector, selectorToDel = '') {
        const btn = document.querySelector(selector);

        btn.addEventListener('click', () => {
            document.querySelectorAll('.square').forEach(square => {
                if (square.children[0] !== undefined && square.classList.contains('checked')) {
                    square.removeChild(square.children[0]);
                    square.classList.remove('checked');
                }
                if (selectorToDel !== '') {
                    const thirdScreen = document.querySelector('.third-screen');
                    if (thirdScreen.children[1] !== undefined && thirdScreen.children[1].classList.contains('win')) {
                        thirdScreen.removeChild(thirdScreen.children[1]);
                        showHideScreens('.third-screen', '.first-screen');
                    }
                } else {
                    showHideScreens('.second-screen', '.first-screen');
                }

                clearArr(winArray);
            });
        });
    }

    resetGame('.tic-tac-toe__reset-btn', '.win');
    resetGame('.reset');

    function createItem(parentSelector, activeClass, text) {
        const elem = document.createElement('div');
        elem.classList.add(activeClass.replace(/\./, ''));
        elem.textContent = text;
        document.querySelector(parentSelector).appendChild(elem);
    }

    gameArea.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('square')) {
            if (flag === 0 && !target.classList.contains('checked')) {
                target.classList.add('checked');

                const elem = document.createElement('div');
                elem.classList.add('round');
                target.appendChild(elem);

                flag += 1;
            }

            if (flag === 1 && !target.classList.contains('checked')) {
                target.classList.add('checked');

                const elem = document.createElement('div');
                elem.classList.add('cross');
                elem.innerHTML = '&#10006;';
                target.appendChild(elem);

                flag -= 1;
            }

            //* Заполняю массив, чтобы вычислять победу
            document.querySelectorAll('.square').forEach((item, i) => {
                if (i === 3 || i === 0 || i === 6) {
                    if (item.classList.contains('checked') && item.children[0].classList.contains('cross')) {
                        winArray[Math.trunc(i / 3)][0] = 1;
                    }
                    if (item.classList.contains('checked') && item.children[0].classList.contains('round')) {
                        winArray[Math.trunc(i / 3)][0] = 2;
                    }
                } else if (i === 1 || i === 4 || i == 7) {
                    if (item.classList.contains('checked') && item.children[0].classList.contains('cross')) {
                        winArray[Math.trunc(i / 3)][1] = 1;
                    }
                    if (item.classList.contains('checked') && item.children[0].classList.contains('round')) {
                        winArray[Math.trunc(i / 3)][1] = 2;
                    }
                } else {
                    if (item.classList.contains('checked') && item.children[0].classList.contains('cross')) {
                        winArray[Math.trunc(i / 3)][2] = 1;
                    }
                    if (item.classList.contains('checked') && item.children[0].classList.contains('round')) {
                        winArray[Math.trunc(i / 3)][2] = 2;
                    }
                }
            });
            //* Побеждают крестики

            if (winArray[0].slice(0, 3).every(num => num === 1) || winArray[1].slice(0, 3).every(num => num === 1) || winArray[2].slice(0, 3).every(num => num === 1)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Crosses won!');
            }
            if ([winArray[0][0], winArray[1][1], winArray[2][2]].every(num => num === 1)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Crosses won!');
            }
            if ([winArray[0][2], winArray[1][1], winArray[2][0]].every(num => num === 1)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Crosses won!');
            }
            if ([winArray[0][0], winArray[1][0], winArray[2][0]].every(num => num === 1) || [winArray[0][1], winArray[1][1], winArray[2][1]].every(num => num === 1) || [winArray[0][2], winArray[1][2], winArray[2][2]].every(num => num === 1)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Crosses won!');
            }
            //* Побеждают нолики
            if (winArray[0].slice(0, 3).every(num => num === 2) || winArray[1].slice(0, 3).every(num => num === 2) || winArray[2].slice(0, 3).every(num => num === 2)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Rounds won!');
            }
            if ([winArray[0][0], winArray[1][1], winArray[2][2]].every(num => num === 2)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Rounds won!');
            }
            if ([winArray[0][2], winArray[1][1], winArray[2][0]].every(num => num === 2)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Rounds won!');
            }
            if ([winArray[0][0], winArray[1][0], winArray[2][0]].every(num => num === 2) || [winArray[0][1], winArray[1][1], winArray[2][1]].every(num => num === 2) || [winArray[0][2], winArray[1][2], winArray[2][2]].every(num => num === 2)) {
                showHideScreens('.second-screen', '.third-screen');

                createItem('.third-screen', '.win', 'Rounds won!');
            }
        }
    });
});
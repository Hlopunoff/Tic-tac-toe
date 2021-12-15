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

    startBtn.addEventListener('click', () => {
        document.querySelector('.first-screen').style.display = 'none';
        document.querySelector('.second-screen').style.display = 'block';
    });

    function resetGame(selector) {
        const btn = document.querySelector(selector);

        btn.addEventListener('click', () => {
            document.querySelectorAll('.square').forEach(square => {
                if (square.children[0] !== undefined && square.classList.contains('checked')) {
                    square.removeChild(square.children[0]);
                    square.classList.remove('checked');
                }

                document.querySelector('.first-screen').style.display = 'block';
                document.querySelector('.second-screen').style.display = 'none';
                document.querySelector('.third-screen').style.display = 'none';

            });
        });
    }

    resetGame('.tic-tac-toe__reset-btn');
    resetGame('.reset');

    gameArea.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('square')) {
            if (flag === 0 && !target.classList.contains('checked')) {
                target.classList.add('checked');

                const round = document.createElement('div');
                round.classList.add('round');
                target.appendChild(round);

                flag += 1;
            }

            if (flag === 1 && !target.classList.contains('checked')) {
                target.classList.add('checked');

                const cross = document.createElement('div');
                cross.innerHTML = '&#10006;';
                cross.classList.add('cross');
                target.appendChild(cross);

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
            console.log(winArray);
            //* Побеждают крестики
            if (winArray[0].slice(0, 3).every(num => num === 1) || winArray[1].slice(0, 3).every(num => num === 1) || winArray[2].slice(0, 3).every(num => num === 1)) {
                console.log('Crosses Win!');
            }
            if ([winArray[0][0], winArray[1][1], winArray[2][2]].every(num => num === 1)) {
                console.log('Crosses Win!');
            }
            if ([winArray[0][2], winArray[1][1], winArray[2][0]].every(num => num === 1)) {
                console.log('Crosses Win!');
            }
            if ([winArray[0][0], winArray[1][0], winArray[2][0]].every(num => num === 1) || [winArray[0][1], winArray[1][1], winArray[2][1]].every(num => num === 1) || [winArray[0][2], winArray[1][2], winArray[2][2]].every(num => num === 1)) {
                console.log('Crosses Win!');
            }
            //* Побеждают нолики
            if (winArray[0].slice(0, 3).every(num => num === 2) || winArray[1].slice(0, 3).every(num => num === 2) || winArray[2].slice(0, 3).every(num => num === 2)) {
                console.log('Rounds Win!');
            }
            if ([winArray[0][0], winArray[1][1], winArray[2][2]].every(num => num === 2)) {
                console.log('Rounds Win!');
            }
            if ([winArray[0][2], winArray[1][1], winArray[2][0]].every(num => num === 2)) {
                console.log('Rounds Win!');
            }
            if ([winArray[0][0], winArray[1][0], winArray[2][0]].every(num => num === 2) || [winArray[0][1], winArray[1][1], winArray[2][1]].every(num => num === 2) || [winArray[0][2], winArray[1][2], winArray[2][2]].every(num => num === 2)) {
                console.log('Rounds Win!');
            }
        }
    });
});
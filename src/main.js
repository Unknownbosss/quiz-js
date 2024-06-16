import { view, game } from './quiz.js';

const url = '../dist/question.json';

fetch(url)
  .then(response => response.json())
  .then(quiz => {
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
  });

view.response.addEventListener("click", (event) => game.check(event), false);

game.getData();

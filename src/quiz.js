import { random, shuffle } from './utilities.js';

const view = {
  start: document.getElementById("start"),
  timer: document.querySelector("#timer strong"),
  score: document.querySelector("#score strong"),
  highScore: document.querySelector("#hiScore strong"),
  question: document.getElementById("question"),
  result: document.getElementById("result"),
  info: document.getElementById("info"),
  response: document.querySelector("#response"),
  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },

  show(element) {
    element.style.display = "block";
  },

  hide(element) {
    element.style.display = "none";
  },

  setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, "");
    this.render(this.info, "");
  },

  teardown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },

  buttons(array) {
    return array.map(value => `<button>${value}</button>`).join('');
  }

};

const game = {
  score: 0,
  previousScore: parseInt(localStorage.getItem('highScore')) || 0,
  currentScore: 0,
  start(quiz) {
    console.log("start() invoked");
    this.questions = [...quiz];
    view.setup();
    this.ask();
    this.secondsRemaining = 30;
    this.timer = setInterval(this.countdown, 1000);
  },

  countdown() {
    game.secondsRemaining--;
    view.render(view.timer, game.secondsRemaining);
    if (game.secondsRemaining === 0) {
      game.gameOver();
    } else if (game.secondsRemaining < 6) {
      view.timer.style.color = 'red'
    } else {
      view.timer.style.color = 'inherit'
    }
  },

  ask(name) {
    console.log("ask() invoked");
    if (this.questions.length > 2) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.questions[0].realName, this.questions[2].realName, this.questions[1].realName, this.question.realName];
      shuffle(options);
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
      view.render(view.response, view.buttons(options));
    } else {
      this.gameOver();
    }
  },

  check(event) {
    console.log("check(event) invoked");
    const response = event.target.textContent;
    const answer = this.question.realName;
    if (response === answer) {
      view.render(view.result, "Correct!", { class: "correct" });
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {
        class: "wrong",
      });
    }
    this.ask();
  },

  gameOver() {
    console.log("gameOver() invoked");
    view.render(
      view.info,
      `Game Over, you scored ${this.score} point${this.score === 1 || this.score === 0 ? " " : "s"
      }`
    );
    view.teardown();
    view.show(view.start);
    clearInterval(this.timer);
    this.saveData();
    this.score = 0;
  },

  saveData() {
    this.currentScore = this.score;
    if (this.currentScore > this.previousScore || this.previousScore === 0) {
      this.previousScore = this.currentScore;
      localStorage.setItem('highScore', this.currentScore);
    }
    this.getData();
  },

  getData() {
    console.log(`previous score is ${this.previousScore}`);
    view.render(view.highScore, this.previousScore);
  }
};

export {
  view,
  game
}
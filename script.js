'use strict';

// constants
const MAX_SCORE = 20;
const BODY_BACKGROUND_COLOR = '#222';
const WINNING_BACKGROUND_COLOR = '#60b347';

// variables
let score = MAX_SCORE;
let highscore = 0;

// dom elements
const body = document.body;
const form = document.querySelector('.form');
const input = document.querySelector('.guess');
const number = document.querySelector('.number');
const againButton = document.querySelector('.again');

// functions
function generateSecretNumber() {
  return Math.floor(Math.random() * MAX_SCORE + 1);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function setScore(score) {
  document.querySelector('.score').textContent = score;
}

function setHighScore(score) {
  document.querySelector('.highscore').textContent = score;
}

function setBodyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function setNumber(text) {
  document.querySelector('.number').textContent = text;
}

// random number
let randomNumber = generateSecretNumber();

function playAgain() {
  score = MAX_SCORE;
  randomNumber = generateSecretNumber();
  input.value = '';
  setNumber('?');
  displayMessage('Start Guessing...');
  setScore(score);
  setBodyBackgroundColor(BODY_BACKGROUND_COLOR);
}

function onSubmit(e) {
  e.preventDefault();
  const guess = Number(input.value);

  if (!guess) {
    displayMessage('⛔ No Number');
  } else {
    if (guess === randomNumber) {
      setBodyBackgroundColor(WINNING_BACKGROUND_COLOR);
      displayMessage('✅ Correct');
      setNumber(randomNumber);
      setHighScore(highscore < score ? score : highscore);

      return;
    } else {
      if (score > 1) {
        displayMessage(guess > randomNumber ? '↗️ Too High!' : '↘️ Too Low!');
        setScore(--score);
      } else {
        displayMessage('🤷‍♂️ You lost!');
        setScore(0);
      }
    }
  }
}

form.addEventListener('submit', onSubmit);
againButton.addEventListener('click', playAgain);

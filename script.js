'use strict';

// Variables for selecting the score elements for player 0 and player 1, the die to display the roll, and the action buttons (roll die, hold, and new game)
const player0Score = document.getElementById('score--0');
const p0CurrentScore = document.getElementById('current--0');
const player1Score = document.getElementById('score--1');
const p1CurrentScore = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInst = document.querySelector('.btn--inst');
const btnCloseModal = document.querySelector('.close-modal');

let scores, currentScore, activePlayer, playingGame;

const newGame = function () {
  // Starting conditions
  scores = [0, 0]; // An array to hold the cumulative scores for player 0 and player 1
  currentScore = 0;
  activePlayer = 0; // This will change to 1 for player 1 when player 0 'holds' or rolls a  1
  playingGame = true;

  player0Score.textContent = 0;
  p0CurrentScore.textContent = 0;
  player1Score.textContent = 0;
  p1CurrentScore.textContent = 0;

  diceElement.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

newGame();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // Ternary operator to change the active player (If the active player is 0 set it to 1, else set it to 0)
  activePlayer = activePlayer === 0 ? 1 : 0;

  //  Toggle the active player on the screen
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Hide the die for the beginning of the game
diceElement.classList.add('hidden');

// Generate the random dice roll
btnRoll.addEventListener('click', function () {
  if (playingGame) {
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Show the dice number rolled image on the screen
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceRoll}.png`;

    // Track player score and check for a roll of 1 to end turn
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Save the score when the user decides to hold and stop rolling
btnHold.addEventListener('click', function () {
  if (playingGame) {
    //Add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playingGame = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);

btnInst.addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
});

btnCloseModal.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
});

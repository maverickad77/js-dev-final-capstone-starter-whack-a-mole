const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");

const score = document.querySelector("#score"); // Use querySelector() to get the score element
const timerDisplay = document.querySelector("#timer"); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "";
let duration = 0;
let previousHole = '';
/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example:
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */

function setDelay(difficulty) {
  let timeDelay;
  try {
    if (difficulty === "easy") {
      timeDelay = 1500;
    } else if (difficulty === "normal") {
      timeDelay = 1000;
    } else if (difficulty === "hard") {
      const randNum = Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
      timeDelay = randNum;
    } else {
      timeDelay = 200;
    }
  } catch (error) {
    console.log("error: difficulty not set",error);
  }
  return timeDelay;
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of
 * it (lastHole = hole) and return the hole
 *
 * Example:
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

// generates a random number from 0-8
const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1));

function chooseHole(holes) {
  // gets a hole at index of random number
  const index = randNum(0, 8);
  const hole = holes[index];
  // if hole index matches previous hole, choose different hole.
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 *
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 *
 * The purpose of this function is simply to determine if the game should
 * continue or stop. The game continues if there is still time `if(time > 0)`.
 * If there is still time then `showUp()` needs to be called again so that
 * it sets a different delay and a different hole. If there is no more time
 * then it should call the `stopGame()` function. The function also needs to
 * return the timeoutId if the game continues or the string "game stopped"
 * if the game is over.
 *
 *  // if time > 0:
 *  //   timeoutId = showUp()
 *  //   return timeoutId
 *  // else
 *  //   gameStopped = stopGame()
 *  //   return gameStopped
 *
 */
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    gameStopped = stopGame();
    return gameStopped;
  }
}

/**
 *
 * Calls the showAndHide() function with a specific delay and a hole.
 *
 * This function simply calls the `showAndHide` function with a specific
 * delay and hole. The function needs to call `setDelay()` and `chooseHole()`
 * to call `showAndHide(hole, delay)`.
 *
 */
function showUp() {
  let delay = setDelay(difficulty);
   const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 *
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden. The function calls
 * `toggleVisibility` to show or hide the mole. The function should return
 * the timeoutID
 * this function also calls the hidePreviousHole() function to hide the previous mole after a new mole is shown
 *
 */ 
function showAndHide(hole, delay) {
  let timeoutID = setTimeout(() => {
    // console.log('hole:',hole)
    hidePreviousHole(previousHole); 
    toggleVisibility(hole);

    /**
     * used to ensure previousHole and hole are out of phase by 'one hole'
    */
    if(counter != 0){
      previousHole = hole;
    }
    gameOver();
  }, delay);
  return timeoutID;
}

/* 
  used to store a counter value that is used to keep previousHole and hole out of phase.
*/
let counter = 0;

/* 
  removes the 'show' class from a hole after a new hole is shown
*/
function hidePreviousHole(previousHole){
 if(counter > 0 && previousHole !=''){
  removeHole(previousHole);
  // console.log('previousHole:',previousHole);
 }
 counter ++;
//  console.log(counter);
}

/**
 *
 * Adds or removes the 'show' class that is defined in styles.css to
 * a given hole. It returns the hole.
 *
 */
function toggleVisibility(hole) {
      hole.classList.toggle("show");
  return hole;
}

/**
 * removes the 'show' class from a given hole
*/
function removeHole(hole){
  hole.classList.remove("show");
  return hole;
}

/* 
TODO:
[X]make moles disappear after the game has ended
*/

/** 
 * for each item in the holes nodelist, remove the 'show' class to hide 
 * all moles when game has ended, will be called by gameStopped()
*/
function hideAll(holes) {
  holes.forEach(function (hole, index) {
    holes[index].classList.remove("show");
  });
  return holes;
}

/**
 *
 * This function increments the points global variable and updates the scoreboard.
 * Use the `points` global variable that is already defined and increment it by 1.
 * After the `points` variable is incremented proceed by updating the scoreboard
 * that you defined in the `index.html` file. To update the scoreboard you can use
 * `score.textContent = points;`. Use the comments in the function as a guide
 * for your implementation:
 *
 */
function updateScore() {
  // added '+1' so in-game timer display matches duration of game
  points += 1;
  score.textContent = points;
  return points;
}

/**
 *
 * This function clears the score by setting `points = 0`. It also updates
 * the board using `score.textContent = points`. The function should return
 * the points.
 *
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 *
 * Updates the control board with the timer if time > 0
 *
 */
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 *
 * Starts the timer using setInterval. For each 1000ms (1 second)
 * the updateTimer function get called. This function is already implemented
 *
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 *
 * This is the event handler that gets called when a player
 * clicks on a mole. The setEventListeners should use this event
 * handler (e.g. mole.addEventListener('click', whack)) for each of
 * the moles.
 * 
 *each time a mole is clicked the updateScore() and hideClickedMole() are called
 */
function whack(event) {
  updateScore();
  hideClickedMole(event);
  return points;
}


 
  /**
   * 
   * gets id from mole that is clicked, removes text from id so only 
   * number remains. Use number to remove 'show' class from holes 
   * at a given index
   * 
   */
function hideClickedMole(event) {
  let moleClicked = event.target.id.slice(4); //ex: mole1 -> 1
  holes[moleClicked].classList.remove("show"); //holes[1].classList...


}


/**
 * 
 * gets the difficulty from the difficulty drop down
 * 
 */
function getDifficulty() {
  // uses querySelector to get value from difficulty drop down
  const diff = document.querySelector("#diff-select");
  return diff.value;
}

/**
 *
 * Adds the 'click' event listeners to the moles. See the instructions
 * for an example on how to set event listeners using a for loop.
 */
function setEventListeners() {
  moles.forEach((mole) => mole.addEventListener("click", whack));
  return moles;
}

/**
 *
 * This function sets the duration of the game. The time limit, in seconds,
 * that a player has to click on the sprites.
 *
 */
function setDuration(duration) {
  time = duration + 1;
  return time;
}

/**
 * 
 * uses difficulty of level to modify the length of the game. 
 * 
 * */
function getDuration(difficulty) {
  let gameLength = 0;
  if(difficulty === "easy"){
    gameLength = 30;
  } else if (difficulty === "normal"){
    gameLength = 20;
  } else if (difficulty === "hard"){
    gameLength = 15;
  } else {
    gameLength = 10;
  }
  return gameLength;
}
/**
 *
 * This function is called when the game is stopped. It clears the
 * timer using clearInterval. Returns "game stopped".
 *
 * also calls hideAll() to make all moles disappear after the game ends
 * 
 */
function stopGame() {
  clearInterval(timer);
  hideAll(holes);
  return "game stopped";
}

/**
 *
 * This is the function that starts the game when the `startButton`
 * is clicked.
 *
 */
function startGame() {
  // gets the difficulty the player has selected
  diffSelected = getDifficulty();
  // sets global difficulty to difficulty level selected
  difficulty = diffSelected;
  // clears score from last game, if first game, does nothing
  clearScore();
  // sets event listners for all moles
  setEventListeners();
  // sets global duration to length of time defined by difficulty the player has chosen
  duration = getDuration(difficulty);
  // calls setDuation with global duration as parameter
  setDuration(duration);
  // starts timer for the game
  startTimer();
  // checks to when condition is met to end game.
  gameOver();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

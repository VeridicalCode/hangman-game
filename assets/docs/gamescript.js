

// establish variables
var currentWord; // current word
var lettersRemaining;  // number of empty spaces remaining
var unguessedArray; // array to display & track empty spaces
var playerGuess; // current letter being guessed by player
var badPicksArray; // incorrect letters guessed by player
var missesRemaining; // number of fails left before loss
var easyWords = [ // array: easy words
  "airplane",
  "already",
  "baseball",
  "bedtime",
  "cherry",
  "choose",
  "cobweb",
  "cracker",
  "debate",
  "dinner",
  "dwell",
  "early",
  "elbow",
  "flavor",
  "fireman",
  "goldfish",
  "habit",
  "imitate",
  "intend",
  "journey",
  "locate",
  "loyal",
  "method",
  "mystery",
  "nectar",
  "opposite",
  "predator",
  "process",
  "remark",
  "reverse",
  "signal",
  "struggle",
  "symbol",
  "treasure",
  "triumph",
  "vision",
  "wisdom"
];
var hardWords = [ // array: difficult words
  "anachronistic",
  "adulation",
  "adversity",
  "benevolent",
  "clairvoyant",
  "collaborate",
  "convergence",
  "digression",
  "enervate",
  "ephemeral",
  "exemplary",
  "extenuating",
  "hedonist",
  "hypothesis",
  "impetuous",
  "inconsequential",
  "jubilation",
  "ostentatious",
  "propsperity",
  "proclivity",
  "querulous",
  "sagacity",
  "spontaneity",
  "superficial",
  "transient",
  "vindicate"
];

// randomly generate a word from the appropriate array
pickRandomWord = function (diffSetting) {
  if (diffSetting == "easy") {
    currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  }
  else {
    currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  }
  // display the correct number of blank spaces
  for (i = 0; i < currentWord.length; i++) {
    unguessedArray[i] = "_"
  }
}
// check for keyboard input (letter guess by player)
document.onkeyup = function (event) {
  // store as a variable
  playerGuess = event.key;
  // assume the guess was wrong
  goodGuess = false;

  // check against current word, one letter at a time
  for (j = 0; j < currentWord.length; j++) {
    if (playerGuess == currentWord[j]) {
      // replace appropriate blank spaces with letters
      unguessedArray[j] = currentWord[j];
      // tell the function this was a good guess
      goodGuess = true;
      // iterate blank space count
      lettersRemaining--;
      if (lettersRemaining < 1) {
        // if word is complete, alert player to win
        alert("You win!");
      }
    }
  }
  // if we get to the end of the word and haven't matched the letter
  if (j == currentWord.length && goodGuess === false) {
    // add current guess to list of invalid letters
    badPicksArray.push(playerGuess);
    // iterate fail counter
    missesRemaining++;
    // if hangman's body is complete, alert player to loss
    if (missesRemaining < 1) {
      alert("You lose");
    }
  }
}


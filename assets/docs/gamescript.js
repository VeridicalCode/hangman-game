
/*
  For consistency we're going to figure out all our variables & their variations right here.
  currentWord: the random word for this game, chosen at start
    currentWordKnown: a string of what the player knows (blanks & letters)
    currentWordDiv: the div that displays all this
  tentacleLetters: the number of bad letters (which generate tentacles)
    tentacleLettersArray: a collection of those guesses
    tentacleLettersDiv: displays bad guesses to the player

*/

// establish variables
var currentWord; // current word
var currentWordArray; // changes from _ _ _ to _ x _ as player makes guesses
var tentacleLetters = 0; // at 8 the player gets eaten
var tentacleLettersArray = []; // holds bad guesses for display
var playerGuess; // current letter being guessed by player
var easyWords = [ // array: easy words
  "breakwater",
  "coral",
  "octopus",
  "predator",
  "treasure",
  "hurricane",
  "lighthouse",
  "lobster",
  "dolphin",
  "manatee",
  "manta",
  "jellyfish",
  "turtle",
  "turbulence",
  "seahorse",
  "starfish",
  "undertow"
];
var hardWords = [ // array: difficult words
  "abyssal",
  "anemone",
  "baleen",
  "bathysphere",
  "bivalve",
  "conch",
  "echinoderm",
  "egret",
  "estuary",
  "fluorescence",
  "guyot",
  "invertebrate",
  "leviathan",
  "mussels",
  "pelagic",
  "phytoplankton",
  "tsunami",
  "zooplankton"
];

// for test purposes
tentacleLetters = 4;
tentacleLettersArray = ['x', 't', 'q'];

// we'll be calling this in several places so just function it for convenience
displayCurrentWord = function(){
  $('#currentWordDiv').text(currentWordArray.join(' '));
  $('#tentacleLettersDiv').text(tentacleLettersArray.join(' '));
  // and log the thing to console for debugging purposes
  console.log(currentWord + " " + currentWordArray.join(' '));
  console.log(tentacleLetters + " " + tentacleLettersArray.join(' '));
}

// randomly generate a word from the appropriate array
pickRandomWord = function (diffSetting) {
  currentWordArray = [];
  if (diffSetting == 'easy') {
    currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  }
  else {
    currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  };
  // store the correct number of blank spaces
  for (i = 0; i < currentWord.length; i++) {
    currentWordArray[i] = "_"
  };
  // finally, print the correct empty spaces to the screen
  displayCurrentWord()  
}


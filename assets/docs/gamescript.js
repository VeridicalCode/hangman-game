
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
  "floresence",
  "guyot",
  "invertebrate",
  "leviathan",
  "mussels",
  "pelagic",
  "phytoplankton",
  "tsunami",
  "zooplankton"
];

// randomly generate a word from the appropriate array
pickRandomWord = function (diffSetting) {
  currentWordArray = [];
  if (diffSetting == 'easy') {
    currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  }
  else {
    currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  };
  // display the correct number of blank spaces
  for (i = 0; i < currentWord.length; i++) {
    currentWordArray[i] = "_"
  };
  console.log(currentWord + " " + currentWordArray);
 }
 
// $.each(unguessedArray, function(index, value){
//   $('#displayGuessDiv').html( $('#displayGuessDiv').html() + " " + unguessedArray[i])
// }


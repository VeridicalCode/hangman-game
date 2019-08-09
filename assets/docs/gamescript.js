

$(document).ready(function () {

  // establish variables
  var activeGame = false; // tells the page when to start listening to keypresses
  var currentWord; // current word
  var currentWordArray; // changes from _ _ _ to _ x _ as player makes guesses
  var tentacleLetters; // at 8 the player gets eaten
  var tentacleLettersArray = [' ']; // holds bad guesses for display. leave the space there, it freaks out if it tries to concat with no content
  var lettersToWin; // how many blank spaces to fill before victory
  var easyWords = [ // array: easy words
    "breakwater",
    "octopus",
    "predator",
    "treasure",
    "hurricane",
    "lighthouse",
    "lobster",
    "dolphin",
    "manatee",
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
    "coral",
    "echinoderm",
    "egret",
    "estuary",
    "fluorescence",
    "guyot",
    "invertebrate",
    "leviathan",
    "manta",
    "mussels",
    "pelagic",
    "phytoplankton",
    "tsunami",
    "zooplankton"
  ];
  var krakenArray = [ // kraken images, stored for ease of replacement
    '<img src="./assets/images/kraken-00.gif" alt="The Kraken slumbers." class="img-fluid"/>',
    '<img src="./assets/images/kraken-01.gif" alt="A single dark tentacle rises slowly through the murk." class="img-fluid"/>',
    '<img src="./assets/images/kraken-02.gif" alt="A second oily tentacle sprouts beneath the waves." class="img-fluid"/>',
    '<img src="./assets/images/kraken-03.gif" alt="Three reaching tentacles slither the deep water." class="img-fluid"/>',
    '<img src="./assets/images/kraken-04.gif" alt="Four tentacles push slimy ripples through the ocean." class="img-fluid"/>',
    '<img src="./assets/images/kraken-05.gif" alt="The Kraken\'s fifth tentacle gropes for prey!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-06.gif" alt="Six horrific tentacles lash furiously!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-07.gif" alt="The Kraken is whole and prepared to consume!" class="img-fluid"/>'
  ];

  // we'll be calling this in several places so just function it for convenience
  displayCurrentWord = function() {
    // change the text content of selected divs to the stringed contents of each array
    $('#currentWordDiv').text(currentWordArray.join(' '));
    $('#tentacleLettersDiv').text(tentacleLettersArray.join(' '));
    $('.wordbox').show();
  }

  // reset page to base status after game ends
  resetPageToStart = function(){
    activeGame = false; // stop listening to keyboard
    $('#buttonTrayDiv, #hideThisDiv').show(); //put instructions & buttons back
    $('.wordbox').hide(); // hide word arrays
  }

  // for sanity, a function to make sure (keyboard) input is a letter
  function isLetter(txt) {
    if (txt.toUpperCase() != txt.toLowerCase() && // not a number
      txt[1] == undefined) {  // not longer than 1 character ('backspace', 'shift')
      return true;
    }
    else {
      return false;
    }
  }

  // START GAME
  pickRandomWord = function (diffSetting) {
    activeGame = true; // tell the page the game is active
    currentWordArray = []; // zero out the display word
    tentacleLettersArray = [' '] // zero out the bad guesses
    tentacleLetters = 0; // zero out the fails
    $('#krakenDiv').html(krakenArray[0]).show(); // reset the kraken
    $('#buttonTrayDiv, #hideThisDiv').hide(); // hide the new game buttons

    // pick the word based on the difficulty setting
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
    // set the victory condition
    lettersToWin = currentWord.length;
    // finally, print the correct empty spaces to the screen
    displayCurrentWord()
  }

  // okay here's the fun part. look for player keypress
  document.onkeyup = function (event) {
    // store keyboard input as a variable
    let playerGuess = event.key;
    let goodGuess = false; // assume guess was wrong
    let badGuess = false; // also assume the player hasn't tried this letter yet

    // if the game's not running or the key's not a valid letter, stop here
    if (!activeGame || !isLetter(playerGuess)) {
      return;
    };
    // now, for each letter in currentWord
    for (j = 0; j < currentWord.length; j++) {
      // force case for safety
      if (playerGuess.toLowerCase() == currentWordArray[j]) {
        return; // if the letter is valid but already guessed, do nothing
      }
      // if the pressed letter matches, change the guess array & iterate victory
      if (playerGuess.toLowerCase() == currentWord[j]) {
        currentWordArray[j] = playerGuess.toLowerCase();
        goodGuess = true;
        lettersToWin--;
      };
    };
    // also check against existing bad guesses
    for (k = 0; k < tentacleLettersArray.length; k++) {
      // force case for safety; this time to upper, since that's how we're storing fails
      if (playerGuess.toUpperCase() == tentacleLettersArray[k]) {
        badGuess = true; // if letter is already guessed, let the tentacle function know to skip it
        return; // and don't bother checking further
      }
    };

    // if we didn't match any letters to either array, iterate tentacles, add bad guess to array, grab new kraken image
    if (j >= currentWord.length && k >= tentacleLettersArray.length && !goodGuess && !badGuess) {
      tentacleLetters++;
      tentacleLettersArray.push(playerGuess.toUpperCase());
      $('#krakenDiv').html(krakenArray[tentacleLetters]);
    };
    // now refresh the display
    displayCurrentWord();

    if (lettersToWin == 0) {
      $('#krakenDiv').hide(6000); // kraken fades slowly offscreen
	  $.MessageBox("You win! Congratulations!"); // announce win
      setTimeout(resetPageToStart, 6000); // stop listening to keyboard and restore instructions/buttons
      /* noteworthy here that without the setTimeout, it's possible to start
	  // a new game while the kraken is still dissolving. this prevents a new kraken
	  // from spawning properly and should be avoided. */
    }

    if (tentacleLetters >= 8) {
      $.MessageBox('You lose. The word was "' + currentWord +'."'); // announce loss & tell player word
      resetPageToStart(); // stop listening to keyboard and restore instructions/buttons
    }
  }

});
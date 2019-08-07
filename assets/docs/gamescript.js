

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
    '<img src="./assets/images/kraken-00.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-01.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-02.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-03.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-04.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-05.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-06.gif" alt="Behold, the Kraken!" class="img-fluid"/>',
    '<img src="./assets/images/kraken-07.gif" alt="Behold, the Kraken!" class="img-fluid"/>'
  ];

  // we'll be calling this in several places so just function it for convenience
  displayCurrentWord = function () {
    // change the text content of selected divs to the stringed contents of each array
    $('#currentWordDiv').text(currentWordArray.join(' '));
    $('#tentacleLettersDiv').text(tentacleLettersArray.join(' '));
    $('.wordbox').show();
    // and log the thing to console for debugging purposes
    console.log(currentWord + " " + currentWordArray.join(' '));
    console.log(tentacleLetters + " " + tentacleLettersArray.join(' '));
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

    // if the game's not running or the key's not a valid letter, stop here
    if (!activeGame || !isLetter(playerGuess)) {
      console.log('error check: active game status is ' + activeGame + " and isLetter returned " + isLetter(playerGuess));
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
    // if we didn't match any letters, iterate tentacles, add bad guess to array, grab new kraken image
    if (j >= currentWord.length && !goodGuess) {
      tentacleLetters++;
      tentacleLettersArray.push(playerGuess.toUpperCase());
      $('#krakenDiv').html(krakenArray[tentacleLetters]);
    };
    // now refresh the display
    displayCurrentWord();

    if (lettersToWin == 0) {
      $('#krakenDiv').hide(6000);
      $('#buttonTrayDiv, #hideThisDiv').show();
      $('.wordbox').hide();
      // alert("You win!");
      $.MessageBox("You win! Congratulations!");
      activeGame = false;
    }

    if (tentacleLetters >= 8) {
      $('#buttonTrayDiv, #hideThisDiv').show();
      $('.wordbox').hide();
      // alert("You lose. The word was " + currentWord);
      $.MessageBox('You lose. The word was "' + currentWord +'."');
      activeGame = false;
    }
  }
});
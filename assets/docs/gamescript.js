


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

  // function to print current word as correct guesses & blank spaces
  displayCurrentWord = function () {
    // change the text content of selected divs to the stringed contents of each array
    $('#currentWordDiv').text(currentWordArray.join(' '));
    // $('#tentacleLettersDiv').text(tentacleLettersArray.join(' '));
    $('.wordbox').show();
  }

  // reset page to base status after game ends
  resetPageToStart = function () {
    activeGame = false; // stop listening to keyboard
    $('#buttonTrayDiv, #hideThisDiv').show(); //put instructions & buttons back
    $('.wordbox').hide(); // hide word arrays
  }

  // for sanity, a function to make sure (keyboard) input is a letter
  isLetter = function(txt) {
    if (txt.toUpperCase() != txt.toLowerCase() && // not a number
      txt[1] == undefined) {  // not longer than 1 character (named keys render as 'backspace' 'shift' etc)
      return true;
    }
    else {
      return false;
    }
  }

  // function to create alphabet buttons
  makeKeyboardColumn = function () {
    $('#letterKeyAnchor').empty(); // clear tray first
    for (let i = 65; i < 91; i++) {
      let letterVar = String.fromCharCode(i);
      let letterButton = $('<button>');
      letterButton.attr('id', letterVar)
                  .addClass("letterKey")
                  .txt(letterVar);
      $('#letterKeyAnchor').append(letterButton);
    }
  }

  // function to remove alphabet button when guessed
  removeLetterButton = function(letterID){
    let IDtoRemove = '#'+letterID;
    $(IDtoRemove).remove();
  }

  // START GAME
  pickRandomWord = function (diffSetting) {
    activeGame = true; // tell the page the game is active
    currentWordArray = []; // zero out the display word
    tentacleLettersArray = [' '] // zero out the bad guesses
    tentacleLetters = 0; // zero out the fails
    $('#krakenDiv').html(krakenArray[0]).show(); // reset the kraken
    $('#buttonTrayDiv, #hideThisDiv').hide(); // hide the new game buttons
    makeKeyboardColumn(); // print a keyboard for mobile users

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

  // the meat of the game: process the player input and respond appropriately
  checkPlayerGuess = function (playerGuess) {

    let goodGuess = false; // assume guess was wrong
    let badGuess = false; // also assume the player hasn't tried this letter yet

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
	      a new game while the kraken is still dissolving. this prevents a new kraken
	      from spawning properly and should be avoided. */
    }

    if (tentacleLetters >= 8) {
      $.MessageBox('You lose. The word was "' + currentWord + '."'); // announce loss & tell player word
      resetPageToStart(); // stop listening to keyboard and restore instructions/buttons
    }
  }


// react to keyboard input
document.onkeyup = function (event) {
  // store keyboard input as a variable
  let keyboardGuess = event.key;
  // if the game's not running or the key's not a valid letter, stop here
  if (!activeGame || !isLetter(keyboardGuess)) {
    return;
  };
  // otherwise remove the letter from the keyboard & call the lettercheck function on it
  removeLetterButton(keyboardGuess.toUpperCase());
  checkPlayerGuess(keyboardGuess);
}

$(document).on('click', '.letterKey', function(){
  let keyboardGuess = $(this).attr('id');
  removeLetterButton(keyboardGuess);
  checkPlayerGuess(keyboardGuess);
})
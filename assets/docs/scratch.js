
// concatenates the contents of currentWordArray into a string
// for printing. ' ' will render _ _
// if we did ',' instead it'd render _,_
console.log(currentWordArray.join(' '));




//check for keyboard input (letter guess by player)
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

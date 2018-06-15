
function generateWinningNumber () {
	return Math.floor(Math.random() * 100) + 1; 
}


function shuffle (array) {
  var m = array.length, t, i;

  while (m) {

    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;	
}


function newGame () {
    return new Game();
}


function Game () {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}


Game.prototype.difference = function () {
	return Math.abs(this.playersGuess - this.winningNumber);
}


Game.prototype.isLower = function () {
	return this.playersGuess < this.winningNumber;
}


Game.prototype.playersGuessSubmission = function (n) {
	if (n < 1 || n > 100 || isNaN(n)) {
		throw 'That is an invalid guess.';
	}
	this.playersGuess = n;
	return this.checkGuess();
}


 Game.prototype.checkGuess = function () {
    if (this.playersGuess === this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
    	return 'You Win!'
    }
      else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            $('#uno').html(this.playersGuess);
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guessList li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').html('Click Reset to play again.');
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(diff < 10) {
                    return'You\'re burning up!';
                } else if(diff < 25) {
                    return'You\'re lukewarm.';
                } else if(diff < 50) {
                    return'You\'re a bit chilly.';
                } else {
                    return'You\'re ice cold!';
                }
            }
        }
    }
 }


Game.prototype.provideHint = function () {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}



function makeAGuess (game) {
   let guess = $('#player-input').val();
   let output = game.playersGuessSubmission(parseInt(guess,10));
   console.log(output);
   $('#player-input').val('');
   $('#response').html(output);

}
    

$(document).ready(function() {
    let game = new Game;

    $('#submit').click(function(e){
      console.log('Submit button clicked');
      makeAGuess(game);
    });

    $('#player-input').keypress(function(e) {
        if (event.which === 13) {
            makeAGuess(game);
        }
    });

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#hints').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });

    $('#reset').click(function(e){
        game =  newGame();
        $('#response').text('');
        $('#hints').text('');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);
    });

});





























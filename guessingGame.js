// keypress event is not working. Though I added prevent.default(), still the page refreshes. 


$(document).ready(function() {

  var guessArr = [];
  var playersGuess = 0;
  var numOfGuess = 0;
  var difference = 0;
  var guessInHand = 4;
  var winningNumber = Math.floor((Math.random() * 100) + 1);
  
  //keypress event.

  $("#input").keypress(function(event) {
    event.prevent.default();
    if (event.which === 13) {
      
      $("#guess").click();
    };
  });


  //play again

  $("#playAgain").on('click', function() {

    guessArr = [];
    numOfGuess = 0;
    guessInHand = 5;
    winningNumber = Math.floor((Math.random() * 100) + 1);
    $('#input').val("");
    $("#message").html("");
    $("#guessLeft").html("You have " + guessInHand + " guesses left.");

  });


  //Submit Guess button
  $("#guess").on('click', function() {

    $("#guessLeft").html("You have " + guessInHand + " guesses left.");

    playersGuess = parseInt($('#input').val());
    $('#input').val("");

    if (isNaN(playersGuess) || playersGuess > 100 || playersGuess < 1) {
      $("#message").html("Please, enter a valid number.");
    } else {

      if ($.inArray(playersGuess, guessArr) !== -1) {
        $("#message").html("You already used that number, try with different number.");
      } else if (playersGuess === winningNumber) {
        $("#message").html("You Won!");
        guessInHand = 0;
      } else {
        guessArr.push(playersGuess);
        numOfGuess += 1;

        // difference checks how far is the number from the 
        difference = Math.abs(playersGuess - winningNumber);
        // newDifference checks wether the number is higher or lower than the winning number.
        newDifference = playersGuess - winningNumber;

        if (difference <= 5 && newDifference > 0) {
          $('#message').html("Your guess is Higher & within 5 digits of the winning number.");
        } else if (difference <= 5 && newDifference < 0) {
          $('#message').html("Your guess is Lower & within 5 digits than the winning number.");
        } else if (difference <= 10 && newDifference > 0) {
          $('#message').html("Your guess is Higher & within 10 digits of the winning number.");
        } else if (difference <= 10 && newDifference < 0) {
          $('#message').html("Your guess is Lower & within 10 digits of the winning number.");
        } else {
          $('#message').html("Your guess is quite far from the winning number");
        }

        if (numOfGuess === 5) {
          if (playersGuess === winningNumber) {
            $("#message").html("You Won!");
            guessInHand = 0;

          } else {
            $("#message").html("You Loose, correct number was " + winningNumber);
            guessInHand = 0;

          }
        };

        if (guessInHand > 0) {
          guessInHand--;
        };
        if (guessInHand === 0 && playersGuess === winningNumber) {
          $("#message").html("Play again!");
        };

      };

    };

  });

  //hint button
  $("#hint").on("click", function() {

    $("#message").html("Try Number " + winningNumber);
  });

});
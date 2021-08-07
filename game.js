var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// Start the game

$(document).keypress(function() {

  if (!started) {
    nextSequence();

    $("#level-title").text("Level " + level);

    started = true;
  }

});


// player's Button detections and storing

$(".btn").click(function(event) {

  if (started) {
    var userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
});


// Check gamepattern with userClickedPattern

function checkAnswer(lastColor) {

  if (gamePattern[lastColor] === userClickedPattern[lastColor]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence()
      }, 1000);

    }

  } else {

    playSound("wrong");

    $("#level-title").text("Game Over!!! Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();

  }


}

// generates game pattern

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}



// Plays sounds to user

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}



// Animation on pressing button

function animatePress(currentColor) {

  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);

}


// restarts the game

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

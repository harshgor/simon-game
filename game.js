var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(document).keydown(function() {
  if (isGameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isGameStarted = true;
  }
});

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
       setTimeout(function (){
         nextSequence();
       }, 1000);
    }
  } else {
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Press any key to restart");
    startOver();
  }
}

function nextSequence() {

  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  });
}

function startOver() {
  level = 0;
  gamePattern = [];
  isGameStarted = false;
}

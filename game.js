var gamePattern=[];

var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

function nextSequence()
{
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("level " + level);
}

$(".btn").click(function()
                {
                    var userChosenColor=this.getAttribute("id");
                    userClickedPattern.push(userChosenColor);
                    animatePress(userChosenColor);
                    checkAnswer(userClickedPattern.length-1);
                    playSound(userChosenColor);
                });

function playSound(name)
{
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ $("#" + currentColor).removeClass("pressed");},100);
}

var level=0;

$(document).keydown(function()
                    {
                      
                        $("h1").text("level " + level);
                        nextSequence();
                        
                    });

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if (userClickedPattern.length===gamePattern.length)
        {
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
        }
    }
    else
    {
        var wrongSound=new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over"),200});
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver()
{
    gamePattern=[];
    level=0;
    userClickedPattern=[];
}


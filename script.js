$(document).ready(function(){
	var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
	var steps=0;
	var teststeps=3;
	var arrPattern=[];
	var playerChoices=[];
	var playerChoicesSteps=0;
	var turnNumber=1;
	var playerClicks=1;
	for (var i=0, t=20; i<t; i++) {
    arrPattern.push(Math.round(Math.random() * 3));
	}
	function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

$( "#simonTitle" ).on( "click", function() {
	computerTurnFunction(0);
	
});

$('.boardSquare').on('click', playerTurnFunction);

$( "#restart" ).on( "click", function() {
	gameReset();
	
});

$( "#start" ).on( "click", function() {
	gameFunction();
	
});

/*Brighten color of part of board and then darken to original state.*/ 
function changeColor(steps){
	var elem = document.getElementById("boardTopLeft");
	if(arrPattern[steps]==0){
		sound1.play();
		$("#boardTopLeft").toggleClass("brighten");
		 setTimeout(function(){
      $("#boardTopLeft").removeClass('brighten');
  }, 300);
	}
	if(arrPattern[steps]==1){
		sound2.play();
		$("#boardTopRight").toggleClass("brighten");
		 setTimeout(function(){
      $("#boardTopRight").removeClass('brighten');
  }, 300);
	}
	if(arrPattern[steps]==2){
		sound3.play();
		$("#boardLowerLeft").toggleClass("brighten");
		setTimeout(function(){
      $("#boardLowerLeft").removeClass('brighten');
  }, 300);
	}
	if(arrPattern[steps]==3){
		sound4.play();
		$("#boardLowerRight").toggleClass("brighten");
		setTimeout(function(){
      $("#boardLowerRight").removeClass('brighten');
  }, 300);
	}
		
	
}

function countBoardWrongIndicator(){
	alert("Wrong");
}

/*When player presses board square take which board square is pressed and push to playerChoices array.*/ 
function playerTurnFunction(){
	var idName=$(this).attr('id');
	if(idName=='boardTopLeft'){
		sound1.play();
		playerChoices.push(0);
	}
	else if(idName=='boardTopRight'){
		sound2.play();
		playerChoices.push(1);
	}
	else if(idName=='boardLowerLeft'){
		sound3.play();
		playerChoices.push(2);
	}
	else if(idName=='boardLowerRight'){
		sound4.play();
		playerChoices.push(3);
	}
	if(playerClicks==20){
		alert("You Won");
		setTimeout(gameReset,100);
	}
	else{
	if(playerChoices[playerClicks-1]!=arrPattern[playerClicks-1]){
	countBoardWrongIndicator()
	playerClicks=1;
	playerChoices=[];
	if($(checkboxG1).is(":checked")==true){
		setTimeout(gameReset,100);
	}
	computerTurnFunction(0);
	
	}
	else{
	if(playerClicks==turnNumber){
	playerClicks=1;
	turnNumber++; //turn number goes up and game continues if all clicks correct
	playerChoices=[];
	computerTurnFunction(0);
	}
	else{
		playerClicks++;
	}
	}
	}
}
	/*Computer function depending on current stage of game cause board squares to brighten and then return to normal.*/
	function computerTurnFunction(steps){
		 $('#countBoard').text("Count: "+turnNumber);
		var moves=setInterval(function(){
			changeColor(steps);steps++;if(steps>turnNumber-1){
		clearInterval(moves);
	};},500);
			
			
				}
	function gameFunction(){
			computerTurnFunction(0);
	}

	function gameReset(){
		arrPattern=[];
		for (var i=0, t=20; i<t; i++) {
    arrPattern.push(Math.round(Math.random() * 3));
	}
	turnNumber=1;
	playerChoices=[];
	gameFunction();
	steps=0;
	playerClicks=1;
	}
});

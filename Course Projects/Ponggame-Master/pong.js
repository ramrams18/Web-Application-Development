var ballSpeed = 10;
var ballTop = 0;
var ballLeft = 0;
var courtBoundingBox = new Object();
var dx = 1;
var dy = 1;
var paddleHeight = 0;
var paddleWidth = 0;
var ballWidth = 0;
var strikes = 0;
var ballRadius = 0;
var maxScore = 0;
var ballMovement = new Object();
var startFlag = 0;
var testFlag = 0;

function initialize(){
	//
	var court = document.getElementById("court");
	courtBoundingBox = court.getBoundingClientRect();
	//var x = court.style.width;
	//var y = court.style.height/2;
	ballRadius = 10;
	strikes = 0;
	paddleHeight = document.getElementById("paddle").height;
	paddleWidth = document.getElementById("paddle").width;
	ballWidth = document.getElementById("ball").width;
	var paddleY =(court.style.height - paddleHeight)/2;
	ballTop = Number(document.getElementById("ball").style.top.substring(0, document.getElementById("ball").style.top.length-2));
	ballLeft = Number(document.getElementById("ball").style.left.substring(0, document.getElementById("ball").style.left.length-2));
	document.getElementById("ball").style.left = Math.floor((Math.random() * 400) + 1) + "px";
	document.getElementById("ball").style.top = Math.floor((Math.random() * 400) + 1) + "px";
	document.getElementById("paddle").style.top = paddleY;
	//console.log(courtBoundingBox);
}

function startGame(){
	if(startFlag == 0){
		ballMovement = setInterval(fun, ballSpeed);
		startFlag++;
	}
}

function setSpeed(i){
	if(i == 0){
		ballSpeed = 10;
	}else if(i == 1){
		ballSpeed = 6;
	}else if(i == 2){
		ballSpeed = 0.01;
	}
}

function MaxScore(){
	if(maxScore < strikes){
		maxScore = strikes;
		document.getElementById("score").innerHTML = maxScore;
	}
	document.getElementById("strikes").innerHTML = 0;
}


function fun(){
	//if(ballTop)
	detectCollision();
	ballTop = Number(document.getElementById("ball").style.top.substring(0, document.getElementById("ball").style.top.length-2)) + dy;
	ballLeft = Number(document.getElementById("ball").style.left.substring(0, document.getElementById("ball").style.left.length-2)) + dx;
	paddleLeft = Number(document.getElementById("paddle").style.left.substring(0, document.getElementById("paddle").style.left.length-2));
	paddleTop = Number(document.getElementById("paddle").style.top.substring(0, document.getElementById("paddle").style.top.length-2));
	//console.log(courtBoundingBox);
	document.getElementById("ball").style.top = (ballTop) + "px";
	document.getElementById("ball").style.left = (ballLeft) + "px";
	if(ballLeft + ballWidth >= paddleLeft){
		// console.log("ballTop= " + ballTop);
		// console.log("paddleTop= " + paddleTop);
		// console.log("paddleHeight= " + paddleHeight);
		if(ballTop + (ballWidth/2.0) > paddleTop && ballTop < paddleTop + paddleHeight - (ballWidth/2.0)){
			//console.log("On Paddle");
			
			if(testFlag == 0){
				strikes++;
				document.getElementById("strikes").innerHTML = strikes;
				dx = -dx;
				testFlag++;
			}
			setTimeout(function(){
				testFlag = 0
			}, 2000);
		}else if(ballLeft + ballWidth >= courtBoundingBox.width - 3){
			//console.log("On Right");
			window.clearInterval(ballMovement);
			MaxScore();
			initialize();
			startFlag = 0;
		}
	}
}
function resetGame(){
	// window.clearInterval(ballMovement);
	// MaxScore();
	// initialize();
	// startFlag = 0;
	document.location.reload()
}


function detectCollision(){
	//console.log(courtBoundingBox);
	ballLeft = Number(document.getElementById("ball").style.left.substring(0, document.getElementById("ball").style.left.length-2));
	ballTop = Number(document.getElementById("ball").style.top.substring(0, document.getElementById("ball").style.top.length-2));
	if(ballTop <= 0 || ballTop  >= courtBoundingBox.height - document.getElementById("ball").height){
		//console.log("Vertical");
		dy = dy * -1;
	}
	if(ballLeft <= 0 || ballLeft >= courtBoundingBox.width - document.getElementById("ball").width){
		//console.log("Horizontal");
		dx = dx * -1;
	}
}

document.onload = function(){
	initialize();
}

function movePaddle(e){
	if((e.clientX < courtBoundingBox.right) && (e.clientX > courtBoundingBox.left) && (e.clientY < courtBoundingBox.bottom - document.getElementById("paddle").offsetHeight - 3) && (e.clientY > courtBoundingBox.top)){
		//if(e.clientY)
		document.getElementById("paddle").style.top = Number(e.clientY - document.getElementById("court").offsetTop) + "px";
	}
}

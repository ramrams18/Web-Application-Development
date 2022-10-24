# Pong Game
<p>A simple pong game developed using JavaScript.</p>


<h2><a href="https://simple-pong-game.herokuapp.com/pong.html" target="_blank">DEMO</a></h2>


<h2>Project Description</h2>
<p>You need to write a JavaScript file pong.js, used in the file <a href="https://lambda.uta.edu/cse5335/fall17/pong.html">pong.html</a>, that implements the following actions:</p>

<p><b>initialize</b>: initialize the game</p>
<p><b>startGame</b>: starts the game (when you click the mouse)</p>
<p><b>setSpeed</b>: sets the speed to 0 (slow), 1 (medium), 2 (fast)</p>
<p><b>resetGame</b>: resets the game</p>
<p><b>movePaddle</b>: moves the paddle up and down, by folowing the mouse</p>
<p>Please watch the video <a href="https://lambda.uta.edu/cse5335/fall17/pong.mp4">pong.mp4</a> for a demo of how your game should look like.</p>
<p>The pong court is 800x500px, the pong ball is 20x20px, and the paddle is 102x14px. When you click on the Start button or left-click on the court, the ball must start from a random place at the left border of the court at a random angle between -π/4 and π/4. The paddle can move up and down on the right border by just moving the mouse (without clicking the mouse). The ball bounces on the left, top, and bottom borders of the court. Everytime you hit the ball with the paddle, you add one strike. If the ball crosses the right border (the dotted line), the game is suspended and the strikes so far becomes your score. You would need to click on the Start button or click on the court to restart with a zero number of strikes. So the goal of this game is to move the paddle to protect the right border by hitting the ball.</p>

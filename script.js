var WIDTH = 500;
var HEIGHT = 500;
var BLOCK_SIZE = 20;
var FPS = 0.1;

var RIGHT = 1;
var LEFT =-1;
var UP =2;
var DOWN =-2;

var snake, apple, direction, isGameOver, changedDirection;


$(document).ready(function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	//context.fillRect(0,0,10,10);

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var timer = 15.0 / FPS;

	var widthBlock = WIDTH/BLOCK_SIZE;
	var heightBlock = HEIGHT/BLOCK_SIZE;
	var apples =0;

	/*var intervalId = setInterval(function () {
 	context.clearRect(0, 0, WIDTH, HEIGHT);
 	drawScore();
 	snake.move();
 	snake.draw();
 	apple.draw();
 	drawBorder();
	}, 100);*/

	var drawBorder = function(){
		context.fillStyle = "Gray";
		context.fillRect(0,0,WIDTH,BLOCK_SIZE);
		context.fillRect(0,HEIGHT- BLOCK_SIZE, WIDTH, BLOCK_SIZE);
		context.fillRect(0, 0, BLOCK_SIZE, HEIGHT);
		context.fillRect(WIDTH - BLOCK_SIZE, 0, BLOCK_SIZE, HEIGHT);
	};	

	var drawScore = function(){
		
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillStyle ="Black";
		context.font ="15px Arial";
		context.fillText("Apples: " + apples, BLOCK_SIZE, BLOCK_SIZE);
	}

	var gameOver = function(){
		clearInterval(update);
		context.font = "60px Arial";
		context.fillStyle = "Black";
 		context.textAlign = "center";
 		context.textBaseline = "middle";
		 context.fillText("Game Over.", WIDTH / 2, HEIGHT / 2);
		 context.font = "50px Arial";
		 context.fillText("Press R to restart.", WIDTH / 2, HEIGHT / 2 + 60);

	}

	var block = function(col, row){
		this.col = col;
		this.row = row;
		this.blockSize=BLOCK_SIZE;
	}
	block.prototype.drawSquare = function (color) {
	var x = this.col * this.blockSize;
	var y = this.row * this.blockSize;
 	context.fillStyle = color;
 	context.fillRect(x, y, this.blockSize, this.blockSize);
	}; 
	block.prototype.compareTo = function(otherBlock){
		return this.col == otherBlock.col && this.row == otherBlock.row;
	};

	var getRandomInt = function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}



	var update = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		// updating sim
		// TODO1 advance snake one tile
		var tail = snake[0];
		var head = snake[snake.length-1];
		tail.col = head.col;
		tail.row = head.row;
		snake.splice(0,1);
		switch(direction){
			case RIGHT:
				tail.col++;
				break;
			case LEFT:
				tail.col--;
				break;
			case UP:
				tail.row--;
				break;
			case DOWN:
				tail.row++;
				break;			
		}
		snake.push(tail);
		changedDirection = false;
		// TODO2 do checks

		// TODO2.1 check collide with walls
		head = snake[snake.length-1];
		if(head.col <1 || head.col>widthBlock-2 || head.row<1 || head.row >heightBlock-2){
			isGameOver = true;

		}
		// TODO2.2 check collide with tail
		for(var i=0; i<snake.length-2;++i){
			if(head.compareTo(snake[i])){
				isGameOver = true;
			}
		}

		
		// TODO2.3 check eat apple
		console.log(snake);
		if(snake[snake.length-1].compareTo(apple)){
			switch(direction){
			case RIGHT:
				apple.col++;
				break;
			case LEFT:
				apple.col--;
				break;
			case UP:
				apple.row--;
				break;
			case DOWN:
				apple.row++;
				break;			
			}
			snake.push(apple);
			apple = new block(getRandomInt(1,widthBlock-2),getRandomInt(1,heightBlock-2));
			apples++;
		}
		
		// TODO2.4 check input
		
			
		
		
		// drawing
		
		if(!isGameOver){
			for(var i =0; i<snake.length;++i){
				snake[i].drawSquare("GREEN");
			}
		}
		apple.drawSquare("RED");
		drawBorder();
	
		drawScore();
		if(isGameOver){
			gameOver();
		}
		
		if(!isGameOver){
			setTimeout(update, timer);
		}
		
	}

	var initialize = function(){
		snake =[new block(12,12), new block(13,12), new block(14,12)];
		//snake for eat itself
		//var snake =[new block(12,12), new block(13,12), new block(14,12), new block(14,13), new block(13,13)];
		direction = DOWN;
		isGameOver = false;
		//var apple = new block(getRandomInt(1,24),getRandomInt(1,24));
		apple = new block(19,12);
		changedDirection = false;
		apples =0;

		update();
	}

	$("#mybutton").click(function(){
		initialize();
	})

	window.addEventListener('keydown', function (e) {
        if (e.keyCode == 39 && direction != LEFT && !changedDirection) { direction = RIGHT; changedDirection = true; }
    	if (e.keyCode == 37 && direction != RIGHT && !changedDirection) { direction = LEFT; changedDirection = true;}
    	if (e.keyCode == 38 && direction != DOWN && !changedDirection) { direction = UP; changedDirection = true;}
		if (e.keyCode == 40 && direction != UP && !changedDirection) { direction = DOWN; changedDirection = true;}
		if (e.keyCode == 82) { initialize(); }
    });

	initialize();

});

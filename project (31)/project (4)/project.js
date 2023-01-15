"use strict";
let ctx;
let score = 0;
let dorX = 30;
let dorY = 30
let pancakeX = 0;
let pancakeY= 0;
let poisonX = 0;
let poisonY = 0;
let list = [];
let poisonResult = 0;
let wallResult;
let wallX;
let wallY;
let wallArrayX = [];
let wallArrayY = [];
let temp = 0;
let dotX;
let dotY;
let timer;
let trapX = -30;
let trapY = -30;
let move;
let tempMove = 8;

function setup() 
{
	ctx = document.getElementById("surface").getContext("2d");

	list = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];

	do
	{
		pancakeX = list[Math.floor(Math.random()*list.length)];
		pancakeY = list[Math.floor(Math.random()*list.length)];
	} while (pancakeX == dorX && pancakeY == dorY || pancakeX == poisonX && pancakeY == poisonY || pancakeX == wallX && pancakeY == wallY);

	do
	{
		poisonX = list[Math.floor(Math.random()*list.length)];
		poisonY = list[Math.floor(Math.random()*list.length)];
		
	} while ( poisonX == dorX && poisonY == dorY || poisonX == pancakeX && poisonY == pancakeY || poisonX == wallX && poisonY == wallY);



	for (let i =0; i< 4; i++)
	{
		do
		{
			wallX = list[Math.floor(Math.random()*list.length)];
			wallY = list[Math.floor(Math.random()*list.length)];

			wallArrayX[i] = wallX;
			wallArrayY[i] = wallY;
			
		}
		while (wallX == 270 && wallY == 270 || wallX ==30 || wallY == 30 || wallX == dorX && wallY == dorY || wallX == pancakeX || wallX == poisonX);
	} 


	
	timer = setInterval(poisonMove , 1000);

	

	draw();

	
	
	document.getElementById("score").innerHTML = "Score: 0"; 
}



// function Information(x,y, filledIn) //name constructor functions with an upper-case first letter
// { 								
// 	this.x = x;
// 	this.y = y;
// 	this.filledIn = filledIn;

// }

// function addInformation()
// {
// 	new Information (randomCoord(),randomCoord(),true);
// }

function draw() 
{

	ctx.clearRect(0,0, 600,600);
	ctx.beginPath();

	drawGrid();

	dot();

	bell();

	cave();
	
	doraemon(dorX,dorY);

	pancake(pancakeX, pancakeY);

	poison(poisonX, poisonY);

	for (let i =0; i< 4; i++)
	{
		
		wall(wallArrayX[i], wallArrayY[i]);
	}

	

	if (poisonX == dorX && poisonY == dorY)
	{
		gameOver();
		poisonResult = 20;
	}
	
	trap(trapX, trapY);
}

function cave()
{
	ctx.save();
	ctx.translate(240, 240);

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "#0ABAB5";
	ctx.fillStyle = "#0ABAB5";
	ctx.rect(0, 0, 56, 56);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(0, 0, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();


	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(60, 0, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(0, 60, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(60, 60, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();


	ctx.beginPath();    
	ctx.moveTo(10, 20);
	ctx.lineTo(30, 5);
	ctx.lineTo(50, 20);
	ctx.strokeStyle = "black"; 
	ctx.lineWidth = "1";
	ctx.fillStyle="black";		
	ctx.stroke();       
	ctx.fill();

	ctx.beginPath();    
	ctx.rect(10, 20, 40, 25);
	ctx.fillStyle="black";		
	ctx.stroke();       
	ctx.fill();

	ctx.restore();

}




function poisonMove()
{
	// Math.floor(Math.random() * (max - min + 1) ) + min;

	if (tempMove%8 == 0)
	{
		move = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
	}


	do
	{
		if ( move == undefined)
		poisonX += 60;
	
	
		if (move == 1)	// move UP
		{
			poisonY -= 60;
			tempMove++;
		}
		else if ( move == 2)	// move DOWN
		{
			poisonY += 60;
			tempMove++;
		}
		else if( move == 3)	// move LEFT
		{
			poisonX -= 60;
			tempMove++;
		}
		else if ( move == 4)	// move RIGHT
		{
			poisonX += 60;
			tempMove++;
			
		}
		
	
	
		if ( poisonX < 30)
		{
			poisonX = 30;
			move = 2;
		}
	
		if ( poisonX > 570)
		{
			poisonX = 570;
			move = 1;
		}
	
		if ( poisonY < 30)
		{
			poisonY = 30;
			move = 3;
		}
	
		if ( poisonY > 570)
		{
			poisonY = 570;
			move = 4;
		}
	
	
	
	
		if ( poisonX == 30 && poisonY == 570)
		{
			move = 4;
		}
	
		
		if (poisonX == pancakeX && poisonY == pancakeY)
		{
			score -= 100;
			document.getElementById("score").innerHTML = "Score: " + score; 
	
			
			do
			{
				pancakeX = list[Math.floor(Math.random()*list.length)];
				pancakeY = list[Math.floor(Math.random()*list.length)];
			} while (pancakeX == dorX && pancakeY == dorY || pancakeX == poisonX && pancakeY == poisonY 
				|| pancakeX == wallX && pancakeY == wallY);
	
		}
	
		if (poisonX == trapX && poisonY == trapY)
		{
			score += 250;
			document.getElementById("score").innerHTML = "Score: " + score; 
	
			trapX = -30;
			trapY = -30;
		}
	
	
		
	
	
	
		if (poisonX == 270+60  && poisonY == 270)
		{
			poisonX == 270+60;
			move = 2;
		}
	
		if (poisonX == 270-60 && poisonY == 270)
		{
			poisonX == 270-60;
			move = 2;
		}
	
		if (poisonX == 270 && poisonY == 270+60)
		{
			poisonY == 270+60;
			move = 3;
		}
	
		if (poisonX == 270 && poisonY == 270-60)
		{
			poisonY == 270-60
			move = 3;
		}
	
	
	
		for (let i = 0; i< 4; i++)
		{
			if (wallArrayX[i] == poisonX -60 && wallArrayY[i] == poisonY && move == 3)
			{
				
				move = 1;
			}
	
			if (wallArrayX[i] == poisonX +60 && wallArrayY[i] == poisonY && move == 4)
			{
			
				move = 1;
			}
	
			if (wallArrayX[i] == poisonX && wallArrayY[i] == poisonY +60 && move == 2)
			{
	
				move = 3;
			}
	
			if (wallArrayX[i] == poisonX && wallArrayY[i] == poisonY -60 && move == 1)
			{
	
				move = 3;
			}
		}
	
	} while (poisonX == 270 && poisonY ==270 || 
		poisonX == wallArrayX[0] && poisonY == wallArrayY[0] ||
		poisonX == wallArrayX[1] && poisonY == wallArrayY[1] ||
		poisonX == wallArrayX[2] && poisonY == wallArrayY[2] ||
		poisonX == wallArrayX[3] && poisonY == wallArrayY[3] );
		
		draw();	
		
	
	
}

	


function dot()							 // dot
{

	for (let i =1; i< 20; i+=2)
	{
	 	for(let j =1; j< 20; j+=2)
		{	
			ctx.save();

			ctx.beginPath();
			ctx.arc( 30*i, 30*j, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "white";
			ctx.fill();
		
			ctx.restore();

			
		}
	}
	
}

function bell()							//  bell
{


	let i = 0;

		for(let j = 0; j< 20; j+=2)						//left bell line
		{	
			ctx.save();
			ctx.translate(30*i,30*j);
			
			ctx.beginPath();
			ctx.arc( 30, 30, 14, 0, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "3";
			ctx.stroke();
			ctx.fill();
		
			ctx.beginPath();
			ctx.arc( 30, 17, 5, 1* Math.PI, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  
			ctx.fill();

			ctx.beginPath();    								
			ctx.arc( 30, 40, 18, 1.2*Math.PI, 1.8*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();    
			ctx.arc( 20, 30, 5, 0.8*Math.PI, 1.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();      
			
			ctx.beginPath();    
			ctx.arc( 40, 30, 5, 1.8*Math.PI, 2.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();
			ctx.arc( 30, 32, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();

			ctx.beginPath();    
			ctx.moveTo(30, 32);
			ctx.lineTo(30, 44);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "1";
			ctx.stroke();                 

			ctx.restore();	
		}
	
		let j = 18; 
		for(i = 2; i< 20; i+=2)				// bottom bell line
		{	
			ctx.save();
			ctx.translate(30*i,30*j);
			
			ctx.beginPath();
			ctx.arc( 30, 30, 14, 0, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "3";
			ctx.stroke();
			ctx.fill();
		
			ctx.beginPath();
			ctx.arc( 30, 17, 5, 1* Math.PI, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  
			ctx.fill();

			ctx.beginPath();    								// bell main line
			ctx.arc( 30, 40, 18, 1.2*Math.PI, 1.8*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();    
			ctx.arc( 20, 30, 5, 0.8*Math.PI, 1.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();      
			
			ctx.beginPath();    
			ctx.arc( 40, 30, 5, 1.8*Math.PI, 2.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();
			ctx.arc( 30, 32, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();

			ctx.beginPath();    
			ctx.moveTo(30, 32);
			ctx.lineTo(30, 44);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "1";
			ctx.stroke();                 

			ctx.restore();	
		}


		j = 0; 
		for(i = 0; i< 20; i+=2)				// top bell line
		{	
			ctx.save();
			ctx.translate(30*i,30*j);
			
			ctx.beginPath();
			ctx.arc( 30, 30, 14, 0, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "3";
			ctx.stroke();
			ctx.fill();
		
			ctx.beginPath();
			ctx.arc( 30, 17, 5, 1* Math.PI, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  
			ctx.fill();

			ctx.beginPath();    								// bell main line
			ctx.arc( 30, 40, 18, 1.2*Math.PI, 1.8*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();    
			ctx.arc( 20, 30, 5, 0.8*Math.PI, 1.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();      
			
			ctx.beginPath();    
			ctx.arc( 40, 30, 5, 1.8*Math.PI, 2.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();
			ctx.arc( 30, 32, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();

			ctx.beginPath();    
			ctx.moveTo(30, 32);
			ctx.lineTo(30, 44);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "1";
			ctx.stroke();                 

			ctx.restore();	
		}


		i = 18; 							
		for(j = 2; j< 20; j+=2)								// right bell line
		{		
			ctx.save();
			ctx.translate(30*i,30*j);
			
			ctx.beginPath();
			ctx.arc( 30, 30, 14, 0, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "3";
			ctx.stroke();
			ctx.fill();
		
			ctx.beginPath();
			ctx.arc( 30, 17, 5, 1* Math.PI, 2 * Math.PI);
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  
			ctx.fill();

			ctx.beginPath();    								// bell main line
			ctx.arc( 30, 40, 18, 1.2*Math.PI, 1.8*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();    
			ctx.arc( 20, 30, 5, 0.8*Math.PI, 1.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();      
			
			ctx.beginPath();    
			ctx.arc( 40, 30, 5, 1.8*Math.PI, 2.2*Math.PI);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "3";
			ctx.stroke();  

			ctx.beginPath();
			ctx.arc( 30, 32, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();

			ctx.beginPath();    
			ctx.moveTo(30, 32);
			ctx.lineTo(30, 44);
			ctx.strokeStyle = "black"; 
			ctx.lineWidth = "1";
			ctx.stroke();                 

			ctx.restore();	
		}
}


function wall(wallX, wallY)			// wall without corners
{
	
	ctx.save();
	ctx.translate(wallX-30,wallY-30);

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "#FBE7C6";
	ctx.fillStyle = "#FBE7C6";
	ctx.rect(0, 0, 56, 56);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(0, 0, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();


	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(60, 0, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(0, 60, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "pink";
	ctx.fillStyle = "pink";
	ctx.arc(60, 60, 10, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();


	ctx.restore();

}


function wallDist()
{
	wallResult = Math.floor(Math.sqrt(Math.pow(dorX - wallX, 2) + Math.pow(dorY - wallY, 2)));

	return wallResult;
}


function poisonDist()
{
	poisonResult = Math.floor(Math.sqrt(Math.pow(dorX - poisonX, 2) + Math.pow(dorY - poisonY, 2)));
}


function trap(trapX, trapY)
{
	
	ctx.save();
	ctx.translate(trapX, trapY);
	
	ctx.fillStyle="red";
	ctx.beginPath();
	ctx.arc(0, 0, 20, 0 , 2*Math.PI);
	ctx.fill();

	ctx.restore();

}

function keystrokes(event)
{
	wallDist();

	if(event.key == " ")	
	{
		trapX = dorX;
		trapY = dorY;
	}

	if ( poisonResult > 30 )					
	{
		
		if(event.key == "ArrowUp")			// onekeydown
		{

			for (let i =0; i< 4; i++)
			{		
				if (wallArrayX[i] == dorX && wallArrayY[i] == dorY-60)
				{
					temp++;
				}

			}

			if (temp >= 1)
			{
				dorY = dorY;
			}
			else
			{
				dorY -= 60;
			}

			temp =0;
		}

		if(event.key == "ArrowDown")
		{

			for (let i =0; i< 4; i++)
			{		
				if (wallArrayX[i] == dorX && wallArrayY[i] == dorY+60)
				{
					temp++;
				}

			}

			if (temp >= 1)
			{
				dorY = dorY;
			}
			else
			{
				dorY += 60;
			}

			temp =0;
		
		}

		if(event.key == "ArrowLeft")
		{
			for (let i =0; i<4; i++)
			{		
				if (wallArrayX[i] == dorX-60 && wallArrayY[i] == dorY)
				{
					temp++;
				}

			}

			if (temp >= 1)
			{
				dorX = dorX;
			}
			else
			{
				dorX -= 60;
			}

			temp =0;
		
		}

		if(event.key == "ArrowRight")
		{
			for (let i =0; i< 4; i++)
			{		
				if (wallArrayX[i] == dorX+60 && wallArrayY[i] == dorY)
				{
					temp++;
				}

			}

			if (temp >= 1)
			{
				dorX = dorX;
			}
			else
			{
				dorX += 60;
			}

			temp =0;
			
		}


		if (dorX < 30 )
		{
			dorX = 30;
		}

		if (dorX > 570)
		{
			dorX = 570;
		}

		if (dorY < 30 )
		{
			dorY = 30;
		}

		if (dorY > 570 )
		{
			dorY = 570;
		}
		
		
	}

	draw();
	

	if (dorX == pancakeX && dorY == pancakeY)
	{	

		do
		{
			temp = 0;

			pancakeX = list[Math.floor(Math.random()*list.length)];
			pancakeY = list[Math.floor(Math.random()*list.length)];

			for (let i =0; i< 4; i++)
			{		
				if (pancakeY == poisonY|| pancakeX == poisonX || pancakeX == wallArrayX[i] && pancakeY == wallArrayY[i] || pancakeX == dorX && pancakeY == dorY || pancakeX == poisonX && pancakeY == poisonY )
				{
					temp++;
				}
			}	

		} while (temp > 0 );

		score += 100;
		
	}

	poisonDist();

	if (poisonResult < 60)		
	{
		
		gameOver();

	}

	draw(); 

	document.getElementById("score").innerHTML = "Score: " + score; 
}


function gameOver()				// gameover
{
	ctx.save();

	ctx.beginPath();
	ctx = document.getElementById("surface").getContext("2d");
	ctx.font = "80px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER!!", 300, 300);

	ctx.restore();

	clearInterval(timer);
	
}
	
function reset()
{
	dorX = 30;
	dorY = 30;
	score = 0;
	trapX = -30;
	trapY = -30;
	
	clearInterval(timer);
	setup();
}

function drawGrid()				// draw grid
{
	for (let i =0; i< 10; i++)
	{
		for(let j =0; j< 10; j++)
		{
			ctx.save();

			ctx.beginPath();
			ctx.lineWidth = "4";
			ctx.strokeStyle = "pink";
			ctx.fillStyle = "pink";
			ctx.rect(i*60, j*60, 60, 60);
			ctx.stroke();
			ctx.fill();
	

			ctx.restore();


		}
	}

}


function poison(poisonX, poisonY)		//poison
{
	ctx.save();
	ctx.translate(poisonX,poisonY);
	
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(0,-8 ,20, 0 , 2*Math.PI);
	ctx.fill();

	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.rect(-10,-6 ,20, 30);
	ctx.fill();


	ctx.fillStyle="black";				// left eye
	ctx.beginPath();
	ctx.arc(-8,-1, 5, 0 , 2*Math.PI);
	ctx.fill();

	ctx.fillStyle="black";
	ctx.beginPath();
	ctx.arc(8,-1, 5, 0 , 2*Math.PI);	// right eye
	ctx.fill();

	ctx.fillStyle="black";				// nose
	ctx.beginPath();
	ctx.moveTo(0, 5);
    ctx.lineTo(5, 15);
	ctx.lineTo(-5, 15);
    ctx.fill();

	ctx.fillStyle="black";				//cross left line
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.moveTo(-15, 15);
    ctx.lineTo(15, 25);
    ctx.stroke();

	ctx.fillStyle="black";				// cross right line
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.moveTo(15, 15);
    ctx.lineTo(-15, 25);
    ctx.stroke();

	ctx.restore();
}



function pancake(pancakeX,pancakeY) 			// pancake
{
	ctx.save();
	ctx.translate(pancakeX,pancakeY+5);
	
	ctx.strokeStyle="black";
	ctx.fillStyle="#eedfca";
	ctx.beginPath();
	ctx.arc(0,0,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle="black";
	ctx.fillStyle="brown";
	ctx.beginPath();
	ctx.arc(0,-2,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle="black";
	ctx.fillStyle="#eedfca";
	ctx.beginPath();
	ctx.arc(0,-4,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle="black";
	ctx.fillStyle="brown";
	ctx.beginPath();
	ctx.arc(0,-6,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle="black";
	ctx.fillStyle="#eedfca";
	ctx.beginPath();
	ctx.arc(4,-8,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle="black";
	ctx.fillStyle="brown";
	ctx.beginPath();
	ctx.arc(6,-9,20,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();


	ctx.restore();
}




function doraemon(dorX,dorY)                              
{ 
	
	ctx.save();  
	ctx.translate(dorX, dorY);
   
	ctx.beginPath(); 
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);                  // the head
    ctx.fillStyle= "deepskyblue";
    ctx.fill();
        
    ctx.beginPath();    
    ctx.arc(0, 5, 20, 0, 2 * Math.PI);                 // the face
    ctx.fillStyle= "white";
    ctx.fill();                     
    

    ctx.beginPath();    
    ctx.arc(-5, -14, 5, 0, 2 * Math.PI);                // left eye circle
    ctx.strokeStyle = "black"; 
    ctx.fillStyle= "white";
    ctx.stroke();                                      // Draw it
    ctx.fill();                     
    

    ctx.beginPath();    
    ctx.arc(5, -14, 5, 0, 2 * Math.PI);                 // right eye circle
    ctx.strokeStyle = "black"; 
    ctx.fillStyle= "white";
    ctx.stroke();                                      
    ctx.fill();                     

                                     
    ctx.beginPath();    
    ctx.strokeRect(-5, -14, 1, 1);                      // left eye dot
    ctx.fillStyle= "black";                                
    ctx.fill();                     
 
    ctx.beginPath();                        
    ctx.strokeRect(5, -14, 1, 1);                       // right eye dot
    ctx.fillStyle= "black";                                
    ctx.fill();                     


    ctx.beginPath();    
    ctx.arc(0, -7, 3, 0, 2 * Math.PI);                 // red nose
    ctx.fillStyle= "red";        
    ctx.fill();                     


    ctx.beginPath();    
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 10);
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "0.5";
    ctx.stroke();                                      // Draw it           


    ctx.beginPath();    
    ctx.moveTo(-16, 4);
    ctx.lineTo(0, 10);                                  // left mouth line
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "0.5";
    ctx.stroke();                                      // Draw it           


    ctx.beginPath();    
    ctx.moveTo(16, 4);
    ctx.lineTo(0, 10);                                  // right mouth line
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "0.5";
    ctx.stroke();                                    
   

    ctx.beginPath();    
    ctx.moveTo(-16, -6);
    ctx.lineTo(-4, -4);                                  // left whiskers line 1

    ctx.moveTo(-16, -2);
    ctx.lineTo(-4, -2);                                 // left whiskers line 2

    ctx.moveTo(-16, 2);                                     
    ctx.lineTo(-4, 2);                                  // left whiskers line 3

    
    ctx.moveTo(16, -6);
    ctx.lineTo(4, -4);                                  // right whiskers line 1

    ctx.moveTo(16, -2);
    ctx.lineTo(4, -2);                                 // right whiskers line 2

    ctx.moveTo(16, 2);                                     
    ctx.lineTo(4, 2);                                  // right whiskers line 3

    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "0.5";
    ctx.stroke();    
	                                
    ctx.restore();

}





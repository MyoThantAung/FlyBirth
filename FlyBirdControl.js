var gcav = document.getElementById("gameCanvas");
var gcon = gcav.getContext("2d");
var cal_HY;
var cloud_speed = 0.1;
var cloud_pos = 600;
var cloud_speed1 = 0.1;
var cloud_pos1 = 470;
var cloud_speed2 = 0.1;
var cloud_pos2 = 170;
var cloud_speed3 = 0.1;
var cloud_pos3 = 330;
var cloud_speed4 = 0.1;
var cloud_pos4 = 20;
var game,menu;

//cloud image
var cloud  = new Image();
var cloud1 = new Image();
var cloud2 = new Image();
var cloud3 = new Image();
var cloud4 = new Image();

//cloud assign 
cloud.src  = "image/cloud1.png";
cloud1.src = "image/cloud2.png";
cloud2.src = "image/cloud3.png";
cloud3.src = "image/cloud4.png";
cloud4.src = "image/cloud5.png";

//logo
var logo_image=new Image();
logo_image.src="image/flybirdlogo.png";

//background
var b_image=new Image();
b_image.src="image/gameBG.jpg";

//ground image
var ground = new Image();
var ground_flip = new Image();

//ground assign
ground.src="image/summer_ground.png";
ground_flip.src="image/summmer_ground_flip.png";

var score=0;
var best=0;

//bird
var bird = new Image();

//bird animated
var b_count = 1;
var b_path;

//bird fly
var bird_Y=gcav.height/3;
var bird_gravity=1;
var rock1  = new Image();
var rock2  = new Image();
rock1.src="image/rock1.png";
rock2.src="image/rock2.png";

var r_const = 150;
var rX=gcav.width;
var rY=Math.floor(Math.random()*500+50);
var rX1=gcav.width+500;
var rY1=Math.floor(Math.random()*500+50);
var re;
var m_X;
var m_Y;

var start_menu= new Image();
start_menu.src="image/start_menu.png";


var Smenu = new Image();
Smenu.src="image/menu_prototype.png";

function fly(){
	if(bird_Y>0){
		bird_Y-=30;
	}
}
function drawRock(){
	
	
	
	gcon.drawImage(rock1,rX,rY);
	gcon.drawImage(rock2,rX,rY-r_const-gcav.height);
	
	if(rX>-70){
		rX-=2;
	}else{
		score++;
		rX=gcav.width;
		rY=Math.floor(Math.random()*500+50);
	}
	
	gcon.drawImage(rock1,rX1,rY1);
	gcon.drawImage(rock2,rX1,rY1-r_const-gcav.height);
	
	if(rX1>-70){
		rX1-=2;
	}else{
		score++;
		rX1=gcav.width;
		
		re = rY-rY1;
		
	while(re>200){
		rY1=Math.floor(Math.random()*500+50);
		re=rY-rY1;
	}
			
		
		
	}
	
	
	
}
function draw() {
gcon.clearRect(0,0,gcav.width,gcav.height);
gcon.drawImage(b_image,0,0,gcav.width,gcav.height);
	
	
	drawCloud();
	drawRock();
	drawBird();
	
    
	gravity();

	//testText();
	fscore();
	gameOvercase();
}
function drawCloud(){
	gcon.drawImage(cloud, cloud_pos, 0, 100, 100);
	if(cloud_pos<gcav.width){
		cloud_pos+=cloud_speed;
	}else{
		cloud_pos=-100;
	}
	
	gcon.drawImage(cloud1,cloud_pos1, 40, 100, 70);
	if(cloud_pos1<gcav.width){
		cloud_pos1+=cloud_speed1;
	}else{
		cloud_pos1=-100;
	}
	
	gcon.drawImage(cloud2,cloud_pos2, 40, 100, 70);
	if(cloud_pos2<gcav.width){
		cloud_pos2+=cloud_speed2;
	}else{
		cloud_pos2=-100;
	}
	
	gcon.drawImage(cloud3,cloud_pos3, 60, 100, 70);
	if(cloud_pos3<gcav.width){
		cloud_pos3+=cloud_speed3;
	}else{
		cloud_pos3=-100;
	}
	
	gcon.drawImage(cloud4,cloud_pos4, 10, 100, 70);
	if(cloud_pos4<gcav.width){
		cloud_pos4+=cloud_speed4;
	}else{
		cloud_pos4=-100;
	}
	

}





//draw bird
function drawBird(){
	b_path ="image/bird/Layer" + b_count + ".png"
	bird.src= b_path;
    gcon.drawImage(bird,20,bird_Y,70,50);
	if(b_count!=37){
		b_count+=1;
	}else{
		b_count=1;
	}
}


//draw tree





function gravity(){
	bird_Y+=bird_gravity;
}

function gameOvercase(){
	if(bird_Y>gcav.height){
		gameOver();
	}
	
	if(rX<70 && rX>-40){
		if(bird_Y>gcav.height-(gcav.height-rY)-40){
			g=gcav.height-rY;
	
			//alert("case1");
		gameOver();
		}
		else if( bird_Y<rY-r_const-20){
		
		g1=rY-r_const;
			//alert("case2");
		gameOver();
		}
	}
	
	if(rX1<70 && rX1>-40){
		if(bird_Y>gcav.height-(gcav.height-rY1)-40){
			g=gcav.height-rY1;
	
			//alert("1case1");
		gameOver();
		}
		else if( bird_Y<rY1-r_const-20){
		
		g1=rY1-r_const;
			//alert("1case2");
		gameOver();
		}
	}
	
		
}



function gameOver(){
	clearInterval(game);
	

	gcon.drawImage(Smenu,(gcav.width/2)-100,0);
	EventUtil.removeHandler(gcav,"click",fly);
	EventUtil.addHandler(gcav,"click",rgameStart);
	

}

function rgameStart(){
	if(m_X>452 && m_X<527 && m_Y>267 && m_Y<333){
		clearInterval(menu);
		EventUtil.removeHandler(gcav,"click",rgameStart);
	reInit();
    game = setInterval(Game,10);
		
	}else if(m_X>442 && m_X<473 && m_Y>479 && m_Y<512){
		clearInterval(Game);
		EventUtil.removeHandler(gcav,"click",rgameStart);
		reInit();
		menu = setInterval(wel_menu,10);
	}
	
	
}

function gameStart(){
	if(m_X>435 && m_X<526 && m_Y>379 && m_Y<416){
		clearInterval(menu);
	reInit();
    game = setInterval(Game,10);
	}
	
}

function testText(){
	gcon.fillStyle="#0024ff";
	
	gcon.fillText("bird_Y :" + bird_Y,0,50);
	gcon.fillText("rX :" + rX,0,100);
    gcon.fillText("rX1 :" + rX1,0,150);
	gcon.fillText("rY :" + rY,0,200);
	gcon.fillText("rY1 :" + rY1,0,250);
	gcon.fillText(" re:" + re,0,300);
	gcon.fillText(" :" + g1,0,350); 
	
}



function fscore(){
	gcon.font="16px Arial";
	gcon.fillStyle="#ffffff";
	gcon.fillText("SCORE "+score,gcav.width-100,30);
	gcon.fillText("BEST "+best,gcav.width-100,60);

	
}


function Game(){
	gcon.clearRect(0,0,gcav.width,gcav.height);
gcon.drawImage(b_image,0,0,gcav.width,gcav.height);

draw();
}

function reInit(){
	
	EventUtil.removeHandler(gcav,"click",gameStart);
	//EventUtil.removeHandler(gcav,"click",regameStart);
	EventUtil.addHandler(gcav,"click",fly);
	cloud_speed = 0.1;
cloud_pos = 600;
 cloud_speed1 = 0.1;
 cloud_pos1 = 470;
 cloud_speed2 = 0.1;
 cloud_pos2 = 170;
 cloud_speed3 = 0.1;
 cloud_pos3 = 330;
 cloud_speed4 = 0.1;
 cloud_pos4 = 20;
	b_count = 1;
	bird_Y=gcav.height/3;
bird_gravity=1.2;
	r_const = 150;
 rX=gcav.width;
 rY=Math.floor(Math.random()*500+50);
 rX1=gcav.width+500;
 rY1=Math.floor(Math.random()*500+50);
	
	if(score>best){
		best=score;
	}
	score=0;
}

function wel_menu(){

gcon.drawImage(b_image,0,0,gcav.width,gcav.height);
	drawCloud();
	
	gcon.drawImage(start_menu,(gcav.width/2)-100,0);
	EventUtil.addHandler(gcav,"click",gameStart);
}


	menu = setInterval(wel_menu,10);
EventUtil.addHandler(gcav,"click",fly);


EventUtil.addHandler(gcav,"mousemove",function(event){
	m_X=event.clientX;
	m_Y=event.clientY;
});






var monkey , monkey_running, monkeyImage
var banana ,bananaImage, obstacle, obstacleImage, ground
var bananaGroup, obstacleGroup
var survivalTime=0;
var score =0;
var gameState;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,400);
  monkey= createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stop", monkey_stop)
  monkey.scale=0.1;
  

  ground= createSprite(450,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  gameState= "play";
}


function draw() {
background("white");
   stroke("black");
    textSize(20);
    fill("black");
  text("survival Time:" + survivalTime, 100, 50);
    text("Score:" +score, 300,50)    
  if(gameState==="play"){
    
  
   
    survivalTime=Math.ceil(frameCount/frameRate())
    
    if (ground.x <140){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 1;

    monkey.collide(ground);
  
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score +1; 
    }
    banana();
    obstacle();
 
   if (obstacleGroup.isTouching(monkey)){
     console.log("touch");
     gameState ="end";
     
   }
  }
  if(gameState==="end"){
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("stop",monkey_stop)
  }
  
  drawSprites();
}

function banana(){
  if (frameCount % 200 === 0) {
      var banana = createSprite(600,120,40,10);
        banana.y = Math.round(random(120,200));
        banana.addImage(bananaImage);
    banana.velocityX=-3;
    banana.lifetime=300;
    banana.scale=0.1;
    bananaGroup.add(banana);
  }
}
function obstacle(){
   if (frameCount % 250 === 0){
   var obstacle = createSprite(300,330,10,40);
   obstacle.velocityX = -5;
    obstacle.scale=0.1;
    obstacle.addImage(obstacleImage);
   obstacleGroup.add(obstacle);
  
}
   
}




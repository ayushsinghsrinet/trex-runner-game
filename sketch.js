var trex, trex_running, trex_collided,restart,gameover;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,restartimg,gameoverimg,treco;

var score;

var die;

var beep;
var jump;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartimg=loadImage("restart.png");
  gameoverimg=loadImage("gameOver.png");
  
  treco=loadAnimation("trex_collided.png");
  
  beep=loadSound('checkPoint.mp3');
jump=loadSound('jump (1).mp3')
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",treco);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,178,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover=createSprite(300,80,1,02);
  gameover.addImage("gameove",gameoverimg);
  gameover.scale=0.6;
  gameover.visible=false;
  restart=createSprite(300,120,0,2);
  restart.addImage("restart",restartimg);
  restart.scale=0.5;
  restart.visible=false;
  
  trex.setCollider("rectangle",0,0,25,40);
  
  score = 0;
   PLAY = 1;
 END = 0;
 gameState = PLAY;
}

function draw() {
  background(250);
  
 if(gameState===PLAY) {
  
     ground.velocityX = -(3 + score/100);
   score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")&&trex.y>150) {
      jump.play();
    trex.velocityY = -10;
    }
   
      if (score>0 && score%100 === 0){
      beep.play();
    }
    
   
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   trex.velocityY = trex.velocityY + 0.8
   
  
   
   spawnClouds();
  spawnObstacles();
   
   if(obstaclesGroup.isTouching(trex)){
     

        ground.velocityX = 0;
    trex.velocityY = 0;
     gameState=END;
          
     
   }
 }
  else if (gameState===END){
   trex.changeAnimation("collide",trex_collided.png);
     gameover.visible=true;
  restart.visible=true;
     score=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
   
    obstaclesGroup.setLifetimeEach(-1);

    cloudsGroup.setLifetimeEach(-1);
    
  }

  
   if(mousePressedOver(restart)){
       trex.changeAnimation("running", trex_running);
        gameover.visible=false;
  restart.visible=false;
      obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
      reset();
   }
  text("Score: "+ score, 500,50);
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
} 
function reset(){
   
  gameState=PLAY;
}
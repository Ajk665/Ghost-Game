var PLAY = 1;
var END = 0;

var gameState = 1;

var score = 0;

function preload(){
  towerImage = loadImage("tower.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
 createCanvas(600,600);
  
  tower = createSprite(300,300,500,600);
  tower.addImage(towerImage);
  tower.velocityY = 5 + score/100;
  
  ghost = createSprite(300,300,30,50)
  ghost.addImage(ghostImage);
  ghost.scale = 0.35
  
  doorGroup = new Group();
  climberGroup = new Group(); 
  invisibleGroup = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState == PLAY){
    
    score = score + Math.round(getFrameRate()/60);

    
    wall1 = createSprite(535,300,5,600);
  wall2 = createSprite(65,300,5,600);
  wall3 = createSprite(300,5,600,5);
  
  wall1.visible = false;
  wall2.visible = false;
  wall3.visible = false;
  
  ghost.bounceOff(wall1);
  ghost.bounceOff(wall2);
  ghost.bounceOff(wall3);
  
  if(ghost.isTouching(climberGroup)){
     ghost.velocityY = 0;
  }

  if(ghost.isTouching(invisibleGroup)||ghost.y >600){
     gameState = END;
     
  }
  
  spookySound.play();
  
  if(tower.y > 600){
    tower.y = 300;
  }
  
  if(keyDown("up_arrow")){
    ghost.velocityY = -13
  }
  
   if(keyDown("right_arrow")){
    ghost.x = ghost.x + 5;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 5;
  }
  
    ghost.velocityY += 0.5;
  
  spawnDoors();
    
  }
  
  drawSprites();
  
  fill("white");
  text("Score = "+score,520,50);
  
  if(gameState == END){
    
    textSize(50);
    fill("white");
    text("GAME OVER",150,300);
    
    ghost.destroy();
    tower.visible = false;
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    
  }
}

function spawnDoors(){
    
  rand = Math.round(random(100,500));
    
  if(World.frameCount % 100 == 0){
    
    door = createSprite(rand,1,50,50)
    climber = createSprite(rand,70,50,50);
    invisible = createSprite(rand,75,100,15);
    door.addImage(doorImage);
    climber.addImage(climberImage);
    door.velocityY = 5 + score/100; 
    climber.velocityY = 5 + score/100;
    invisible.velocityY = 5 + score/100;
    door.depth = ghost.depth - 1;
    climber.depth = ghost.depth - 1;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisible);
    invisible.visible = false;
  }

}

//creating
var tower , towerImg;
var ghost, ghostImg  ;
var door , doorImg , doorsGroup;
var climber, climberImg , climberGroup;
var invisibleBlock , InvisibleBlocksGroup;
var gameState = "PLAY" ; 

function preload(){
 towerImg = loadImage("tower.png");
 ghostImg = loadImage("ghost-standing.png")
 doorImg = loadImage("door.png")
 climberImg = loadImage("climber.png")

  
}
 function setup(){
   
   //creating canvas
   createCanvas(windowWidth,windowHeight);
   
   //creating tower sprite
   tower = createSprite(300,300);
   tower.addImage(towerImg);
   tower.velocityY = 2;
   
   //creating ghost sprite
   ghost = createSprite(280,250,50,50);
   ghost.addImage(ghostImg);
   ghost.scale = 0.3;
  
   //creating the group for invisible blocks , door and climber
   doorsGroup = new Group();
   climberGroup = new Group();
   InvisibleBlocksGroup = new Group();
}

function draw(){
background(0);
  
if(gameState === "PLAY"){

//making the ghost jump with space bar  
if(keyDown("space")){
 ghost.velocityY = -10;
}  
//making the ghost move with arrow keys
//left key
if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
}  
//right key
if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
}
//creating gravity for ghost
ghost.velocityY =  ghost.velocityY + 0.8;
  
  //continous tower 
if(tower.y > 400){
    tower.y = 300
}

  
//conditions when climber and ghost collide
if(climberGroup.isTouching(ghost)){
  ghost.velocityY = 0;
  tower.velocityY = 0;
  doorsGroup.velocityY = 0;
  climberGroup.velocityY = 0;
  InvisibleBlocksGroup.velocityY = 0;
  
}
//conditions when invisible block and ghost collide
if(InvisibleBlocksGroup.isTouching(ghost)||ghost.y > 550){
  ghost.destroy();
  doorsGroup.destroyEach();
  climberGroup.destroyEach();
  tower.destroy();
  InvisibleBlocksGroup.destroyEach();
  gameState = "END";
}   
//making doors spawn
  spawnDoors();
}
  
if(gameState === "END"){
  fill("yellow");
  textSize(40);
  text("Game Over!!",200,250);
  
}
  //drawing all sprites
  drawSprites();
  
}

function spawnDoors(){
  
  //spwaning doors and climbers
 if(frameCount % 130 === 0){
   
   //creating sprites
  door = createSprite(115,-70);
  climber = createSprite(115,-10);
  InvisibleBlock = createSprite(115,0);
  InvisibleBlock.width = climber.width ;
  InvisibleBlock.height = 2;
   
  //adding images 
  door.addImage(doorImg);
   climber.addImage(climberImg)
   
   //setting velocity
  door.velocityY = 6;
   climber.velocityY = 6;
  InvisibleBlock.velocityY = 6;
   
   //making random posiiton for door and climber 
   door.x = Math.round(random(115,400));
   climber.x = door.x;
     InvisibleBlock.x = door.x;
     
   //setting the depth of ghost 
   ghost.depth = door.depth;
   ghost.depth += 1;
 
   //setting the lifetime of door and climber
   climber.lifetime = 550;
   door.lifetime = 560;
   
   //showing the depth of ghost and door
  console.log(door.depth);
  console.log(ghost.depth);
   
   //showing the InvisibleBlock 
   InvisibleBlock.debug = true;

   //adding InvisibleBlocks , doors and climbers to their groups
 climberGroup.add(climber);
   doorsGroup.add(door);
   InvisibleBlocksGroup.add(InvisibleBlock);
 }
}


  
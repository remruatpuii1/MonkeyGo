var monkey , monkey_running;

var banana ,bananaImage;

var obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

var score = 0;

var backg,ground,groundImage;

var time = 0;

function preload(){
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
  "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png",
  "Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
  groundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400,400);

  ground = createSprite(70,200,80,20);
  ground.addImage("jungle",groundImage);
  ground.scale=1;
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  backg = createSprite(70,380,800,20);
  backg.visible=false;
  
  monkey = createSprite(100,370,20,20);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale=0.1;
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("green");
  
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
  if (keyDown("space") && monkey.y>300)
    {
      monkey.velocityY = -10;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
    
  monkey.collide(backg);
  
  if (FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach();
      score = score + 2;
    }
  
switch (score)
{
  case 10 : monkey.scale = 0.12;
    break;
  case 20 : monkey.scale = 0.14;
    break;
  case 30 : monkey.scale=0.16;
    break;
  case 40 : monkey.scale=0.18;
    break;
  default: break;
}
  
  if (obstacleGroup.isTouching(monkey))
    {
      monkey.scale = 0.1;
    }
    
  food();
  obstacle();

  camera.position.x=displayWidth/8;
  camera.position.y=monkey.y;
  
  drawSprites();

  stroke("white");
  textSize(15);
  fill("white");
  text("Score: "+score,250,150);
  
  stroke("black");
  textSize(15);
  fill("black");
  time=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + time,100,150);
  
}

function food()
{
  if(frameCount % 80===0)
    {
      var banana = createSprite(600,100,20,20);
      banana.addImage(bananaImage);
      banana.scale=0.04;
      banana.y = Math.round(random(200,300));
      banana.velocityX = -(8+(score/10));
      banana.lifetime=80;
      
      FoodGroup.add(banana);
    }
}

function obstacle()
{
  if(frameCount % 200===0)
    {
      var rock = createSprite(600,350,20,20);
      rock.addImage(obstacleImage);
      rock.scale=0.3;
      rock.velocityX = -(9+(score/10));
      rock.lifetime=80;
      
      obstacleGroup.add(rock);
    }
}
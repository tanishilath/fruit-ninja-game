var play = 1;
var end = 0;
var restart = 2;
var gamestate = play;

var enemy_moving,enemyi;
var monster_moving,monsterimage;
var backgroundn,back ;
var fruit1,fruit1i;
var fruit2,fruit2i;
var fruit3,fruit3i;
var fruit4,fruit4i;

var gameover,gameoverimage,gameovermu,gameoverm;

var sword,swordi;
var knife,knifem;

var fruitsgroup;
var enemygroup;

var fruit;

var knifesm;
var select_fruit;
var score ;

function preload(){
  back = loadImage("ninja.jpg");
  fruit1i = loadImage("fruit1.png");
  fruit2i = loadImage("fruit2.png");
  fruit3i = loadImage("fruit3.png");
  fruit4i = loadImage("fruit4.png");
  enemyi = loadAnimation("alien1.png","alien2.png");
  swordi=loadImage("sword.png");
  gameoverimage = loadImage("gameover.png")
  knifem = loadSound("knifeSwooshSound.mp3");
  gameoverm = loadSound("433644__dersuperanton__game-over-sound.wav");
  knifesm = loadSound("336593__anthousai__knife-sharpen-02.wav");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  backgroundn = createSprite(windowWidth,windowHeight);
  backgroundn.scale = width,height;
  backgroundn.addImage(back);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordi);
  sword.scale = 0.5;
  fruitsgroup = new Group();
  enemygroup = new Group();
  gameover = createSprite(windowWidth/2,windowHeight/2-0);
  gameover.addImage(gameoverimage);
  gameover.scale= 1;
  score = 0;
}
function draw(){
  background("white");
  textSize(22);
  fill("white");
  if (gamestate === play){
    sword.x = World.mouseX;
  sword.y = World.mouseY;
  gameover.visible = false;
  if (fruitsgroup.isTouching(sword)){
    fruitsgroup.destroyEach();
    score = score+1;
    knifesm.play();
  }
  }
  if (enemygroup.isTouching(sword)){
    gameover.visible = true;
     gameoverm.play();
    gamestate = end;
    }
  if (gamestate === end){
     enemygroup.destroyEach();
    fruitsgroup.destroyEach();
   }
  if (keyDown("r") && gamestate === end){
    gamestate = play;
    score = 0;
  }
fruits();
enemy(); 
 drawSprites();
   text("score: "+score,width-200,20);
  if (gamestate === end){
    text("press r to restart the game",windowWidth/2,windowHeight/2+50);
  }
}
function fruits(){
if (frameCount%50 === 0){
 var fruit = createSprite(width+10,Math.round(random(600,10)),20,20);
    fruit.scale =0.2;
  
    //fruit.debug = true;
      r = Math.round(random(1, 4));
      
      if(r == 1){
        fruit.addImage(fruit1i);
      }
      else if(r == 2){
        fruit.addImage(fruit2i);
      }
      else if(r == 3){
        fruit.addImage(fruit3i);
      }
      else{
        fruit.addImage(fruit4i);
      }
      
      fruit.y = Math.round(random(50, 540));
     
      
      //set lifetime and velocity
      fruit.velocityX = -(10+score/3);
      
      fruit.setLifetime = 100;

      //add each fruit to the group
      fruitsgroup.add(fruit);
    }
}
function enemy(){
  if( frameCount%100===0){
 var  enemy = createSprite(width+10,200,20,20);
      enemy.addAnimation("moving",enemyi);
      enemy.y = Math.round(random(100,500));
      enemy.velocityX = -(15+score/3);
      enemy.setLifetime = 75;
     enemygroup.add(enemy);
}
}
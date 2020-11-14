// creating the variables
var imposter, background;

// loading the animations and images
function preload (){
  layoutImg = loadImage("background.png");
  imposterAnime = loadAnimation("imposter1.png", "imposter2.png", "imposter3.png", "imposter4.png", 
  "imposter5.png");
  startButtonImg = loadImage("startButtonImg.png");
  powerUpImg = loadImage("powerUp.png");
  wingBotAnime = loadAnimation("wingBot1.png", "wingBot2.png", "wingBot3.png", "wingBot4.png", 
  "wingBot5.png");
  spinyBotAnime = loadAnimation("spinyBot1.png", "spinyBot2.png");
  insectImg = loadImage("insect.png");
  gameOverImg = loadImage("gameOver.png");
}

// creating the function set up
function setup() {
  createCanvas(displayWidth, displayHeight);

  // creating the elements of the game
  imposter = createSprite(width/2, 870, 50, 50);
  imposter.addAnimation("animation", imposterAnime);
  imposter.scale = 1.175;
  imposter.setCollider("rectangle", 0, 0, 35, 60);

  // creating the gamestates 
  gameState = 0;

  // creating the score system
  score = 0;

  // creating the neccessary groups
  startButtonGroup = new Group();
  powerUpGroup = new Group();
  wingBotGroup = new Group();
  spinyBotGroup = new Group();
  insectGroup = new Group();
}

// creating the function draw
function draw() {
  background(layoutImg); 

  if(gameState === 0){
    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("Welcome to the Game Among us", 500, 100);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("Collect all the power ups if possible", 500, 200);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("Dodge from the enemies if possible", 500, 300);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("You are the imposter and it is", 550, 400);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("controlled by you", 600, 450);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("Press the start button so", 550, 550);

    textFont("Georgia");
    textSize(30);
    fill(0, 0, 0) ;
    text("as to start the game", 600, 600);

    var startButton = createSprite(width/2, height/2 + 250);
    startButton.addImage(startButtonImg);
    startButton.scale = 2
    startButtonGroup.add(startButton);

    if(mousePressedOver(startButton)){
      gameState = 1;
    }
  }

  if(gameState === 1){

    // making the startbutton to destroy
    startButtonGroup.destroyEach();

    // making the imposter to be user controllable
    imposter.x = mouseX;
    imposter.y = mouseY;

    

    // making the power ups 
    if(frameCount % 100 === 0){
      var powerUp = createSprite(random(20, displayWidth), 1000, 10, 10)
      powerUp.addImage(powerUpImg);
      powerUp.scale = 2;
      powerUp.velocityY = -10;
      powerUp.lifetime = 200;
      powerUpGroup.add(powerUp);
    }

    // making the power ups 
    if(frameCount % 150 === 0){
      var powerUp = createSprite(random(20, displayWidth), -10, 10, 10)
      powerUp.addImage(powerUpImg);
      powerUp.scale = 2;
      powerUp.velocityY = 10;
      powerUp.lifetime = 200;
      powerUpGroup.add(powerUp);
    }

    // making the Wing bot  
    if(frameCount % 90 === 0){
      var wingBot = createSprite(-10, random(20, displayHeight), 10, 10)
      wingBot.addAnimation("animation", wingBotAnime);
      wingBot.scale = 0.7;
      wingBot.velocityX = 10;
      wingBot.lifetime = 200;
      wingBotGroup.add(wingBot);
    }

    // making the Wing bot  
    if(frameCount % 60 === 0){
      var wingBot = createSprite(1500, random(20, displayHeight), 10, 10)
      wingBot.addAnimation("animation", wingBotAnime);
      wingBot.scale = 0.7;
      wingBot.velocityX = -10;
      wingBot.lifetime = 200;
      wingBotGroup.add(wingBot);
    }

   // making the spiny bot  
    if(frameCount % 50 === 0){
      var spinyBot = createSprite(random(20, displayWidth), -20, 10, 10)
      spinyBot.addAnimation("animation", spinyBotAnime);
      spinyBot.scale = 0.7;
      spinyBot.velocityY = 10;
      spinyBot.lifetime = 200;
      spinyBotGroup.add(spinyBot);
    }

    // making the spiny bot  
    if(frameCount % 50 === 0){
      var spinyBot = createSprite(random(20, displayWidth), 1000, 10, 10)
      spinyBot.addAnimation("animation", spinyBotAnime);
      spinyBot.scale = 0.7;
      spinyBot.velocityY = -10;
      spinyBot.lifetime = 200;
      spinyBotGroup.add(spinyBot);
    }


    // making the Insect
    if(frameCount % 80 === 0){
      var insect = createSprite(-20, random(20, displayHeight), 10, 10)
      insect.addImage(insectImg);
      insect.scale = 0.7;
      insect.velocityX = 10;
      insect.lifetime = 200;
      insectGroup.add(insect);
    }

    // making the Insect
    if(frameCount % 80 === 0){
      var insect = createSprite(-20, random(1500, displayHeight), 10, 10)
      insect.addImage(insectImg);
      insect.scale = 0.7;
      insect.velocityX = -10;
      insect.lifetime = 200;
      insectGroup.add(insect);
    }

    textFont("Ayuthaya");
    textSize(30);
    fill(0, 0, 0) ;
    text("player Score = " + score, displayWidth/2 - 100, displayHeight/2 + 400);

    if(powerUpGroup.isTouching(imposter)){
      powerUpGroup.destroyEach();
      score = score + 1;
      imposter.scale = imposter.scale + 0.05;
    }

    if(wingBotGroup.isTouching(imposter)){
      wingBotGroup.destroyEach();
      imposter.destroy();
      gameState = 2;
    }
    if(spinyBotGroup.isTouching(imposter)){
      spinyBotGroup.destroyEach();
      imposter.destroy();
      gameState = 2;
    }

    if(insectGroup.isTouching(imposter)){
      insectGroup.destroyEach();
      imposter.destroy();
      gameState = 2;
    }
  }

  if(gameState === 2){
    var gameOver = createSprite(displayWidth/2, displayHeight/2 - 300, 10, 10)
    gameOver.addImage(gameOverImg);
    gameOver.scale = 2;

    textFont("algerian");
    textSize(50);
    fill(0, 0, 0) ;
    text("--Congratulations--", displayWidth/2 - 200, displayHeight/2 - 100);

    textFont("algerian");
    textSize(50);
    fill(0, 0, 0) ;
    text("Your score = " + score, displayWidth/2 - 150, displayHeight/2);
  }
  
  drawSprites();
}
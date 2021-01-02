var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,bath,bathroom,napy,player,living;

var dogState = "awake";

function preload()
{

  
  happyDog = loadImage("Lazy.png");

  normalDog = loadImage("dogImg1.png");

 

  living = loadImage("Garden.png")
}

function setup() {
  createCanvas(1200,500);
  

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(180,200,20,20);
  dog.addImage(normalDog);

  dog.scale = 0.3;

  feed = createButton("Feed");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add more food");
  addFood.position(790,95);
  addFood.mousePressed(addFoods);

  


  player = createButton("play")
  player.position(990,95);
  player.mousePressed(play);

  foodObject = new Food();
}


function draw() {  
  background("pink");

  text("I am  your little puppy please feed and play with me!! :D",200,400)
  fill("black")
  
 
  foodObject.display();

  drawSprites();
 



  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + " PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + foodObject.lastFed + " AM",350,30);
  }

  fill("black");

  text("Food left: " + foodObject.foodStock,550,130);


  if(foodObject.currentTime > foodObject.lastFed){
    if(foodObject.lastFed + 2 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.livingRoom,180,200,200,300);
        console.log("YAY");
    }else if(foodObject.lastFed + 1 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.garden,180,200,200,300);
        console.log("YAY1");
    }else{

    }

}

}




function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodObject.foodStock++;
  dog.addImage(normalDog);
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}





function play(){
  dog.addImage(living);
}
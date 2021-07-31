class Game {
    constructor(){

    }

  getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value",function(data){
        gameState = data.val();
      })
  }

  update(state){
    database.ref('/').update({
        gameState: state
      });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    greenGhost = createSprite(1400, 700, 50, 50);
    greenGhost.addImage("greenGhost",greenGhostImg);
    purpleGhost = createSprite(100,700,50,50);
    purpleGhost.addImage("purpleGhost",purpleGhostImg);
    Ghost = [greenGhost,purpleGhost];
    
}

play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("#FFFFFF");
      //image(backgroundImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var index = 0;
      var x = 200;
      var y;
      drawSprites();
      for(var plr in allPlayers){
        index = index + 1 ;

        y = displayHeight - allPlayers[plr].distance;
        

        if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(x,y,60,60);
          Ghost[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          
        }
   
        }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
    }

    end(){
        console.log("Game Ended");
      }
    
}

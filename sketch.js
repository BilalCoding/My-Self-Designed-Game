function preload(){
    // Load background image
    bckImg = loadImage("assets/bkg.png");

    // Load images for the blue player
    player1StandImg = loadImage("assets/blue/stance.png");
    player1PunchImg = loadImage("assets/blue/punch.png");
    player1GetPunchedImg = loadImage("assets/blue/getPunched.png");
    player1WinImg = loadImage("assets/blue/win.png");
    player1RIPImg = loadImage("assets/blue/rip.png");

    // Load images for the red player
    player2StandImg = loadImage("assets/red/stance.png");
    player2PunchImg = loadImage("assets/red/punch.png");
    player2GetPunchedImg = loadImage("assets/red/getPunched.png");
    player2WinImg = loadImage("assets/red/win.png");
    player2RIPImg = loadImage("assets/red/rip.png");

}

function setup(){
    // Creating the canvas
    createCanvas(windowWidth, windowHeight);

    //Creating player1
    player1 = createSprite(width/4, height/1.5, 50, 100);
    player1.addImage(player1StandImg);
    player1.scale = 1.5;
    player1.debug = false;
    isPunching1 = false;

    // Creating player2
    player2 = createSprite(width/1.35, height/1.5, 50, 100);
    player2.addImage(player2StandImg);
    player2.scale = 1.5;
    player2.debug = false;
    isPunching2 = false;

    // Creating player1's lifebar
    lifeBarOutline1 = createSprite(width/12, height/6, 210, 60);
    lifeBarOutline1.shapeColor = "black";
    lifeBar1 = createSprite(width/12, height/6, 200, 50);
    lifeBar1.shapeColor = "blue";

    // Creating player2's lifebar
    lifeBarOutline2 = createSprite(width/1.08, height/6, 210, 60);
    lifeBarOutline2.shapeColor = "black";
    lifeBar2 = createSprite(width/1.08, height/6, 200, 50);
    lifeBar2.shapeColor = "red";

    gameState = 1;
}

function draw(){
    // Adding background
    background(bckImg);

    // Creating edges
    edges = createEdgeSprites();

    // Making players collide with the edge sprites
    player1.collide(edges);
    player2.collide(edges);

    if(gameState == 1){
        // Showing player1's getPunched image when he is punched and reducing their life
        if(player2.isTouching(player1) && isPunching2 == true){
            player1.addImage(player1GetPunchedImg);
            lifeDecrease(lifeBar1);
            player1.bounceOff(player2)
        }

        // Showing player2's getPunched image when he is punched and reducing their life
        if(player1.isTouching(player2) && isPunching1 == true){
            player2.addImage(player2GetPunchedImg);
            lifeDecrease(lifeBar2);
            player2.bounceOff(player1)
        }

        // Showing player1's win image when player2 is defeated
        if(lifeBar2.width == 0){
            gameState = 0;
            player1.addImage(player1WinImg);
            player2.addImage(player2RIPImg);
            player2.position.y += 150;
            lifeBar2.visible = false;
            gameOver1();
        }

        // Showing player2's win image when player1 is defeated
        if(lifeBar1.width == 0){
            gameState = 0;
            player2.addImage(player2WinImg);
            player1.addImage(player1RIPImg);
            player1.position.y += 150;
            lifeBar1.visible = false;
            gameOver2();
        }
    }

    // Drawing sprites
    drawSprites();
}

function keyPressed(){
    if(gameState == 1){
        // Player1 controls
        if(keyCode == 65){
            player1.position.x -= 75;
        }
        if(keyCode == 68){
            player1.position.x += 75;
        }
        if(keyCode == 83){
            player1.addImage(player1PunchImg);
            isPunching1 = true;
        }

        // Player2 controls
        if(keyCode == LEFT_ARROW){
            player2.position.x -= 75;
        }
        if(keyCode == RIGHT_ARROW){
            player2.position.x += 75;
        }
        if(keyCode == DOWN_ARROW){
            player2.addImage(player2PunchImg);
            isPunching2 = true;
        }
    }
}

function keyReleased(){
    if(gameState == 1){
        // Changing players' images back after punching
        if(keyCode == 83){
            player1.addImage(player1StandImg);
            player2.addImage(player2StandImg);
            isPunching1 = false;
        }

        // Changing player2's image back after punching
        if(keyCode == DOWN_ARROW){
            player2.addImage(player2StandImg);
            player1.addImage(player1StandImg)
            isPunching2 = false;
        }
    }
}

function lifeDecrease(lifeBar){
    lifeBar.width -= 10;
}

function gameOver1(){
    swal({
        title: "Player 1 Wins",
        text: "He can now have his first (or second) slice of cake. Thanks for playing!",
        imageUrl: "assets/blue/win.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
        },
        function(isConfirmed){
            if(isConfirmed){
                location.reload();
            }
        }
    );
}

function gameOver2(){
    swal({
        title: "Player 2 Wins",
        text: "He can now have his first (or second) slice of cake. Thanks for playing!",
        imageUrl: "assets/red/win.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
        },
        function(isConfirmed){
            if(isConfirmed){
                location.reload();
            }
        }
    );
}
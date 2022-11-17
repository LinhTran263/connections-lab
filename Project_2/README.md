# Dragon Hunt

## Inspiration
Taking the theme from the game of thrones, our game will surround the characters in the famous movie. In our game, the players will represent the houses and they will compete with each other. The characters will include the Stark house, the Tagaryan house, and the villain White Walkers.
The mechanism of our game was inspired by my childhood game “Bomb it”. It is a multiplayer game in which the players have to destroy obstacles and kill the opponents.

## The project
As mentioned before, the graphics of our games contain the characters from the Game of Thrones movie/book. For the game mechanism, the players can move around by the key arrows or by “aswd”. The game’s map will generate randomly everytime the page is refreshed and the map will be the same for both players. We are restricting the game to one 2 players. The third person joining will be the “observer” which means that they can not move any characters on the screen but they can still see the progress of the game.

## Progress
First, we initialized the sockets and the connection between the servers and the clients.
```
//initialising express app
let express = require("express");
let app = express();
app.use("/", express.static("public"));
```
### The grid
Then, we created a Grid class based on the code that professor provided. We also make it to be able to generate random map for every time the page is reloaded. We made sure that we generated the random map on the server side so that we can emit the same map to all players of the game.
```
class Grid {
    constructor(size, rows, cols) {
        //you can create an actual grid with 0s and 1s and 2s and so on
        // random grid generator
        this.grid =``;
        socket.on("gridNumbers", (data)=>{
            this.grid += data;
        });
        this.grid = this.grid.replace(/\s/g, ""); // IMP : This step removes all the whitespaces in the grid.
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.currVal = 0;
    }
  
    gridDraw() {
        //each number in your grid can be a particular element or colour - depends on your game logic
        //loop through the rows and columns and find the grid value at that position in the array
        
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                //get the grid value - is it 0 or 1
                let gridVal = this.grid[j * this.rows + i];
        
                // depending on the value, you can give it the appropriate colour/shape/image
                if (gridVal == 0) {
                    fill(200);
                    // background(50);
                    image(ground, i * this.size, j * this.size, this.size, this.size);
                    // rect(i * this.size, j * this.size, this.size, this.size);
                } else if (gridVal == 1) {
                    // fill(128);
                    image(villain, i * this.size, j * this.size, this.size, this.size)
                    // rect(i * this.size, j * this.size, this.size, this.size);
                }
            }
        }
    }
    getCurrValue(x, y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
        // console.log(gridX, gridY, this.grid,gridY * this.cols + gridX, this.grid[gridY * this.cols + gridX]);
        return this.grid[gridY * this.cols + gridX];
    }
    getCoordinates(x,y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);

      return [gridX,gridY];
    }
  getIndex(x,y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
        return gridY * this.cols + gridX;
    }
    recolorBlock(x,y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
        let temp = ``;
        for (let i = 0; i < gridY * this.cols + gridX; i++) {
            temp += this.grid[i];
        }
        temp+= `0`;
        for (let i = gridY * this.cols + gridX + 1; i< 64; i++) {
            temp += this.grid[i];
        }
        this.grid = temp;

      
    }
}
```

### The player
Our game will have two player and only two users can control the characters in the game. Any person other than two players will be the observers which means that they can see the characters moving and playing but they can not control any character on the screen. The players have the following functions to control and ove them around.
```
function directionUpdate(player, direction) {}
function playerMove(player) {}
function showPlayers() {}
```


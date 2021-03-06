// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Initiate x and y location of enemy
    this.init();
}
Enemy.prototype.init = function() {
    this.x = -300;
    var rows = [68, 151, 234];
    this.y = rows[Math.floor(Math.random() * rows.length)];
    var speeds = [100, 200, 300];
    this.speed = speeds[Math.floor(Math.random() * speeds.length)];
}
// Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    var nextX = this.x + (dt * this.speed);
    //Reset enemy if it moves off screen
    if (nextX > 505) {
        this.init();
    } else {
        this.x = nextX;
    }
    //Check collisions
    if (this.y == player.y && !(player.x > this.x + 83 || player.x + 101 < this.x || player.y > this.y + 101 || player.y + 83 < this.y)) {
    player.init();
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage( Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //Initiate x and y location of enemy
    this.init();
}
Player.prototype.init = function() {
    this.x = 202;
    this.y = 400;
}
//No use
Player.prototype.update = function() {
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(allowedKeys) {
    //Player can not move off screen
    if (allowedKeys === 'left' && this.x - 101 >= 0) {
        this.x = this.x - 101;
    }
    if (allowedKeys === 'right' && this.x + 101 <= 404) {
        this.x = this.x + 101;
    }
    if (allowedKeys === 'up') {
        if (this.y - 83 >= -98) {
            this.y = this.y - 83;
        }
        //Reset player if it reaches the water
        if (this.y - 83 == -98) {
            this.init();
        }
    }
    if (allowedKeys === 'down' && this.y + 83 <= 400) {
        this.y = this.y + 83;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 5;
var allEnemies = [];
for(var i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

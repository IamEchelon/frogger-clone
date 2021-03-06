//==========================================================================================================
// Helper method that allows random selection from an array
//==========================================================================================================

Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
};

//==========================================================================================================
// All things pertaining to the Enemy Object
//==========================================================================================================

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = this.yposArray.shift();
    this.speed = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    this.width = 50;
    this.height = 50;
    console.log('enemy loaded fine');
};

Enemy.prototype.yposArray = [60, 140, 230];

Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.speed);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x > 600) {
        this.x = -100;
        this.reset();
    }

};

// set enemeies to different speeds
Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
};

//==========================================================================================================
// All things pertaining to the Player Object
//==========================================================================================================

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 405;
    this.speed = 10;
    this.width = 50;
    this.height = 50;
    this.score = 0;

    console.log("player loaded okay");

};

// checks for collisions and resets the player if one is detected
Player.prototype.update = function() {
    if (this.collideEnemy()) {
        this.reset();
    } else if (this.collideJewel()) {
        this.reset();
        jewel.reset();
        jewel.counter += 100;
        this.score = jewel.counter;
        score.scoreUpdate(this.score);


        console.log("the score is " + this.score);
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles players keyboard inputs and movement distance
Player.prototype.handleInput = function(key) {
    var jumpX = 101;
    var jumpY = 83;

    switch (key) {
        case "up":
            if (this.y > -10) {
                this.y = this.y - jumpY;
            }
            break;
        case "down":
            if (this.y < 405) {
                this.y = this.y + jumpY;
            }
            break;
        case "right":
            if (this.x < 402) {
                this.x = this.x + jumpX;
            }
            break;
        case "left":
            if (this.x > -2) {
                this.x = this.x - jumpX;
            }
            break;
    }
    console.log(this.x, this.y);

};

// collision detection for enemy
Player.prototype.collideEnemy = function() {
    for (var i = 0; i < allEnemies.length; i += 1) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.y + this.height > allEnemies[i].y) {
            return true;
        }
    }
};

// collision detection for jewel
Player.prototype.collideJewel = function() {
    if (this.x < jewel.x + jewel.width &&
        this.x + this.width > jewel.x &&
        this.y < jewel.y + jewel.height &&
        this.y + this.height > jewel.y) {
        return true;
    }
};

// sets player back to starting coordinates
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 405;
};

//==========================================================================================================
// All things pertaining to the Jewel Object
//==========================================================================================================

var Jewel = function() {
    this.gemArray = ["Gem-Blue.png", "Gem-Green.png", "Gem-Orange.png"];
    this.gemLocation = [27, 124, 225, 326, 427];
    this.sprite = "images/" + this.gemArray.randomElement();
    this.x = this.gemLocation.randomElement();
    this.y = 35;
    this.width = 30;
    this.height = 30;
    this.counter = 0;
    console.log("Jewel loaded");
};

Jewel.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// set jewel to random location and random color
Jewel.prototype.reset = function() {
    this.sprite = "images/" + this.gemArray.randomElement();
    this.x = this.gemLocation.randomElement();
};

//==========================================================================================================
// All things pertaining to the Score Object
//==========================================================================================================

// create score element in dom
var Score = function() {
    this.doc = document;
    this.scoreHeading = this.doc.createElement('h2');
    this.doc.body.appendChild(this.scoreHeading);
    this.node = this.doc.createTextNode("Score: " + 0);
    this.scoreHeading.appendChild(this.node);
};

// update h2 text when called
Score.prototype.scoreUpdate = function(score) {
    this.h2 = this.doc.getElementsByTagName('h2');
    this.h2 = this.h2[0];
    this.h2.firstChild.nodeValue = "Score: " + score;
    // this.h2Value = this.h2.firstChild.nodeValue;
    // this.h2Value = this.h2Value.replace("Score: " + 0, "Score: " + score);
    // this.h2.firstChild.nodeValue = this.h2Value;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//==========================================================================================================
// Implementation
//==========================================================================================================


var allEnemies = [];

for (var i = 0; i < 3; i += 1) {
    allEnemies.push(new Enemy());
}

var player = new Player();

var jewel = new Jewel();

var score = new Score();


//==========================================================================================================
// Listens for key presses and sends the keys to Player.handleInput()
//==========================================================================================================

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

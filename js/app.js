/*
PHASE 1 SCOPE

1. Create a game board with placeholder divs for the character, floor, underfloor and object. Game board needs to be smaller than the screen as created objects will be hidden to the right hand side of the screen. They can then be 'scrolled' into the game div.
- the game div will be smaller than the game content div to allow for images to be scrolled from one right hand margin to the left hand margin.

2. Get objects moving across the screen from right to left.
- There is a method of randomly assigning objects to 'show' based on a random number to travel from right to left at a set pace across the background div.
- You can increment the position of a div 'cactus' object a tiny amount every time, which when sped up will give a smooth movement effect. You can then perform the collision check function after every incremented move of the object on the right hand side.
- yet to decide on the best method of moving objects along the bottom of a div...margin?
- .ANIMATE JQUERY TO GET IT MOVING ACROSS THE SCREEN
ANIMATE(STEP, FUNCTION TO CHECK FOR COLLISION) TO CHECK FOR A COLLISION FOR EVERY OBJECT !!!!

ANIMATE({top: 0, left: -1000}, {5000, step: function(){}});

For the jump

ANIMATE({arguments for where it's going to}, {5000, complete: function(){}});

3. Get character to jump up on key up
- The character belongs to the background div, allowing you to assign it a value of 0 on the y axis of where it is. On the key down for the up arrow the character will travel a certain number of pixels up the y axis before returning for the same amount of time.

4. When character hits one of the oncoming objects get the game to reset.
- create divs which are rectangles that will enclose the character and the objects
- Then based on the respective positioning of the top, bottom, right and left sides of each div, you will be able to work out if they do NOT touch.
- THIS FUNCTION WILL BE THE BASIS ON WHICH THE REST OF THE GAME'S FUNCTIONALITY RUNS.
- As long as the collision function returns false after every increment of the object across the screen, the game will continue to run, else it will cause game over.


5. Create a method of randomising which sequence objects appear in from the right hand side of the screen

6. Build into the function that randomises the sequence of the objects a method of incrementing the speed with which the objects appear and travel

7. Find an 8bit character animation for the character, along with an 8bit background gif and floor items that can be moved to give the illusion of animation.

8. Create start button that is clicked to kick off the game

9. Create a score counter and a way of logging high scrores

10. On collision with an object, create a number of overlayed items that specify that the game has ended, what the score of the player was, and what the high score was

11. Add a backing track and html5 sounds for when certain scores are reached

12. Create a way of pausing the game

END OF PHASE 1 SCOPE



PHASE 2 (ADDITIONAL) SCOPE

1. Create new, more difficult objects for the character to beat after a certain high score is reached.
- These will appear in sequence with the original items but will be birds that appear at different heights to keep the player on their toes

2. Create a break in the game when the above level is reached, with a flashing notification to let the player know when this is.

3. Create a way of incrementing the player jump size based on how long the up key is pressed for.
*/

var Game = Game || {};

Game.init = function init() {
  this.$character   = $('#character');
  this.$board       = $('.gameBoard');
  this.$body        = $('body');
  this.$startButton = $('#start');
  Game.$scoreBoard  = $('#scoreBoard');
  Game.$highScore   = $('#highScore');
  Game.scoreCounter = 0;
  Game.gameOver     = false;

  Game.startGame();
};

Game.startGame = function() {
  this.characterJump();
  this.$startButton.on('click', this.start.bind(this));
};

Game.start = function start() {
  Game.gameOver = false;
  console.log('clicked');
  Game.$scoreBoard = $('#scoreBoard');
  Game.scoreInterval = setInterval(function() {
    Game.$scoreBoard.text(Game.scoreCounter++);
  }, 100);
  Game.seconds = 1500;
  setInterval(Game.whichLevel(), 100);
};

Game.whichLevel = function() {
  if ((parseFloat(Game.scoreCounter)) < 100) {
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
  } else if ((parseFloat(Game.scoreCounter)) > 100 && (parseFloat(Game.scoreCounter)) < 1000) {
    console.log('next level');
    Game.seconds = 500;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
  } else if ((parseFloat(Game.scoreCounter)) > 1000) {
    Game.seconds -= 500;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
  }
};


Game.characterJump = function () {
  this.$body.keyup(function(e){
    if (e.keyCode === 38) return Game.jumpAction();
  });
};

Game.jumpAction = function () {
  Game.$character.animate({ top: '348px' }, {
    duration: 200,
    complete: function() {
      Game.$character.animate({ top: '478px' }, { duration: 300 });
    }
  });
};

Game.chooseObjectType = function chooseObjectType() {
  var objectTypes = {
    box: {
      width: '20px',
      height: '20px',
      class: 'box'
    },
    wall: {
      width: '20px',
      height: '40px',
      class: 'wall'
    }
  };
  var randomIndex = Math.floor(Math.random() * Object.keys(objectTypes).length);
  var randomKey   = Object.keys(objectTypes)[randomIndex];
  return objectTypes[randomKey];
};

Game.createRandObject = function () {
  if (Game.gameOver === false) {
    var $object = $('<div class="object"></div>');
    var objectType = this.chooseObjectType();
    $object.css('height', objectType.height);
    $object.css('width', objectType.width);
    $object.addClass(objectType.class);
    this.$board.append($object);
    $object.animate({ bottom: '0px', left: '-200px'}, {
      duration: Game.seconds,
      step: Game.collisionCheck,
      complete: function () {
        this.remove();
      }
    });
  }
};

Game.collisionCheck = function () {
  var obstacle  = Game.getPositions($(this));
  var character = Game.getPositions(Game.$character);

  if (obstacle.right > character.left && obstacle.left < character.right && obstacle.top < character.bottom && obstacle.bottom > character.top) {
    $(this).remove();
    clearInterval(Game.objectsInterval);
    clearInterval(Game.scoreInterval);
    Game.over();
    Game.gameOver = true;
  }
};

Game.getPositions = function getPositions($elem) {
  return {
    top: $elem.offset().top,
    left: $elem.offset().left,
    right: Number($elem.offset().left) + Number($elem.width()),
    bottom: Number($elem.offset().top) + Number($elem.height())
  };
};

Game.over = function() {
  console.log('game over');
  Game.$highScore.html(Game.$scoreBoard.text());
  console.log(Game.$highScore.html());
  Game.$scoreBoard.html('0');
  Game.scoreCounter = 0;
};

$(Game.init.bind(Game));

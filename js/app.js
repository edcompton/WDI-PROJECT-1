

// $(Game.start);
var Game = Game || {};
var Objects = [];
var gameOver = false;

$(start);

function start () {
  Game.characterObject = $('#character');
  Game.gameObject = $('.object');
  console.log(Game.gameObject);
  Game.characterJump();
  // Game.createRandObject();
  Game.addListeners();
}

Game.addListeners = function addListeners () {
  this.gameObject.on('click', Game.moveObject);
  console.log(Game);
};


Game.characterJump = function () {
  Game.characterObject.on('click', Game.jumpAction);
};

Game.jumpAction = function () {
  Game.characterObject.animate(
    {
      top: '348px'
    },
    {
      duration: 200,
      complete: function() {
        Game.characterObject.animate(
          {
            top: '478px'
          },
          {duration: 300}
        );
      }
    }
  );
};



// Game.createRandObject = function () {
//   Game.obstacle1 = $('<div id="obs1"></div>');
//   Game.obstacle2 = $('<div id="obs2"></div>');
//   Game.obstacle1.addClass('object');
//   Game.obstacle2.addClass('object');
//   var numObjects = $('.object').length;
//   while (gameOver === false) {
//     setInterval(Game.whichObstacle, 5000);
//     if (numObjects === 5) {
//       gameOver = true;
//     }
//   }
// };


// Game.whichObstacle = function () {
//   var objChoice = Math.floor(Math.random()*2);
//   if (objChoice === 1) {
//     Game.obstacle1.on();
//     $('.gameBoard').append(Game.obstacle1);
//     $('.object').each(Game.moveObject);
//   } else {
//     $('.gameBoard').append(Game.obstacle2);
//     $('.object').each(Game.moveObject);
//   }
// };

Game.moveObject = function () {
  Game.gameObject.animate(
    {
      bottom: '188px',
      left: '50px'
    },
    {
      duration: 2500,
      step: Game.collisionCheck
    }
  );
};

Game.collisionCheck = function () {
  Game.collisionStep();
  if (Game.collisionStep === true) {
    console.log('game over');
  } else {
    console.log('keep going');
  }
};

Game.collisionStep = function () {
  var objCol = $('.object')[0].getBoundingClientRect();
  var charCol = $('#character')[0].getBoundingClientRect();
  console.log(objCol);
  console.log(objCol.top, objCol.right, objCol.bottom, objCol.left);
  console.log(charCol);
  console.log(charCol.top, charCol.right, charCol.bottom, charCol.left);
  var outsideBottom = (objCol.bottom < charCol.top);
  var outsideTop = objCol.top > charCol.bottom;
  var outsideLeft = objCol.left > charCol.right;
  var outsideRight = objCol.right < charCol.left;
  console.log(outsideBottom);
  console.log(outsideTop);
  console.log(outsideLeft);
  console.log(outsideRight);
  return  !((outsideBottom || outsideTop) || (outsideLeft || outsideRight));
};





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

// var d = document.getElementById('object');
// d.style.position = "absolute";
// d.style.left = x_pos+'px';
// d.style.top = y_pos+'px';

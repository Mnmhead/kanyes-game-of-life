// Copyright Gyorgy Wyatt Muntean 2017
// "use kanye"
//
// This web animation (HTML5 canvas animation) is a representation
// of Kanye's game of life. The rules of life are as follows:
// 1. Any live kanye with fewer than two kanye-neighbors dies, this is because kanye loves kanye
// 2. Any live kanye with two or three kanye-neighbors lives, this is the sustainable kanye level
// 3. Any live kanye with more than three neighbors dies, sometimes (believe it or not) you can 
//    have too much kanye
// 4. Any dead kanye with exactly three live kanye-neighbors becomes a live kanye, kanyes come in 
//    threes as the relics of old state in thier writings

function kanye() {
   // clear canvas, then re-draw
   //clearCanvas();
}

/*
function clearCanvas() {
}
*/

// Entry-point function, animates Kanye's game of life
function animate( callback ) {
   window.requestAnimationFrame( callback );
}

// Gets the dimensions of the current html5 canvas element.
// Returns a tuple (width, height)
function getCanvasDimensions() {
   var canvas = document.getElementById( "canvas" );
   return {
      Width: canvas.width,
      Height: canvas.height
   } 
}

function initGrid( width, height ) {
   // ok so I want the size of each cell in the grid to be of fixed size.
   // thus, we can find the best 'virtual' dimensions to set the canvas to.
   //
   // we probably want the image to be a square
   var kanye_width = 10;
   var kanye_height = 10;

   width = width - (width % kanye_width);
   height = height - (hegith % kanye_height);

   var arr_x = width / kanye_width;
   var arr_y = height / kanye_height;

   var grid = [];
   for( var i = 0; i < arr_x; i++ ) {
      grid.push([]);
      for( var j = 0; j < arr_y; j++ ) {
         grid[j].push( false ); 
      }
   }

   return grid
}

var g = initGrid( 500, 500 );
alert( "x dim: " + g.length + ", y dim: " + g[0].length );

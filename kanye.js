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

var KANYE_W = 50;
var KANYE_H = 50;
var CANVAS_DIMS = getCanvasDimensions();
var CANV_W = CANVAS_DIMS.width;
var CANV_H = CANVAS_DIMS.height;
var GRID = initGrid( CANV_W, CANV_H );

// shitty glider starting points
GRID[2][0] = true;
GRID[2][1] = true;
GRID[2][2] = true;
GRID[1][2] = true;
GRID[0][1] = true;

console.log( "initializing first grid" );
console.log( "x dim: " + GRID.length + ", y dim: " + GRID[0].length );

var GRID_W = GRID.length;
var GRID_H = GRID[0].length;

// animation variables
var CUR_FRAME = 0;

function kanye() {
   CUR_FRAME = (CUR_FRAME + 1) % 20;

   if( CUR_FRAME == 0 ) {
      console.log( "kanye-ing" );
      // clear canvas, compute new state, then re-draw
      clearCanvas();

      // determine pixel dimensions of canvas, and cell dimensions of grid
      var dims = getCanvasDimensions();
      var x = dims.width;
      var y = dims.height;
      var grid_x = x / KANYE_W;
      var grid_y = y / KANYE_H;

      var next_grid = initGrid( x, y );

      for( var i = 0; i < grid_x; i++ ) {
         for( var j = 0; j < grid_y; j++ ) {
            var n_count = getNeighborCount( i, j );
            var status = GRID[i][j];
            var next_status = null;

            if( status ) {
               // alive
               next_status = n_count >= 2 && n_count <= 3;
            } else {
               // dead
               next_status = n_count == 3;
            }

            next_grid[i][j] = next_status;
         }
      }
   
      //drawGrid();
      for( var n = 0; n < grid_x; n++ ) {
         for( var m = 0; m < grid_y; m++ ) {
            if( next_grid[n][m] ) {
               drawKanye( n, m );
            }
         }
      }
      
      // update gird for next cycle of kanye's life
      GRID = next_grid;
   }
   
   animate( kanye );
}

// Entry-point function, animates Kanye's game of life
function animate( callback ) {
   window.requestAnimationFrame( callback );
}

// counts the number of live neighbors this cell has
function getNeighborCount( x, y ) {
   var width = GRID.length;
   var height = GRID[0].length;

   count = 0;
   for( var i = x - 1; i <= x + 1; i++ ) {
      for( var j = y - 1; j <= y + 1; j++ ) {
         // skip all cells that are out of bounds, skip this cell
         if( i < 0 || j < 0 || i >= width || j >= height || (i == x && j == y) ) {
            continue;
         }
         if( GRID[i][j] ) {
            count += 1;
         }
      }
   }

   return count;
}

// Clears the entire canvas of all marks. 
function clearCanvas( canv ) {
   var canvas = document.getElementById( "canvas" );
   var ctx = canvas.getContext( "2d" );
   var width = canvas.width;
   var height = canvas.height;

   ctx.clearRect(0, 0, width, height);
}

// Gets the dimensions of the current html5 canvas element.
// Returns a tuple (width, height)
function getCanvasDimensions() {
   var canvas = document.getElementById( "canvas" );
   return {
      width: canvas.width,
      height: canvas.height
   }
}

// takes in pixel width and height and grid-ifies the space
// into kayne sized cells.
// returns an array of booleans
function initGrid( width, height ) {
   //width = width - (width % KANYE_W);
   //height = height - (height % KANYE_H);

   console.log( "w: " + width + " h: " + height);

   var arr_x = width / KANYE_W;
   var arr_y = height / KANYE_H;

   var grid = [];
   for( var i = 0; i < arr_x; i++ ) {
      grid.push( [] );
      for( var j = 0; j < arr_y; j++ ) {
         grid[i].push( false );
      }
   }

   return grid
}

function drawLine( x1, y1, x2, y2 ) {
   var canvas = document.getElementById( "canvas" );
   var ctx = canvas.getContext( "2d" );
   ctx.lineWidth = 1;
   ctx.moveTo( x1, y1 );
   ctx.lineTo( x2, y2 );
   ctx.stroke();
}

function drawGrid() {
   var dims = getCanvasDimensions();
   var x = dims.width;
   var y = dims.height;

   for( var i = 0; i <= x; i = i + KANYE_W ) {
      drawLine( i, 0, i, y );
   }
   for( var j = 0; j <= y; j = j + KANYE_H ) {
      drawLine( 0, j, x, j );
   }
}

// takes in the cells x identifier and y identifier (both start at 0)
// fills the cell with black
function drawCell( x, y ) {
   var canvas = document.getElementById( "canvas" );
   var ctx = canvas.getContext( "2d" );
   ctx.fillRect( x * KANYE_W, y * KANYE_H, KANYE_W, KANYE_H);
}

var IMG = new Image();
IMG.src = "kanye_smol.jpg";

function drawKanye( x, y ) {
   var canvas = document.getElementById( "canvas" );
   var ctx = canvas.getContext( "2d" );
   ctx.drawImage( IMG, x * KANYE_W, y * KANYE_H );
}

//drawGrid();

// spawnKanyes();
animate( kanye );

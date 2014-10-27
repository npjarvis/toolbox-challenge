// think first about the data you are modeling:: 32 models
$(document).ready(function() {
    var tilesArray = [];
    var idx;
    // start at 1 instead of 0 because there is no tile0, but there is tile1
    for(idx = 1; idx <=32; ++idx) {
        // to create new javascript object you use curly braces, define new object on the fly
        tilesArray.push({
            tileNum: idx,
            // path to the image, set later in the attr
            src:'img/tile' + idx + '.jpg'
        });
        // ^ builds up data file that creates all tile files we need
    }
    // must randomly choose 8 tiles, need 16 total but half are paired for the game

    console.log(tilesArray);
    var shuffledTiles = _.shuffle(tilesArray);
    // use lodash to shuffle, into random order
    console.log(shuffledTiles);
    // need to choose 8 now
    // non-inclusive selection on splice
    var selectedTiles = shuffledTiles.slice(0, 8);
    console.log(selectedTiles);

    var tilePairs = [];
    // duplicates the 8 tiles, makes 8 pairs of tiles for 16 total
    _.forEach(selectedTiles, function(tile) {
       tilePairs.push(_.clone(tile));
       tilePairs.push(_.clone(tile));
    });
    tilePairs = _.shuffle(tilePairs);

    console.log(tilePairs);

    var gameBoard =  $('#game-board');
    var row = $(document.createElement('div'));
    var img;
    _.forEach(tilePairs, function(tile, elemIndex) {
        if (elemIndex > 0 && 0 == elemIndex % 4) {
            gameBoard.append(row);
            row = $(document.createElement('div'));
        }

        img = $(document.createElement('img'));
        img.attr({
            src: 'img/tile-back.png',
            alt: 'image of tile' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);
    });
    gameBoard.append(row);

    $('#game-board img').click(function() {
       // any event handler 'this' refers to the element that raises the event
       var img = $(this);
       var tile = img.data('tile');
        // fade out operation takes to parameters
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }
            tile.flipped = !tile.flipped;
            img.fadeIn(100);
        }); // Comment: after fade out
        // create a new variable for'tile' because it appears in multiple instances
        // once img is fully faded out we want to flip it

    }); // Comment: on click of gameboard images

    //sets recurring timer, calls function every 1000 ms
    var startTime = _.now();
    var timer = window.setInterval(function(){
        // # of elapsed seconds from start time, math.floor rounds down to integer, no fractions allowed
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed').text(elapsedSeconds);

        if (elapsedSeconds >= 10) {
            // pass same interval that started the timer
            window.clearInterval(timer);
        }

    }, 1000);

});
// think first about the data you are modeling:: 32 models
// lays out grid and flips them
$(document).ready(function() {
    var matchesMade = 0;
    var remaining = 8;
    var matchesMissed = 0;
    var guess = [];
    var guessedTiles = 0;

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
    $('#new').click(function () {
        populateBoard();
    });

    var tile1 = null;
    var tile2 = null;
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
        if (tile1 = tile2) {
            matchesMade++;
            remaining--;
        }else {
            matchesMissed++;
        }
        if (tile2 != null) {
            tile1 = null;
            tile2 = null;
        }
    }); // Comment: on click of gameboard images

//    if (tile.src = tile.src2) {
//        matchesMade++;
//        matchesMissing--;
//    }


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

    function populateBoard () {
        var tilesArray = [];
        var idx;
        for(idx = 1; idx <=32; ++idx) {
            tilesArray.push({
                tileNum: idx,
                src:'img/tile' + idx + '.jpg'
            });
        }
        var shuffledTiles = _.shuffle(tilesArray);
        var selectedTiles = shuffledTiles.slice(0, 8);
        var tilePairs = [];
        _.forEach(selectedTiles, function (tile) {
            tilePairs.push(_.clone(tile));
            tilePairs.push(_.clone(tile));
        });
        tilePairs = _.shuffle(tilePairs);

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
    }

    function clicked () {
        $('#game-board img').click(function() {
            // any event handler 'this' refers to the element that raises the event
            var img = $(this);
            var tile = img.data('tile');

            if (!tile.flipped && count < 2) {
                count++;
                flip(img, tile);
                if (count == 1) {
                    guess.push(img);
                    guess.push(tile);
                } else {
                    if (guss[1].tileNum == tile.tileNum){
                        matchesMade++;
                        remaining--;
                        $('#ramining').text(remaining);
                        $('matchesMade').text(matchesMade);
                        guess.pop();
                        guss.pop();
                        if(remaining = 0) {
                            // some winning game code
                        }
                        else {
                            //winning match code
                        }
                    } else {
                        matchesMissed++;
                        $('#matchesMissed').text(matchesMissed);
                    }

                }
            }
        });
    }

    function flip (img, tile) {
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }
            tile.flipped = !tile.flipped;
            img.fadeIn(100);
        });
    }

});
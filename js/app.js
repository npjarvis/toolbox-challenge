// think first about the data you are modeling:: 32 models
// lays out grid and flips them
'use strict';

$(document).ready(function() {
    var matchesMade = 0;
    var remaining = 8;
    var matchesMissed = 0;
    var guessedTiles = 0;
    var guess = [];
    var timer;
    var gameBoard =  $('#game-board');
    var idx;
    var tilesArray = [];
    var matched = false;




    // start at 1 instead of 0 because there is no tile0, but there is tile1
    for(idx = 1; idx <=32; ++idx) {
        // to create new javascript object you use curly braces, define new object on the fly
        tilesArray.push({
            tileNum: idx,
            src:'img/tile' + idx + '.jpg',
            match: false,
            flipped: false
        });
    }

    $('#new').click(startGame);

    function startGame () {
        populateBoard();
        matchesMade = 0;
        remaining = 8;
        matchesMissed = 0;
        beginTime();

    }

    function beginTime () {
        var startTime = _.now();
        window.clearInterval(timer);
        $('#elapsed').text();
        timer = window.setInterval(function() {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            $('#elapsed').text('Elapsed Time: ' + elapsedSeconds + 's');
        })
    }


    function populateBoard () {
        gameBoard.empty();
        var shuffledTiles = _.shuffle(tilesArray);
        var selectedTiles = shuffledTiles.slice(0, 8);
        var tilePairs = [];
        _.forEach(selectedTiles, function (tile) {
            tilePairs.push(_.clone(tile));
            tilePairs.push(_.clone(tile));
        });
        tilePairs = _.shuffle(tilePairs);

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
            img.data('match', false);
            row.append(img);
        });
        gameBoard.append(row);

        $('#game-board img').click(clicked);
    }

    function clicked () {

        var img = $(this);
        var tile1 = img.data('tile');
        var tile2 = img.data('match');

        if (tile2) {
            return;
        }
        img.data('match', true);
        flip(img);
        if (guess.length == 0) {
            guess.push(img);
        } else {
            var tmp = guess[0];
            var tmpTile = tmp.data('tile');
            if (tmpTile.tileNum == tile1.tileNum) {
                remaining--;
                matchesMade++;
                $('#ramining').text(remaining);
                $('#matchesMade').text(matchesMade);

                if (remaining = 0) {
                    window.clearInterval(timer);
                    //winning modal
                    $('#win').text('Well done, you won! Click to play again!');
                }
            }
            else {
                img.data('match', false);
                tmp.data('match', false);
                window.setTimeout(function () {
                    flip(img);
                    flip(tmp);
                }, 1000);
                matchesMissed++;
                $('#matchesMissed').text(matchesMissed)
            }
            guess = [];
        }
    }




    function flip (img) {
        var tile = img.data('tile');
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
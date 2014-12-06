// think first about the data you are modeling:: 32 models
// lays out grid and flips them
'use strict';

$(document).ready(function() {
    var matchesMade = 0;
    var remaining = 8;
    var matchesMissed = 0;
    var guess = [];
    var timer;
    var gameBoard =  $('#game-board');
    var idx;
    var tilesArray = [];


    $('#rules').click(function () {
       window.open("http://www.eduplace.com/ss/act/rules.html");
    });


    for(idx = 1; idx <=32; ++idx) {
        tilesArray.push({
            tileNum: idx,
            src:'img/tile' + idx + '.jpg',
            match: false,
        });
    }

    $('#new').click(startGame);

    function startGame () {
        matchesMade = 0;
        remaining = 8;
        matchesMissed = 0;
        beginTime();
        populateBoard();

    }

    // starts the game clock, initializes values for remaining, made, missed
    function beginTime () {
        var startTime = _.now();
        window.clearInterval(timer);
        $('#elapsed').text('Elapsed Time: ');
        $('#remaining').text('Matches Remaining: ' + '8');
        $('#matchesMade').text('Matches Made: 0');
        $('#matchesMissed').text('Matches Missed: 0');
        //$('#win').hide();
        timer = window.setInterval(function() {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            $('#elapsed').text('Elapsed Time: ' + elapsedSeconds + 's');
        },1000)
    };

// shuffles tiles, appends to game-board div
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

    // activated on click function, checks tile to see if its a match, if not
    // add one to misses, if match sub remaining and add made. checks for win,
    // if win end game clock, reveal winning message
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
                $('#remaining').text("Matches Remaining: " + remaining);
                $('#matchesMade').text("Matches Made: " + matchesMade);

                if (remaining == 0) {
                    window.clearInterval(timer);
                    $('#win').show();
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
                $('#matchesMissed').text("Matches Missed: " + matchesMissed);
            }
            guess = [];
        }
    }



// flip image to back after 100ms
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
var game;

refresh();

function refresh() {
    $.getJSON("http://localhost:3000/game")
        .done(function(data){
            game = data;

            if (game.gameState === "BYPLACING") {
                shipPanel();
                $('#positioningScreen').show('slow');
            }

            showMainBoard();

            if (game.gameState === "WAITINGOPP") {
                placeFleet(game.ships);
                $('#positioningScreen').hide('slow');
                $('#battleGrids').show('slow');
                $('#salvoBlock').hide('slow');
                setTimeout(function(){
                    console.log('refresh hopingopp ...');
                    refresh();
                }, 5000);
            }

            if (game.gameState === "PLAY") {
                makeGameState(game.hits, 'self');
                makeGameState(game.hits, 'opponent');
                placeFleet(game.ships);
                placeHits(game.hits);
                makeSalvoBlock();

                $('.salvo').click(function(event) {
                    addEventSalvo(event);
                });
                $('.oppCell').click(function(event) {
                    addEventOppCell(event);
                });

                $('#btnSubmitSalvos').click(function(event){
                    returnSalvos();
                });                
                
                $('#positioningScreen').hide('slow');    
                $('#battleGrids').show('slow');
                $('#salvoBlock').show('slow');
                $('#gameState').show('slow');
            }

            if (game.gameState === "WAIT") {        
                makeGameState(game.hits, 'self');
                makeGameState(game.hits, 'opponent');
                placeFleet(game.ships);
                placeHits(game.hits);
                $('#positioningScreen').hide(1000);
                $('#battleGrids').show('slow');
                $('#salvoBlock').hide('slow');
                $('#gameState').show('slow');
                setTimeout(function(){
                    console.log('refresh waiting ...');
                    refresh();
                }, 5000);
            }

            if (game.gameState === "WON" || game.gameState === "TIE" || game.gameState === "LOST") {
                makeGameState(game.hits, 'self');
                makeGameState(game.hits, 'opponent');
                placeFleet(game.ships);
                placeHits(game.hits);
                $('#positioningScreen').hide(1000);
                $('#battleGrids').show('slow');
                $('#salvoBlock').hide('slow');
                $('#gameState').show('slow');
                switch (game.gameState) {
                    case "WON": $('#okSalvo')
                                    .html('GANASTE LA PARTIDA')
                                    .show('slow');
                        break;
                    case "TIE": $('#okSalvo')
                                    .html('ESTA VEZ EMPATASTE')
                                    .show('slow');
                        break;
                    case "LOST":$('#okSalvo')
                                    .html('PERDISTE LA PARTIDA')
                                    .show('slow');
                        break;                
                }
            }

        });

}

function showMainBoard() {
    showInfoBasic();
    if (game.gameState !== "BYPLACING" && game.gameState !== "WAITINGOPP") {
        $('#currentPlayerName').html(game.gamePlayers[0].player.email);
        $('#opponentPlayerName').html(game.gamePlayers[1].player.email);
    }

}

function showInfoBasic() {
    $('#gameId').text(game.id);
    $('#gameCreated').text(game.created);
    $('#gstringTurn').text(getTurn(game.hits));
    $('#gstringGameState').text(game.gameState);
}

//Envia el json al servidor
function placeShips(shipsArray) {
    console.log('ubicaciones enviadas al servidor: '+shipsJson);
    game.gameState = "HOPINGOPP";
    refresh();
}

//Envia el json de salvos por turno
function sendSalvoes(locations) {    
    salvoesArray = { 
        turn: getTurn(game.hits),
        player: game.gamePlayers[0].player.id,
        locations: locations
    }

    salvoesArray = JSON.stringify(salvoesArray);
    console.log('salvos enviados al servidor: '+salvoesArray);
    game.gameState = "WAIT";
    refresh();
}

//Retorna el numero de turno
function getTurn(hits) {
    if (hits.self.length < hits.opponent.length) {
        return hits.self.length;
    }else {
        return hits.self.length + 1;
    }
    /*
    self = 0(play) , opp = 0(wait)  => turn = 1
    self = 1(wait) , opp = 0(play)  => turn = 1
    self = 1(play) , opp = 1(wait)  => turn = 2
    self = 2(wait) , opp = 1(play)  => turn = 2
    self = 2(play) , opp = 2(wait)  => turn = 3
    self = 3(wait) , opp = 2(play)  => turn = 3
    */
}

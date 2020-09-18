var name;
var password;

let okLogin = document.getElementById('okLogin');
let okLogout = document.getElementById('okLogout');
let errorLogin = document.getElementById('errorLogin');
let currentPlayer = document.getElementById('currentPlayer');
let btnNewGame = document.getElementById('btnNewGame');

let url = 'http://localhost:3000/';
let urlPlayer   = url+'player';
let urlUsers    = url+'users';
let urlGames    = url+'games';
let urlScores   = url+'scores';

var player;
var users;
var games;
var scores;
var gpid = 100;

refreshGames();
$('#gamesScores').show('slow');

$('#btnLogin').click(function() {
    name = document.getElementById('name').value;
    password = document.getElementById('password').value;
    loginfunc(name, password);
});

$('#btnSingup').click(function() {
    name = document.getElementById('name').value;
    password = document.getElementById('password').value;
    singupfunc(name, password);
});

$('#btnLogout').click(function() {
    guest = {email: "guest"};
    refreshPlayer(guest);
});

$('#btnNewGame').click(function(){
    createGame();
});

function refreshGames() {
    $.getJSON(urlPlayer)
        .done(function(user){
            $('#currentPlayer').text(user.email);
            if (user.email == "guest") {
                $('#login').show('slow');
                $('#btnLogout').hide('slow');
                $('#btnNewGame').hide('slow');
            } else {
                $('#login').hide('slow');
                $('#btnLogout').show('slow');
                $('#btnNewGame').show('slow');
            }
            $.getJSON(urlGames)
                .done(function(gamesjson){
                    $.getJSON(urlScores)
                        .done(function(scoresjson){
                            addRowsGame(gamesjson, user);
                            addRowsScore(scoresjson);
                            games = gamesjson;
                            scores = scoresjson;
                            player = user;
                            console.log(player);
                        });
                });            
        });
}

function addRowsScore(scores) {
    scores.forEach(score => {
        $('#bodyScoreBoard').append(
            '<tr>' +
                '<td>' + score.playerName + '</td>' +
                '<td>' + score.won + '</td>' +
                '<td>' + score.tied + '</td>' +
                '<td>' + score.lost + '</td>' +
            '</tr>'
        );
    });
}

function addRowsGame(games, player) {
    let rowGame;
    let opponent;
    let action;
    games.forEach(game => {
        rowGame = '';
        opponent = '';
        action = '-';
        console.log(game);
        $('#bodyGamesBoard').append(
            function(){
                if (player.email === 'guest') {
                    if (game.gamePlayers.length == 1) {
                        opponent = '<span class="waitingForOpp">Waiting for opponent</span>';
                    }else if (game.gamePlayers.length == 2) {
                        opponent = game.gamePlayers[1].player.email;
                    }
                }else {
                    if (game.gamePlayers.length == 1) {
                        opponent = '<span class="waitingForOpp">Waiting for opponent</span>';
                        if (player.id == game.gamePlayers[0].player.id)
                        {
                            action = '<a class="btn btn-sm btn-outline-warning" '+
                                        'href="game.html?id='+game.id+'">Enter</a>';
                        }else {
                            action = '<a class="btn btn-sm btn-outline-warning" '+
                                        'href="game.html?id='+game.id+'">Join</a>';
                        }
                    }else if (game.gamePlayers.length == 2) {
                        opponent = game.gamePlayers[1].player.email;
                        if (!game.scores) {
                            if (player.id == game.gamePlayers[0].player.id || player.id == game.gamePlayers[1].player.id)
                            {
                                action = '<a class="btn btn-sm btn-outline-warning" '+
                                            'href="game.html?id='+game.id+'">Enter</a>';
                            }
                        }else {
                            if (player.id == game.gamePlayers[0].player.id || player.id == game.gamePlayers[1].player.id)
                            {
                                action = '<a class="btn btn-sm btn-outline-warning" '+
                                            'href="game.html?id='+game.id+'">Review</a>';
                            }
                        }
                    }
                }
                
                let created = new Date(game.created);
                rowGame = '<tr>' +
                                '<td>' + game.id + '</td>' +
                                '<td>' + game.gamePlayers[0].player.email + '</td>' +
                                '<td>' + opponent + '</td>' +
                                '<td>' + created.getDate()+'/'+created.getMonth()+'/'+created.getFullYear()+' '+created.getHours()+':'+created.getMinutes() +'</td>' +
                                '<td>' + action + '</td>' +
                            '</tr>';
                return rowGame;
            }
        );
    });
}

function refreshPlayer(user) {
    $.post(urlPlayer, user)
        .done(function (userlog) {
            showMsg(okLogin, 'Bienvenido '+userlog.email);
            console.log(userlog);
            setTimeout(
                function() {
                    refreshGames();                
                }, 4000);
    });
}

function loginfunc(name, password) {
    if (!name) {
        showMsg(errorLogin, 'Debe ingresar el nombre de usuario');
        $('#name').focus();
    }else {
        if (!password) {
            showMsg(errorLogin, 'Debe ingresar el password');
            $('#password').focus();
        }
        else {
            $.getJSON(urlUsers)
                .done(function(users){
                    let user = users.find(item => item.email == name && item.password == password);
                    console.log(user);
                    if (user) {                        
                        refreshPlayer(user);
                    } else {
                        showMsg(errorLogin, 'El usuario o password ingresado es incorrecto');
                        $('#name').focus();
                    }
                })
            
        }
    }
}

function singupfunc(name, password) {
    $.getJSON(urlUsers)
        .done(function (users) {
            if (users.filter(item => (item.email == name)).length == 0) {
                let newUser = {
                    email: name,
                    password: password
                };
                $.post(urlUsers, newUser)
                    .done(function(user){
                        $('#oklogin').text('Usuario creado satisfactoriamente.');
                        $('#okLogin').show("slow").delay(2000).hide("slow");
                        refreshPlayer(user);
                    });                
            } else{
                showMsg(errorLogin, 'El nombre de usuario ya existe !!');
                $('#name').focus();
            }
        });            
}

function showMsg(itemhtml, message) {
    itemhtml.textContent = '';
    itemhtml.textContent = message;
    $('#'+itemhtml.id).show('slow').delay(1000).hide('slow');
}

function createGame() {
    urlNewGame = 'game.html?id=22';
    showMsg('oksalvo', 'Nuevo Juego Creado');
    setTimeout(function () {
        location.href = urlNewGame;
    }, 3000);
}
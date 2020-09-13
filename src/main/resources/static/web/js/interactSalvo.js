var locations = [];
var salvo = '';
var lock = false;
const maxAmountSalvo = 3;

function makeSalvoBlock() {
    $('#salvoBlock').empty();    
    $('#salvoBlock').html(
        '<div class="salvoCharger" id="salvoZone">'+
            '<div class="salvo" id="salvo1"></div>'+
            '<div class="salvo" id="salvo2"></div>'+
            '<div class="salvo" id="salvo3"></div>'+
        '</div>'+
        '<button class="btn btn-warning" id="btnSubmitSalvos">Fuego!</button>'
    );
}

function addEventSalvo(event) {    
    salvo = event.target.id;
    if (!$("#"+salvo).hasClass("salvoSelected")) {
        if (!lock) {
            $("#"+salvo).addClass("salvoSelected");
            lock = true;
            $('.oppCell').hover(
                function (event) {
                    let cellId = event.target.id;
                    //console.log(cellId);
                    if (!$('#'+cellId).hasClass('cellUsed')){
                        $('#'+cellId).addClass('oppCellHover');
                    }        
                },
                function (event) {
                    let cellId = event.target.id;
                    $('#'+cellId).removeClass('oppCellHover');
                }
            );        
        }        
    }    
}

function addEventOppCell(event) {
    let cellId = event.target.id;
    console.log('celda seleccionada '+cellId);
    if (lock) {
        if (!$('#'+cellId).hasClass('cellUsed')) {
            locations.push({"salvo": salvo, "location": cellId});
            console.log(locations);
            lock = false;
            $('#'+salvo).hide('slow');
            $('#'+cellId).removeClass('oppCellHover').addClass('salvoGrid');
            $('#'+cellId).addClass('cellUsed');
        }
    }
    else {
        if ($('#'+cellId).hasClass('cellUsed')) {
            let salvo = locations.find(salvo => salvo.location == cellId);
            $('#'+cellId).removeClass('salvoGrid').removeClass('cellUsed');
            $('#'+salvo.salvo).show('slow').removeClass('salvoSelected');
            locations = locations.filter(salvo => salvo.location != cellId);
        }
    }
}

function returnSalvoes(){    
    if (locations.length == maxAmountSalvo){
        locations = locations.map(function(salvo) {
            return salvo.location;
        });
        sendSalvoes(locations);
    }else if (locations.length == 0) {
        console.log('No se apuntaron misiles');
    }else if (locations.length < maxAmountSalvo){
        console.log('Debe terminar de apuntar los misiles');
    }    
}

function placeHits(hits) {
    hits.self.forEach(report => {
        report.hitLocations.forEach(location => {
            $('#P'+location).append('<div class="hitShip"></div>');
        });
    });
    hits.opponent.forEach(report => {
        report.hitLocations.forEach(location => {
            $('#'+location).append('<div class="hitShip">'+report.turn+'</div>');
        });
    });
}
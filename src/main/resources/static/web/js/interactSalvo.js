var locations = [
    { salvo: 'salvo1', location: ''},
    { salvo: 'salvo2', location: ''},
    { salvo: 'salvo3', location: ''},
];
var salvo = '';
var lock = false;
const maxAmountSalvo = 3;

$('.salvo').click(function(event) {    
    salvo = event.target.id;
    if (!$("#"+salvo).hasClass("salvoSelected")) {
        if (!lock) {
            $("#"+salvo).addClass("salvoSelected");
            lock = true;
            //console.log(event.target.id);
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
});

$('.oppCell').click(function(event) {
    let cellId = event.target.id;
    if (lock) {
        if (!$('#'+cellId).hasClass('cellUsed')) {
            let salvoItem = locations.find(item => item.salvo == salvo);
            salvoItem.location = cellId;
            lock = false;                
            addSalvoGrid(salvo, cellId);
            $('#'+cellId).addClass('cellUsed');
        }   
    }
    else {
        if ($('#'+cellId).hasClass('cellUsed')) {
            let salvo = locations.find(salvo => salvo.location == cellId);
            removeSalvoGrid(salvo.salvo, salvo.location);
            salvo.location = '';
        }
    }
});

function addSalvoGrid(salvo, location){
    $('#'+salvo).hide('slow');
    $('#'+location).removeClass('oppCellHover').addClass('salvoGrid');
}

function removeSalvoGrid(salvo, location){
    $('#'+location).removeClass('salvoGrid');
    $('#'+salvo).show('slow').removeClass('salvoSelected');
}

$('#btnSubmitSalvos').click(function(){
    let tirosApuntados = 0;
    locations.forEach(function(item){ 
        if (item.location != '') {
            tirosApuntados++;
        } 
    });
    if (tirosApuntados == maxAmountSalvo){
        console.log(locations);
    }else if (tirosApuntados == 0) {
        console.log('No se apuntaron misiles');
    }else if (tirosApuntados < maxAmountSalvo){
        console.log('Debe terminar de apuntar los misiles');
    }    
});

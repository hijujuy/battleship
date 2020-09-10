var carrier = "carrier";
var battleship = "battleship";
var destroyer = "destroyer";
var submarine = "submarine";
var patrolboat = "patrolboat";

var myGrid;
var shipsJson;
var shipsArray;
var dontMove;

$(function() {
    var options = {
        disableOneColumnMode: true,
        removeTimeout: 100,
        float: true,
        column: 10,
        maxRow: 10,
        disableResize: true,
        cellHeight: 45,
        verticalMargin: 0,
        acceptWidgets: '.misil'
    };

    myGrid = GridStack.init(options);
    
    var items = [
        {   x: 0, y: 0, width: 5, height: 1, autoPosition: false, minWidth: 1, maxWidth: 5, minHeight: 1, maxHeight: 5,
            el: '<div id="carrier">'+ //agregamos id carrier y carrierHand
                    '<div id="carrierHand" class="grid-stack-item-content carrierHor">'+
                        '<button class="rotatebutton" onclick="rotate(carrier)">'+
                            '<img class="rotateicon" src="img/rotate.png" />'+
                        '</button'+
                    '</div>'+
                '</div>',
            id: "carrier"
        },
        {   x: 2, y: 0, width: 4, height: 1, autoPosition: false, minWidth: 1, maxWidth: 4, minHeight: 1, maxHeight: 4,
            el: '<div id="battleship">'+
                    '<div id="battleshipHand" class="grid-stack-item-content battleshipHor">'+
                        '<button class="rotatebutton" onclick="rotate(battleship)">'+
                            '<img class="rotateicon" src="img/rotate.png" />'+
                        '</button>'+
                    '</div>'+
                '</div>',
            id: "battleship"
        },
        {   x: 4, y: 0, width: 3, height: 1, autoPosition: false, minWidth: 1, maxWidth: 3, minHeight: 1, maxHeight: 3,
            el: '<div id="destroyer">'+
                    '<div id="destroyerHand" class="grid-stack-item-content destroyerHor">'+
                        '<button class="rotatebutton" onclick="rotate(destroyer)">'+
                            '<img class="rotateicon" src="img/rotate.png" />'+
                        '</button>'+
                    '</div>'+
                '</div>',
            id: "destroyer"
        },
        {   x: 6, y: 0, width: 3, height: 1, autoPosition: false, minWidth: 1, maxWidth: 3, minHeight: 1, maxHeight: 3,
            el: '<div id="submarine">'+
                    '<div id="submarineHand" class="grid-stack-item-content submarineHor">'+
                        '<button class="rotatebutton" onclick="rotate(submarine)">'+
                            '<img class="rotateicon" src="img/rotate.png" />'+
                        '</button>'+
                    '</div>'+
                '</div>',
            id: "submarine"
        },
        {   x: 8, y: 0, width: 2, height: 1, autoPosition: false, minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 2,
            el: '<div id="patrolboat">'+
                    '<div id="patrolboatHand" class="grid-stack-item-content patrolboatHor">'+
                        '<button class="rotatebutton" onclick="rotate(patrolboat)">'+
                            '<img class="rotateicon" src="img/rotate.png" />'+
                        '</button>'+
                    '</div>'+
                '</div>',
            id: "patrolboat"
        }
    ];

    //Genera los ships widgets
    items.forEach(function(mywidget){
        myGrid.addWidget(mywidget.el, mywidget);
        //showPosition(mywidget);
    });

    //Genera las positions ships
    myGrid.engine.nodes.forEach(function(node){
        $('#textPositions').append(
            '<div class="shipTypeLabel">'+
                '<span class="uppercase">'+node.id+':</span>'+
                '<span class="shipPositionLabel" id="'+node.id+'Position"></span>'+
            '</div>'
        );
        showPosition(node);
    });

    //Manejo de evento change sobre la grid
    myGrid.on('change', function(event, items){
        items.forEach(function(item){
            showPosition(item)});
    });
    
    myGrid.on('dragstart', function(event, ui){
        dontMove = $('#'+ event.target.id + 'Position').text();
        $('#'+ event.target.id + 'Position').text('esperando nueva posicion...').addClass('dragNode');
    });

    myGrid.on('dragstop', function(event, ui){
        $('#'+ event.target.id + 'Position').text(dontMove).removeClass('dragNode');
    });
    
});

function rotate(ship){
    let shipId = "#" + ship; //shipID es "#carrier"
    let currentWidth = Number($(shipId).attr('data-gs-width'));
    let currentHeight = Number($(shipId).attr('data-gs-height'));
    let currentX = Number($(shipId).attr('data-gs-x'));
    let currentY = Number($(shipId).attr('data-gs-y'));
    let verticalClass = ship + "Ver"; //verticalClass es "carrierVer"
    
    if ((currentHeight == 1) && (myGrid.isAreaEmpty(currentX, currentY + 1, 1, currentWidth - 1)) && ((currentY + (currentWidth - 1)) < 10)) 
    {
        myGrid.update($(shipId), currentX, currentY, currentHeight, currentWidth);
        $(shipId + 'Hand').addClass(verticalClass);
    } 
    else if ((currentWidth == 1) && (myGrid.isAreaEmpty(currentX + 1, currentY, currentHeight - 1, 1)) && ((currentX + (currentHeight - 1)) < 10))
    {
        myGrid.update($(shipId), currentX, currentY, currentHeight, currentWidth);
        $(shipId + 'Hand').removeClass(verticalClass);
    }
    else {
        var msg = "Giro no permitido. Mueva la figura para corregir el error.";
        $('#errorMsg').text(msg);
        $('#errorMsg').show( "slow" ).delay(2000).hide( "slow" );
    }

}

function saveGrid() {
    let nodos = [];
    //nodes arreglo de nodos en la grilla
    myGrid.engine.nodes.forEach(function(node) {
      let ship = node.id;
      let locations = getArrayStringLocation(node);
      let directionShip;
      $('#'+ship+'Hand').hasClass(ship+'Ver') ? directionShip = 'ver' : directionShip = 'hor' 
      nodos.push({ shipType: ship, shipLocations: locations, direction: directionShip});      
    });
    console.log(nodos);
    shipsJson = JSON.stringify(nodos);
    shipsArray = nodos;
    ubicarFlotas();
}

//Utileria 
//Convierte fila tipo entero a cadena de texto
function getStringRow(intRow){
    let stringRow = '';
    switch(intRow){
        case 0: stringRow = "A"; break;
        case 1: stringRow = "B"; break;
        case 2: stringRow = "C"; break;
        case 3: stringRow = "D"; break;
        case 4: stringRow = "E"; break;
        case 5: stringRow = "F"; break;
        case 6: stringRow = "G"; break;
        case 7: stringRow = "H"; break;
        case 8: stringRow = "I"; break;
        case 9: stringRow = "J"; break;
    }
    return stringRow;
}

//Ingresa un node, entrega un array de strings : ["A3", "B4"]
function getArrayStringLocation(node){
    let locations = [];
    if (node.height == 1){
        let fila = getStringRow(node.y);
        for (let x = node.x; x < (node.x + node.width); x++){
          locations.push(fila + x);
        }
      }else if (node.width == 1){
        for (let y = node.y; y < (node.y + node.height); y++){
            locations.push(getStringRow(y) + node.x);
        }
    }
    return locations;
}

//Ingresa un array locations, entrega un string : "A3 B4"
function getStringLocation(locations) {
    let stringLocations = ' ';
    locations.forEach(function(location){
        stringLocations += location + ' ';       
    });
    return stringLocations;
}

//myGrid add event on change
function showPosition(item){
    let stringLocations = getStringLocation(getArrayStringLocation(item));
    $('#' + item.id + 'Position').text(stringLocations);
    //console.log(item);
}

/* ubicacion de flotas en la grilla (Horizontal o Vertical) */
function ubicarFlotas() {
    shipsArray.forEach(function(item){
        if (item.direction == 'hor') {
            $('#P'+item.shipLocations[0]).html(
                '<img class="'+item.shipType+'HorGrid" src="img/'+item.shipType+item.direction+'.png"/>');
        }else {
            $('#P'+item.shipLocations[0]).html(
                '<img class="'+item.shipType+'VerGrid" src="img/'+item.shipType+item.direction+'.png"/>');
        }
        
    });
}

$('#btnSubmitPositions').click(function() {
    saveGrid();
    $('#positioningScreen').hide(1000);
    $('#battleGrids').show('slow');
});
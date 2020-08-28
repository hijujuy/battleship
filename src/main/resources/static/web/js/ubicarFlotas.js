var carrier = "carrier";
var battleship = "battleship";
var destroyer = "destroyer";
var submarine = "submarine";
var patrolboat = "patrolboat";
var myGrid;

$(function() {
    var options = {
        disableOneColumnMode: true,
        removeTimeout: 100,
        float: true,
        width: 10,
        height: 10,
        disableResize: true,
        cellHeight: 45,
        verticalMargin: 0
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

    items.forEach(function(mywidget){
        myGrid.addWidget(mywidget.el, mywidget);
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
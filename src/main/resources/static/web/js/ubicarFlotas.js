$(function() {
    var options = {
        disableOneColumnMode: true,
        removeTimeout: 100,
        float: true,
        width: 10,
        height: 10,
        disableResize: true,
        cellHeight: 50,
        verticalMargin: 0
    };

    var myGrid = GridStack.init(options);
    
    var items = [
        {   x: 0, y: 0, width: 5, height: 1, autoPosition: false, minWidth: 1, maxWidth: 5, minHeight: 1, maxHeight: 5,
            el: '<div><div class="grid-stack-item-content carrierHor"></div></div>'},
        {   x: 2, y: 0, width: 3, height: 1, autoPosition: false, minWidth: 1, maxWidth: 3, minHeight: 1, maxHeight: 3,
            el: '<div><div class="grid-stack-item-content submarineHor"></div></div>'}
    ];
    
    myGrid.batchUpdate();

    items.forEach(function(mywidget){
        myGrid.addWidget(mywidget.el, mywidget);
    });

    myGrid.commit();

});
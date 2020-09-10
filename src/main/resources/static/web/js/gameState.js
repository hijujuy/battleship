var hits;

$.getJSON("http://localhost:3000/hits")
    .done(function(data){
        hits = data;
        makeGameState(hits, 'self');
        makeGameState(hits, 'opponent');
});

function makeReport(play){
    let report;
    for (let i = 0; i < play.length; i++) {                                           
        report += '<tr>'
        //Generacion vista de turno
        report += '<td class="textCenter">'+play[i].turn+'</td>';
        //Generacion vista de hits por cada tipo de ship
        for (shipHits in play[i].damages) {
            report += '<td>';
            if (play[i].damages[shipHits] > 0) {
                for (let j = 0; j < play[i].damages[shipHits]; j++) {
                    report += '<img src="img/redhit.png"/>';
                }
            }            
            report += '</td>';
        }
        //Generacion vista hits perdidos
        report += '<td>';
        if (play[i].missed > 0) {
            for (let j = 0; j < play[i].missed; j++) {
                report += '<img src="img/greenhit.png"/>';
            }
        }
        report += '</td></tr>';
    }
    return report;
}

function makeGameState(hits, player) {
    if (player == 'self'){
        let play = hits.self;
        let report = makeReport(play);        
        $('#tbodyGameStateSelf').prepend(report);                
    }
    else if (player == 'opponent'){
        let play = hits.opponent;
        let report = makeReport(play);        
        $('#tbodyGameStateOpp').prepend(report);        
    }    
}

    /*
            let reportCarrierHits = '';
            let reportDestroyerHits = '';
            let reportBattleShipHits = '';
            let reportSubmarineHits = '';
            let reportPatrolBoatHits = '';
            let reportMissed = '';

            let lengthHits = play[i].damages.carrierHits;
            if (lengthHits > 0) {          
                for (let j = 0; j < lengthHits; j++) {
                    reportCarrierHits += '<img src="img/redhit.png"/>';
                }
            }
            
            lengthHits = play[i].damages.destroyerHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportDestroyerHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].damages.battleshipHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportBattleShipHits += '<img src="img/redhit.png"/>';
                }
            }
            
            lengthHits = play[i].damages.submarineHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportSubmarineHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].damages.patrolboatHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportPatrolBoatHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].missed;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportMissed += '<img src="img/greenhit.png"/>';
                }
            }

            $('#turnSelf'+play[i].turn)
                .append('<td>'+reportCarrierHits+'</td>')
                .append('<td>'+reportDestroyerHits+'</td>')
                .append('<td>'+reportSubmarineHits+'</td>')
                .append('<td>'+reportBattleShipHits+'</td>')
                .append('<td>'+reportPatrolBoatHits+'</td>')
                .append('<td>'+reportMissed+'</td>');
            */


        /*
        for (let i = 0; i < play.length; i++) {
            $('#tbodyGameStateOpp').prepend('<tr id="turnOpp'+play[i].turn+'"></tr>');
            $('#turnOpp'+play[i].turn).append('<td class="textCenter">'+play[i].turn+'</td>');
            
            let reportCarrierHits = '';
            let reportDestroyerHits = '';
            let reportBattleShipHits = '';
            let reportSubmarineHits = '';
            let reportPatrolBoatHits = '';
            let reportMissed = '';
            
            let lengthHits = play[i].damages.carrierHits;
            if (lengthHits > 0) {          
                for (let j = 0; j < lengthHits; j++) {
                    reportCarrierHits += '<img src="img/redhit.png"/>';
                }
            }
            
            lengthHits = play[i].damages.destroyerHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportDestroyerHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].damages.battleshipHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportBattleShipHits += '<img src="img/redhit.png"/>';
                }
            }
            
            lengthHits = play[i].damages.submarineHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportSubmarineHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].damages.patrolboatHits;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportPatrolBoatHits += '<img src="img/redhit.png"/>';
                }
            }

            lengthHits = play[i].missed;
            if (lengthHits > 0) {
                for (let j = 0; j < lengthHits; j++) {
                    reportMissed += '<img src="img/greenhit.png"/>';
                }
            }

            $('#turnOpp'+play[i].turn)
                .append('<td>'+reportCarrierHits+'</td>')
                .append('<td>'+reportDestroyerHits+'</td>')
                .append('<td>'+reportSubmarineHits+'</td>')
                .append('<td>'+reportBattleShipHits+'</td>')
                .append('<td>'+reportPatrolBoatHits+'</td>')
                .append('<td>'+reportMissed+'</td>');
        }*/

onmessage = function (event) {
     // event bakoitza mezu bat da { "eguna":"' + pubDate + '", "izenburua":"'+ title + '", "deskribapena":"' + desk + '" }
    // normalean json datuak bidali baina event bereziak kontrolatu
    
     //console.log(event.data);
    
    if (event.data === "hasi"){
        // workerra martxan jarri berri
        var berriKop = 0 ;
        var berriOrokorrak = '{"Berriak" : [';
        var berriLaburpena = '{"Berriak" : [';
        console.log("Berriak arrayak sortzen hasita");
        
    } else if (event.data === "bukatu"){
    
        berriakOsorikSortu();
   
    } else {
            var berria = JSON.parse(event.data);
            console.log (berria);
            //console.log(berria);
        
            berriKop = berriKop + 1;
            berriakOsorikSortu(berria,berriOrokorrak,berriKop);
            console.log(berriKop);
    }
}

// hasierako JSON objetua itzultzeaz arduratzen da
// Behin berriak guztiz kargatuta dagoenean exekutatzen da.

function berriakOsorikSortu(berria,berriOrokorrak,zkia){
     
        if (zkia == 10){
            berriOrokorrak = berriOrokorrak + ']}';
            berriLaburpena = berriOrokorrak;
            //orainBerriak Json Objetua bidali bueltan BerriApp.js -ri
            console.log("5.mezua");
            //postMessage(orainBerriak);
            //console.log(orainBerriak);
        }else{
           berriOrokorrak = berriOrokorrak + ',';
           berriOrokorrak = berriOrokorrak + '{ "izena":"' + berria.eguna + '", "deskribapena":"'+ berria.deskribapena + '"}';
           console.log(berriOrokorrak);
        }
}


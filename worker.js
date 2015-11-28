onmessage = function (event) {
     // event bakoitza mezu bat da { "eguna":"' + pubDate + '", "izenburua":"'+ title + '", "deskribapena":"' + desk + '" }
    // normalean json datuak bidali baina event bereziak kontrolatu
    
    console.log(event.data);
    
    if (event.data === "hasi"){
        // workerra martxan jarri berri
        var berriOrokorrak = '{"Berriak" : [';
        var berriLaburpena = '{"Berriak" : [';
        console.log("Berriak arrayak sortzen hasita");
        
    } else if (event.data === "bukatu"){
    
        berriakOsorikSortu();
   
    } else {
            var berria = JSON.parse(event.data);
            console.log(berria);
           
	
    
    }
}

// hasierako JSON objetua itzultzeaz arduratzen da

// Behin berriak guztiz kargatuta dagoenean exekutatzen da.
function berriakOsorikSortu(){
    
    var orainBerriak = '{"Berriak" : [';
  
    for (var i=0;i<Berriak.length;i++){
      
            orainBerriak = orainBerriak + '{ "izena":"' + Berriak[i].izen + '", "helbidea":"'+ Berriak[i].helb + '"}';
        if ( i != Iturriak.length - 1 ){
            orainBerriak = orainBerriak + ',';
        }
           
    }
    
    orainBerriak = orainBerriak + ']}';
    //orainBerriak Json Objetua bidali bueltan BerriApp.js -ri
    postMessage(orainBerriak);
}
// isLehena funtzioa, ia zki bat lehena den ikusten du eta horren arabera postMessage ezberdina bidaltzen du.

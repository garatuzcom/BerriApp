/* BERRIRO MARTXAN, BERRIAK JSON OBJETUA ORDENATZEAZ ETA ITZULTZEAZ ARDURATZEN DA */

/***********************************************onmessage*****************************************************************/
// mezuak jasotzen dituen funtzio orokorra

onmessage = function (event) {
     // event bakoitza mezu bat da { "eguna":"' + pubDate + '", "izenburua":"'+ title + '", "deskribapena":"' + desk + '" }
    // normalean json datuak bidali baina event bereziak kontrolatu
    
     //console.log(event.data);
    
    if (event.data === "hasi"){
        // workerra martxan jarri berri
      //  var berriZerb = new BerriTratap();
        
        //var berriOrokorrak = '{"Berriak" : [';
        //var berriLaburpena = '{"Berriak" : [';
    console.log("Berriak arrayak sortzen hasita Workerrean");
        
    } else if (event.data === "bukatu"){
    
        //berriZerb.berriakOsorikSortu();
   
    } else {
            var berriak = JSON.parse(event.data);
        //console.log("JSONERA PASATU BERRI WORKERREAN");
        //console.log(berriak);
            // HEMEN ARRAYA ORDENATU BEHARRA DUGU, EGUNAK MILISEGUNDUTARA PASA, BEGIRATU HANDIENA ETA ORDENATU
            // BEHIN JSON OBJETU BERRIAN 25 elementu daudela >> ITZULI
            // HURRENGOA 100 ELEMENTU DAUDENEAN ?¿? edo denak daudenean??? erabaki efizientziaren arabera, igual arraya zatitu...
        
            // Berriak ordenatzeko funtzioari deitu
            ordenatuBerriak(berriak,"eguna","asc");
        
  
           
    }
}
/**************************************ordenatuBerriak*****************************************************************/
// http://jsfiddle.net/Jsar8/1/
// Berriak ordenatzeko funtzioak ... 1.0 frogak

function ordenatuBerriak(berriako,prop, asc) {
    
    var berriab = berriako.Berriak.sort(function(a, b) {
        if (asc) {
            if (a[prop] > b[prop]) return 1;
            if (a[prop] < b[prop]) return -1;
            return 0;
        } else {
            if (b[prop] > a[prop]) return 1;
            if (b[prop] < a[prop]) return -1;
            return 0;
        }
        });
    //console.log("ORDENATU ONDOREN WORKERREAN");
    berriako.Berriak = berriab;
    //console.log(berriab);
    berriab = '{ "Berriak" :' + JSON.stringify(berriab) + '}';
    //console.log(berriab);
    //console.log("ORDENATU ONDOREN WORKERREAN II");
    //console.log(JSON.parse(berriab));
    // behin berriak ordenatuta, datuak itzuli !
    //postMessage(JSON.stringify(berriako));
    postMessage(JSON.stringify(berriab));
    //berriak ordenatuta objetua bistaratu kontsolan
    //console.log("workerrean eratutakoa" + JSON.stringify(berriako) + berriako.Berriak);
    // behin ordenatuta dagoenean, BerriApp.js fitxategiari bidali, bistaratu dezan
    
}
// hasierako JSON objetua itzultzeaz arduratzen da
// Behin berriak guztiz kargatuta dagoenean exekutatzen da.

/***************************************init***************************************************************************/
// oraingoz frogetarako hasieraketaz arduratzen da.baztertua!!!!

/*BerriTratap.prototype.berriakOsorikSortu = function(berria){
     
        if (this.zkia == 10){
            berriOrokorrak = berriOrokorrak + ']}';
            berriLaburpena = berriOrokorrak;
          
           
        }else{
           berriOrokorrak = berriOrokorrak + ',';
           berriOrokorrak = berriOrokorrak + '{ "izena":"' + berria.eguna + '", "deskribapena":"'+ berria.deskribapena + '"}';
           console.log(berriOrokorrak);
        }
}*/


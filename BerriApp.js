/* BERRIAPP 2.0 ESKELETOA */
function BerriApp() {
   
   // var erabil = "bai";

}

BerriApp.prototype.init = function() {
    // lehen hasieratzea bada, defektuzko konfigurazioa instalatu
    // bestela, bere konfigurazioa kargatu eta BerriApp objetua sortu
    console.log("sortzen");
    /* if ( localStorage.getItem("1") != 0 ){

            this.sortuIturriak();
            localStorage.setItem("1") = 0 ;
           
       }*/
      this.iturriZerrenda = "";
      var berriZerrenda = "";
  
       this.sortuIturriak();
       this.erakutsiIturriak();
       this.kargatuIturriak();
}

BerriApp.prototype.sortuIturriak = function() {
// hemen gure defektuzko iturriak sortuko dira
//Lehen exekuzioan , json fitxategia irakurri eta iturri zerrenda 1.0 sortu. Gero memoriatik kargatu!
    
    var orainIturriak = '{"Iturriak" : [';
    
    $.getJSON('Iturriak.json', function(data) {
       
            var items = [];
            /*elementuak iteratzeko beste modu bat $.each( data, function() {
                alert( data.Iturriak[0].izena );
                
            });*/
            for (i=0;i<data.Iturriak.length;i++){
                //console.log (data.Iturriak[i].izena);
              
                    orainIturriak = orainIturriak + '{ "izena":"' + data.Iturriak[i].izena + '", "helbidea":"'+ data.Iturriak[i].helbidea + '"}';
                
                if ( i != data.Iturriak.length - 1 ){
                    orainIturriak = orainIturriak + ',';
                }           
            }
    
         orainIturriak = orainIturriak + ']}';
         
        // gure memorian gorde iturriak
        localStorage.setItem("iturriak",JSON.stringify(orainIturriak));
        //alert(JSON.parse(localStorage.getItem("iturriak")));
            
        //alert("json eskuratzen" + data);
        //this.iturriZerrenda =JSON.parse(data); 
    });

}
BerriApp.prototype.erakutsiIturriak = function() {
// Iturrien zerrenda bistaratzeko funtzioa
     //for (i=0;i<this.iturriZerrenda.Iturriak.length;i++){
        //console.log(Iturriak[i]);
        // objetuan elementuak hartzeko >> aktibatzeko/desaktibatzeko adib
       // console.log(this.turriZerrenda.Iturriak[i].izen);
    
    //}
    var orainIturriak = localStorage.getItem("iturriak");
    var gureIturriak = JSON.parse(orainIturriak);
    alert(gureIturriak.Iturriak.length);
    for (i=0;i<orainIturriak.Iturriak[i].length;i++){
        alert( orainIturriak[i].izena);
    }
    
}

  
BerriApp.prototype.kargatuIturriak = function() {
 // honetarako workerrak erabili, bigarren planuak kargatu daitezen. "Lan zikina" eurak ein ta guri emaitza bueltau
    
    //aktibo dauden iturriak ikusi , eta workerrari zerrenda pasa! 
    //erabiltzaileak iturriak definitzeko aukera izaten badu. Gure iturriak + erabiltzailearenak
    //eskaeraren arabera, worker bat baino gehiago erabili ahal ditxugu, edo eta baten kontrolatzaile lanak ein,
    // kategoria, edo iturri bat soilik dan ikusteko...

    // Aktibatuta dauden iturrien JSON objetu BERRIA ERAIKI (balioak koma bikoitzaz) 
    var orainIturriak = '{"Iturriak" : [';
    for (var i=0;i<Iturriak.length;i++){
        if ( Iturriak[i].akti == 1 ){
            orainIturriak = orainIturriak + '{ "izena":"' + Iturriak[i].izen + '", "helbidea":"'+ Iturriak[i].helb + '"}';
        if ( i != Iturriak.length - 1 ){
            orainIturriak = orainIturriak + ',';
        }
           
        }
    }
    
    orainIturriak = orainIturriak + ']}';
    
    // var iturriDef = JSON.stringify(orainIturriak);
    // workerrari iturriakbidali gure JSON manualak ;)
    
    nireworker = new Worker('worker.js');
    nireworker.postMessage(orainIturriak);
    
}


BerriApp.prototype.erakutsiBerriak = function(){

    for (i=0;i<Berriak.length;i++){
      
        console.log(Berria[i].izen + " " + Berria[i].helb);  
    }
}

BerriApp.prototype.erakutsiGaiak = function () {

}
BerriApp.prototype.erakutsiEzarpenak = function () {

}
BerriApp.prototype.aldatuEzarpenak = function () {

}

/**************************BerriApp bukaera ***********************************************************/
/*************************************************************************************/


/**********************************************************************************************/
/* Klasea: Iturria
   Azalpena: Iturriaren datuak bilduko ditu + ia aktibo dagoen edo ez */
/*******************************************************************************************/

var Iturriak = [];

function Iturria(izena, helbidea){

    this.izen = izena;
    this.helb = helbidea;
    this.akti = 0;

}
   


Iturria.prototype.aktibatu = function() {
    this.akti = 1;
}
Iturria.prototype.desaktibatu = function() {
    this.akti = 0;
}

/*******************************Iturria bukaera ******************************************************/
/*******************************************************************************************************/

/*******************************************************************************************************/
/*************** Berria klasea: ************************************************************************/
var Berriak = [];

function Berria(iturria, eguna, izenburua, testua, irudia, helbidea){
   
    this.itur = iturria;  
    this.egun = eguna;
    this.izen = izenburua;
    this.tetu = testua;
    this.irud = irudia;
    this.helb = helbidea;
}

Berria.prototype.init = function (){

}
Berria.prototype.erakutsiBerria = function (){
  
        console.log( this.itur + " " + this.izen + " " + this.tetu );
  
}
Berria.prototype.entzunBerria = function (){
  
        console.log( "txipiwerik dixo" + this.itur + " " + this.izen + " " + this.tetu );
  
}
Berria.prototype.partekatuBerria = function (){


}

var e = new BerriApp();
e.init();

var i = new Berria('x','x','x','x','x','x');
i.erakutsiBerria();
i.entzunBerria();
//var nireBerria= new Berria("x,"x","x","x","x","x");
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
    
        // iturriak sortu
       this.sortuIturriak();
    
        // iturriak json objetuko elementu bakoitza kargatu 
       this.kargatuIturriak();
       //this.kargatuIturriak();
}
/*********************************sortuIturriak*******************************************************************************/
BerriApp.prototype.sortuIturriak = function() {
    
// hemen gure defektuzko iturriak sortuko dira
//Lehen exekuzioan , json fitxategia irakurri eta iturri zerrenda 1.0 sortu JSON formatuan. Gero memoriatik kargatu behar da!
    
    var orainIturriak = '{"Iturriak" : [';
    
    $.getJSON('Iturriak.json', function(data) {
            /*elementuak iteratzeko beste modu bat $.each( data, function() {
                alert( data.Iturriak[0].izena );
                
            });*/
            for (i=0;i<data.Iturriak.length;i++){
              
              
                    orainIturriak = orainIturriak + '{ "izena":"' + data.Iturriak[i].izena + '", "helbidea":"'+ data.Iturriak[i].helbidea + '"}';
                
                if ( i != data.Iturriak.length - 1 ){
                    orainIturriak = orainIturriak + ',';
                }           
            }
    
         orainIturriak = orainIturriak + ']}';
         
        // gure memorian gorde iturriak 
        localStorage.setItem("iturriak",orainIturriak);
      
    });

}
/***********************************kargatuIturriak***********************************************************************/

BerriApp.prototype.kargatuIturriak = function() {
    
    var gureIturriak = JSON.parse(localStorage.getItem("iturriak"));
    
    for (i=0;i<gureIturriak.Iturriak.length;i++){
        this.kargatuIturria(gureIturriak.Iturriak[i].izena, gureIturriak.Iturriak[i].helbidea);
    }
      
}

/**********************************kargatuIturria**********************************************************************************/
// ajax eskaera RSS iturriari, > iturriaren arabera trataera bat edo beste eta oinarrizkoa egin ondoren, workerrari bidali.
// workerrak iturri ezberdinak itxoingo ditu, eta denak dituenean ordenatutako emaitza itzuliko du. 
BerriApp.prototype.kargatuIturria = function(izena,helbidea) {

   
    console.log("kargatuIturria> " + izena +  " " + helbidea); 
    var orainBerriak = '{"Berriak" : [';
    for (var i=0;i<Iturriak.length;i++){
      
            orainBerriak = orainBerriak + '{ "izena":"' + Iturriak[i].izen + '", "helbidea":"'+ Iturriak[i].helb + '"}';
        if ( i != Iturriak.length - 1 ){
            orainBerriak = orainBerriak + ',';
        }
           
    }
    
    orainBerriak = orainBerriak + ']}';
    
    //console.log(JSON.parse(orainBerriak));
    //nireworker = new Worker('worker.js');
    //nireworker.postMessage(orainBerriak);
    
}

/*********************************erakutsiBerriak************************************************************************************/
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
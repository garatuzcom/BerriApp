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
       this.sortuIturriak();
       this.erakutsiIturriak();
       this.kargatuIturriak();
}

BerriApp.prototype.sortuIturriak = function() {
// hemen gure defektuzko iturriak sortuko dira
    var id_list = ["berria","bertsozale","eitb"];
        //ikusiko den izena   
        var iturri_list = ["Berria","Bertsozale","Eitb"];
        //RSS url-a   
        var url_list =["http://www.berria.info/rss/ediziojarraia.xml","http://www.bertsozale.com/eu/eu/albisteak/aggregator/RSS","http://www.eitb.com/eu/rss/albisteak/"];
        // iturri kopururaren arabera
        // tamaina = id_list.length edo holako zeoze gero
        var tamaina = 3;
        for (i=0;i<tamaina;i++){
            //jatorri objetuak sortu eta
            iturriBerria = new Iturria(iturri_list[i],url_list[i]);
            iturriBerria.aktibatu();
            //jatorriak arrayra sartu hurrengo posizioan               
            //var zenbat = Iturriak[i].length;           
            //Iturriak[zenbat] = jatorriBerria;   
            Iturriak.push(iturriBerria);
        }
}



BerriApp.prototype.erakutsiIturriak = function() {
// Iturrien zerrenda bistaratzeko funtzioa
     for (i=0;i<Iturriak.length;i++){
        //console.log(Iturriak[i]);
        // objetuan elementuak hartzeko >> aktibatzeko/desaktibatzeko adib
        console.log(Iturriak[i].izen);
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
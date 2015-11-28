/* BERRIAPP 2.0 ESKELETOA */
function BerriApp() {
   
   // var erabil = "bai";

}
/***************************************init*******************************************************/
// oraingoz frogetarako hasieraketaz arduratzen da.

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
// hemen gure defektuzko iturriak sortuko dira
//Lehen exekuzioan , json fitxategia irakurri eta iturri zerrenda 1.0 sortu JSON formatuan. Gero memoriatik kargatu behar da!

BerriApp.prototype.sortuIturriak = function() {
        
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
//Iturrien zerrenda errekorrituko du eta aktibatuta dagoen bakoitzeko eskaera bat egingo dio kargatuIturria-ri
//Erabiltzaileari iturriak sartzeko aukera emanez gero , kontuan izan. 

BerriApp.prototype.kargatuIturriak = function() {
    
    // memoriatik iturriak kargatu
    var gureIturriak = JSON.parse(localStorage.getItem("iturriak"));
    
    // workerra hasieratu, jasoko dituen berriak prozesatu ditzan
    nireworker = new Worker('worker.js');
    nireworker.postMessage("hasi");
    for (i=0;i<gureIturriak.Iturriak.length;i++){
        //Iturri bakoitzari deitu AJAX eskaera
        this.kargatuIturria(gureIturriak.Iturriak[i].izena, gureIturriak.Iturriak[i].helbidea,nireworker);
    }
    //bukatzen duenean
    //workerra.postMessage("bukatu");
    
}

/**********************************kargatuIturria**********************************************************************************/
// AJAX eskaera RSS iturriari, > iturriaren arabera trataera bat edo beste eta oinarrizkoa egin ondoren, workerrari bidali.
// lehen saiakeran, berriak bann banan workerrari
// workerrak iturri ezberdinak itxoingo ditu, eta denak dituenean ordenatutako emaitza itzuliko du. 


BerriApp.prototype.kargatuIturria = function(izena,helbidea,workerra) {
   //helbidea
     console.log("kargatuIturria> " + izena +  " " + helbidea); 
       $.ajax({
            url : 'berria.xml',
            dataType : 'xml',
            type : 'GET',
            success : function(xml) {
              
            //console.log("honaino ondo");
            //|| (izena.indexOf("Noticias")!=-1))
                //alert(izena);
                //berriarentzat item da !
                $(xml).find('item').each(function() {
                  
                  
                    // XML MOTAREN ARABERA INTERESATZEN ZAIGUNA JASO !!!
                    // HEME ADI CDATA, updated , formatuak... eta berak sartzen dituen iturrietarako regex antzerako bat onartu/ez onartu
                    //var id = $(this).find("id").text();
                    var pubDate = $(this).find("pubDate").text();
                    var desk =  $(this).find("description").text();
                    var izenb = $(this).find("title").text();
                    var link = $(this).find("link").text();
                    
                    // Berria sortu eta workerrari bidali honek prozesatu ditzan
                    orainBerria = '{ "eguna":"' + pubDate + '", "izenburua":"'+ izenb + '", "deskribapena":"' + desk + '" }';
                   // console.log(orainBerria);
                    //console.log(JSON.parse(orainBerria));
                    workerra.postMessage(orainBerria); 
            
                });
           
            },error: function(jqXHR, textStatus, ex) {
                // erroreak jasotzeko, kasu honetan CORS arazoa... :(
                        console.log("ERROREA EGON DA" + textStatus + "," + ex + "," + jqXHR.responseText);
                },finish: function(){
                 console.log(izena + 'kargatzen bukatu du');
                 
             }
   
        });
    
   

    //alert(JSON.stringify(orainBerriak));
    
    
    //console.log(JSON.parse(orainBerriak));
    //nireworker = new Worker('worker.js');
    //nireworker.postMessage(orainBerriak);
    
}

/*********************************erakutsiBerriak************************************************************************************/
BerriApp.prototype.erakutsiBerriak = function(){

   /* for (i=0;i<Berriak.length;i++){
      
        console.log(Berria[i].izen + " " + Berria[i].helb);  
    }*/
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
  
        //console.log( this.itur + " " + this.izen + " " + this.tetu );
  
}
Berria.prototype.entzunBerria = function (){
  
        //console.log( "txipiwerik dixo" + this.itur + " " + this.izen + " " + this.tetu );
  
}
Berria.prototype.partekatuBerria = function (){


}

var e = new BerriApp();
e.init();

//var nireBerria= new Berria("x,"x","x","x","x","x");
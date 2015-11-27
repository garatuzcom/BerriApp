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
   
// Berriak arraya kargatzeaz arduratuko da , adi! Hau da klabeetako bat
 
for (i=0;i<Iturriak.length;i++){
    //console.log();
    Iturriak[i].kargatuIturria();
}
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
   
Iturria.prototype.kargatuIturria = function() {
   
    //jQuery.support.cors = true; // Access-Control-Allow-Origin CORS goiburua nola?
   
    $.ajax({
            url : this.helb,
            dataType : 'xml',
            type : 'GET',
            headers: {"X-My-Custom-Header": "some value"},
            xhrFields: {
                  'withCredentials': true },
            success : function(xml) {
              
            console.log("honaino ondo");
            //|| (izena.indexOf("Noticias")!=-1))
                //alert(izena);
                $(xml).find('entry').each(function() {
                  
                    var id = $(this).find("id").text();
                    var pubDate = $(this).find("updated").text();
                    var desk =  $(this).find("description").text();
                    var izenb = $(this).find("title").text();
                    var link = $(this).find("link").text();
                    console.log(link + pubDate + desk + izenb + link);
                    // Berria sortu
                    var berriBerria = new Berria(link, desk, izenb, link, izenb, link);
                    // Berria arrayiean sartu
                   // var zenbat = Berriak.length;
                    Berriak.push(berriBerria);
                    //Berriak[zenb] = berriBerria;
    //webworkerra deitu eta bere eskaera jaso , ondoren BErriak kargatu!
                });
           
            },error: function(jqXHR, textStatus, ex) {
                // erroreak jasotzeko, kasu honetan CORS arazoa... :(
                        console.log(textStatus + "," + ex + "," + jqXHR.responseText);
                },finish: function(){
                 console.log('bukatu du');
             }
   
        });
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
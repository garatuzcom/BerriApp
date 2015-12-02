/* BERRIAPP 2.0 ESKELETOA */
function BerriApp() {
    this.init();
    this.berriGuztiakBatean = '';
   // var berriZerrenda = [];
    
}
/***************************************init***************************************************************************/
// oraingoz frogetarako hasieraketaz arduratzen da.

BerriApp.prototype.init = function () {
    // lehen hasieratzea bada, defektuzko konfigurazioa instalatu
    // bestela, bere konfigurazioa kargatu eta BerriApp objetua sortu
    console.log('sortzen');
    /* if ( localStorage.getItem("1") != 0 ){

            this.sortuIturriak();
            localStorage.setItem("1") = 0 ;
           
       }*/

    this.iturriZerrenda = "";
    
        // iturriak sortu
    this.sortuIturriak();
    
    // iturriak json objetuko elementu bakoitza kargatu 
    this.kargatuIturriak();
    //this.ordenatuBerriak();
    //this.kargatuIturriak();
}
/*********************************sortuIturriak*******************************************************************************/
// hemen gure defektuzko iturriak sortuko dira
//Lehen exekuzioan , json fitxategia irakurri eta iturri zerrenda 1.0 sortu JSON formatuan. Gero memoriatik kargatu behar da!

BerriApp.prototype.sortuIturriak = function () {
        
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
         //console.log (JSON.parse(orainIturriak));
       
    
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
    
    // workerra hasieratu, jasoko dituen berriak prozesatu ditzan (ezin da js karpetan sartu oraingoz)
    nireworker = new Worker('worker.js');
    nireworker.postMessage("hasi");
    //this.erantzunajaso(nireworker);
   
    //iturri kopurua memorian gorde
    
    localStorage.setItem("IturriKop", gureIturriak.Iturriak.length);
    localStorage.setItem("IturriProz", 0 );
    
    // saiakera objetuaren aldagian stringa gordetzeko
    this.berriGuztiakBatean = '{"Berriak" : [';
    
    //Berridenak izeneko aldagaia hustu
    localStorage.setItem("BerriDenak", "");
    
    //berriGuztiak izeneko aldagaia hasieratu 
    localStorage.setItem('berriGuztiak','{"Berriak" : [');
    
    //iturri bakoitzeko, kargatuIturria funtzioari deitu
    for (i=0;i<gureIturriak.Iturriak.length;i++){
        
        //Iturri bakoitzari deitu AJAX eskaera
        this.kargatuIturria(gureIturriak.Iturriak[i].izena, gureIturriak.Iturriak[i].helbidea,nireworker);
    
    }
    //bukatzen duenean
    
    //WORKERRAREN ERANTZUNA JASO (ARRAYA ORDENATUTA, BERAZ ERAKUSTEKO FUNTZIOARI PASA... orain ERAKUTSI)
    nireworker.onmessage = function (mezua) {
        console.log("Workerrak erantzuna bidali du");
        
        //mezuak bistaratu >>
        
        
        BerriApp.prototype.berriakBistaratu(mezua);
        
        //workerra itxi
        nireworker.terminate();
    };
  
    //workerra.postMessage("bukatu");
    
}
//************************************************berriakBistaratu*******************************************************/

BerriApp.prototype.berriakBistaratu = function(mezua){

console.log("erantzuna jasota eta bistaratzeko prest");
//console.log(mezua);
//console.log("BISTARATZEKO MEZU OSOA" + JSON.parse(mezua.data)); //string formatuan dago :(
    // inprimatu
    var berriZerrendaOsoa = JSON.parse(mezua.data);
    console.log("JSON OBJETU ZERRENDA >>" + berriZerrendaOsoa);

    $("#bista").html(mezua.data);
}

/*******************************kateaTratatu*************************************************************************************/
//Katea tratatzeko funtzio posible bat... landu egin behar da, edozein string arraro jaso... zoritxarrez encode /decodek ez du ondo //funtzionatzen.... agur efizientzia :( >> replace batzuk >>
// derrigor ondo kodetuta itzuli behar du honek, gero JSON objetuan ondo gordetzeko

BerriApp.prototype.kateenTratamentua = function(katea) {

    var kateatratatzeko = encodeURIComponent(katea);
        kateatratatzeko = kateatratatzeko.replace(/%20/g, " ");
        kateatratatzeko = kateatratatzeko.replace(/%22/g, " ");
        kateatratatzeko = kateatratatzeko.replace(/%26laquo/g,"'");
        kateatratatzeko = kateatratatzeko.replace(/%26raquo/g,"'");
        kateatratatzeko = kateatratatzeko.replace(/%3A/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%3B/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%3C/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%3Cp/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%3Cbr/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%C3/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%82/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%C2/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%BB/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%2F/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%2C/g," ");
        kateatratatzeko = kateatratatzeko.replace(/%3E/g," ");
        kateatratatzeko = kateatratatzeko.replace(/br/g," "); //honekin kontuz
        kateatratatzeko = kateatratatzeko.replace(/%25/g,"%"); // konprobatu ondo dagoela
        kateatratatzeko = kateatratatzeko.replace(/%AB/g," ");
    return kateatratatzeko;

}




/**********************************kargatuIturria**********************************************************************************/
// AJAX eskaera RSS iturriari, > iturriaren arabera trataera bat edo beste eta oinarrizkoa egin ondoren, workerrari bidali.
// lehen saiakeran, berriak bann banan workerrari
// workerrak iturri ezberdinak itxoingo ditu, eta denak dituenean ordenatutako emaitza itzuliko du. 


BerriApp.prototype.kargatuIturria = function(izena,helbidea,workerra) {
   //helbidea

    var orain = localStorage.getItem("IturriKop");
    console.log(izena + helbidea);
    var orainBerriak = '{"Berriak" : [';
     console.log("kargatuIturria> " + izena +  " " + helbidea);
    //helbidea = helbidea + "&callback + nirefuntzioa";
       $.ajax({
           
            url : "berria.xml",
            dataType :'xml', //CORS saltatzeko bidea hau da!dataType: "jsonp xml","xmlp"
            type : 'GET',
            //async: true,
            crossDomain: true,
            contentType: "text/xml",
            success : function(xml) {
                console.log("barruan");
                //alert(xml);
            //console.log(xml);
            var berriKop = $(xml).find("item").length;
            var berriKont = 0 ;
            //console.log("honaino ondo");
            //|| (izena.indexOf("Noticias")!=-1))
                //alert(izena);
                //berriarentzat item da !
                $(xml).find('item').each(function() {
                  
                  //bertsozale data > <dc:date>
                    // XML MOTAREN ARABERA INTERESATZEN ZAIGUNA JASO !!!
                    // HEME ADI CDATA, updated , formatuak... eta berak sartzen dituen iturrietarako regex antzerako bat onartu/ez onartu
                    //var id = $(this).find("id").text();
                    var pubDate = $(this).find("pubDate").text();
                    var desk =  $(this).find("description").text();
                    var izenb = $(this).find("title").text();
                    var link = $(this).find("link").text();
                    izenb = BerriApp.prototype.kateenTratamentua(izenb); // hau banan banan egin beharrean guztiari hobeto!
                    desk = BerriApp.prototype.kateenTratamentua(desk);
                    // hemen enkoding arazoa konpondu behar da 
                    orainBerriak = orainBerriak + '{ "eguna":"' + pubDate + '", "izenburua":"' + izenb + '", "deskribapena":"' + desk + '" }';            
                    // BERRI GUZTIAK BANAN BANAN GORDETZEN DITUEN OBJETUA > berriGuztiak
                    var berriGuztiak = localStorage.getItem("berriGuztiak");
                    berriGuztiak = berriGuztiak + '{ "eguna":"' + pubDate + '", "izenburua":"' + izenb + '", "deskribapena":"' + desk + '" },';            
                    localStorage.setItem("berriGuztiak",berriGuztiak);    
                    
                    //hobeto aldagai batean gorde agian.. HEMENDIK JARRAITU ****!!!!!!
                    //this.berriGuztiakBatean = this.berriGuztiakBatean + berriGuztiak;
                    
                    //console.log(this.berriGuztiakBatean);
                    
                    if ( berriKont != berriKop - 1 ){
                        berriKont = berriKont + 1;
                        orainBerriak = orainBerriak + ',' ;
                    }
                    // Berria sortu eta workerrari bidali honek prozesatu ditzan
                    //orainBerria = '{ "eguna":"' + pubDate + '", "izenburua":"'+ izenb + '", "deskribapena":"' + desk + '" }';
                   // console.log(orainBerria);
                    //console.log(JSON.parse(orainBerria));
                    //workerra.postMessage(orainBerria); 
                
                 });
                   
                    //buklea bukatzen duenean, orainBerriak bukatu
                    orainBerriak = orainBerriak + ']}';
                    //console.log(JSON.parse(orainBerriak));
                
                    //ITURRIA PROZESATU DUENEZ; HAU APUNTATU
                    var zkiberria = parseInt(localStorage.getItem("IturriProz")) + 1;
                    localStorage.setItem("IturriProz", zkiberria );
                   
                    //ORAIN BERRIAK OSATU
                    //localStorage.setItem("orainBerriak", orainBerriak );
                    //workerra.postMessage(orainBerria); 
                    
                    //AZKEN ITURRIA DEN BEGIRATU, HALA BADA, BERRIGUZTIAK ITXI ETA TRATATZEN HASI
                    if ( orain == zkiberria ){
                        
                        //ITURRI GUZTIAK EXEKUTATU DIREN SEINALE ! BERAZ, BERRIAK TRATATU
                        //console.log("berriak tratatzen hasi");
                       
                        
                        //berriGuztiak JSON objetua string moduan osatzen bukatu
                        var berriGuztiakTrat = localStorage.getItem("berriGuztiak");
                        //var berriGuztiakTrat = this.berriGuztiakBatean;
                        berriGuztiakTrat = berriGuztiakTrat.substr(0,berriGuztiakTrat.length-1);
                        berriGuztiakTrat = berriGuztiakTrat + ']}';
                        //console.log (localStorage.getItem("berriGuztiak"));
                        
                        // HEMEN BERRIAK ERAKUSTEKO FUNTZIOA DEITU!!! >> JSON OBJETUA ONDO ERAIKIA ;)
                        localStorage.setItem("berriGuztiak",berriGuztiakTrat);
                        var BerriDenak = JSON.parse(berriGuztiakTrat);
                        console.log(BerriDenak);
                        
                        
                        // Workerrari objetu guztiak bidali tratatu ditzan
                        workerra.postMessage(berriGuztiakTrat);
                        
                        //bistaratzen ia dena ondo doan ikusteko
                    
                        
                        //Function.ordenatuBerriak();
                        // Hemen workerrarekin edo barik, arrayaren ordenatzea konprobatu!!! Ondo egongo litzak
                        // workerrari kate guztia bidlai, eta honek ordenatuta lehen 25ak bidali lehenengo, gero lanean jarraitu
                        // eta bukatzean itzuli ??? 
                        
                    }
            },error: function(jqXHR, textStatus, ex) {
                // erroreak jasotzeko, kasu honetan CORS arazoa... :(
                        console.log("ERROREA EGON DA" + textStatus + "," + ex + "," + jqXHR.responseText);
            }
   
        });
    
    //alert(JSON.stringify(orainBerriak));
    //console.log(JSON.parse(orainBerriak));
    //nireworker = new Worker('worker.js');
    //nireworker.postMessage(orainBerriak);
    
}


BerriApp.prototype.ordenatuBerriak = function() {

    var BerriDenak = JSON.parse(localStorage.getItem("berriGuztiak"));
    //console.log(BerriDenak);
}
/*********************************erakutsiBerriak************************************************************************************/


BerriApp.prototype.erakutsiBerriak = function(){

  //get
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


//var nireBerria= new Berria("x,"x","x","x","x","x");
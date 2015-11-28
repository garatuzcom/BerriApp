// zaharra: lehena da funtzioak aztertuko dituen balioak, kasu honetan bi balio aztertuko ditu

//var num0 = 22;
//var num = 2227644437;

// bigarren bertsioan parametro moduan jasotzen dugu zenbakia, eta ondoren is Lehena funtzioari pasa
//importScripts('http://code.jquery.com/jquery-2.0.0.min.js');

onmessage = function (event) {
	//event-en JSON OBJETU BAT JASO
    // ITURRIEN ZERRENDA ?  
	//var iturriZerrenda = JSON.parse(event.data);
	//postMessage(event.data);
	//isLehena(zenbakia);
    // bukle bat iturrietatik zehar 
    console.log(event.data);
    
   
   var iturriak = JSON.parse(event.data);

	var berriOrokorrak = '{"Berriak" : [';

	for (i = 0; i< iturriak.Iturriak.length;i++){
    	//console.log (iturriak.Iturriak.length );
    	//console.log(iturriak.Iturriak[i].izena);
   // alert(iturriZerrenda);
		console.log("eskatu iturria>>" + iturriak.Iturriak[i].izena + ":" + iturriak.Iturriak[i].helbidea);
			
		eskatuIturria(berriOrokorrak,iturriak.Iturriak[i].izena,iturriak.Iturriak[i].helbidea); 
   }
    
    
}

function eskatuIturria(berriOrokorrak, iturriizena, iturria){
    //jQuery.support.cors = true; // Access-Control-Allow-Origin CORS goiburua nola?
console.log(iturriizena + " " + iturria);
 $.ajax({
            url : berria.xml,
            dataType : 'xml',
            type : 'GET',
          /*  headers: {"X-My-Custom-Header": "some value"},
            xhrFields: {
                  'withCredentials': true },*/
            success : function(xml) {
              
            console.log("honaino ondo");
				var orainBerriak = '{"Berriak" : [';;        
            //|| (izena.indexOf("Noticias")!=-1))
                //alert(izena);
                $(xml).find('entry').each(function() {
                  
                    var id = $(this).find("id").text();
                    var pubDate = $(this).find("updated").text();
                    var desk =  $(this).find("description").text();
                    var izenb = $(this).find("title").text();
                    var link = $(this).find("link").text();
                    console.log(link + pubDate + desk + izenb + link);
                    
                  
            		orainBerriak = orainBerriak + '{ "izenburua":"' + izenb + '", "helbidea":"'+ Iturriak[i].helb + '"}';
            		orainBerriak = orainBerriak + ',';
      				berriOrokorrak = berriOrokorrak + '{ "izena":"' + Iturriak[i].izen + '", "helbidea":"'+ Iturriak[i].helb + '"}';
            		berriOrokorrak = berriOrokorrak + ',';
                    // Berria sortu
                    //var berriBerria = new Berria(link, desk, izenb, link, izenb, link);
                    // Berria arrayiean sartu
                   // var zenbat = Berriak.length;
      //              Berriak.push(berriBerria);
                    //Berriak[zenb] = berriBerria;
    //webworkerra deitu eta bere eskaera jaso , ondoren BErriak kargatu!
                });
           
            },error: function(jqXHR, textStatus, ex) {
                // erroreak jasotzeko, kasu honetan CORS arazoa... :(
                        console.log(textStatus + "," + ex + "," + jqXHR.responseText);
                },finish: function(){
                 console.log('bukatu du');
                    // hemen erantzuna2 eraiki ;)
             }
   
        });
    
}

function eraikierantzuna(gehitzekoa){


var orainBerriak = orainBerriak + '{"Berriak" : [';
    for (var i=0;i<Iturriak.length;i++){
        if ( Iturriak[i].akti == 1 ){
            orainIturriak = orainIturriak + '{ "izena":"' + Iturriak[i].izen + '", "helbidea":"'+ Iturriak[i].helb + '"}';
        if ( i != Iturriak.length - 1 ){
            orainIturriak = orainIturriak + ',';
        }
           
        }
    }
    
    orainIturriak = orainIturriak + ']}';
    

}


// isLehena funtzioa, ia zki bat lehena den ikusten du eta horren arabera postMessage ezberdina bidaltzen du.

function isLehena(n) {
	//console.log("funtzio barruan");
	//postMessage("kaixo");	
	var i = 2;

	// erabiltzaileak sartutako balioak aztertzeko
	
	if (n == 2){ 
		postMessage(i + " zenbakia lehena da !!");
		postMessage("bukatuda");
		//return true;
	}
	for (; i < n; ++i) {
		if (n % i == 0) {
					postMessage( n + " zenbakia ez da lehena !!");
					postMessage("bukatuda");
			      //return false;
			      
			      
		}
		// console.log("Kalkulatzen:" + i);
	}


   postMessage(i + " zenbakia lehena da !!");
	postMessage("bukatuda");	
	//return true;
		
	
}



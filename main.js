var m = require('mraa'); //require mraa

var analogPin0 = new m.Aio(1); //setup access analog inpuput pin 0

var analogValueFloat = analogPin0.readFloat(); //read the pin value as a float

var groveSensor = require('jsupm_grove'); 

var temp = new groveSensor.GroveTemp(0);
var luz= new groveSensor.GroveLight(2);

var ipAddress = '192.168.1.67'; 


  function luz(){
      
      alert(luz.value());
      
    }
        



function startServer()
{
	console.log("Inicializando servidor web...");

	var http = require('http');
	http.createServer(function (req, res) {
		  if(req.url == "/sensor") {
            var analogValue = analogPin0.read(); //read the value of the analog pin
			res.write(""+temp.value()+"ºC   ------  "+luz.value()+" Valor de luz "+analogValue+" Valor Humedad");
            
			res.end();
		  }else{
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<!DOCTYPE html><html><body>");
			res.write("<script>\n");
			res.write("setInterval(function()	{\n");
			res.write("	var xmlhttp=new XMLHttpRequest();		\n");	
			res.write("	xmlhttp.onreadystatechange=function()	{\n");
			res.write("		if (xmlhttp.readyState==4 && xmlhttp.status==200)	{\n");
			res.write("			document.getElementById(\"termometro\").innerHTML= \"Temperatura: \"+xmlhttp.responseText + \"\";\n");
			res.write("		}\n");
			res.write("	}\n");
			res.write("	xmlhttp.open(\"GET\",\"/sensor\",true);\n");
			res.write("	xmlhttp.send();\n");
			res.write("}, 100);	\n");
			res.write("</script>	\n");	
			res.write("<h1>Datos Web</h1>");
			res.write("</p><p></p>");
			res.write("<p><div id='termometro'></div>");
            res.write('<FORM NAME="Formulario1"><INPUT TYPE="Button" NAME="Boton1" VALUE="Prueba" onClick="luz()"></FORM>');  
			res.write("</body></html>");
			res.end();

		}
		console.log("Request: " + req.url);  		
	}).listen(1337, ipAddress);
}

startServer();

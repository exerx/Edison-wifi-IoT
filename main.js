
var m = require('mraa'); //require mraa
var analogPin1 = new m.Aio(1); 
var analogValue = analogPin1.read(); 



var groveSensor = require('jsupm_grove'); 

var temp = new groveSensor.GroveTemp(0);


//Datos necesarios para e IoT
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

// UDP Opciones
var options = {
    host : '127.0.0.1',
    port : 41234
};

var countmsg =0;
//Observaion IoT
function sendObservation(name, value, on)
{
    var msg = JSON.stringify
    ({
        n: name,
        v: value,
        on: on
    });
    
    var sentMsg = new Buffer(msg);
    countmsg = countmsg + 1;
    client.send(sentMsg, 0, sentMsg.length, options.port, options.host);
}

medirTemperatura();
medirHumedad();

function medirTemperatura()
{
    var Temperatura = temp.value();
    sendObservation("temp", Temperatura, new Date().getTime());
    console.log(Temperatura);
    setTimeout(medirTemperatura, 10000);
}
    
function medirHumedad()
{
    var Humedad=analogValue;
    sendObservation("hume", Humedad, new Date().getTime());
    console.log("Humedad: "+Humedad);
    setTimeout(medirHumedad, 10000);
}

/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

//var mraa = require('mraa'); //require mraa
//var LM35 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var m = require('mraa'); //require mraa
var analogPin1 = new m.Aio(1); //setup access analog inpuput pin 0
//var analogValueFloat = analogPin1.readFloat(); //read the pin value as a float
var analogValue = analogPin1.read(); 



var groveSensor = require('jsupm_grove'); 

var temp = new groveSensor.GroveTemp(0);


//Content for enable IoT
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

// UDP Options
var options = {
    host : '127.0.0.1',
    port : 41234
};

var countmsg =0;
//Intel Enable Iot Send Observation Info.
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

measureTemperature();
medirHumedad();

function measureTemperature()
{
    var Temperatura = temp.value();
    sendObservation("temp", Temperatura, new Date().getTime());
    console.log(Temperatura);
    setTimeout(measureTemperature, 10000);
}
    
function medirHumedad()
{
    var Humedad=analogValue;
    sendObservation("hume", Humedad, new Date().getTime());
    console.log("Humedad: "+Humedad);
    setTimeout(medirHumedad, 10000);
}

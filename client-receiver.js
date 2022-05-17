const xmpp = require("simple-xmpp");
const prompt = require('prompt-sync')();

let input = prompt("How many seconds to wait? ");
let seconds = Number(input * 1000);

xmpp.on("online", data => {
    sendMessageOnInterval();
})

function sendMessageOnInterval(){
    setTimeout(sendMessageOnInterval, seconds);
    xmpp.send("gsichelero@localhost", "request info")
}

xmpp.on("chat", (from, message)=>{
    let dateHour = new Date().toLocaleString('pt-BR');
    console.log(`New Sensor Info!\n${message}\nFrom: ${from}\n`)
    xmpp.send("gsichelero@localhost", "Sensor Information Received!" + "\n" + "Time: " + dateHour + "\n");
})

xmpp.connect({
    "jid": "admin@localhost",
    "password": "admin",
    "host": "192.168.0.101",
    "port": 5222
})
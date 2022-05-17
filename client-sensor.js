const xmpp = require("simple-xmpp");
const {spawn} = require('child_process');

let acl = { x: 0, y: 0, z: 0 };

xmpp.on("chat", (from, message)=>{
    console.log(`${message}\nFrom: ${from}`)
    if (message == "request info") {
        let proc = spawn("termux-sensor", ["-s", "LIS2DS Accelerometer", "-n", "1", ], {detached: true});
        proc.stdout.on('data', (data) => {
            // data format =  {"LIS2DS Accelerometer": { "values": [0.323, 5.3423, 5.24335] }}
            let dataJson = JSON.parse(data);
            let dataArray = dataJson["LIS2DS Accelerometer"]["values"];
            acl.x = dataArray[0];
            acl.y = dataArray[1];
            acl.z = dataArray[2];
        });
        xmpp.send("admin@localhost",
        `Acceleration:\n${"X: " + acl.x + "\n" + "Y: " + acl.y + "\n" + "Z: " + acl.z}`)
    }
})

xmpp.connect({
    "jid": "gsichelero@localhost",
    "password": "gabriel",
    "host": "192.168.0.101",
    "port": 5222
})
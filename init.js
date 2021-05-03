const {Client} = require("openrgb-sdk")
const fs = require("fs")

let client = new Client("Pomodoro", 6742, "192.168.1.202")

let device = []

async function init(){
    

    await client.connect()

    const amount = await client.getControllerCount()



    for(let i = 0; i < amount; i++)
    {
        device.push(await client.getControllerData(i))
    }

    device = JSON.stringify(device)

    fs.writeFileSync("DATA.json", device,"utf-8")

}


init()

//https://www.npmjs.com/package/openrgb-sdk
const {Client} = require("openrgb-sdk")
const {mqtt} = require("./mqtt.js")

const fs = require("fs")

let device = require("./DATA.json")
let COLOR = {red: 0, green: 0, blue: 0 }

let client = new Client("Pomodoro", 6742, "192.168.1.202")

async function pushTolight(colors) // {red: 245, green: 7  , blue: 193 }
{ 
    for(let i = 0; i < device.length; i++)
    {
        const arrayColors = Array(device[i].colors.length)
        arrayColors.fill(colors)

        await client.updateLeds(i, arrayColors)
    }
}

mqtt.on("message", async (topic, message)=>{
    let payload = message.toString()
    payload = JSON.parse(payload)

    if(topic.startsWith("pomodoro/info"))
    {
        if(payload.colors !== COLOR && device.length > 1)
        {
            COLOR = payload.colors
            await client.connect()
            await pushTolight(COLOR)
        }
    }
})

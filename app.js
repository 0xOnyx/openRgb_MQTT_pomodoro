
//https://www.npmjs.com/package/openrgb-sdk
const {Client} = require("openrgb-sdk")
const {mqtt} = require("./mqtt.js")

const device = []
let COLOR = {red: 0, green: 0, blue: 0 }

async function app(){
    const client = new Client("Pomodoro", 6742, "192.168.1.202")

    await client.connect()

    const amount = await client.getControllerCount()



    for(let i = 0; i < amount; i++)
    {
        device.push(await client.getControllerData(i))
    }

        
    async function pushTolight(colors) // {red: 245, green: 7  , blue: 193 }
    { 


        console.log(colors)

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
            console.log(payload)
            if(payload.colors !== COLOR)
            {
                COLOR = payload.colors
                console.log(payload.colors)
                await pushTolight(COLOR)
            }
        }
    })

}



app()
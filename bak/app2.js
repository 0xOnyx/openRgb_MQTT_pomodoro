



const {OpenRGBClient} = require("openrgb")



const client = new OpenRGBClient({
  host: "127.0.0.1",
  port: 6742,
  name: "nodejs led",
})





function rainbows(device){

  let time = 200

  let nombre = 50 //précision


  nombre = nombre * (Math.PI * 2)  //longueur de la sinosuidale

  let frequence = (Math.PI * 2) / nombre  //nombre de fois pour produire la boucle a un incérmenté


  let colorMax = 255

  let dephasage = 3


  let medium =  colorMax / 2

  for (let i = 0 ; i < nombre ; i += 1)
  {
    setTimeout( ()=>{
      let r = Math.sin(i * frequence + (0 * dephasage) )
      red = (r * medium) + medium //donne la moyenne

      let g = Math.sin(i * frequence + (1 * dephasage) )
      green = (g * medium) + medium //donne la moyenne

      let b = Math.sin(i * frequence + (2 * dephasage) )
      blue = (b * medium) + medium //donne la moyenne

      let colors = {red: Math.round(red), green: Math.round(green), blue: Math.round(blue) }
      sendLed(device, colors)
    },time * i);

  }
  //rainbows(device)
}



async function sendLed(device, colors){

    for (let i = 0 ; i < device.length ; i++){


      let color = new Array(device[i].colors.length)

      color.fill(colors)
      try{
        await client.updateLeds(i, color)
        //console.log("device name => " + device[i].name)
        console.log(colors)

      }
      catch(err){
        console.log(err)
      }
    }

}





async function ledWave(){
  await client.connect()

  const deviceCount = await client.getControllerCount()

  let device = new Array(deviceCount)

  for (let i = 0 ; i < deviceCount ; i++){
    device[i] = await client.getDeviceController(i)
  }

  console.log(device[0])

  rainbows(device)
  setInterval(  ()=>{
  }, 1000);

  //await client.disconnect()

}



ledWave()

let canvas = document.querySelector('#pe')
let ctx = canvas.getContext('2d') //tworzy obiekt 2D

let content //zmienna informacji o obrazie

let image = new Image()
image.src = './test.jpg'

image.addEventListener('load', (e)=> {
    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height) //renderowanie powierzchni roboczej
    content = ctx.getImageData(0, 0, canvas.width, canvas.height)
})

let ostatniFilter = ''
//pobieranie wartości z pól input, dane pobrane za pomocą selektorów ID , pobór elementów gdy nasłuchiwanie wykaże zmiane
document.querySelector('#brightness').addEventListener('input', (e)=>{stanFiltrow('brightness'); jasnosc(e.target.value);})  
document.querySelector('#contrast').addEventListener('input', (e)=>{stanFiltrow('contrast'); kontrast(e.target.value);})
document.querySelector('#saturation').addEventListener('input', (e)=>{sprawdzFilter('saturation'); nasycenie(e.target.value);})

function kontrast(contrast) { 
    contrast *= -2.55;
    let factor = (255 - contrast) / (255 + contrast);

    let newContent = new ImageData(canvas.width, canvas.height) 
    for (let i = 0; i<newContent.data.length; i+=4)
    {
        newContent.data[i] = content.data[i] * factor + contrast
        newContent.data[i+1] = content.data[i+1] * factor + contrast
        newContent.data[i+2]= content.data[i+2] * factor + contrast
        newContent.data[i+3]= content.data[i+3]
    }

    ctx.putImageData(newContent, 0, 0)
}

function jasnosc(brightness) { 
    
    brightness = (brightness/255)*500

    let newContent = new ImageData(canvas.width, canvas.height)
    for (let i = 0; i<newContent.data.length; i+=4)
    {
        newContent.data[i] = content.data[i] + brightness
        newContent.data[i+1] = content.data[i+1] + brightness
        newContent.data[i+2]= content.data[i+2] + brightness
        newContent.data[i+3]= content.data[i+3]
    }

    ctx.putImageData(newContent, 0, 0)
}

function nasycenie(saturation) { 

    saturation = (saturation/255)*200

    let newContent = new ImageData(canvas.width, canvas.height)
    for (let i = 0; i<newContent.data.length; i+=4)
    {
        if ( content.data[i] > content.data[i+1] && content.data[i] > content.data[i+2] ) {
            newContent.data[i] = content.data[i] + saturation
            newContent.data[i+1] = content.data[i+1]
            newContent.data[i+2]= content.data[i+2]
        } else if ( content.data[i+1] > content.data[i] && content.data[i+1] > content.data[i+2] ) {
            newContent.data[i] = content.data[i]
            newContent.data[i+1] = content.data[i+1] + saturation
            newContent.data[i+2]= content.data[i+2]
        } else if ( content.data[i+2] > content.data[i+1] && content.data[i+2] > content.data[i] ) {
            newContent.data[i] = content.data[i]
            newContent.data[i+1] = content.data[i+1]
            newContent.data[i+2]= content.data[i+2] + saturation
        } else {
            newContent.data[i] = content.data[i] + saturation
            newContent.data[i+1] = content.data[i+1] + saturation
            newContent.data[i+2]= content.data[i+2] + saturation
        }

        
        newContent.data[i+3]= content.data[i+3]
    }

    ctx.putImageData(newContent, 0, 0)
}

function stanFiltrow(filter)
{
    if(ostatniFilter != filter)
    {
        content = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ostatniFilter = filter
    }
}
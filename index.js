const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(){
        
        this.velocity = {
            x: 0,
            y: 0
        }
        
        const image = new Image()
        image.src = './media/Daco_49747.png'
        image.onload = () => {
            this.image = image
            const scale = 0.07
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 10
            }
        }

    }

    draw(){
       
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
        
    }
}

const player = new Player()
const keys = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
}

function animation(){
    requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    //TODO make better
    
    if (keys.ArrowRight.pressed){
        player.velocity.x = 5
    }else if(keys.ArrowLeft.pressed){
        player.velocity.x = -5
    }else{
        player.velocity.x = 0
    }

    if (keys.ArrowUp.pressed){
        player.velocity.y = -5
    }else if(keys.ArrowDown.pressed){
        player.velocity.y = 5
    }else{
        player.velocity.y = 0
    }

}

animation()

addEventListener('keydown', ({key}) => {
    switch (key){
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':
            console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowUp':
            console.log('up')
            keys.ArrowUp.pressed = true
            break 
        case 'ArrowDown':
            console.log('down')
            keys.ArrowDown.pressed = true
            break   
        case ' ':
            console.log('space')
            break
}
})

addEventListener('keyup', ({key}) => {
    switch (key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break 
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break   
        case ' ':
            console.log('space')
            break
}
})

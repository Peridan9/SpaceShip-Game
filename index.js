const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const back1 = new Image();
back1.src = './media/back4.jpeg'
back1.onload = function() {
    c.drawImage(back1, 0, 0, canvas.width, canvas.height)
}

let gridvol = 2

class Player{
    constructor(){
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        
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

        //player ship rotation for better movement animtion
        c.save()
        c.translate(player.position.x + player.width/2, player.position.y + player.height/2)
        c.rotate(this.rotation)
        c.translate(-player.position.x - player.width/2, -player.position.y - player.height/2)

        //player animation
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        c.restore()
    }

    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
        
    }

    restart(){
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 10
        }
    }
}


class Grid{
    constructor(){
        this.position = {
            x:0,
            y:0
        }
        this.velocity = gridvol
        this.invaders = []
        this.width = 5*58.8
        //colums
        for (let x = 0; x < 5; x++){
            //rows
            for (let y = 0; y < 4; y++){
            this.invaders.push(new Invader({position: {
                x: x* 58.8,
                y: y* 51
            },
            score: y*5 + 5
        }))
        }
    }
}

    update(){
        this.position.x += this.velocity
        if(this.position.x + this.width >= canvas.width || this.position.x  <= 0){
            this.velocity = -this.velocity
        }

    }
}
class Invader{
    constructor({position,score}){
        
        // no need for y
        this.velocity = {
            x: 0
        }

        const image = new Image()
        image.src = './media/enemyship.png'
        image.onload = () => {
            this.image = image
            const scale = 0.15
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
            this.score = score
        }
    }

    draw(){
        //invader animation
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update({velocity}){
        if(this.image){
            this.draw()
            this.position.x += velocity
            
        }
        
    }

    shoot(invaderProjectiles){
        // console.log(invaderProjectiles)
        // console.log(this.position)
        // console.log(this.velocity)
        invaderProjectiles.push(new InvaderProjectile({
            position:{
                x: this.position.x + this.width/2,
                y: this.position.y + this.height
            },
            velocity:invprojvol
        }))

    }
}

class Projectile {
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.color = color
        this.width = 3
        this.height = 10
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity
    }
}

class Explosion{
    constructor({position,velocity,radius,color}){
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
    }

    draw(){
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update(){
        this.draw
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}

class InvaderProjectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity
    }
}


const player = new Player()
const playerProjectiles = []
const invaderProjectiles = []
const explosions = []
const grid = new Grid()
let invprojvol = 5
let gamepaused = false
let gamelost = false
let lives = 3
let counter = 0
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

function create_explosions({object, color}){
    for(let i = 0; i<15; i++){
        explosions.push(new Explosion({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: '#DC143C'
        }))
    }
}

function invaderimprovment(){
    if(grid.velocity > 0){
        grid.velocity += gridvol
    }else{
        grid.velocity -= gridvol
    }
    invprojvol += 3
    counter++
    if(counter <= 4){
        setTimeout(invaderimprovment, 5000)
    }
}

function animation(){
    if(gamelost) return
    if(!gamepaused){

        requestAnimationFrame(animation)
        c.drawImage(back1, 0, 0, canvas.width, canvas.height)
        // c.fillStyle = 'black'
        // c.fillRect(0, 0, canvas.width, canvas.height)
        player.update()
        explosions.forEach((Explosion,i) => {
            if(Explosion.opacity <= 0){
                setTimeout(() => {
                    explosions.splice(i,1)
                },0)
            }else{
                Explosion.update()
            }
            
        })

        invaderProjectiles.forEach((InvaderProjectile,k) => {
            if(InvaderProjectile.position.y >= canvas.height){
                setTimeout(() => {
                    invaderProjectiles.splice(k,1)
                }, 0)
            }else{
                InvaderProjectile.update() 
            }

            if(InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y &&
                InvaderProjectile.position.y <= player.position.y + player.height &&
                InvaderProjectile.position.x >= player.position.x &&
                InvaderProjectile.position.x <= player.position.x + player.width){
                    console.log('You Lose')
                    create_explosions({
                        object: player,
                        color: 'white'
                    })
                    if(lives <= 0){
                        gamelost = true
                    }else{
                        lives -= 1
                        player.restart()
                        // player.position.x = canvas.width/2 + player.width/2
                        // player.position.y = canvas.height - this.height
                        console.log(player.position)
                    }
                    invaderProjectiles.splice(k,1)
                }
            
        })

        playerProjectiles.forEach((PlayerProjectile, index) => {

            if(PlayerProjectile.position.y + PlayerProjectile.height <= 0){
                setTimeout(() => {
                    playerProjectiles.splice(index, 1)
                }, 0)
            } else {
                PlayerProjectile.update()
            }
            
        })

        grid.update()
        // console.log(elapsedTime/1000)


        grid.invaders.forEach((Invader,i) => {
            Invader.update({velocity: grid.velocity})
            
            playerProjectiles.forEach((PlayerProjectile,j) => {
                //collision detection
                if (PlayerProjectile.position.y  <= Invader.position.y + Invader.height &&
                    PlayerProjectile.position.x >= Invader.position.x &&
                    PlayerProjectile.position.x <= Invader.position.x + Invader.width &&
                    PlayerProjectile.position.y + PlayerProjectile.height >= Invader.position.y){
                    explosions.push(new Explosion({
                        position: {
                            x: Invader.position.x,
                            y: Invader.position.y
                        },
                        velocity: {
                            x: 2,
                            y: 2
                        },
                        radius: 10,
                        color: 'yellow'
                    }))
                    setTimeout(() => {
                        const invaderfound = grid.invaders.find(
                            (Invader2) => Invader2 === Invader
                        )
                        const projectilefound = playerProjectiles.find(
                            (PlayerProjectile2) => PlayerProjectile2 === PlayerProjectile
                        )
                        // remove invader and projectile
                        if(invaderfound && projectilefound){
                            // create_explosions({
                            //     object: Invader,
                            //     color: 'white'
                            // })
                            grid.invaders.splice(i,1)
                            playerProjectiles.splice(j, 1)
                            
                            if(grid.invaders.length > 0){
                                const firstinvader = grid.invaders[0]
                                const lastinvader = grid.invaders[grid.invaders.length - 1]
                                grid.width = lastinvader.position.x - firstinvader.position.x + lastinvader.width
                                grid.position.x = firstinvader.position.x
                            }
                        }
                    
                    }, 0);
                }
            })

            
        })

        if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width ){
            player.velocity.x = 5
            player.rotation = 0.15
        }else if(keys.ArrowLeft.pressed && player.position.x >= 0){
            player.velocity.x = -5
            player.rotation = -0.15
        }else{
            player.velocity.x = 0
            player.rotation = 0
        }

        if (keys.ArrowUp.pressed && player.position.y >= canvas.height*0.6){
            player.velocity.y = -5
        }else if(keys.ArrowDown.pressed && player.position.y + player.height <= canvas.height){
            player.velocity.y = 5
        }else{
            player.velocity.y = 0
        }

        //invader shooting
        if( elapsedTime/1000 > 1 && grid.invaders.length > 0 ){
            if(invaderProjectiles.length === 0){
                grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderProjectiles)
            }else if(invaderProjectiles.length < 2 && invaderProjectiles[0].position.y - invaderProjectiles[0].height >= canvas.height*0.75){
                grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderProjectiles)
            }
            
        }
    }
}

let startTime = Date.now();
let elapsedTime = 0;
let timer = setInterval(() => {
  elapsedTime = Date.now() - startTime;
}, 10);


setTimeout(invaderimprovment, 5000)
animation()

addEventListener('keydown', ({key}) => {
    switch (key){
        case 'ArrowRight':
            // console.log('right')
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':
            // console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowUp':
            // console.log('up')
            keys.ArrowUp.pressed = true
            break 
        case 'ArrowDown':
            // console.log('down')
            keys.ArrowDown.pressed = true
            break   
        case ' ':
            // console.log('space')
            // console.log(playerProjectiles)
            playerProjectiles.push(new Projectile({
                position: {
                    x:player.position.x + player.width/2,
                    y:player.position.y
                },
                velocity: -15,
                color: '#00FFFF'
                
            }))
            break
        case 'Escape':
            if(gamepaused){
                gamepaused = false
                requestAnimationFrame(animation)

            }else{
                gamepaused = true
            }
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
            break
        
}
})

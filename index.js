
var canvas
// console.log(canvas)
var c
// console.log(c)
var back1
var scoreEL
var tableBody
let shootkey = ' '
var gameinfo

document.addEventListener('DOMContentLoaded', () =>{
    tableBody = document.getElementById('tablebody')
    canvas = document.getElementById('gameCanvas')
    scoreEL = document.getElementById('scoreEL')
    gameinfo = document.getElementById("gameinfo")
    c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight
    back1 = new Image();
    back1.src = './media/back4.jpeg'
    back1.onload = function() {
    c.drawImage(back1, 0, 0, canvas.width, canvas.height)
    }
})
document.addEventListener("scroll", event => {
    event.preventDefault() // Prevent the default behavior of scrolling
  }, { passive: false })

  function choose_key() {
    const keySetButton = document.getElementById('key_set')
    // keySetButton.textContent = "Press any letter key to set your desired key";
    shootkey = "";
    // console.log('this is the shootkey', shootkey);
  
    const updateButton = () => {
      if (shootkey === " ") {
        keySetButton.textContent = "Desired key: Space";
      } else if (shootkey.match(/^[a-z]$/i)) {
        keySetButton.textContent = "Desired key: " + shootkey;
      } else {
        keySetButton.textContent = "Illegal Key! Choose again";
      }
    }
  
    // Add an event listener to the document to listen for a keydown event
    const keydownListener = (event) => {
      // Check if the pressed key is a single character and if the chosenKey variable is empty
      console.log('in keydownlistener')
      console.log(event.key)
      if (event.key.match(/^[a-z]$/i) && shootkey === "") {
        isConfigured = true
        shootkey = event.key; // Set the chosen key to the pressed key
        console.log("Chosen key1: " + shootkey)
        updateButton();
      } else if (event.code === "Space" && shootkey === "") {
        isConfigured = true
        shootkey = " "; // Set the chosen key to the space key
        console.log("Chosen key2: Space")
        updateButton();
      } else {
        isConfigured = false
        keySetButton.textContent = "Illegal Key! Choose again";
      }
    };
  
    const keyupListener = () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    //   keySetButton.textContent = "Set Your Desired Key";
    };
  
    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);
  
    console.log('final chosen key', shootkey)
  }
  

let gridvol = 2
//limit the window size?
window.addEventListener('resize', function() {
    if(this.window.innerWidth < 768 || this.window.innerHeight < 1366){
        // console.log('this is the width: ', this.innerWidth)
        // console.log('this is the height: ', this.innerHeight)
        // console.log('need to change...')
        this.window.resizeTo(768,1366)
    }
})

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
            // console.log(innerWidth)
            // console.log(canvas.width)
            let scale = innerHeight/11000
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
            if(this.width != this.image.width * innerHeight/11000){
                // console.log('this is the width: ',this.width)
                // console.log('this is the new width: ',this.image.width*innerWidth/6100)
                var scalefactor = (this.image.width * innerHeight/11000)/this.width
                this.position.x *= scalefactor
                this.position.y *= scalefactor
            }
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            this.width = this.image.width * innerHeight/11000
            this.height = this.image.height * innerHeight/11000
        }
        
    }

    restart(){
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.image.height*innerHeight/11000 - 10
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
        this.width = 5*(innerWidth/15.5)
        //colums
        for (let x = 0; x < 5; x++){
            //rows
            for (let y = 0; y < 4; y++){
            this.invaders.push(new Invader({position: {
                x: x* innerHeight/15,
                y: y* innerHeight/17
            },
            score: 20 - y*5
        }))
            // console.log(this.invaders[0])
        }
    }
}

    update(){
        // console.log('footer width?: ', document.getElementsByTagName('footer')[0].height)
        this.position.x += this.velocity
        if(this.position.x + this.width >= canvas.width || this.position.x  <= 0){
            this.velocity = -this.velocity
        }
        if(grid.invaders.length > 0){
            var firstinvader = this.invaders[0]
            var lastinvader = this.invaders[this.invaders.length - 1]
            this.width = lastinvader.position.x - firstinvader.position.x + lastinvader.width
            this.position.x = firstinvader.position.x
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
        if(score == 20){
            image.src = './media/ship20.png'
        }
        else if(score == 15){
            image.src = './media/ship15.png'
        }
        else if(score == 10){
            image.src = './media/ship10.png'
        }
        else{
            image.src = './media/ship5.png'
        }
        // image.src = './media/enemyship.png'
        image.onload = () => {
            this.image = image
            let scale = innerHeight/5500
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
            if(this.width != this.image.width * innerHeight/5500){
                // console.log('this is the width: ',this.width)
                // console.log('this is the new width: ',this.image.width*innerWidth/6100)
                var scalefactor = (this.image.width * innerHeight/5500)/this.width
                this.position.x *= scalefactor
                this.position.y *= scalefactor
            }
            // console.log('this is the current width ' ,this.width)
            // console.log('this is the dynamic width ' ,this.image.width*innerWidth/6100)
            this.position.x += velocity
            this.width = this.image.width * innerHeight/5500
            this.height = this.image.height * innerHeight/5500
            
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
        invadershoot.play()
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
const gameaudio = new Audio('./media/gamemusic.mp3')
const playershoot = new Audio('./media/playersound.mp3')
const invadershoot = new Audio('./media/invadersound.mp3')
const explosionsound = new Audio('./media/invaderboom.wav')
let player = null
const playerProjectiles = []
const invaderProjectiles = []
const explosions = []
let grid
let invprojvol = 5
let gamepaused = false
let gamelost = false
let lives = 2
let score = 0
let counter = 0
let canshoot = true
let shootInterval
let lastTime = 0
let game_won = false
let timeLeft = 120
let countdownInterval
let isConfigured = false
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

function clearTable() {
  tableBody.innerHTML = ''
}

function checkifconfigured(){
    if(!isConfigured){
        alert('Please choose a shooting key first')
    }else{
        game_start()
    }
}
// Function to add a new row to the table and sort by score
function addScore(player, score, timeLeft) {
  // Create a new row for the score
  var row = document.createElement('tr')

  // Create a cell for the player name and add it to the row
  var playerCell = document.createElement('td')
  playerCell.textContent = player
  row.appendChild(playerCell);

  // Create a cell for the score and add it to the row
  var scoreCell = document.createElement('td')
  scoreCell.textContent = score
  row.appendChild(scoreCell)

  // Create a cell for the time left and add it to the row
  var timeLeftCell = document.createElement('td')
  timeLeftCell.textContent = timeLeft
  row.appendChild(timeLeftCell)

  // Add the row to the table
  tableBody.appendChild(row)

  // Sort the table by score
  var rows = Array.from(tableBody.rows)
  rows.sort(function(a, b) {
    return b.cells[1].textContent - a.cells[1].textContent
  });
  rows.forEach(function(row) {
    tableBody.appendChild(row)
  });
}


function game_start(){
    console.log(canvas.width)
    switchScreen("game")
    console.log(canvas.style.display)
    // console.log(canvas.style)
    setTimeout(invaderimprovment, 5000)
    if(!player){
        player = new Player
    }else{
        player.restart()
    }
    // player.restart()
    score = 0
    scoreEL.innerHTML = score
    invprojvol = 5
    gamepaused = false
    gamelost = false
    lives = 3
    canshoot = true
    counter = 0
    canshoot = true
    game_won = false
    const LivesElement = document.getElementById('Lives')
    LivesElement.innerHTML = lives
    playerProjectiles.splice(0,playerProjectiles.length)
    invaderProjectiles.splice(0,invaderProjectiles.length)
    let audiolvl = document.getElementById('vol_volume-value').value
    audiolvl = parseInt(audiolvl)/100
    playershoot.volume = audiolvl
    invadershoot.volume = audiolvl
    explosionsound.volume = audiolvl
    gameaudio.volume = audiolvl
    gameaudio.play()
    grid = new Grid()
    gameinfo.style.display = 'block'
    timeLeft = parseTime(document.getElementById('countdown-value').value) // set the initial time left
    const countdownElement = document.getElementById('countdown')
    console.log(countdownElement)
    countdownElement.innerHTML = formatTime(timeLeft) // display the initial time left
    
    countdownInterval = setInterval(() => {
    timeLeft--; // decrement the time left
    console.log('time left: ',timeLeft)
    countdownElement.innerHTML = formatTime(timeLeft)// update the countdown element

    if (timeLeft === 0) {
      lose_game()
    }
    }, 1000); // run the countdown every second



    
    animation()
}

function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

function parseTime(timeString) {
    var timeArray = timeString.split(':');
    var minutes = parseInt(timeArray[0]);
    var seconds = parseInt(timeArray[1]);
    return (minutes * 60) + seconds;
}

function switchtoconf(){
    console.log('switchconfi')
    console.log(countdownInterval)
    if(countdownInterval){
        clearInterval(countdownInterval)
    }
    gameaudio.pause()
    gameaudio.currentTime = 0
    switchScreen('confi')
}
  
function lose_game(){
    const losetitle = document.getElementById('lose-title')

    gameinfo.style.display = 'none'
    clearInterval(countdownInterval)
    canvas.style.display = 'none'
    // var loseGame = document.getElementById("loseGame")
    console.log(loggedUser)
    if(game_won){
        losetitle.innerHTML = 'Champion!'
        addScore(loggedUser,score,formatTime(timeLeft))
    }
    else if(score >= 100){
        losetitle.innerHTML = 'Winner!'
        addScore(loggedUser,score,formatTime(timeLeft))
    }
    else{
        losetitle.innerHTML = 'you can do better'
        addScore(loggedUser,score,formatTime(timeLeft))
    }
    gameaudio.pause()
    gameaudio.currentTime = 0
    switchScreen("loseGame")
}

function shoot(){
    if(canshoot){
        playershoot.play()
        playerProjectiles.push(new Projectile({
            position: {
                x:player.position.x + player.width/2,
                y:player.position.y
            },
            velocity: -15,
            color: '#00FFFF'
        })) 
      }
    //   playershoot.pause()
      playershoot.currentTime = 0
      canshoot = false;
}

// function create_explosions({object, color}){
//     for(let i = 0; i<15; i++){
//         explosions.push(new Explosion({
//             position: {
//                 x: object.position.x + object.width / 2,
//                 y: object.position.y + object.height / 2
//             },
//             velocity: {
//                 x: (Math.random() - 0.5) * 2,
//                 y: (Math.random() - 0.5) * 2
//             },
//             radius: Math.random() * 3,
//             color: '#DC143C'
//         }))
//     }
// }

function invaderimprovment(){
    if(grid.velocity > 0){
        grid.velocity += gridvol
    }else{
        grid.velocity -= gridvol
    }
    invprojvol += 3
    counter++
    if(counter < 4){
        setTimeout(invaderimprovment, 5000)
    }
}


function animation(){
    // console.log('window width: ', innerWidth)
    var isGamePage = document.getElementById("gamePage")
    // canvas.width = innerWidth
    // canvas.height = innerHeight
    // c.drawImage(back1, 0, 0, canvas.width, canvas.height)
    if(gamelost || isGamePage.style.display == 'none'){
        return
    } 
    if(!gamepaused){
        // console.log('Game runing')
        canvas.width = innerWidth
        canvas.height = innerHeight - 200
        c.drawImage(back1, 0, 0, canvas.width, canvas.height)
        // canvas.width = innerWidth
        // canvas.height = innerHeight
        requestAnimationFrame(animation)
        // c.drawImage(back1, 0, 0, canvas.width, canvas.height)
        // c.fillStyle = 'black'
        // c.fillRect(0, 0, canvas.width, canvas.height)
        player.update()
        // explosions.forEach((Explosion,i) => {
        //     if(Explosion.opacity <= 0){
        //         setTimeout(() => {
        //             explosions.splice(i,1)
        //         },0)
        //     }else{
        //         Explosion.update()
        //     }
            
        // })
        if(grid.invaders.length === 0){
            game_won = true
            lose_game()
            gamelost = true
        }
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
                    if(lives <= 1){
                        lose_game();
                        gamelost = true
                    }else{
                        const LivesElement = document.getElementById('Lives')
                        lives -= 1
                        LivesElement.innerHTML = lives
                        player.restart()
                        // player.position.x = canvas.width/2 + player.width/2
                        // player.position.y = canvas.height - this.height
                        // console.log(player.position)
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
                    // explosions.push(new Explosion({
                    //     position: {
                    //         x: Invader.position.x,
                    //         y: Invader.position.y
                    //     },
                    //     velocity: {
                    //         x: 2,
                    //         y: 2
                    //     },
                    //     radius: 10,
                    //     color: 'yellow'
                    // }))
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
                            explosionsound.play()
                            score += invaderfound.score
                            scoreEL.innerHTML = score
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
        case shootkey:
            if(canshoot){
                shootInterval = setInterval(shoot(), 500)
                canshoot = false
            }

            break
        case 'Escape':
            if(gamepaused){
                gamepaused = false
                countdownInterval = setInterval(() => {
                timeLeft--; // decrement the time left
                // countdownElement.innerHTML = timeLeft; // update the countdown element
            
                if (timeLeft === 0) {
                    lose_game()
                }
                }, 1000); // run the countdown every second
                gameaudio.play()
                animation()
            }else{
                gamepaused = true
                clearInterval(countdownInterval)
                gameaudio.pause()
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
        case shootkey:
            clearInterval(shootInterval)
            canshoot =true
            break
        
}
})

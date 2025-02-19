const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({position, velocity, size}) {
        this.position = position // {x, y}
        this.velocity = velocity // {vx, vy}
        this.rotation = 0
    }

    draw() {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x, -this.position.y)
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
        ctx.fillStyle = 'red'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(this.position.x + 30, this.position.y)
        ctx.lineTo(this.position.x - 10, this.position.y - 10)
        ctx.lineTo(this.position.x - 10, this.position.y + 10)
        ctx.closePath()

        ctx.strokeStyle = 'green'
        ctx.stroke()

        ctx.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.vx
        this.position.y += this.velocity.vy
    }
}

const player = new Player({
    position: {x: canvas.width/2 - 50, y: canvas.height/2 - 50},
    velocity: {vx:0, vy:0}
})

player.draw()

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const SPEED = 3
const ROTATIONAL_SPEED = 0.05
const FRICTION = .97

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    player.update()

    if (keys.w.pressed) {
        player.velocity.vx = Math.cos(player.rotation) * SPEED
        player.velocity.vy = Math.sin(player.rotation) * SPEED
    } else if(!keys.w.pressed) {
        player.velocity.vx *= FRICTION
        player.velocity.vy *= FRICTION
    }

    if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
    else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'KeyW':
            keys.w.pressed = true
            break
        case 'KeyA':
            keys.a.pressed = true
            break
        case 'KeyD':
            keys.d.pressed = true
            break    
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'KeyW':
            keys.w.pressed = false
            break
        case 'KeyA':
            keys.a.pressed = false
            break
        case 'KeyD':
            keys.d.pressed = false
            break    
    }
})
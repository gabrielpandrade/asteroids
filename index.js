const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width,canvas.height)

class Player {
    constructor({position, velocity, size}) {
        this.position = position // {x, y}
        this.velocity = velocity // {vx, vy}
    }

    draw() {
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
        ctx.fillStyle = 'red'
        ctx.fill()

        ctx.moveTo(this.position.x + 30, this.position.y)
        ctx.lineTo(this.position.x - 10, this.position.y - 10)
        ctx.lineTo(this.position.x - 10, this.position.y + 10)
        ctx.closePath()

        ctx.strokeStyle = 'green'
        ctx.stroke()
    }
}

const player = new Player({
    position: {x: canvas.width/2 - 50, y: canvas.height/2 - 50},
    velocity: {vx:0, vy:0}
})

player.draw()
var starField = {
    draw(){
      for(let i = 0; i < this.stars.length; i++){
        let star = this.stars[i]
        this.drawStar(star.x, star.y, star.color, star.size)
      }
      
    },
    stars: [],
    drawStar(x, y, color, size) {

      let starGradient = canvas.ctx.createRadialGradient(x, y, 0, x, y, size)
      starGradient.addColorStop(0, 'white')
      starGradient.addColorStop(this.gradient.min, 'white')
      starGradient.addColorStop(this.gradient.max, color)
      starGradient.addColorStop(1, 'transparent')
      canvas.circle(x, y, size, starGradient)
    },
    gradient: {
      min: 0.6,
      max: 0.7
    },
    pulse: true,
    update(){
      if(this.pulse) {
        this.gradient.max += 0.001
      } else {
        this.gradient.max -= 0.001
      }
      if(this.gradient.max > 0.8) this.pulse = false
      if(this.gradient.max < 0.7) this.pulse = true
    },
    createStar(){
      return {
        x: random.between(0, canvas.ctx.width),
        y: random.between(0, canvas.ctx.height),
        color: random.pick(['red', 'green', 'orange', 'purple', 'blue', 'cyan', 'yellow', 'magenta', 'violet', 'white']),
        size: random.between(10, 100)
      }
    },
    init(){
      for(let i = 0; i < random.between(1,10); i++) {
        this.stars.push(this.createStar())
      }
    }
}
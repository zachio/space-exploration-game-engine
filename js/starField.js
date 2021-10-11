var starField = {
    draw(){
      starField.drawStar(canvas.ctx.width / 2, canvas.ctx.height / 2, this.star.color)
    },
    star: {
      color: random.pick(['red','green','orange','purple','blue', 'cyan', 'yellow', 'magenta', 'violet', 'white']),
      size: random.between(10, 100)
    },
    drawStar(x, y, color) {

      let starGradient = canvas.ctx.createRadialGradient(x, y, 0, x, y, this.star.size)
      starGradient.addColorStop(0, 'white')
      starGradient.addColorStop(this.gradient.min, 'white')
      starGradient.addColorStop(this.gradient.max, color)
      starGradient.addColorStop(1, 'transparent')
      canvas.circle(x, y, this.star.size, starGradient)
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
    }
}
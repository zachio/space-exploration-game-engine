var starField = {
    draw(){
      for(let i = 0; i < this.stars.length; i++){
        let star = this.stars[i]
        this.drawStar(star.x, star.y, star.color, star.size, star.transparent)
      }
      
    },
    stars: [],
    drawStar(x, y, color, size, transparent) {

      let starGradient = canvas.ctx.createRadialGradient(x, y, 0, x, y, size)
      starGradient.addColorStop(0, 'white')
      starGradient.addColorStop(this.gradient.min, 'white')
      starGradient.addColorStop(this.gradient.max, color)
      starGradient.addColorStop(1, transparent)
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
      let r = random.between(0,255)
      let g = random.between(0, 255)
      let b = random.between(0, 255)
      let color = `rgba(${r},${g},${b}, 1)`
      let transparent = `rgba(${r},${g},${b}, 0)`
      let size = random.between(10, 100)
      let x = random.between(size/2, canvas.ctx.width - size/2)
      let y = random.between(size/2, canvas.ctx.height - size/2)
      return {
        x: x,
        y: y,
        color: color,
        transparent: transparent,
        size: size
      }
    },
    init(){
      for(let i = 0; i < random.between(1,10); i++) {
        this.stars.push(this.createStar())
      }
    }
}
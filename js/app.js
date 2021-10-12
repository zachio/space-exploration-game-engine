var app = new Vue({
  el: '#app',
  data: {
    stars: [],
    canvas: null,
    ctx: null,
    gradient: {
      min: 0.6,
      max: 0.7
    },
    pulse: true
  },
  mounted(){
    this.canvas = document.getElementById('stage')
    this.ctx = this.canvas.getContext('2d')
    this.resize()
    window.addEventListener('resize', this.resize)
    this.createField()
    this.canvas.addEventListener('click', this.createField)
    this.loop()
  },
  methods: {
    draw(){
      for(let i = 0; i < this.stars.length; i++){
        let star = this.stars[i]
        this.drawStar(star.x, star.y, star.color, star.size, star.transparent)
      }
    },
    update(){
      if(this.pulse) {
        this.gradient.max += 0.001
      } else {
        this.gradient.max -= 0.001
      }
      if(this.gradient.max > 0.8) this.pulse = false
      if(this.gradient.max < 0.7) this.pulse = true
    },
    loop(){
      this.erase()
      this.draw()
      this.update()
      window.requestAnimationFrame(this.loop)
    },
    createField(){
      this.stars = []
      for(let i = 0; i < this.randomBetween(1,10); i++) {
        this.stars.push(this.createStar())
      }
    },
    randomBetween(min, max){
      return Math.floor(Math.random() * (max - min) + min)
    },
    createStar(){
      let r = this.randomBetween(0,255)
      let g = this.randomBetween(0, 255)
      let b = this.randomBetween(0, 255)
      let color = `rgba(${r},${g},${b}, 1)`
      let transparent = `rgba(${r},${g},${b}, 0)`
      let size = this.randomBetween(10, 100)
      let x = this.randomBetween(size/2, this.ctx.width - size/2)
      let y = this.randomBetween(size/2, this.ctx.height - size/2)
      let star = {
        x: x,
        y: y,
        color: color,
        transparent: transparent,
        size: size,
        name: this.starName()
      }
      // Check for collision and reposition star if needed
      for(let i = 0; i < this.stars.length; i++){
        let otherStar = this.stars[i]
        while(this.collision(star, otherStar) < 0) {
          console.warn(`Collisoin detected on star ${i}.`)
          star.x = this.randomBetween(size/2, this.ctx.width - size/2)
          star.y = this.randomBetween(size/2, this.ctx.height - size/2)
        }
      }
      return star
    },
    collision(star1, star2){
      var a = star1.x - star2.x 
      var b = star1.y - star2.y
      return Math.sqrt( a*a + b*b ) - (star1.size + star2.size)
    },
    resize() {
      let width = document.getElementById('right-col').clientWidth - 1.5 * 20 * 2
      this.canvas.width = width
      this.ctx.width = width
      this.canvas.height = width
      this.ctx.height = width
    },
    drawStar(x, y, color, size, transparent) {
      let starGradient = this.ctx.createRadialGradient(x, y, 0, x, y, size)
      starGradient.addColorStop(0, 'white')
      starGradient.addColorStop(this.gradient.min, 'white')
      starGradient.addColorStop(this.gradient.max, color)
      starGradient.addColorStop(1, transparent)
      this.drawCircle(x, y, size, starGradient)
    },
    drawCircle(x, y, size, fill){
      this.ctx.fillStyle = fill
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.closePath()
    },
    erase(){
      this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height)
    },
    starName(){
      let syllables = ['ab',"oc",'ock','bo','ca','at','oz','to','do','cose','bi','lat','hy','gly','hi','li','os','he']
      let syllableCount = this.randomBetween(3,6)
      let name = ''
      for(let i = 0; i < syllableCount; i++) {
        name += this.randomPick(syllables)
      }
      return name
    },
    randomPick(list) {
      return list[Math.floor(Math.random() * list.length)]
    }
  }
})
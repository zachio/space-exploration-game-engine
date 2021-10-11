var canvas = {
  element: null,
  ctx: null,
  config(options) {
    canvas.element = document.getElementById(options.id)
    canvas.ctx = canvas.element.getContext('2d')
    canvas.resize()
    window.addEventListener('resize', canvas.resize)
    console.log(canvas.ctx)
  },
  resize() {
    canvas.element.width = window.innerWidth
    canvas.ctx.width = window.innerWidth
    canvas.element.height = window.innerHeight
    canvas.ctx.height = window.innerHeight
  },
  erase(){
    canvas.ctx.clearRect(0, 0, canvas.ctx.width, canvas.ctx.height)
  },
  circle(x, y, size, fill){
    canvas.ctx.fillStyle = fill
    canvas.ctx.beginPath()
    canvas.ctx.arc(x, y, size, 0, 2 * Math.PI)
    canvas.ctx.fill()
    canvas.ctx.closePath()
  }
}
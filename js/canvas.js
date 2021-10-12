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
    let width = document.getElementById('right-col').clientWidth - 1.5 * 20 * 2
    console.log(width)
    canvas.element.width = width
    canvas.ctx.width = width
    canvas.element.height = width
    canvas.ctx.height = width
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
var app = {
  launch() {
    console.log('launch!')
    canvas.config({
      id: 'stage'
    })
    app.loop()
  },
  draw(){
    starField.draw()
  },
  update(){
    starField.update()
  },
  loop(){
    canvas.erase()
    app.draw()
    app.update()
    window.requestAnimationFrame(app.loop)
  },
}
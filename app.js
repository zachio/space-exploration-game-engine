function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  textSize(30)
  textAlign(CENTER)
}

function draw() {
  // Space is black
  let tileSize = 16 
  background(0)
  stroke('white')
  fill('white')
  strokeWeight(0)
  textAlign(CENTER)
  text(round(frameRate()) + " fps", window.innerWidth / 2, window.innerHeight / 2)
  for(let x = 0; x < window.innerWidth / tileSize; x++) {
    for(let y = 0; y < window.innerHeight / tileSize; y++) {
      let s = new star.Star(x,y)
      if(s) {
        strokeWeight(s.size)
        point(s.x * tileSize + tileSize / 2, s.y * tileSize + tileSize / 2)
      }
        
    }
  }
}

var tile = {
  size: 16
}
var star = {
  check: function(x, y) {
    let rand = new Math.seedrandom("x:" + x + ", y:" + y)
    if(rand.quick() > 0.95) {
      return true
    } else {
      return false
    }
  },
  Star: function(x,y) {
    var rand = new Math.seedrandom("x:" + x + ", y:" + y)
    if(rand() < 0.05) {
      this.seed = "x: "+x+",y: "+y
      let random = Math.seedrandom(this.seed)
      this.x = x
      this.y = y
      this.size = rand() * tile.size
      return this 
    } else {
      return false
    }
    
  }
}

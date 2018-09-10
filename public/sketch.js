var song;
var SongFFT;
var spec;
var amp;
var amplitude;
var button;
var particles = [];

function preload(){
  song = loadSound("Isolate.mp3");
}
function setup() {
  var cnv = createCanvas(640, 640);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  background(0,0,0);
  song.play();
  SongFFT = new p5.FFT(0.9,32);
  amp = new p5.Amplitude();
  song.setVolume(1.0);

}

function toggleSong(){
    if(song.isPlaying()){
      song.pause();
      document.getElementById("btn1").innerHTML="Play";
    }
    else{
      song.play();
      document.getElementById("btn1").innerHTML="Pause";
    }
}

class Particle{
  constructor(){
    this.x=width/2;
    this.y=height/2;
    this.angle=random(0,360);
    this.acceleration=0;
    this.alpha=255;
  }

  show(){
    noStroke();
    // stroke(255,100,200);
    fill(70,80,100,this.alpha);
    ellipse(this.x,this.y,50,50);
  }

  moveIt(){
    this.x+=this.acceleration*(cos(this.angle));
    this.y+=this.acceleration*(sin(this.angle));

  }

  accelerate(amp){
    this.acceleration = amp;
    this.alpha-=2;
  }
}

function deleteParticles(){
  for(var i = 0; i<particles.length; i++){
    if(particles[i].alpha<0){
      particles.splice(i,1);
    }
  }
}

function draw() {
  background(0);

  var spec = SongFFT.analyze();

  if(song.isPlaying()){
    var amplitude = amp.getLevel();
    let p = new Particle();
    particles.push(p);
    for(var i = 0; i<particles.length; i++){
      particles[i].accelerate(map(amplitude,0,1,0,50));
      particles[i].moveIt();
      deleteParticles();
      particles[i].show();
    }
  }

    for(var i=0; i < spec.length; i++){

      var r = map(spec[i],0,256,0,640);
      var theta = map(i,0,spec.length,0,640);

      var x = r * cos(theta);
      var y = r * sin(theta);

      noStroke();
      fill(map(theta,0,640,100,255),150,230);
      ellipse(width/2,height/2,r,theta);

    }


}

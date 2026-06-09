const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = 250;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

audio.addEventListener('play', () => {
 const source = audioCtx.createMediaElementSource(audio);
 source.connect(analyser);
 analyser.connect(audioCtx.destination);
 draw();
}, {once:true});

function draw(){
 requestAnimationFrame(draw);

 const bufferLength = analyser.frequencyBinCount;
 const dataArray = new Uint8Array(bufferLength);
 analyser.getByteFrequencyData(dataArray);

 ctx.clearRect(0,0,canvas.width,canvas.height);

 const barWidth = canvas.width / bufferLength * 2;
 let x = 0;

 for(let i=0;i<bufferLength;i++){
   const h = dataArray[i];
   ctx.fillStyle = `rgb(${50+h},${80},255)`;
   ctx.fillRect(x, canvas.height-h, barWidth, h);
   x += barWidth + 1;
 }
}

// Tempat API Spectrum jika diperlukan
const SPECTRUM_API_KEY = "MASUKKAN_API_KEY_KAMU_DI_SINI";

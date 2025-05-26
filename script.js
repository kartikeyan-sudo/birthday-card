// Slide Navigation State
const slides = [
  "slide-landing",
  "slide-hello",
  "slide-nostalgia",
  "slide-envelope",
  "slide-words",
  "slide-wish",
  "slide-birthday",
  "slide-video"
];
let currentSlide = 0;

// Helper to fade out current and fade in next slide
function nextSlide() {
  const curr = document.getElementById(slides[currentSlide]);
  curr.classList.remove('active');
  setTimeout(() => {
    currentSlide++;
    const next = document.getElementById(slides[currentSlide]);
    next.classList.add('active');
    // Special: on birthday slide, trigger curtains and cake
    if (slides[currentSlide] === "slide-birthday") {
      setTimeout(() => {
        document.querySelector('.curtains').classList.add('open');
        setTimeout(() => {
          document.querySelector('.cake-reveal').classList.add('show');
        }, 1700);
      }, 600);
    }
  }, 400);
}

// Landing slide
document.getElementById('startMystery').onclick = nextSlide;

// All "next-btn" buttons
document.querySelectorAll('.next-btn').forEach(btn => {
  btn.onclick = nextSlide;
});

// Envelope surprise slide
const envelope = document.querySelector('.envelope');
const envelopeBtn = document.querySelector('#slide-envelope .next-btn');
envelope.onclick = function () {
  if (!envelope.classList.contains('open')) {
    envelope.classList.add('open');
    envelopeBtn.style.display = 'inline-block';
  }
};

// Positive Words Slide
const words = ["Joy", "Laughter", "Adventure", "Kindness", "Magic", "Love", "Wonder", "Possibility"];
let wordIdx = 0;
const wordElem = document.getElementById('positiveWord');
document.getElementById('slide-words').addEventListener('click', function (e) {
  if (e.target.classList.contains('next-btn')) {
    nextSlide();
  } else {
    wordIdx = (wordIdx + 1) % words.length;
    wordElem.innerText = words[wordIdx];
    wordElem.classList.remove('positive-word');
    setTimeout(() => wordElem.classList.add('positive-word'), 20);
  }
});

// Candle wish slide
document.getElementById('blowCandle').onclick = function () {
  const flame = document.getElementById('candle-flame');
  flame.style.transition = 'opacity 1s';
  flame.style.opacity = 0;
  setTimeout(nextSlide, 900);
};

// Birthday Reveal Slide
document.getElementById('cutCakeBtn').onclick = function () {
  const cake = document.getElementById('cake');
  if (cake.classList.contains('cut')) return;
  cake.classList.add('cut');
  sprinkleBurst();
  this.disabled = true;
  this.innerText = "Yay! 🍰";
  setTimeout(() => {
    // Redirect to Google Drive video
    window.location.href = "https://drive.google.com/file/d/1oLQc2fEMiM48KVD2DTImeQE2kfNf7BDv/view?usp=drivesdk";
  }, 1100);
};

// Sprinkle burst for cake
function sprinkleBurst() {
  const sprinkleBox = document.getElementById('sprinkle-box');
  sprinkleBox.innerHTML = '';
  for (let i = 0; i < 34; i++) {
    const s = document.createElement('div');
    s.className = 'sprinkle';
    const angle = Math.random() * 2 * Math.PI;
    const distance = 45 + Math.random() * 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    s.style.left = '50%'; s.style.top = '50%';
    const colors = ['#ffe066', '#f49ac2', '#e5497a', '#ffb88c', '#fbdbff', '#c14872', '#ffcfde'];
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.width = `${5 + Math.random() * 5}px`;
    s.style.height = `${5 + Math.random() * 5}px`;
    s.style.borderRadius = Math.random() > 0.7 ? '50%' : '22%';
    s.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(${0.85 + Math.random() * 0.5})`, opacity: 0 }
    ], {
      duration: 900 + Math.random() * 350,
      easing: 'cubic-bezier(.23,1.43,.5,.92)',
      fill: 'forwards'
    });
    setTimeout(() => s.remove(), 1300);
    sprinkleBox.appendChild(s);
  }
}

// Sprinkle/Curtain CSS (injected)
(function () {
  const style = document.createElement('style');
  style.innerHTML = `.sprinkle {
    position: absolute; z-index: 9; pointer-events: none;
    border-radius: 22%; opacity: 1; will-change: transform, opacity;
  }`;
  document.head.appendChild(style);
})();

// Show first slide on load
window.onload = function () {
  document.getElementById(slides[0]).classList.add('active');
};

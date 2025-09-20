const heart = document.getElementById('heart');
const sound = document.getElementById('heartbeat-sound');
const message = document.getElementById('message');

// Hover veya dokunma ile kalp büyümesi ve ses
function playHeart() {
  heart.style.transform = 'rotate(-45deg) scale(1.5)';
  sound.currentTime = 0;
  sound.play();
}

function resetHeart() {
  heart.style.transform = 'rotate(-45deg) scale(1)';
}

heart.addEventListener('mouseenter', playHeart);
heart.addEventListener('mouseleave', resetHeart);

// Mobil dokunmatik destek
heart.addEventListener('touchstart', (e) => {
  e.preventDefault(); // scroll engelleme
  playHeart();
});
heart.addEventListener('touchend', resetHeart);

// Kalbe tıklayınca mesaj göster
heart.addEventListener('click', () => {
  message.textContent = "Seni Seviyorum 💖";
  message.classList.add('show');
  setTimeout(() => message.classList.remove('show'), 2000);
});

// Küçük kalpler oluşturma
function createSmallHeart() {
  const smallHeart = document.createElement('div');
  smallHeart.classList.add('small-heart');

  const size = Math.random() * 15 + 10;
  smallHeart.style.width = `${size}px`;
  smallHeart.style.height = `${size}px`;
  smallHeart.style.left = `${Math.random() * window.innerWidth}px`;
  smallHeart.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
  smallHeart.style.animationDuration = `${Math.random() * 4 + 3}s`;

  document.body.appendChild(smallHeart);
  smallHeart.addEventListener('animationend', () => smallHeart.remove());
}

// Her 300ms'de yeni küçük kalp oluştur
setInterval(createSmallHeart, 300);

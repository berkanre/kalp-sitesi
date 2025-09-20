const heart = document.getElementById('heart');
const sound = document.getElementById('heartbeat-sound');
const messageTop = document.getElementById('message-top');
const messageBottom = document.getElementById('message-bottom');

let heartInterval = null;

// İkinci mesaj burada yazılıyor
const secondMessage = `
Sen benim hayatımdaki en değerli kişisin. 
Her anımda seni düşünüyorum ve kalbim her zaman seninle atıyor. 
Seninle geçirdiğim her saniye, dünyanın en güzel anı gibi geliyor. 
Seni her şeyden çok seviyorum ❤️
`;

// Küçük kalpler oluşturma (arka planda)
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

heartInterval = setInterval(createSmallHeart, 300);

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
heart.addEventListener('touchstart', (e) => { e.preventDefault(); playHeart(); });
heart.addEventListener('touchend', resetHeart);

// Kalbe tıklanınca mesajlar
heart.addEventListener('click', () => {
  // İlk kısa mesaj
  messageTop.textContent = "Seni Seviyorum 💖";
  messageTop.classList.add('show');

  setTimeout(() => {
    messageTop.classList.remove('show');

    // Animasyonları durdur
    heart.style.animationPlayState = 'paused';
    clearInterval(heartInterval);

    // İkinci mesaj direkt gösterilecek
    messageBottom.textContent = secondMessage;
    messageBottom.classList.add('show');

  }, 2000);
});

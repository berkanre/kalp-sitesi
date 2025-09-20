const heart = document.getElementById('heart');
const sound = document.getElementById('heartbeat-sound');
const messageTop = document.getElementById('message-top');
const messageBottom = document.getElementById('message-bottom');

let heartInterval = null;
let sparkleInterval = null;

// İkinci mesajı burada belirle
const secondMessage = `
     Canım sevgilim bugün benim için en mutlu gün.
     Bu mutluluğu nasıl anlatmak gerekir bilmiyorum.
     Geleceğim, seninle olduğum her gün, saat, dakika, saniye farketmeksizin seninle olacağım için çok mutluyum.
     Bu mutluluğumuzu her daim yaşamak dileğiyle... 
     Seni çok seviyorum canım sevgilim. İyi ki doğdun, iyi ki 
  benimlesin.  ❤️
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

// Typewriter efekti
function typeWriter(text, element, speed = 50) {
  element.textContent = '';
  let i = 0;

  // Parlayan kalpler intervali
  sparkleInterval = setInterval(() => {
    createSparkle(element);
  }, 200);

  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      clearInterval(sparkleInterval); // yazı bitince efekt durur
    }
  }, speed);
  element.classList.add('show');
}

// Mesaj etrafında parlayan küçük kalpler
function createSparkle(element) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('small-heart');
  sparkle.style.width = '15px';
  sparkle.style.height = '15px';
  const rect = element.getBoundingClientRect();
  sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
  sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
  sparkle.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
  sparkle.style.animationDuration = '1.5s';
  document.body.appendChild(sparkle);
  sparkle.addEventListener('animationend', () => sparkle.remove());
}

// Kalbe tıklayınca mesajlar
heart.addEventListener('click', () => {
  // İlk kısa mesaj
  messageTop.textContent = "Seni Seviyorum 💖";
  messageTop.classList.add('show');

  setTimeout(() => {
    messageTop.classList.remove('show');

    // Animasyonları durdur
    heart.style.animationPlayState = 'paused';
    clearInterval(heartInterval);

    // Typewriter ile ikinci uzun mesaj ve parlayan kalpler
    typeWriter(secondMessage, messageBottom, 50);

  }, 2000);
});

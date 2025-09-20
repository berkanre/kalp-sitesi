const heart = document.getElementById('heart');
const sound = document.getElementById('heartbeat-sound');
const messageTop = document.getElementById('message-top');
const messageBottom = document.getElementById('message-bottom');

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
  e.preventDefault();
  playHeart();
});
heart.addEventListener('touchend', resetHeart);

// Kalbe tıklayınca mesajlar
heart.addEventListener('click', () => {
  // Üst mesaj
  messageTop.textContent = "Seni Seviyorum 💖";
  messageTop.classList.add('show');

  // 2 saniye sonra üst mesaj kaybolur ve alt mesaj görünür
  setTimeout(() => {
    messageTop.classList.remove('show');

    // Alt mesaj
    messageBottom.textContent = "Canım sevgilim bugün benim için en mutlu gün. Bu mutluluğu nasıl anlatmak gerekir bilmiyorum.Geleceğim, seninle olduğum her gün, saat, dakika, saniye farketmeksizin seninle olacağım için çok mutluyum.Bu mutluluğumuzu her daim yaşamak dileğiyle... Seni çok seviyorum canım sevgilim. İyi ki doğdun, iyi ki benimlesin";
    messageBottom.classList.add('show');

    // 2 saniye sonra alt mesaj kaybolur
    setTimeout(() => {
      messageBottom.classList.remove('show');
    }, 2000);

  }, 2000);
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

setInterval(createSmallHeart, 300);

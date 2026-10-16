/**
 * COSMOS Explorer — Fondo Estelar con Paralaje Multicapa
 * Renderiza estrellas de distinta magnitud, centelleo variable y polvo cósmico
 */

function initStarfield() {
  const canvas = document.getElementById("starfield-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
  }

  function createStars() {
    const count = Math.min(Math.floor((width * height) / 7000), 220);
    stars = [];
    const colors = ["#FFFFFF", "#BAE6FD", "#FDE68A", "#C7D2FE"];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        speed: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
        drift: Math.random() * 0.08 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.alpha += s.speed;
      if (s.alpha > 0.95 || s.alpha < 0.15) {
        s.speed = -s.speed;
      }

      s.y -= s.drift;
      if (s.y < 0) s.y = height;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  animate();
}

window.initStarfield = initStarfield;

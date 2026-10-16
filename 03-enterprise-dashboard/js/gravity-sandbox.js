/**
 * COSMOS — Módulo 2: Simulador de Dinámica Orbital N-Cuerpos
 * Incluye animación de acreción relativista para singularidades centrales
 */

function initGravitySandbox() {
  const canvas = document.getElementById("gravity-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let centralMass = 1800;
  let G = 0.45;
  let bodies = [];
  let explosions = [];
  let collisionCount = 0;
  let launchType = "rocky";
  let spinTick = 0;

  let isAiming = false;
  let aimStart = { x: 0, y: 0 };
  let aimCurrent = { x: 0, y: 0 };

  const BODY_PALETTES = {
    rocky: { radius: 5.5, mass: 12, color: "#38BDF8", trail: "rgba(56, 189, 248, 0.4)" },
    gas: { radius: 9.5, mass: 45, color: "#F59E0B", trail: "rgba(245, 158, 11, 0.4)" },
    comet: { radius: 4, mass: 4, color: "#A855F7", trail: "rgba(168, 85, 247, 0.5)" }
  };

  function resizeCanvas() {
    const wrapper = canvas.parentElement;
    if (!wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = wrapper.clientWidth * dpr;
    canvas.height = wrapper.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnBody(x, y, vx, vy, typeKey = "rocky") {
    const spec = BODY_PALETTES[typeKey] || BODY_PALETTES.rocky;
    bodies.push({
      x,
      y,
      vx,
      vy,
      radius: spec.radius,
      mass: spec.mass,
      color: spec.color,
      trailColor: spec.trail,
      history: []
    });
    updateTelemetryReadout();
  }

  function loadPreset(presetName) {
    const wrapper = canvas.parentElement;
    const w = wrapper ? wrapper.clientWidth : 800;
    const h = wrapper ? wrapper.clientHeight : 520;
    const cx = w / 2;
    const cy = h / 2;

    bodies = [];
    explosions = [];

    const massSlider = document.getElementById("sandbox-mass-slider");
    const massLabel = document.getElementById("sandbox-mass-label");

    if (presetName === "harmonic") {
      centralMass = 1800;
      if (massSlider) massSlider.value = "1800";
      if (massLabel) massLabel.textContent = "1,0 M☉ (Estrella tipo G)";

      const radii = [70, 110, 155, 205];
      const types = ["rocky", "rocky", "gas", "comet"];
      radii.forEach((r, idx) => {
        const angle = (idx * Math.PI) / 2;
        const speed = Math.sqrt((G * centralMass) / r);
        spawnBody(
          cx + Math.cos(angle) * r,
          cy + Math.sin(angle) * r,
          -Math.sin(angle) * speed,
          Math.cos(angle) * speed,
          types[idx]
        );
      });
    } else if (presetName === "chaotic") {
      centralMass = 2200;
      if (massSlider) massSlider.value = "2200";
      if (massLabel) massLabel.textContent = "1,6 M☉ (Sistema perturbado)";

      for (let i = 0; i < 8; i++) {
        const r = 65 + Math.random() * 145;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.sqrt((G * centralMass) / r) * (0.78 + Math.random() * 0.4);
        const types = ["rocky", "comet", "gas"];
        spawnBody(
          cx + Math.cos(angle) * r,
          cy + Math.sin(angle) * r,
          -Math.sin(angle) * speed,
          Math.cos(angle) * speed,
          types[i % 3]
        );
      }
    } else if (presetName === "blackhole") {
      centralMass = 4200;
      if (massSlider) massSlider.value = "4200";
      if (massLabel) massLabel.textContent = "Singularidad de Schwarzschild";

      for (let i = 0; i < 7; i++) {
        const r = 85 + i * 22;
        const angle = (i * Math.PI) / 3.5;
        const speed = Math.sqrt((G * centralMass) / r) * 0.94;
        spawnBody(
          cx + Math.cos(angle) * r,
          cy + Math.sin(angle) * r,
          -Math.sin(angle) * speed,
          Math.cos(angle) * speed,
          i % 2 === 0 ? "comet" : "rocky"
        );
      }
    }

    updateTelemetryReadout();
  }

  function createExplosion(x, y, color) {
    explosions.push({ x, y, radius: 4, alpha: 1, color });
    collisionCount++;
    updateTelemetryReadout();
  }

  function updateTelemetryReadout() {
    const countEl = document.getElementById("sandbox-body-count");
    const colEl = document.getElementById("sandbox-collision-count");
    if (countEl) countEl.textContent = String(bodies.length);
    if (colEl) colEl.textContent = String(collisionCount);
  }

  function stepPhysics(w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const starRadius = centralMass > 3000 ? 22 : 20;

    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i];
      const dx = cx - b.x;
      const dy = cy - b.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      if (dist < starRadius + b.radius * 0.6) {
        createExplosion(b.x, b.y, b.color);
        bodies.splice(i, 1);
        continue;
      }

      const force = (G * centralMass) / Math.max(distSq, 120);
      b.vx += (dx / dist) * force;
      b.vy += (dy / dist) * force;

      for (let j = i - 1; j >= 0; j--) {
        const other = bodies[j];
        const odx = other.x - b.x;
        const ody = other.y - b.y;
        const odistSq = odx * odx + ody * ody;
        const odist = Math.sqrt(odistSq);

        if (odist < b.radius + other.radius) {
          createExplosion((b.x + other.x) / 2, (b.y + other.y) / 2, "#F59E0B");
          if (b.mass >= other.mass) {
            b.vx = (b.vx * b.mass + other.vx * other.mass) / (b.mass + other.mass);
            b.vy = (b.vy * b.mass + other.vy * other.mass) / (b.mass + other.mass);
            b.mass += other.mass * 0.5;
            b.radius = Math.min(14, b.radius + 1);
            bodies.splice(j, 1);
            i--;
          } else {
            other.vx = (b.vx * b.mass + other.vx * other.mass) / (b.mass + other.mass);
            other.vy = (b.vy * b.mass + other.vy * other.mass) / (b.mass + other.mass);
            other.mass += b.mass * 0.5;
            other.radius = Math.min(14, other.radius + 1);
            bodies.splice(i, 1);
          }
          break;
        } else if (odistSq > 25) {
          const pForce = (G * b.mass * other.mass) / odistSq;
          b.vx += (odx / odist) * (pForce / b.mass);
          b.vy += (ody / odist) * (pForce / b.mass);
          other.vx -= (odx / odist) * (pForce / other.mass);
          other.vy -= (ody / odist) * (pForce / other.mass);
        }
      }
    }

    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i];
      b.x += b.vx;
      b.y += b.vy;
      b.history.push({ x: b.x, y: b.y });
      if (b.history.length > 60) b.history.shift();

      if (b.x < -400 || b.x > w + 400 || b.y < -400 || b.y > h + 400) {
        bodies.splice(i, 1);
        updateTelemetryReadout();
      }
    }
  }

  function render() {
    const wrapper = canvas.parentElement;
    const w = wrapper ? wrapper.clientWidth : 800;
    const h = wrapper ? wrapper.clientHeight : 520;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);
    stepPhysics(w, h);
    spinTick += 0.035;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    [70, 140, 210].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    const isBH = centralMass > 3000;
    const coreRadius = isBH ? 21 : 18 + (centralMass / 4500) * 8;

    if (isBH) {
      // Animación de Agujero Negro en el Sandbox
      const glowGrad = ctx.createRadialGradient(cx, cy, coreRadius * 0.8, cx, cy, coreRadius * 3.4);
      glowGrad.addColorStop(0, "rgba(245, 158, 11, 0.75)");
      glowGrad.addColorStop(0.5, "rgba(234, 88, 12, 0.25)");
      glowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 3.4, 0, Math.PI * 2);
      ctx.fill();

      // Disco de acreción giratorio
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.25);
      ctx.scale(1, 0.36);
      const diskGrad = ctx.createRadialGradient(0, 0, coreRadius * 1.1, 0, 0, coreRadius * 2.8);
      diskGrad.addColorStop(0, "#FEF08A");
      diskGrad.addColorStop(0.4, "#F59E0B");
      diskGrad.addColorStop(0.8, "rgba(234, 88, 12, 0.45)");
      diskGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Anillo de lente gravitacional en rotación
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(spinTick);
      ctx.strokeStyle = "rgba(253, 224, 71, 0.65)";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([18, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Horizonte de sucesos negro puro
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#FEF08A";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius + 0.8, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      const glowGrad = ctx.createRadialGradient(cx, cy, coreRadius * 0.4, cx, cy, coreRadius * 3);
      glowGrad.addColorStop(0, "rgba(254, 240, 138, 0.85)");
      glowGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.4)");
      glowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FEF08A";
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    bodies.forEach(b => {
      if (b.history.length > 2) {
        ctx.beginPath();
        ctx.moveTo(b.history[0].x, b.history[0].y);
        for (let k = 1; k < b.history.length; k++) {
          ctx.lineTo(b.history[k].x, b.history[k].y);
        }
        ctx.strokeStyle = b.trailColor;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = explosions.length - 1; i >= 0; i--) {
      const ex = explosions[i];
      ex.radius += 1.5;
      ex.alpha -= 0.045;
      if (ex.alpha <= 0) {
        explosions.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = ex.alpha;
      ctx.strokeStyle = ex.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    if (isAiming) {
      const dx = aimStart.x - aimCurrent.x;
      const dy = aimStart.y - aimCurrent.y;
      const launchSpeed = Math.min(Math.hypot(dx, dy) * 0.065, 11);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(aimStart.x, aimStart.y);
      ctx.lineTo(aimStart.x + dx, aimStart.y + dy);
      ctx.stroke();
      ctx.setLineDash([]);

      const spec = BODY_PALETTES[launchType] || BODY_PALETTES.rocky;
      ctx.fillStyle = spec.color;
      ctx.beginPath();
      ctx.arc(aimStart.x, aimStart.y, spec.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#E2E8F0";
      ctx.font = "500 11px 'IBM Plex Mono', monospace";
      ctx.fillText(
        `v₀ = ${(launchSpeed * 4.2).toFixed(1)} km/s`,
        aimStart.x + 12,
        aimStart.y - 10
      );
    }

    requestAnimationFrame(render);
  }

  function getCanvasPos(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  canvas.addEventListener("mousedown", e => {
    isAiming = true;
    aimStart = getCanvasPos(e.clientX, e.clientY);
    aimCurrent = { ...aimStart };
  });

  window.addEventListener("mousemove", e => {
    if (!isAiming) return;
    aimCurrent = getCanvasPos(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", () => {
    if (!isAiming) return;
    isAiming = false;
    const vx = (aimStart.x - aimCurrent.x) * 0.055;
    const vy = (aimStart.y - aimCurrent.y) * 0.055;
    spawnBody(aimStart.x, aimStart.y, vx, vy, launchType);
  });

  canvas.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      isAiming = true;
      aimStart = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
      aimCurrent = { ...aimStart };
    }
  }, { passive: true });

  canvas.addEventListener("touchmove", e => {
    if (isAiming && e.touches.length === 1) {
      aimCurrent = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener("touchend", () => {
    if (!isAiming) return;
    isAiming = false;
    const vx = (aimStart.x - aimCurrent.x) * 0.055;
    const vy = (aimStart.y - aimCurrent.y) * 0.055;
    spawnBody(aimStart.x, aimStart.y, vx, vy, launchType);
  });

  const massSlider = document.getElementById("sandbox-mass-slider");
  const massLabel = document.getElementById("sandbox-mass-label");
  if (massSlider) {
    massSlider.addEventListener("input", e => {
      centralMass = parseFloat(e.target.value);
      if (massLabel) {
        if (centralMass < 1200) massLabel.textContent = "0,5 M☉ (Enana roja)";
        else if (centralMass < 2400) massLabel.textContent = "1,0 M☉ (Estrella tipo G)";
        else if (centralMass <= 3000) massLabel.textContent = "2,2 M☉ (Estrella masiva)";
        else massLabel.textContent = "Singularidad de Schwarzschild";
      }
    });
  }

  document.querySelectorAll(".sandbox-type-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      launchType = btn.getAttribute("data-type");
      document.querySelectorAll(".sandbox-type-btn").forEach(b => {
        b.classList.remove("border-white", "bg-white/10", "text-white");
        b.classList.add("border-white/10", "text-slate-400");
      });
      btn.classList.remove("border-white/10", "text-slate-400");
      btn.classList.add("border-white", "bg-white/10", "text-white");
    });
  });

  document.querySelectorAll(".sandbox-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const preset = btn.getAttribute("data-preset");
      loadPreset(preset);
    });
  });

  document.getElementById("sandbox-clear-btn")?.addEventListener("click", () => {
    bodies = [];
    explosions = [];
    updateTelemetryReadout();
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  loadPreset("harmonic");
  render();
}

window.initGravitySandbox = initGravitySandbox;

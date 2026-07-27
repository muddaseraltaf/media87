"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  speed: number;
  life: number;
  maxLife: number;
  color: 0 | 1;
};

function fieldAngle(x: number, y: number, time: number) {
  const scale = 0.004;
  return (
    Math.sin(x * scale + time * 0.00055) * Math.PI +
    Math.cos(y * scale + time * 0.00042) * Math.PI
  );
}

export function FlowField({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!canvas || !container || reducedMotion) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let visible = false;
    let pageVisible = !document.hidden;
    let disposed = false;

    const particleCount = () => {
      const base = width < 640 ? 70 : width < 960 ? 105 : 150;
      return (navigator.hardwareConcurrency ?? 8) <= 4
        ? Math.round(base * 0.72)
        : base;
    };

    const spawnParticle = (): Particle => {
      const maxLife = 160 + Math.floor(Math.random() * 220);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.65 + Math.random() * 1.1,
        life: Math.floor(Math.random() * maxLife),
        maxLife,
        color: Math.random() > 0.52 ? 1 : 0,
      };
    };

    const seedParticles = () => {
      particles = Array.from({ length: particleCount() }, spawnParticle);
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(2, Math.round(bounds.width));
      height = Math.max(2, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.fillStyle = "#2a2323";
      context.fillRect(0, 0, width, height);
      seedParticles();
    };

    const schedule = () => {
      if (
        !disposed &&
        visible &&
        pageVisible &&
        animationFrame === 0
      ) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const render = (timestamp: number) => {
      animationFrame = 0;

      if (!visible || !pageVisible) return;
      if (timestamp - lastFrame < 32) {
        schedule();
        return;
      }

      elapsed += timestamp - lastFrame;
      lastFrame = timestamp;

      context.fillStyle = "rgba(42, 35, 35, 0.105)";
      context.fillRect(0, 0, width, height);

      const paths = [new Path2D(), new Path2D()];

      for (const particle of particles) {
        const angle = fieldAngle(particle.x, particle.y, elapsed);
        particle.x += Math.cos(angle) * particle.speed;
        particle.y += Math.sin(angle) * particle.speed;
        particle.life += 1;

        if (particle.life > particle.maxLife) {
          Object.assign(particle, spawnParticle());
          continue;
        }

        if (particle.x < 0) particle.x += width;
        else if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        else if (particle.y > height) particle.y -= height;

        const progress = particle.life / particle.maxLife;
        const opacity =
          Math.min(progress * 7, 1) * Math.min((1 - progress) * 5, 1);
        const radius = 0.8 + opacity * 0.75;
        paths[particle.color].moveTo(particle.x + radius, particle.y);
        paths[particle.color].arc(
          particle.x,
          particle.y,
          radius,
          0,
          Math.PI * 2,
        );
      }

      context.fillStyle = "rgba(255, 70, 55, 0.72)";
      context.fill(paths[0]);
      context.fillStyle = "rgba(255, 125, 71, 0.7)";
      context.fill(paths[1]);
      schedule();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) {
          lastFrame = performance.now();
          schedule();
        } else {
          stop();
        }
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) {
        lastFrame = performance.now();
        schedule();
      } else {
        stop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flow-field">
      <canvas
        ref={canvasRef}
        className="flow-field-canvas"
        aria-hidden="true"
      />
      <div className="flow-field-vignette" aria-hidden="true" />
      <div className="flow-field-content">{children}</div>
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * 3D perspective grid with light-streams running toward the camera.
 * Ported from the USDA Value Infrastructure landing page.
 * Pure decorative background — pointer-events: none.
 */
export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cx = 0;
    let cy = 0;
    const focalLength = 300;
    const cameraZ = -100;

    let cameraX = 0;
    let cameraY = -70;
    let targetCameraX = 0;
    let targetCameraY = -70;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetCameraX = mouseX * 600;
      targetCameraY = -70 + mouseY * 40;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * 0.65 * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cx = window.innerWidth / 2;
      cy = window.innerHeight * 0.65 * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();

    const project = (x: number, y: number, z: number) => {
      const dz = z - cameraZ;
      if (dz <= 0) return null;
      const scale = focalLength / dz;
      return { x: cx + (x - cameraX) * scale, y: cy + (y - cameraY) * scale };
    };

    const gridZMin = 0;
    const gridZMax = 3000;
    const gridXMin = -4000;
    const gridXMax = 4000;
    const spacing = 90;
    let zOffset = 0;
    const speed = 2;

    const streams = [
      { x: -600, z: 500, length: 500, speed: 7, color: "#9ED8FF" },
      { x: -200, z: 1200, length: 350, speed: 10, color: "#B8C0CC" },
      { x: 300, z: 200, length: 600, speed: 12, color: "#9ED8FF" },
      { x: 700, z: 800, length: 450, speed: 8, color: "#7D8794" },
      { x: 0, z: 1800, length: 700, speed: 14, color: "#9ED8FF" },
      { x: -1200, z: 900, length: 400, speed: 9, color: "#B8C0CC" },
      { x: 1100, z: 1500, length: 550, speed: 11, color: "#7D8794" },
    ];

    let animReq = 0;
    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      cameraX += (targetCameraX - cameraX) * 0.03;
      cameraY += (targetCameraY - cameraY) * 0.03;

      zOffset = (zOffset + speed) % spacing;
      ctx.lineWidth = 1;

      for (let x = gridXMin; x <= gridXMax; x += spacing) {
        const p1 = project(x, 0, gridZMin);
        const p2 = project(x, 0, gridZMax);
        if (p1 && p2) {
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, "rgba(158, 216, 255, 0.15)");
          grad.addColorStop(1, "rgba(158, 216, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      for (let z = gridZMin; z <= gridZMax; z += spacing) {
        const actualZ = z - zOffset;
        if (actualZ < gridZMin) continue;
        const p1 = project(gridXMin, 0, actualZ);
        const p2 = project(gridXMax, 0, actualZ);
        if (p1 && p2) {
          const alpha = Math.max(0, 1 - actualZ / gridZMax);
          ctx.strokeStyle = `rgba(158, 216, 255, ${0.15 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      streams.forEach((s) => {
        s.z -= s.speed;
        if (s.z < gridZMin - s.length) s.z = gridZMax;
        const startZ = Math.max(gridZMin, s.z);
        const endZ = Math.min(gridZMax, s.z + s.length);
        if (startZ < endZ) {
          const p1 = project(s.x, 0, startZ);
          const p2 = project(s.x, 0, endZ);
          if (p1 && p2) {
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, s.color);
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      });

      animReq = requestAnimationFrame(render);
    };

    animReq = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animReq);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[65vh] flex justify-center items-end overflow-hidden z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full h-full" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 h-[120px] w-[520px] bg-brand-cyan/5 blur-[80px]" />
    </div>
  );
};

export default AnimatedGrid;
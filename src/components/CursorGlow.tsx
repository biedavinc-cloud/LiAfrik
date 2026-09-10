import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let running = false;

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      // Stop once the ring has essentially caught up — no point burning
      // frames animating a value that isn't visibly changing anymore.
      // The loop restarts instantly on the next mousemove below.
      if (Math.abs(mx - rx) < 0.5 && Math.abs(my - ry) < 0.5) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-liafrik-600"
        style={{ opacity: 0.7, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="absolute h-9 w-9 rounded-full border border-liafrik-400/40"
        style={{ willChange: 'transform', transition: 'width 0.2s, height 0.2s, opacity 0.2s' }}
      />
    </div>
  );
}

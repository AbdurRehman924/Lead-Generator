"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Node {
  id: string;
  label: string;
  row: number;
  col: number;
}

const nodes: Node[] = [
  { id: "plan", label: "Plan", row: 1, col: 1 },
  { id: "code", label: "Code", row: 1, col: 3 },
  { id: "build", label: "Build", row: 1, col: 5 },
  { id: "test", label: "Test", row: 1, col: 7 },
  { id: "staging", label: "Staging", row: 2, col: 7 },
  { id: "release", label: "Release", row: 2, col: 5 },
  { id: "deploy", label: "Deploy", row: 2, col: 3 },
  { id: "monitor", label: "Monitor", row: 2, col: 1 },
  { id: "secure", label: "Secure", row: 3, col: 1 },
  { id: "cost", label: "Cost", row: 3, col: 3 },
  { id: "backup", label: "Backup", row: 3, col: 5 },
  { id: "seo", label: "SEO", row: 3, col: 7 },
];

const edges: [string, string, string][] = [
  ["plan", "code", "→"],
  ["code", "build", "→"],
  ["build", "test", "→"],
  ["test", "staging", "↓"],
  ["staging", "release", "←"],
  ["release", "deploy", "←"],
  ["deploy", "monitor", "←"],
  ["monitor", "secure", "↓"],
  ["secure", "cost", "→"],
  ["cost", "backup", "→"],
  ["backup", "seo", "→"],
];

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dark, setDark] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.max(0.5, Math.min(3, s + delta)));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const onMouseUp = () => setDragging(false);

  const borderClr = dark ? "#1f2937" : "#e5e7eb";
  const selBorderClr = dark ? "#f87171" : "#dc2626";
  const selShadowClr = dark ? "#f87171" : "#dc2626";
  const shadowClr = dark ? "#374151" : "#e5e7eb";
  const hoverShadowClr = dark ? "#1e3a5f" : "#bfdbfe";
  const hoverBorderClr = dark ? "#60a5fa" : "#93c5fd";
  const textClr = dark ? "#60a5fa" : "#2563eb";
  const selTextClr = dark ? "#f87171" : "#dc2626";
  const bgClr = dark ? "rgba(17,24,39,0.8)" : "rgba(255,255,255,0.8)";
  const selBgClr = dark ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.12)";

  return (
    <div className="border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 text-center">
        Click the stages where you have pain points
      </h3>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ aspectRatio: "5/3", cursor: dragging ? "grabbing" : "grab" }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
        {edges.map(([from, to], i) => {
          const f = nodes.find((n) => n.id === from)!;
          const t = nodes.find((n) => n.id === to)!;
          const x1 = (f.col - 1) * 28 + 12;
          const y1 = (f.row - 1) * 38 + 14;
          const x2 = (t.col - 1) * 28 + 12;
          const y2 = (t.row - 1) * 38 + 14;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${x1}%`,
                top: `${y1}%`,
                width: `${length}%`,
                height: "1px",
                background: dark ? "#374151" : "#d1d5db",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
              }}
            />
          );
        })}
        {nodes.map((node) => {
          const isSel = selected.has(node.id);
          return (
            <button
              key={node.id}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggle(node.id)}
              className="absolute px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 pixel-btn"
              style={{
                left: `${(node.col - 1) * 28 + 1}%`,
                top: `${(node.row - 1) * 38 + 1}%`,
                width: "22%",
                boxShadow: isSel
                  ? `3px 3px 0px ${selShadowClr}`
                  : `3px 3px 0px ${shadowClr}`,
                background: isSel ? selBgClr : bgClr,
                color: isSel ? selTextClr : textClr,
                border: isSel
                  ? `1px solid ${selBorderClr}`
                  : `1px solid ${borderClr}`,
              }}
              onMouseEnter={(e) => {
                if (!isSel) {
                  e.currentTarget.style.boxShadow = `5px 5px 0px ${hoverShadowClr}`;
                  e.currentTarget.style.borderColor = hoverBorderClr;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSel) {
                  e.currentTarget.style.boxShadow = `3px 3px 0px ${shadowClr}`;
                  e.currentTarget.style.borderColor = borderClr;
                }
              }}
            >
              {node.label}
            </button>
          );
        })}

        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {edges.map(([from, to], i) => {
            const f = nodes.find((n) => n.id === from)!;
            const t = nodes.find((n) => n.id === to)!;
            const x1 = (f.col - 1) * 28 + 12;
            const y1 = (f.row - 1) * 38 + 14;
            const x2 = (t.col - 1) * 28 + 12;
            const y2 = (t.row - 1) * 38 + 14;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={dark ? "#374151" : "#d1d5db"}
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

const BOX_W = 44;
const BOX_H = 18;

const nodes: Node[] = [
  { id: "plan", label: "Plan", x: 12, y: 10 },
  { id: "code", label: "Code", x: 68, y: 10 },
  { id: "build", label: "Build", x: 124, y: 10 },
  { id: "test", label: "Test", x: 180, y: 10 },
  { id: "staging", label: "Staging", x: 180, y: 48 },
  { id: "release", label: "Release", x: 124, y: 48 },
  { id: "deploy", label: "Deploy", x: 68, y: 48 },
  { id: "monitor", label: "Monitor", x: 12, y: 48 },
  { id: "secure", label: "Secure", x: 12, y: 86 },
  { id: "cost", label: "Cost", x: 68, y: 86 },
  { id: "backup", label: "Backup", x: 124, y: 86 },
  { id: "seo", label: "SEO", x: 180, y: 86 },
];

const edges: [string, string][] = [
  ["plan", "code"],
  ["code", "build"],
  ["build", "test"],
  ["test", "staging"],
  ["staging", "release"],
  ["release", "deploy"],
  ["deploy", "monitor"],
  ["monitor", "secure"],
  ["secure", "cost"],
  ["cost", "backup"],
  ["backup", "seo"],
];

const defaultViewBox = { x: 0, y: 0, w: 200, h: 110 };

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [vb, setVb] = useState(defaultViewBox);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, vx: 0, vy: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
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
    const factor = e.deltaY > 0 ? 1.15 : 0.85;
    const newW = Math.max(100, Math.min(600, vb.w * factor));
    const newH = newW * (110 / 200);
    setVb((p) => ({ x: p.x + (p.w - newW) / 2, y: p.y + (p.h - newH) / 2, w: newW, h: newH }));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = vb.w / rect.width;
    const scaleY = vb.h / rect.height;
    setVb((p) => ({
      ...p,
      x: dragStart.vx - (e.clientX - dragStart.x) * scaleX,
      y: dragStart.vy - (e.clientY - dragStart.y) * scaleY,
    }));
  };

  const onMouseUp = () => setDragging(false);

  const lineClr = dark ? "#374151" : "#d1d5db";
  const textClr = dark ? "#60a5fa" : "#2563eb";
  const selTextClr = dark ? "#f87171" : "#dc2626";
  const selBorderClr = dark ? "#f87171" : "#dc2626";
  const selBgClr = dark ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.12)";
  const bgClr = dark ? "rgba(17,24,39,0.85)" : "rgba(255,255,255,0.85)";
  const borderClr = dark ? "#374151" : "#d1d5db";

  return (
    <div className="border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 text-center">
        Click the stages where you have pain points
      </h3>

      <svg
        ref={svgRef}
        className="w-full select-none"
        style={{ aspectRatio: "200/110", cursor: dragging ? "grabbing" : "grab" }}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {edges.map(([from, to], i) => {
          const f = nodes.find((n) => n.id === from)!;
          const t = nodes.find((n) => n.id === to)!;
          return (
            <line
              key={i}
              x1={f.x + BOX_W / 2}
              y1={f.y + BOX_H / 2}
              x2={t.x + BOX_W / 2}
              y2={t.y + BOX_H / 2}
              stroke={lineClr}
              strokeWidth="1"
            />
          );
        })}

        {nodes.map((node) => {
          const isSel = selected.has(node.id);
          return (
            <g
              key={node.id}
              onClick={() => toggle(node.id)}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={BOX_W}
                height={BOX_H}
                rx="0"
                fill={isSel ? selBgClr : bgClr}
                stroke={isSel ? selBorderClr : borderClr}
                strokeWidth="1.5"
                filter={isSel ? "url(#selShadow)" : "url(#shadow)"}
              />
              <text
                x={node.x + BOX_W / 2}
                y={node.y + BOX_H / 2 + 4.5}
                textAnchor="middle"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
                fill={isSel ? selTextClr : textClr}
                letterSpacing="1"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor="#d1d5db" floodOpacity="0.6" />
          </filter>
          <filter id="selShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor="#dc2626" floodOpacity="0.6" />
          </filter>
        </defs>
      </svg>

      <div className="text-center mt-5">
        <Link
          href={`/assess${selected.size > 0 ? `?pains=${Array.from(selected).join(",")}` : ""}`}
          className="inline-block text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
        >
          Analyze My Pain Points →
        </Link>
      </div>
    </div>
  );
}

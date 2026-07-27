"use client";

import { useEffect, useRef, useState } from "react";

const vertexSource = `#version 300 es
in vec2 aPos;
in vec2 aUv;
in vec2 aDisp;
out vec2 vUv;
out float vMag;
void main() {
  gl_Position = vec4(aPos + aDisp, 0.0, 1.0);
  vUv = aUv;
  vMag = length(aDisp);
}`;

const fragmentSource = `#version 300 es
precision highp float;
in vec2 vUv;
in float vMag;
out vec4 outColor;
uniform sampler2D uTex;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main() {
  vec4 base = texture(uTex, vUv);
  float offset = 0.005 * clamp(vMag * 8.0, 0.0, 1.0);
  float aOffset = texture(uTex, vUv + vec2(offset, 0.0)).a;
  float bOffset = texture(uTex, vUv - vec2(offset, 0.0)).a;
  vec3 color = base.rgb * base.a;
  color += uColorA * max(0.0, aOffset - base.a);
  color += uColorB * max(0.0, bOffset - base.a);
  outColor = vec4(color, max(base.a, max(aOffset, bOffset)));
}`;

const gridWidth = 72;
const gridHeight = 32;

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

type MeshHeroProps = {
  lineOne?: string;
  lineTwoPrefix?: string;
  highlight?: string;
  hint?: string;
  as?: "h1" | "div";
  compact?: boolean;
};

function createTextTexture(
  width: number,
  height: number,
  lineOne: string,
  lineTwoPrefix: string,
  highlight: string,
) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = width;
  textureCanvas.height = height;
  const context = textureCanvas.getContext("2d");

  if (!context) {
    return textureCanvas;
  }

  const lines = [
    [{ text: lineOne, highlight: false }],
    [
      { text: lineTwoPrefix, highlight: false },
      { text: highlight, highlight: true },
    ],
  ];

  const setFont = (size: number) => {
    context.font = `800 ${size}px Sora, sans-serif`;
  };
  const lineWidth = (segments: (typeof lines)[number]) =>
    segments.reduce(
      (total, segment) => total + context.measureText(segment.text).width,
      0,
    );

  let fontSize = 100;
  setFont(fontSize);
  const widestLine = Math.max(...lines.map(lineWidth));
  fontSize = Math.floor((fontSize * width * 0.94) / widestLine);
  fontSize = Math.min(fontSize, Math.floor((height * 0.88) / (lines.length * 1.12)));
  setFont(fontSize);

  context.textAlign = "left";
  context.textBaseline = "middle";
  const lineHeight = fontSize * 1.12;
  const totalHeight = lines.length * lineHeight;
  let y = (height - totalHeight) / 2 + lineHeight / 2;

  for (const segments of lines) {
    let x = (width - lineWidth(segments)) / 2;

    for (const segment of segments) {
      const segmentWidth = context.measureText(segment.text).width;

      if (segment.highlight) {
        const padding = fontSize * 0.12;
        const boxWidth = segmentWidth + padding * 2;
        const boxHeight = fontSize * 1.14;
        context.save();
        context.translate(x - padding + boxWidth / 2, y);
        context.rotate((-1.2 * Math.PI) / 180);
        const brandGradient = context.createLinearGradient(
          -boxWidth / 2,
          0,
          boxWidth / 2,
          0,
        );
        brandGradient.addColorStop(0, "#ff4637");
        brandGradient.addColorStop(1, "#ff7d47");
        context.fillStyle = brandGradient;
        roundedRect(
          context,
          -boxWidth / 2,
          -boxHeight / 2,
          boxWidth,
          boxHeight,
          fontSize * 0.12,
        );
        context.fill();
        context.restore();
      }

      context.fillStyle = "#2f2929";
      context.fillText(segment.text, x, y);
      x += segmentWidth;
    }

    y += lineHeight;
  }

  return textureCanvas;
}

export function MeshHero({
  lineOne = "Digital marketing",
  lineTwoPrefix = "built for ",
  highlight = "growth.",
  hint = "Move through the headline",
  as = "h1",
  compact = false,
}: MeshHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!wrap || !canvas || reducedMotion) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });

    if (!gl) {
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "aPos");
    const uvLocation = gl.getAttribLocation(program, "aUv");
    const displacementLocation = gl.getAttribLocation(program, "aDisp");
    const textureLocation = gl.getUniformLocation(program, "uTex");
    const colorALocation = gl.getUniformLocation(program, "uColorA");
    const colorBLocation = gl.getUniformLocation(program, "uColorB");

    const vertexCount = (gridWidth + 1) * (gridHeight + 1);
    const positions = new Float32Array(vertexCount * 2);
    const uvs = new Float32Array(vertexCount * 2);

    for (let y = 0; y <= gridHeight; y += 1) {
      for (let x = 0; x <= gridWidth; x += 1) {
        const index = y * (gridWidth + 1) + x;
        const u = x / gridWidth;
        const v = y / gridHeight;
        positions[index * 2] = u * 2 - 1;
        positions[index * 2 + 1] = 1 - v * 2;
        uvs[index * 2] = u;
        uvs[index * 2 + 1] = v;
      }
    }

    const indexCount = gridWidth * gridHeight * 6;
    const indices = new Uint32Array(indexCount);
    let currentIndex = 0;

    for (let y = 0; y < gridHeight; y += 1) {
      for (let x = 0; x < gridWidth; x += 1) {
        const a = y * (gridWidth + 1) + x;
        const b = a + 1;
        const c = a + gridWidth + 1;
        const d = c + 1;
        indices[currentIndex++] = a;
        indices[currentIndex++] = c;
        indices[currentIndex++] = b;
        indices[currentIndex++] = b;
        indices[currentIndex++] = c;
        indices[currentIndex++] = d;
      }
    }

    const displacement = new Float32Array(vertexCount * 2);
    const velocity = new Float32Array(vertexCount * 2);
    const vao = gl.createVertexArray();
    const positionBuffer = gl.createBuffer();
    const uvBuffer = gl.createBuffer();
    const displacementBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const texture = gl.createTexture();

    if (
      !vao ||
      !positionBuffer ||
      !uvBuffer ||
      !displacementBuffer ||
      !indexBuffer ||
      !texture
    ) {
      return;
    }

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, displacementBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, displacement, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(displacementLocation);
    gl.vertexAttribPointer(displacementLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let disposed = false;
    const rebuildTexture = async () => {
      if (canvas.width < 2 || canvas.height < 2) return;
      try {
        await document.fonts?.load("800 100px Sora");
      } catch {
        // The system fallback keeps the static H1 usable if the font is unavailable.
      }
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        createTextTexture(
          canvas.width,
          canvas.height,
          lineOne,
          lineTwoPrefix,
          highlight,
        ),
      );
      setReady(true);
    };

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const bounds = wrap.getBoundingClientRect();
      const width = Math.max(2, Math.round(bounds.width * pixelRatio));
      const height = Math.max(2, Math.round(bounds.height * pixelRatio));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      void rebuildTexture();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();

    const cursor = {
      x: 99,
      y: 99,
      previousX: 99,
      previousY: 99,
      velocityX: 0,
      velocityY: 0,
      inside: false,
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
      if (!cursor.inside) {
        cursor.previousX = x;
        cursor.previousY = y;
        cursor.inside = true;
      }
      cursor.x = x;
      cursor.y = y;
    };

    const handlePointerLeave = () => {
      cursor.inside = false;
      cursor.x = 99;
      cursor.y = 99;
      cursor.velocityX = 0;
      cursor.velocityY = 0;
    };

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);

    let heroVisible = false;
    let pageVisible = !document.hidden;
    let animationFrame = 0;
    const startDrawing = () => {
      if (!disposed && heroVisible && pageVisible && animationFrame === 0) {
        animationFrame = requestAnimationFrame(draw);
      }
    };
    const stopDrawing = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry?.isIntersecting ?? false;
      if (heroVisible) startDrawing();
      else stopDrawing();
    });
    visibilityObserver.observe(wrap);

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startDrawing();
      else stopDrawing();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const fringeColors = [
      [1, 0.275, 0.216],
      [1, 0.49, 0.278],
    ];

    const draw = () => {
      animationFrame = 0;
      if (heroVisible && pageVisible) {
        cursor.velocityX = cursor.x - cursor.previousX;
        cursor.velocityY = cursor.y - cursor.previousY;
        if (Math.hypot(cursor.velocityX, cursor.velocityY) > 0.3) {
          cursor.velocityX = 0;
          cursor.velocityY = 0;
        }
        cursor.previousX = cursor.x;
        cursor.previousY = cursor.y;

        for (let index = 0; index < vertexCount; index += 1) {
          const offset = index * 2;
          const displacedX = displacement[offset];
          const displacedY = displacement[offset + 1];
          const cursorX = cursor.x - (positions[offset] + displacedX);
          const cursorY = cursor.y - (positions[offset + 1] + displacedY);
          const proximity = Math.max(
            0,
            1 / (1 + Math.hypot(cursorX, cursorY) / 0.05) - 0.1,
          );
          let velocityX = velocity[offset];
          let velocityY = velocity[offset + 1];
          velocityX += cursor.velocityX * 1.8 * proximity;
          velocityY += cursor.velocityY * 1.8 * proximity;
          velocityX -= displacedX * 0.08;
          velocityY -= displacedY * 0.08;
          velocityX *= 0.9;
          velocityY *= 0.9;
          velocity[offset] = velocityX;
          velocity[offset + 1] = velocityY;
          displacement[offset] = Math.max(
            -1,
            Math.min(1, displacedX + velocityX * 0.1),
          );
          displacement[offset + 1] = Math.max(
            -1,
            Math.min(1, displacedY + velocityY * 0.1),
          );
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, displacementBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, displacement);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(textureLocation, 0);

        const colorIndex =
          Math.floor(performance.now() / 420) % fringeColors.length;
        const colorA = fringeColors[colorIndex];
        const colorB = fringeColors[(colorIndex + 1) % fringeColors.length];
        gl.uniform3f(colorALocation, colorA[0], colorA[1], colorA[2]);
        gl.uniform3f(colorBLocation, colorB[0], colorB[1], colorB[2]);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.bindVertexArray(vao);
        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);
      }

      startDrawing();
    };

    startDrawing();

    return () => {
      disposed = true;
      stopDrawing();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(displacementBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [highlight, lineOne, lineTwoPrefix]);

  const Heading = as;
  return (
    <div
      className={`mesh-hero${compact ? " mesh-hero-compact" : ""}${ready ? " mesh-hero-ready" : ""}`}
      ref={wrapRef}
    >
      <Heading className={ready ? "sr-only" : "mesh-fallback"}>
        {lineOne}
        <br />
        {lineTwoPrefix}<span className="highlight">{highlight}</span>
      </Heading>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="mesh-hint" aria-hidden="true">
        {hint}
      </span>
    </div>
  );
}

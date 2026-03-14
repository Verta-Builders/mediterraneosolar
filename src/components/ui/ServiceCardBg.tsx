"use client";

import { useRef, useEffect } from "react";

export type CardBgVariant = "sunbeams" | "breeze" | "lightning";

interface ServiceCardBgProps {
  variant: CardBgVariant;
  className?: string;
}

// ─── Shared vertex shader (fullscreen quad) ────────────────────────

const QUAD_VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  // (0,0) = bottom-left, (1,1) = top-right
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// ─── Sun Beams ─────────────────────────────────────────────────────
// God-rays radiating from the upper-right corner, warm amber glow.

const SUNBEAMS_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;

void main() {
  vec2 uv = v_uv;

  // Fade: transparent at bottom-left (0,0), opaque towards top-right
  float fade = smoothstep(0.0, 1.2, length(uv) / 1.414);

  // Sun source in upper-right area
  vec2 sunPos = vec2(0.88, 0.88);
  vec2 toSun = uv - sunPos;
  float angle = atan(toSun.y, toSun.x);
  float dist = length(toSun);

  // Layered rotating rays at different frequencies
  float rays = 0.0;
  rays += (sin(angle *  8.0 + u_time * 0.35) * 0.5 + 0.5) * 0.50;
  rays += (sin(angle * 13.0 - u_time * 0.20 + 1.0) * 0.5 + 0.5) * 0.30;
  rays += (sin(angle *  5.0 + u_time * 0.12 + 2.5) * 0.5 + 0.5) * 0.20;
  rays = pow(rays, 3.0);

  // Radial glow falloff from the sun
  float glow = exp(-dist * 3.2) * 1.3;

  // Soft ambient warmth further from centre
  float ambient = exp(-dist * 1.6) * 0.12;

  float intensity = rays * glow + ambient;
  intensity *= 0.45;

  // Warm golden palette
  vec3 color = mix(vec3(1.0, 0.72, 0.08), vec3(1.0, 0.93, 0.55), rays);

  gl_FragColor = vec4(color, intensity * fade);
}
`;

// ─── Breeze ────────────────────────────────────────────────────────
// Flowing wind streamlines with layered noise, cool teal tones.

const BREEZE_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;

  // Fade from bottom-left
  float fade = smoothstep(0.0, 1.2, length(uv) / 1.414);

  float t = u_time * 0.22;

  // 6 wind streamlines at different heights & speeds
  float stream = 0.0;
  for (float i = 0.0; i < 6.0; i++) {
    float y     = 0.78 + i * 0.02;
    float speed = 1.0 + i * 0.25;
    float freq  = (3.5 + i * 0.7) * aspect;
    float wave  = sin(uv.x * freq + t * speed + i * 2.1)
                * 0.07 * (1.0 + sin(t * 0.5 + i) * 0.35);
    float thick = 0.010 + 0.006 * sin(t + i * 1.7);
    float line  = smoothstep(thick, 0.0, abs(uv.y - y - wave));

    // Horizontal fade — streaks appear & disappear along x
    float xPhase = uv.x * 2.0 + t * speed * 0.35 + i * 3.0;
    float xFade  = smoothstep(0.0, 0.35, uv.x)
                 * smoothstep(1.0, 0.65, uv.x)
                 * (0.5 + 0.5 * sin(xPhase));

    stream += line * xFade;
  }

  // Soft flowing noise blanket
  float n = fbm(vec2(uv.x * 3.0 * aspect - t * 1.4, uv.y * 2.5 + t * 0.15));
  float softWind = n * 0.10;

  // Cool breeze palette
  vec3 color = mix(vec3(0.50, 0.80, 0.86), vec3(0.72, 0.92, 0.96), n);

  float intensity = (stream * 0.75 + softWind) * 0.75;

  gl_FragColor = vec4(color, intensity * fade);
}
`;

// ─── Lightning ─────────────────────────────────────────────────────
// Electric veins via thresholded fBm noise, pulsing electric blue.

const LIGHTNING_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;

  // Fade from bottom-left
  float fade = smoothstep(0.0, 1.2, length(uv) / 1.414);

  float t = u_time;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Three electric vein layers from thresholded noise
  float n1 = fbm(p * 4.0 + vec2( t * 0.30,  t * 0.10));
  float n2 = fbm(p * 6.5 + vec2(-t * 0.22,  t * 0.15) + 50.0);
  float n3 = fbm(p * 9.0 + vec2( t * 0.40, -t * 0.28) + 100.0);

  // Sharp veins where noise ~ 0.5
  float vein1 = pow(1.0 - abs(n1 - 0.65) * 3.0, 14.0);
  float vein2 = pow(1.0 - abs(n2 - 0.6) * 3.0, 18.0);
  float vein3 = pow(1.0 - abs(n3 - 0.5) * 3.0, 12.0);

  // Irregular pulsing / flashing
  float pulse1 = max(0.0, sin(t * 3.0      )) * 0.75 + 0.25;
  float pulse2 = max(0.0, sin(t * 2.5 + 2.0)) * 0.65 + 0.15;
  float pulse3 = max(0.0, sin(t * 4.0 + 4.0)) * 0.55 + 0.10;

  float electric = vein1 * pulse1
                 + vein2 * pulse2 * 0.55
                 + vein3 * pulse3 * 0.35;

  // Ambient electric haze
  float haze = fbm(p * 2.0 + vec2(t * 0.08)) * 0.07;

  // Electric blue → white palette
  vec3 color = mix(vec3(0.28, 0.48, 1.0), vec3(0.88, 0.93, 1.0), electric);

  float intensity = (electric + haze) * 0.50;

  gl_FragColor = vec4(color, intensity * fade);
}
`;

// ─── Helpers ───────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

const FRAG_BY_VARIANT: Record<CardBgVariant, string> = {
  sunbeams: SUNBEAMS_FRAG,
  breeze: BREEZE_FRAG,
  lightning: LIGHTNING_FRAG,
};

// ─── Component ─────────────────────────────────────────────────────

export default function ServiceCardBg({ variant, className = "" }: ServiceCardBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // Compile shaders
    const vs = compileShader(gl, gl.VERTEX_SHADER, QUAD_VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_BY_VARIANT[variant]);
    if (!vs || !fs) return;
    const program = linkProgram(gl, vs, fs);
    if (!program) return;

    // Attribute & uniform locations
    const aPosLoc   = gl.getAttribLocation(program, "a_position");
    const uTimeLoc  = gl.getUniformLocation(program, "u_time");
    const uResLoc   = gl.getUniformLocation(program, "u_resolution");

    // Fullscreen quad (two triangles)
    const quadVerts = new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Resize handling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Render loop
    const t0 = performance.now();
    const render = () => {
      const elapsed = (performance.now() - t0) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

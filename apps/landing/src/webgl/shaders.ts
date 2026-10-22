export const heroVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const heroFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot(0.5) * p * 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 palette(float t) {
  vec3 a = vec3(0.42, 0.36, 0.58);
  vec3 b = vec3(0.45, 0.38, 0.48);
  vec3 c = vec3(1.0, 1.0, 0.85);
  vec3 d = vec3(0.0, 0.18, 0.42);
  return a + b * cos(6.28318 * (c * t + d));
}

// MOBOX field: a rotating grid of glowing boxes
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float map(vec3 p) {
  vec3 q = p;
  q.xz *= rot(uTime * 0.10);
  q.xy *= rot(uTime * 0.06);
  vec3 id = floor(q);
  vec3 f = fract(q) - 0.5;
  float phase = hash(id.xz) * 6.28318;
  float h = 0.5 + 0.45 * sin(uTime * 1.3 + phase);
  f.y += (h - 0.5) * 0.55;
  return sdBox(f, vec3(0.26, 0.26 * h + 0.04, 0.26));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  vec2 mouse = uMouse * 0.10;
  float t = uTime * 0.05;

  // domain-warped nebula
  vec2 p = uv * 1.35 + mouse;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.2),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - t)
  );
  float f = fbm(p + 3.0 * r);
  vec3 col = palette(f * 0.6 + length(uv) * 0.22 + t * 0.5);
  col *= 0.30 + 0.70 * f;
  col *= 1.0 - 0.40 * length(uv);

  // raymarched box glow
  vec3 ro = vec3(0.0, 0.0, uTime * 0.30);
  vec3 rd = normalize(vec3(uv + mouse * 0.35, 1.15));
  float d = 0.0;
  float glow = 0.0;
  for (int i = 0; i < 44; i++) {
    vec3 pos = ro + rd * d;
    float dist = map(pos);
    glow += 0.014 / (0.06 + abs(dist) * 7.0);
    if (dist < 0.002 || d > 11.0) break;
    d += dist * 0.9;
  }
  col += palette(uTime * 0.03 + 0.62) * glow * 0.16;

  // film grain
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`

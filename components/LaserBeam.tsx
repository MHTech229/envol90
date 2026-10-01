'use client';
import { useEffect, useRef } from 'react';

const VERT = `attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}`;
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec3 uColor;uniform vec2 uBase;uniform float uHeight,uIntensity,uFog,uWisps,uSpeed,uFade;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.02+vec2(3.1,1.7);a*=0.5;}return v;}
void main(){
vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;vec2 p=uv-uBase;float t=uTime*uSpeed;float ax=abs(p.x);
float h=clamp(p.y/uHeight,0.0,1.0);
float vFade=pow(1.0-h,1.6)*smoothstep(-0.01,0.0,p.y);
float pulse=0.75+0.25*sin(p.y*18.0-t*2.5);
float core=exp(-ax*900.0);float glowN=exp(-ax*120.0);float glowW=exp(-ax*18.0)*0.35;
float beam=(core*1.2+glowN*0.6+glowW)*vFade*pulse;
float line=exp(-abs(p.y)*500.0)*exp(-ax*3.5);
float halo=exp(-(p.x*p.x*6.0+p.y*p.y*260.0));
float hot=exp(-length(p*vec2(1.0,1.5))*25.0);
float flare=line*1.1+halo*0.9+hot*1.5;
float w=0.0;float spread=1.0+6.0*exp(-max(p.y,0.0)*14.0);
for(int i=0;i<8;i++){float fi=float(i);float off=0.012+fi*0.011;
for(int s=0;s<2;s++){float sg=s==0?-1.0:1.0;
float lane=exp(-abs(p.x-sg*off*spread)*600.0);float seed=hash(vec2(fi*3.1,sg));
float y=p.y*6.0-t*(0.6+seed*0.6)+seed*10.0;float cell=floor(y);float fy=fract(y);
float len=mix(0.05,0.5,hash(vec2(cell,fi+sg*7.0)));
float on=step(hash(vec2(cell*1.7,fi*2.3+sg)),0.55);
float seg=smoothstep(0.0,0.03,fy)*(1.0-smoothstep(len-0.03,len,fy))*on;
w+=lane*seg*exp(-fi*0.3);}}
w*=uWisps*0.6*pow(1.0-h,2.0)*step(0.0,p.y);
vec2 fp=p*vec2(3.0,4.0)+vec2(0.0,1.0)*t*0.15;
float n=fbm(fp+fbm(fp+t*0.05)*0.8);
float fog=n*n*exp(-p.x*p.x*8.0)*exp(-abs(p.y)*4.0)*uFog;
float L=(beam+flare+w)*uIntensity+fog*1.2;
vec3 col=1.0-exp(-uColor*L*1.6);
col+=vec3(clamp(core*vFade+hot*0.5,0.0,1.0))*0.5*uIntensity;
float nx=abs(gl_FragCoord.x/uRes.x-0.5)*2.0;col*=1.0-smoothstep(0.6,1.0,nx);
col+=(hash(gl_FragCoord.xy)-0.5)/255.0;col=clamp(col*uFade,0.0,1.0);
gl_FragColor=vec4(col,max(max(col.r,col.g),col.b));}`;

const rgb = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
};

type Props = {
  color?: string; baseX?: number; baseY?: number; height?: number; intensity?: number;
  fog?: number; wisps?: number; speed?: number; className?: string;
};

/** Faisceau laser WebGL (base en bas au centre par défaut, repère uv : 1 = hauteur du conteneur). */
export default function LaserBeam({
  color = '#22c57a', baseX = 0, baseY = -0.5, height = 0.9, intensity = 1,
  fog = 0.6, wisps = 1, speed = 1, className = '',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const props = useRef({ color, baseX, baseY, height, intensity, fog, wisps, speed });
  props.current = { color, baseX, baseY, height, intensity, fog, wisps, speed };

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    wrap.appendChild(canvas);
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return () => canvas.remove();

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const vs = mk(gl.VERTEX_SHADER, VERT), fs = mk(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, wrap.clientWidth) * dpr;
      canvas.height = Math.max(1, wrap.clientHeight) * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize); ro.observe(wrap); resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true, raf = 0, time = 0, last = performance.now();
    const start = last;
    const draw = (fade: number) => {
      const P = props.current;
      gl.uniform2f(U('uRes'), canvas.width, canvas.height);
      gl.uniform1f(U('uTime'), time);
      gl.uniform3fv(U('uColor'), rgb(P.color));
      gl.uniform2f(U('uBase'), P.baseX, P.baseY);
      gl.uniform1f(U('uHeight'), P.height);
      gl.uniform1f(U('uIntensity'), P.intensity);
      gl.uniform1f(U('uFog'), P.fog);
      gl.uniform1f(U('uWisps'), P.wisps);
      gl.uniform1f(U('uSpeed'), P.speed);
      gl.uniform1f(U('uFade'), fade);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches) return draw(1);
      const tick = (now: number) => {
        if (!visible) return;
        time += Math.min(0.1, (now - last) / 1000); last = now;
        draw(Math.min(1, (now - start) / 1200));
        raf = requestAnimationFrame(tick);
      };
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
    io.observe(wrap); loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      gl.deleteBuffer(buf); gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
      canvas.remove();
    };
  }, []);

  return <div ref={wrapRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}

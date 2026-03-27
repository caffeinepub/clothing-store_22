import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const SPREAD = 12;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions, velocities };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6),
    [],
  );
  const lineColors = useMemo(
    () => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6),
    [],
  );

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.slice(), 3),
    );
    return geo;
  }, [positions]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return geo;
  }, [linePositions, lineColors]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const posAttr = pointsRef.current?.geometry.attributes.position;
    if (!posAttr) return;

    const pos = posAttr.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] +=
        velocities[i * 3] + Math.sin(timeRef.current * 0.3 + i * 0.1) * 0.001;
      pos[i * 3 + 1] +=
        velocities[i * 3 + 1] +
        Math.cos(timeRef.current * 0.2 + i * 0.15) * 0.001;
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // wrap around
      if (pos[i * 3] > SPREAD / 2) pos[i * 3] = -SPREAD / 2;
      if (pos[i * 3] < -SPREAD / 2) pos[i * 3] = SPREAD / 2;
      if (pos[i * 3 + 1] > SPREAD * 0.3) pos[i * 3 + 1] = -SPREAD * 0.3;
      if (pos[i * 3 + 1] < -SPREAD * 0.3) pos[i * 3 + 1] = SPREAD * 0.3;
      if (pos[i * 3 + 2] > 2) pos[i * 3 + 2] = -2;
      if (pos[i * 3 + 2] < -2) pos[i * 3 + 2] = 2;
    }
    posAttr.needsUpdate = true;

    // Update lines between nearby particles
    const linePosAttr = lineRef.current?.geometry.attributes.position;
    const lineColAttr = lineRef.current?.geometry.attributes.color;
    if (!linePosAttr || !lineColAttr) return;

    const lp = linePosAttr.array as Float32Array;
    const lc = lineColAttr.array as Float32Array;
    let lineIdx = 0;
    const MAX_DIST = 2.8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DIST && lineIdx < lp.length - 5) {
          const alpha = 1 - dist / MAX_DIST;
          // from point i
          lp[lineIdx] = pos[i * 3];
          lp[lineIdx + 1] = pos[i * 3 + 1];
          lp[lineIdx + 2] = pos[i * 3 + 2];
          // to point j
          lp[lineIdx + 3] = pos[j * 3];
          lp[lineIdx + 4] = pos[j * 3 + 1];
          lp[lineIdx + 5] = pos[j * 3 + 2];
          // color — blue-gray tones [0.435, 0.514, 0.588] for #6F8396
          lc[lineIdx] = 0.3 * alpha;
          lc[lineIdx + 1] = 0.36 * alpha;
          lc[lineIdx + 2] = 0.42 * alpha;
          lc[lineIdx + 3] = 0.3 * alpha;
          lc[lineIdx + 4] = 0.36 * alpha;
          lc[lineIdx + 5] = 0.42 * alpha;
          lineIdx += 6;
        }
      }
    }

    // zero out unused segments
    for (let k = lineIdx; k < lp.length; k++) {
      lp[k] = 0;
      lc[k] = 0;
    }

    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    if (lineRef.current) {
      (lineRef.current.geometry as THREE.BufferGeometry).setDrawRange(
        0,
        lineIdx / 3,
      );
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.06}
          color="#6F8396"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.6} />
      </lineSegments>
    </>
  );
}

export default Particles;

// components/AnimatedBottle.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import { Color, MathUtils } from 'three';

export function Model() {
  const group = useRef();
  const capRef = useRef();
  const scarfRef = useRef();
  const bodyRef = useRef();
  const scroll = useScroll();

  const { nodes, materials } = useGLTF('/dyane.glb');

  // Clone the scarf material for color animation.
  const scarfMaterial = materials['Material.005'].clone();
  const originalColor = scarfMaterial.color.clone();
  const burgundyColor = new Color('#a6333a');
  const sageGreenColor = new Color('#6f8d6b');

  // Determine if the device is small (e.g., mobile)
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // New initial rotation value (30° instead of 60°)
  const initialRotation = Math.PI / 6;
  // Set initial values with responsive adjustments.
  const initialPositionX = isSmallDevice ? -2.0 : -2.8;
  const prevValues = useRef({
    positionX: initialPositionX,
    positionY: -1.5,
    rotationY: initialRotation,
    capPositionY: 0,
    capRotationY: 0,
    cameraX: -1.0,
    cameraY: 0,
    cameraZ: 2.8,
    cameraFov: 40,
    scale: 1.32,
    prevScroll: 0
  });

  useFrame((state, delta) => {
    const scrollProgress = scroll.offset; // from 0 to 1
    const time = state.clock.elapsedTime;
    const floatY = Math.sin(time * 1.2) * 0.05; // subtle bobbing

    // Define animation sections with even distribution
    const section1 = scrollProgress < 0.2 ? scrollProgress / 0.2 : 1;
    const section2 =
      scrollProgress >= 0.2 && scrollProgress < 0.4
        ? (scrollProgress - 0.2) / 0.2
        : scrollProgress < 0.2
        ? 0
        : 1;
    const section3 =
      scrollProgress >= 0.4 && scrollProgress < 0.6
        ? (scrollProgress - 0.4) / 0.2
        : scrollProgress < 0.4
        ? 0
        : 1;
    const section4 =
      scrollProgress >= 0.6 && scrollProgress < 0.75
        ? (scrollProgress - 0.6) / 0.15
        : scrollProgress < 0.6
        ? 0
        : 1;
    const section5 =
      scrollProgress >= 0.75 && scrollProgress < 1
        ? (scrollProgress - 0.75) / 0.25
        : scrollProgress < 0.75
        ? 0
        : 1;

    // --- Responsive Model Position X ---
    const targetPositionX = isSmallDevice ? -2.0 : -2.8;
    const targetPositionY = -1.5 + floatY;

    // --- Model Rotation Y ---
    let targetRotationY = initialRotation;
    if (scrollProgress >= 0.75) {
      targetRotationY = initialRotation + 2 * Math.PI * section5;
    }

    // --- Cap Animation ---
    let targetCapPositionY = 0;
    let targetCapRotationY = 0;
    if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
      const easeInOut = t =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const eased = easeInOut(section2);
      targetCapPositionY = eased * 0.35;
      targetCapRotationY = eased * (1.85 * Math.PI);
    } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
      const easeInOut = t =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const eased = easeInOut(1 - section3);
      targetCapPositionY = eased * 0.35;
      targetCapRotationY = eased * (1.85 * Math.PI);
    }

    // --- Scarf Color Transitions ---
    if (scrollProgress < 0.75) {
      scarfMaterial.color.copy(originalColor);
    } else if (scrollProgress < 0.85) {
      const t = (scrollProgress - 0.75) / 0.1;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      scarfMaterial.color.lerpColors(originalColor, burgundyColor, eased);
    } else if (scrollProgress < 0.95) {
      const t = (scrollProgress - 0.85) / 0.1;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      scarfMaterial.color.lerpColors(burgundyColor, sageGreenColor, eased);
    } else {
      const t = (scrollProgress - 0.95) / 0.05;
      const eased = MathUtils.smoothstep(t, 0, 1);
      scarfMaterial.color.lerpColors(sageGreenColor, originalColor, eased);
    }

    // --- Camera Animations & Model Scale ---
    let targetCameraX = -1.6;
    let targetCameraY = 0;
    let targetCameraZ = 1.48;
    let targetCameraFov = 40;
    let targetScale = 1;
    if (scrollProgress < 0.2) {
      targetCameraY = section1 * 0.3;
      targetCameraZ = 2.8 - section1 * 0.3;
    } else if (scrollProgress < 0.6) {
      targetCameraX = -1.86;
      targetCameraY = 0.43;
      targetCameraZ = 1.95;
    } else if (scrollProgress < 0.75) {
      targetCameraY = 0.3 - section4 * 0.3;
      targetCameraZ = 2.5;
      const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
      targetScale = 1.32 - easeOutCubic(section4) * 0.32;
    } else {
      targetCameraX = -1.86;
      targetCameraY = -0.57;
      targetCameraZ = 2.85;
      targetScale = 0.8;
    }

    // --- Smooth Interpolation ---
    const positionLerpFactor = 1 - Math.pow(0.4, delta * 15);
    const rotationLerpFactor = 1 - Math.pow(0.2, delta * 15);
    const cameraLerpFactor = 1 - Math.pow(0.3, delta * 15);

    const positionX = MathUtils.lerp(
      prevValues.current.positionX,
      targetPositionX,
      positionLerpFactor
    );
    const positionY = MathUtils.lerp(
      prevValues.current.positionY,
      targetPositionY,
      positionLerpFactor
    );

    let rotationY;
    const currentRotY = prevValues.current.rotationY;
    const rotDiff = targetRotationY - currentRotY;
    if (Math.abs(rotDiff) > Math.PI) {
      if (rotDiff > 0) {
        rotationY = MathUtils.lerp(
          currentRotY,
          targetRotationY - Math.PI * 2,
          rotationLerpFactor
        );
      } else {
        rotationY = MathUtils.lerp(
          currentRotY,
          targetRotationY + Math.PI * 2,
          rotationLerpFactor
        );
      }
      rotationY = rotationY % (Math.PI * 2);
      if (rotationY < 0) rotationY += Math.PI * 2;
    } else {
      rotationY = MathUtils.lerp(currentRotY, targetRotationY, rotationLerpFactor);
    }

    const capPositionY = MathUtils.lerp(
      prevValues.current.capPositionY,
      targetCapPositionY,
      positionLerpFactor
    );
    const capRotationY = MathUtils.lerp(
      prevValues.current.capRotationY,
      targetCapRotationY,
      rotationLerpFactor
    );
    const cameraX = MathUtils.lerp(
      prevValues.current.cameraX,
      targetCameraX,
      cameraLerpFactor
    );
    const cameraY = MathUtils.lerp(
      prevValues.current.cameraY,
      targetCameraY,
      cameraLerpFactor
    );
    const cameraZ = MathUtils.lerp(
      prevValues.current.cameraZ,
      targetCameraZ,
      cameraLerpFactor
    );
    const cameraFov = MathUtils.lerp(
      prevValues.current.cameraFov,
      targetCameraFov,
      cameraLerpFactor
    );
    const newScale = MathUtils.lerp(
      prevValues.current.scale,
      targetScale,
      positionLerpFactor
    );

    // --- Apply the interpolated values ---
    group.current.position.x = positionX;
    group.current.position.y = positionY;
    group.current.rotation.y = rotationY;
    group.current.scale.set(newScale, newScale, newScale);

    capRef.current.position.y = capPositionY;
    capRef.current.rotation.y = capRotationY;

    state.camera.position.set(cameraX, cameraY, cameraZ);
    state.camera.fov = cameraFov;
    state.camera.updateProjectionMatrix();

    // Update previous values.
    prevValues.current = {
      positionX,
      positionY,
      rotationY,
      capPositionY,
      capRotationY,
      cameraX,
      cameraY,
      cameraZ,
      cameraFov,
      scale: newScale,
      prevScroll: scrollProgress
    };
  });

  return (
    <group
      ref={group}
      dispose={null}
      position={[initialPositionX, -1.5, 0]}
      scale={1.32}
      rotation={[0, initialRotation, 0]}
    >
      <mesh
        ref={bodyRef}
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        material={materials['Material.005']}
      />
      <mesh
        ref={scarfRef}
        castShadow
        receiveShadow
        geometry={nodes.scarf.geometry}
        material={scarfMaterial}
      />
      <mesh
        ref={capRef}
        castShadow
        receiveShadow
        geometry={nodes.cap.geometry}
        material={materials['Material.005']}
      />
    </group>
  );
}

useGLTF.preload('/dyane.glb');

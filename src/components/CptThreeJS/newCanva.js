import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

extend({ OrbitControls });

const SpaceShip = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    //new FBXLoader().load("/modelos3D/led.fbx", setModel);
    new GLTFLoader().load("/modelos3D/led_rojo.glb", setModel);
  });
  //console.log(model);
  return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[500, 500]} />
    <meshPhysicalMaterial
      attach="material"
      color={0x999999}
      depthWrite={false}
    />
  </mesh>
);

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray"
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

export default () => {
  const isBrowser = typeof window !== "undefined";

  return (
    <>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 0, 10] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <fog attach="fog" args={["0xa0a0a0", 200, 1000]} />
          <Controls />
          {/* <Box /> */}
          <Plane />
          <mesh>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 200, 0]} />
            <SpaceShip />
          </mesh>
        </Canvas>
      )}
    </>
  );
};

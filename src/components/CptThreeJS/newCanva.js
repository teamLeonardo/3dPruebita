import React, { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  useLoader
} from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { Vector3, MeshStandardMaterial, Color, Colors } from "three";

extend({ OrbitControls });

const SpaceShip2 = props => {
  const gltf = useLoader(GLTFLoader, "/modelos3D/playboardVs2.glb");

  let Apagado = new MeshStandardMaterial({ color: new Color(0x404344) });

  let contador = 0;
  useFrame(() => {
    contador++;
    if (contador >= props.intervalo / 20 && contador <= props.intervalo / 10) {
      gltf.scene.children[0].material = new MeshStandardMaterial({
        color: new Color(0xea0000)
      });
      gltf.scene.children[1].material = new MeshStandardMaterial({
        color: new Color(0xeae100)
      });
      gltf.scene.children[2].material = new MeshStandardMaterial({
        color: new Color(0x20ea00)
      });
    } else {
      gltf.scene.children[0].material = Apagado;
      gltf.scene.children[1].material = Apagado;
      gltf.scene.children[2].material = Apagado;
    }
    if (contador > props.intervalo / 10) {
      contador = 0;
    }
  });

  return <primitive object={gltf.scene} dispose={null} />;

  //return model ? <primitive object={model.scene} /> : null;
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
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[20, 20]} />
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

export default ({ intervalo }) => {
  const isBrowser = typeof window !== "undefined";

  return (
    <>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 0, 10] }}
          onCreated={({ gl }) => {
            // gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <fog attach="fog" args={["0xa0a0a0", 200, 1000]} />
          <Controls />
          {/* <Box /> */}

          <ambientLight intensity={0.5} />

          <spotLight position={[0, 20, 0]} />
          <Plane position={[0, 0, 0]} />

          <Suspense fallback={null}>
            <SpaceShip2 intervalo={intervalo} />
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

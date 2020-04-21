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
import { Vector3, MeshStandardMaterial, Color } from "three";

extend({ OrbitControls });
const velocidad = 0.05;
const intervalo = 2000;
const SpaceShip = props => {
  const { nodes, materials, scene } = useLoader(
    GLTFLoader,
    "/modelos3D/playbot.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group name="Plano">
        <mesh
          material={materials["Material.042"]}
          geometry={nodes["Cube_003_0"]}
        />
      </group>
    </group>
  );
};

const SpaceShip2 = props => {
  const gltf = useLoader(GLTFLoader, "/modelos3D/apagado.glb");
  const [prendido, setPrendido] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setPrendido(!prendido);
    }, intervalo);
  });
  useFrame(() => {
    if (prendido) {
      gltf.scenes[0].children[0].material = new MeshStandardMaterial({
        color: 0xf21919
      });
    } else {
      gltf.scenes[0].children[0].material = new MeshStandardMaterial({
        color: 0x222323
      });
    }

    if (gltf.scene.position.x <= 10) {
      gltf.scene.position.x += velocidad;
    } else {
      gltf.scene.position.x = 0;
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

export default ({ estado, posiX }) => {
  const isBrowser = typeof window !== "undefined";
  const [state, setState] = useState(estado);
  const [poseX, setPoseX] = useState(posiX);
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
            {state ? <SpaceShip /> : <SpaceShip2 />}
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

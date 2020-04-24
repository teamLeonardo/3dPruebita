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
  useLoader,
  Dom
} from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { Vector3, MeshStandardMaterial, Color, Colors } from "three";

extend({ OrbitControls });
// const ad = useLoader(GLTFLoader, "/modelos3D/apagado.glb");

const LedsGenera = porps => {
  const led = useLoader(GLTFLoader, "/modelos3D/apagado.glb");
  led.scene.position.y = 0;
  return <primitive object={led.scene} {...porps} />;
};

const SpaceShip2 = props => {
  const placa = useLoader(GLTFLoader, "/modelos3D/playboardVs2.glb");
  placa.scene.children[0].visible = false;
  placa.scene.position.y = 0;
  let posi = placa.scene.children[0].position;
  //console.log(placa);
  return (
    <>
      <primitive
        object={placa.scene}
        position={[0, 0, 0]}
        scale={[3, 3, 3]}
        rotation={[0, -135, 0]}
        dispose={null}
      />
      <LedsGenera position={[2, 0, 3]} />
    </>
  );

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

export default ({ intervalo }) => {
  const isBrowser = typeof window !== "undefined";
  const [render, setRender] = useState(false);
  const limpiarRender = () => {};
  const changeStateRender = async () => {
    await setRender(!render);
  };
  return (
    <>
      <div>
        <button className={"btn-play-render"} onClick={changeStateRender}>
          {render ? "apagar" : "play"}
        </button>
      </div>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 0, 10] }}
          onCreated={({ gl }) => {
            // gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <fog attach="fog" args={[0xa0a0a0, 0, 30]} />
          <Controls />
          {/* <Box /> */}

          <ambientLight intensity={1.5} />

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

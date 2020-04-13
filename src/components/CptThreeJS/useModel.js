import React from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default function Asset({ url }) {
  const { nodes, materials } = useLoader(GLTFLoader, url);
  console.log(nodes);
  return <primitive object={nodes.scene} />;
}

"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
function Fire(){const ref=useRef<Mesh>(null);useFrame((_,d)=>{if(ref.current){ref.current.rotation.y+=d*.13;ref.current.rotation.x+=d*.035}});return <><ambientLight intensity={.18}/><pointLight color="#E8542A" intensity={2} position={[4,4,4]}/><Stars radius={20} depth={14} count={500} factor={1.5} fade speed={.5}/><Float speed={1.2} floatIntensity={.5} rotationIntensity={.2}><mesh ref={ref} scale={2.5}><tetrahedronGeometry args={[1.35,0]}/><meshStandardMaterial color="#1A120B" emissive="#E8542A" emissiveIntensity={.12} transparent opacity={.38}/><Edges color="#E8542A"/></mesh></Float></>}
export function FireBackground(){return <div className="fire-bg" aria-hidden="true"><Canvas camera={{fov:50,position:[0,0,7]}} dpr={[1,1.4]}><Fire/></Canvas></div>}

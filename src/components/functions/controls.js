import * as THREE from 'three-full';

const createControls =(camera, container)=> {
   
    let controls = new THREE.OrbitControls( camera, container );
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.enableZoom =true;
    return controls;
}

export default createControls;
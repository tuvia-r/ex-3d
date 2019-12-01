import * as THREE from 'three-full';

const makeBondingBox = (min,max) =>{
    let geometryBox = new THREE.Geometry();
    geometryBox.vertices.push(
        //base
        new THREE.Vector3( min.x, min.y, min.z ),
        new THREE.Vector3( max.x,min.y,min.z ),
        new THREE.Vector3( max.x,min.y,max.z),
        new THREE.Vector3( min.x,min.y,max.z),
        new THREE.Vector3( min.x, min.y, min.z ),

        //top
        //*wall0
        new THREE.Vector3( min.x, max.y, min.z ),

        //top
        new THREE.Vector3( max.x, max.y, min.z ),
        new THREE.Vector3( max.x, max.y, max.z),
        new THREE.Vector3( min.x,max.y,max.z ),
        new THREE.Vector3( min.x,max.y,min.z),


        //walls


        //wall1
        new THREE.Vector3( max.x, max.y, min.z ),

        new THREE.Vector3( max.x,min.y,min.z ),

        //wall2
        new THREE.Vector3( max.x, max.y, min.z ),
        new THREE.Vector3( max.x, max.y, max.z),

        new THREE.Vector3( max.x,min.y,max.z),

        //wall3
        new THREE.Vector3( max.x, max.y, max.z),
        new THREE.Vector3( min.x,max.y,max.z ),

        new THREE.Vector3( min.x,min.y,max.z),


    );

    let material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    let line = new THREE.Line( geometryBox, material );
    return line;
}




export default makeBondingBox;
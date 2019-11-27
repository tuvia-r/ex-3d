import * as THREE from 'three-full';


const reyFromPoint = (Points,camera,offsetWidth,offsetHeight) =>{
    // normlize to {-1,1}
    let normPonts = Points.map(value => getNormelizedPosition(value,offsetWidth,offsetHeight));

    let rayCasters = normPonts.map(value =>{let r = new THREE.Raycaster();
        let v = new THREE.Vector2(value.x,value.y);
        r.setFromCamera( v, camera )
        return r});
    return rayCasters;
}

const getNormelizedPosition = (position,offsetWidth,offsetHeight) =>{
    let normCoardinates = {};
    normCoardinates.x = (position.x  )/offsetWidth * 2 - 1;
    normCoardinates.y =  (((position.y )/ offsetHeight ) * 2 - 1)*(-1);
    return normCoardinates
}

export default reyFromPoint;
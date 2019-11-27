import * as THREE from 'three-full';
// import {PLYLoader} from './PLYLoader'

const lodeModel = (srcURL ,callBack) =>{
    var loader = new THREE.PCDLoader();
    loader.load(
    srcURL,
    // called when the resource is loaded
    function ( mesh ) {
      console.log('mesh',mesh)
      if(mesh){
        callBack(mesh);
      }
    },
    // called when loading is in progresses
    function ( xhr ) {

      console.log( Math.round( xhr.loaded / xhr.total * 100 ) + '% loaded');

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened',error );

    }
  );
}

export default lodeModel;
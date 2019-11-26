import * as THREE from 'three-full';
// import {PLYLoader} from './PLYLoader'

const lodeModel = (srcURL ,scene) =>{
    // PCDLoader(THREE);
    var loader = new THREE.TTFLoader();
    // load a resource
    // loader.addEventListener( 'load', function ( event ) {
      
    //   	var geometry = event.content;
    //   	scene.add( new THREE.Mesh( geometry ) );
      
    //   	} );
    //   	loader.load( srcURL );
    loader.load(
    // resource URL
    srcURL,
    // called when the resource is loaded
    function ( mesh ) {
      console.log(mesh);
      return mesh;

    },
    // called when loading is in progresses
    function ( xhr ) {

      console.log( Math.round( xhr.loaded / xhr.total * 100 ) + '% loaded' ,xhr);

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened',error );

    }
  );
}

export default lodeModel;
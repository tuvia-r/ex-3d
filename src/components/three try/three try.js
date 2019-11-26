import React, { Component } from 'react';
// import 'three/examples/js/loaders/PCDLoader';
import * as THREE from 'three-full';
// import 'three/examples/js/loaders/PCDLoader';
import {SketchField, Tools} from 'react-sketch';
import ResizableRect from 'react-resizable-rotatable-draggable'


// import OrbitControls from 'three-orbitcontrols';
// PCDLoader(THREE);

// require('three/examples/js/loaders/PCDLoader.js');




const OrbitControls = require('three-orbitcontrols')
class ThreeScene extends Component{
  constructor(props){
    super(props);
    this.state = {
      select:false,
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      rotateAngle: 0
    }
    this.axis = []
  }


  handleResize = (style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style
    top = Math.round(top)
    left = Math.round(left)
    width = Math.round(width)
    height = Math.round(height)
    this.setState({
      top,
      left,
      width,
      height
    })
  }

  handleRotate = (rotateAngle) => {
    this.setState({
      rotateAngle
    })
  }

  handleDrag = (deltaX, deltaY) => {
    this.setState({
      left: this.state.left + deltaX,
      top: this.state.top + deltaY
    })
  }


  componentDidMount(){
    const initdrow = () => this.state.select&&this.initDraw(this.drowCanves);
    initdrow();
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 15
    this.camera.position.y = 2
    this.camera1 = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    )
    this.camera1.position.z = 15
    this.camera1.position.y = 2
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('white')
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.mount.appendChild(this.renderer.domElement)
    this.renderer1 = new THREE.WebGLRenderer({ antialias: true })
    this.renderer1.setClearColor('white')
    this.renderer1.setSize(width, height)
    this.renderer1.setPixelRatio( window.devicePixelRatio );
    this.mount1.appendChild(this.renderer1.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    // const material = new THREE.MeshToonMaterial ({ color: '#433F81' })
    // material.alphaMap = 0;
    this.cube = new THREE.Mesh(geometry, material)
    // this.cube.applyQuaternion()
    // this.scene.add(this.cube)
    const light = new THREE.HemisphereLight ( 0xffffff, 5.0 );

    //move the light back and up a bit
    light.position.set( 2, 2, 0 );

     //remember to add the light to the scene
    this.scene.add( light );
    
    this.makeBox(
        new THREE.Vector3( -1,0,0),
        new THREE.Vector3( 1, 1,-1 ),
        this.scene
    )
    this.boundingBox();
    this.createControls(this.camera,this.mount);
    this.createControls(this.camera1,this.mount1);
    this.lodeModel('http://127.0.0.1:8000/\CrossSelection2_11-31-01_Convert to ASCII.txt')
    this.start()
  }


  boundingBox = ()=>{
    var sphereObject = new THREE.Mesh( 
        new THREE.SphereGeometry(Math.PI /4), 
        new THREE.MeshStandardMaterial( { color: '#433F81' }  )
    );
    sphereObject.position.x = 4
    // Creating the actual bounding box with Box3
    sphereObject.geometry.computeBoundingBox();
    var box = sphereObject.geometry.boundingBox.clone();
    // var box1 = this.line.geometry.boundingBox;
    console.log(this.line);
    // ...

    console.log(sphereObject.geometry.boundingBox.max);
    // const max = sphereObject.geometry.boundingBox.max;
    // console.log(max.x,max.y,max.z);
    // In the animation loop, to keep the bounding box updated after move/rotate/scale operations
    sphereObject.updateMatrixWorld( true );
    box.copy( sphereObject.geometry.boundingBox ).applyMatrix4( sphereObject.matrixWorld );
    this.makeBox(box.min,box.max,this.scene);

    this.scene.add(sphereObject);
    // this.scene.add(box)

  }



componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
// animate = () => {
//     // this.line.rotation.x += 0.01
// //    this.cube.rotation.x += 0.01
// //    this.cube.rotation.y += 0.01
// //    this.camera.position.y = (this.camera.position.y + 0.01) %3
// //    this.camera.position.x = (this.camera.position.x + 0.01) %5 
//    this.renderScene()
//    this.frameId = window.requestAnimationFrame(this.animate)
//  }


 animate=() =>{

	requestAnimationFrame( this.animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	this.controls.update();

  this.renderer.render( this.scene, this.camera );
  this.renderer1.render( this.scene, this.camera1 );

}

lodeModel = (srcURL) =>{
    // PCDLoader(THREE);
    var loader = new THREE.PCDLoader();
    // load a resource
    loader.load(
    // resource URL
    srcURL,
    // called when the resource is loaded
    function ( mesh ) {

      this.scene.add( mesh );

    },
    // called when loading is in progresses
    function ( xhr ) {

      console.log( Math.round( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened',error );

    }
  );
}


// renderScene = () => {
//   this.renderer.render(this.scene, this.camera)
// }

makeBox = (max,min,scene) =>{
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

    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const line = new THREE.Line( geometryBox, material );
    scene.add( line );
}

createControls =(camera, container)=> {
   
    this.controls = new THREE.OrbitControls( camera, container );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.15;
    this.controls.enableZoom =true
  
}

drow = () =>{
    //   const {width, top, left, height, rotateAngle} = this.state;
    //   return this.state.select && (<ResizableRect
    //   left={left}
    //   top={top}
    //   width={width}
    //   height={height}
    //   rotateAngle={rotateAngle}
    //   // aspectRatio={false}
    //   // minWidth={10}
    //   // minHeight={10}
    //   zoomable='n, w, s, e, nw, ne, se, sw'
    //   // rotatable={true}
    //   // onRotateStart={this.handleRotateStart}
    //   onRotate={this.handleRotate}
    //   // onRotateEnd={this.handleRotateEnd}
    //   // onResizeStart={this.handleResizeStart}
    //   onResize={this.handleResize}
    //   // onResizeEnd={this.handleUp}
    //   // onDragStart={this.handleDragStart}
    //   onDrag={this.handleDrag}
    //   // onDragEnd={this.handleDragEnd}
    //   ref={(drow) => { this.drowCanves = drow }}
    // />
    // )
  return this.state.select && <SketchField style={{width:'100%'
            ,height:'100%'
            ,position:'absolute',
            top:0}}
            tool={Tools.Rectangle}
            lineColor='black'
            lineWidth={1}
            ref={(drow) => { this.drowCanves = drow }}
            />
  }



render(){
  // this.slect = false;
  if (this.drowCanves){
    if(this.drowCanves._selectedTool){
      if(this.drowCanves._selectedTool.rect)
      { const aCoords = this.drowCanves._selectedTool.rect.aCoords
        console.log(aCoords)
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( aCoords.bl, this.camera );
        console.log(raycaster)
      }}}
  console.log(this.axis)
    return(
      <div>
        <div style={{alignItems:'left',display:'flex'}}>
            <div
              style={{ width: (window.innerWidth/2), height: window.innerHeight }}
              ref={(mount) => { this.mount = mount }}
            />
            <div
              style={{ width: (window.innerWidth/2), height: window.innerHeight ,top:0 ,left:(window.innerWidth/2)-2}}
              ref={(mount) => { this.mount1 = mount }}
            />
          </div>
          {this.drow()}
        <button onClick={()=>{
          if (this.drowCanves){
            if(this.drowCanves._selectedTool){
              if(this.drowCanves._selectedTool.rect)
                  this.axis.push(this.drowCanves._selectedTool.rect.aCoords)}};
          this.setState({select : !this.state.select})}} style={{top:0,
          position:'absolute',
          height:50,
          width:100,
          left:0,
          backgroundColor:'black',
          color:'white'}}>
          drow
        </button>
      </div>
    )
  }
}
export default ThreeScene
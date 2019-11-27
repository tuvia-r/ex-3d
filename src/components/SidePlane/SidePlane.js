import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three-full';
import createControls from '../functions/controls';
import reyFromPoint from '../functions/rayFromPoints';
import {SketchField, Tools} from 'react-sketch';
import './SidePlane.css'

class SidePlane extends React.Component{
    static propTypes = {
        scene:PropTypes.object,
        sendSelectedVertices:PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            drawMode:false,
            scene:props.scene
        }
        //ref of the drawings
        this.drowCanves = null;
        this.buttonStyle = {top:0,
            height:20,
            width:40,
            left:0,
            backgroundColor:'black',
            color:'white',

          }
    }

    componentDidMount(){
        this.width = this.mount.offsetWidth;
        this.height = this.mount.offsetHeight;

        //add a camera
        const fov = 50; // AKA Field of View
        const aspect = this.width / this.height;
        const near = 0.1; // the near clipping plane
        const far = 1000; // the far clipping plane
        this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
        this.camera.position.z = 15;
        this.camera.position.y = 2;

        // add a light
        const light = new THREE.HemisphereLight ( 0xffffff, 5.0 );
        light.position.set( 2, 2, 0 );
        this.state.scene.add( light );


        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('white')
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio( window.devicePixelRatio );

        this.mount.appendChild(this.renderer.domElement)

        this.controls = createControls(this.camera,this.mount);

        this.start()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }


      componentWillReceiveProps(props){
          this.setState({sence:props.scene})
      }

    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }


    stop = () => {
        cancelAnimationFrame(this.frameId)
      }


    animate =() =>{
        requestAnimationFrame( this.animate );

        // required if controls.enableDamping or controls.autoRotate are set to true
        this.controls.update();

        this.renderer.render( this.state.scene, this.camera );
        }


    onDrawClick = () =>{
      //convert the vertices points of the rectangle into raycasters,
      // and send them to the scene handler.
      if (this.drowCanves){
          if(this.drowCanves._selectedTool){
            if(this.drowCanves._selectedTool.rect){
                  let pointsObject = this.drowCanves._selectedTool.rect.aCoords;
                  let keys = ['bl','br','tl','tr'];
                  let points = [...keys.map(value=>pointsObject[value])];
                this.props.sendSelectedVertices(reyFromPoint(
                      points,
                      this.camera,
                      this.mount.offsetWidth,
                      this.mount.offsetHeight
                      )
                    );
                  }
              }
          };
          this.setState({drawMode : !this.state.drawMode})
    }


    draw = () =>{ 
      return this.state.drawMode && <SketchField style={{width:(window.innerWidth/3)
      ,height:(window.innerHeight/3) + 'px'
      ,position:'absolute',
      top:this.mount.offsetTop}}
      tool={Tools.Rectangle}
      lineColor='black'
      lineWidth={1}
      ref={(drow) => { this.drowCanves = drow }}
      height ={(window.innerHeight/3) + 'px'}
      />}


    render(){
        return <div >
                    <div
                    style={{ width: (window.innerWidth/3), height: window.innerHeight/3 }}
                        ref={(mount) => { this.mount = mount }}
                    />
                    {this.draw()}
                    <button onClick={this.onDrawClick} style={this.buttonStyle}>drow</button>
                </div>
    }

}


export default SidePlane;
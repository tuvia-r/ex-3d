import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three-full';
import createControls from '../functions/controls';
import './main view.css'

class MainCanvesView extends React.Component{
    static propTypes = {
        scene:PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            scene:props.scene
        }
    }

    componentDidMount(){
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // add a camera
        this.fov = 50; // AKA Field of View
        this.aspect = width / height;
        this.near = 0.1; // the near clipping plane
        this.far = 1000; // the far clipping plane
        this.camera = new THREE.PerspectiveCamera( this.fov, this.aspect, this.near, this.far );
        this.camera.position.z = 15;
        this.camera.position.y = 2;

        // add light
        const light = new THREE.HemisphereLight ( 0xffffff, 5.0 );
        light.position.set( 2, 2, 0 );
        this.state.scene.add( light );

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('white')
        this.renderer.setSize(width, height)
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



    render(){
        return <div>
                    <div
                        style={{ width: (window.innerWidth/2), height: window.innerHeight ,top:'30px' }}
                        ref={(mount) => { this.mount = mount }}
                    />
                </div>
    }

}


export default MainCanvesView;
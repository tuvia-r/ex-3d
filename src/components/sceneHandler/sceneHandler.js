import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three-full';
import MainCanvesView from '../main view/main view';
import SidePlane from '../SidePlane';
import lodeModel from '../functions/loadPCD';
import makeBondingBox from '../functions/boundingBox';
import findBoxByRays from '../functions/findBoxByRays';

class SceneHandler extends React.Component{
    static propTypes = {
        srcUrl:PropTypes.string
    }

    constructor(props){
        super(props);
        this.state = {
            scene: new THREE.Scene()
        }
        this.rays = {
            A:[],
            B:[]
        }
    }

    componentDidMount(){
        //* for testing its easier to just add a sphare:


        // let scene = this.state;
        // var sphereObject = new THREE.Mesh( 
        //     new THREE.SphereGeometry(Math.PI /4), 
        //     new THREE.MeshStandardMaterial( { color: '#433F81' }  )
        // );
        // sphereObject.position.x = 4
        // this.addToScene(sphereObject)


        // the loader doas not wark localy
        lodeModel('https://github.com/tuvia-r/ex-3d/raw/master/src/components/sceneHandler/pclASCII1.pcl',this.addToScene);
        // if you dont run it on a server this will be blaked by CORS
    }

    addToScene = (scene)=>{
        this.state.scene.add(scene);
        this.setState({scene:this.state.scene});

    }

    



    getDrawingRays = (rays,plane)=>{
        this.rays[plane] = rays;
        if (this.rays.A.length > 0 && this.rays.B.length > 0){
            const boxData = findBoxByRays(this.rays,this.state.scene);
            if (boxData){
                const box = makeBondingBox(boxData.min,boxData.max);
                this.state.scene.add(box);
                this.setState({scene:this.state.scene});
                this.rays.A = [];
                this.rays.B = []
            }
        }
    }



    render(){
        return (
            <tr style={{top:30}}>
                <th>
                    <ul>
                        <li>
                            <MainCanvesView scene={this.state.scene} style={{top:30}}/>
                        </li>
                    </ul>
                </th>
                <th style={{top:0, position:'absolute'}}>
                <ul>
                    <li>
                        <SidePlane 
                        scene={this.state.scene}
                        sendSelectedVertices= {(points)=>this.getDrawingRays(points,'A')}
                        />
                    </li>
                    <li>
                        <SidePlane 
                        scene={this.state.scene}
                        sendSelectedVertices= {(rays)=>this.getDrawingRays(rays,'B')}
                        />
                    </li>
                </ul>
            </th>
        </tr>
        )
    }
}


export default SceneHandler;
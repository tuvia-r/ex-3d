import intersection from '../functions/linsIntersection';
import * as THREE from 'three-full';

const findBoxByRays = (rays)=>{

    // get the vectors
    let rayObjectsA = rays.A.map(
                    value =>{ return {
                                    origin:value.ray.origin,
                                    direction:value.ray.direction
                                }
                            }
                        );

    let rayObjectsB = rays.B.map(
        value =>{ return {
                        origin:value.ray.origin,
                        direction:value.ray.direction
                    
                }}
            );
    
    let allX = [];
    let allY = [];
    let allZ = [];

    //find all the intersections
    for(let i = 0; i< rayObjectsA.length;i++){
        for(let j = 0; j< rayObjectsB.length;j++){
            let originA = {...rayObjectsA[i].origin};

            let originB = {...rayObjectsB[i].origin};

            // get a second point on the line for usage of the `intersection` function
            let point2A = scalarMoltply(rayObjectsA[i],1000);
            let point2B = scalarMoltply(rayObjectsB[j],1000);

            
            let intersecXY = intersection(originA.x ,originA.y ,
                                        point2A.x,point2A.y,
                                        originB.x ,originB.y,
                                        point2B.x,point2B.y);
            if (intersecXY != null ){
                allX.push(intersecXY.x);
                allY.push(intersecXY.y);
            }


            let intersecXZ = intersection(originA.x,originA.z,
                                    point2A.x,point2A.z,
                                    originB.x,originB.z,
                                    point2B.x,point2B.z);
            if (intersecXZ != null){
                allX.push(intersecXZ.x);
                allZ.push(intersecXZ.y)
            }

            let intersecYZ =  intersection(originA.y,originA.z,
                                        point2A.y,point2A.z,
                                        originB.y,originB.z,
                                        point2B.y,point2B.z);
            if (intersecYZ != null){
                allY.push(intersecYZ.x);
                allZ.push(intersecYZ.y)
            }

        }
    }
   
    
    allX = allX.sort((a,b)=>a-b)
    allY = allY.sort((a,b)=>a-b)
    allZ = allZ.sort((a,b)=>a-b)

    // get the max and min point, and filter noissy data
    let maxPoint = {x:allX[allX.length - 5],y:allY[allY.length - 5],z:allZ[allZ.length - 5]};
    let minPoint = {x:allX[5],y:allY[5],z:allZ[7]};
    return {min:minPoint,max:maxPoint};
}



const scalarMoltply = (vec,scalar) =>{
    let x = vec.origin.x +(scalar*vec.direction.x);
    let y = vec.origin.y +(scalar*vec.direction.y);
    let z = vec.origin.z +(scalar*vec.direction.z);
    return{x:x,y:y,z:z};
}



export default findBoxByRays;
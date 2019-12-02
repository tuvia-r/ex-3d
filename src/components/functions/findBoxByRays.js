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
        for(let j = 0; j< rayObjectsB.length ;j++){
            let originA = {...rayObjectsA[i].origin};

            let originB = {...rayObjectsB[i].origin};

            // get a second point on the line for usage of the `intersection` function
            let point2A = getSecondPoint(rayObjectsA[i],1000);
            let point2B = getSecondPoint(rayObjectsB[j],1000);

            
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
                allZ.push(intersecXZ.y)
            }

            let intersecYZ =  intersection(originA.y,originA.z,
                                        point2A.y,point2A.z,
                                        originB.y,originB.z,
                                        point2B.y,point2B.z);
            if (intersecYZ != null){
                allZ.push(intersecYZ.y)
            }

        }
       
        
    }

  
   
    
    allX = allX.sort((a,b)=>a-b)
    allY = allY.sort((a,b)=>a-b)
    allZ = allZ.sort((a,b)=>a-b)


    // filter some noise

    
    allX = filterLastEl(allX);
    allY = filterLastEl(allY);
    allZ = filterLastEl(allZ);


    allY  = filterfirstEl(allY)

    





    


    // get the max and min point
    let maxPoint1 = {x:allX[allX.length - 1] * 0.75,y:allY[allY.length - 1],z:allZ[allZ.length -1] * 0.9};
    let minPoint1 = {x:allX[0] * 0.75,y:allY[0],z:allZ[0] * 0.9};
    return {min:minPoint1,max:maxPoint1};
}





const getSecondPoint = (vec,dist) =>{
    let x = vec.origin.x +(dist*vec.direction.x);
    let y = vec.origin.y +(dist*vec.direction.y);
    let z = vec.origin.z +(dist*vec.direction.z);
    return{x:x,y:y,z:z};
}

const filterLastEl = (list)=>{
    if (list.length > 8){
        let toFilter = list[list.length-1];
        if (toFilter == 0) return list;
        return list.filter(value =>  {if (value==0)return 0;
             return Math.abs( value - toFilter) >0.01 && value});
    }
    return list;
}

const filterfirstEl = (list)=>{
    if (list.length > 8){
        let toFilter = list[0];
        return list.filter(value =>  {if (value==0)return 0;
             return Math.abs( value - toFilter) >0.01 && value});
    }
    return list;
}





export default findBoxByRays;
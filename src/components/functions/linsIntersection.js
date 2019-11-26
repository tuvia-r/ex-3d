

const intersection = (from1x,from1y, to1x,to1y, from2x,from2y, to2x,to2y)=>{
    const dX = to1x - from1x;
    const dY = to1y - from1y;
  
    const determinant = dX * (to2y - from2y) - (to2x - from2x) * dY;
    if (determinant === 0) return null; // parallel lines
  
    const lambda = ((to2y - from2y) * (to2x - from1x) + (from2x - to2x) * (to2y - from1y)) / determinant;
    const gamma = ((from1y - to1y) * (to2x - from1x) + dX * (to2y - from1y)) / determinant;
  
    // check if there is an intersection
    if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return null;
  
    return {
      x: from1x + lambda * dX,
      y: from1y + lambda * dY,
    };
  }

  export default intersection;
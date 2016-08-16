
function generateMaze(sizein, specs, type){
  console.log("genning...");
  console.log(type);
  switch(type){
    case 'cellular':
    return generateCellular(sizein, specs)
      break;
    case 'depth-first':
      return generateDepthFirst(sizein, specs)
      break;
    case 'random':
      return generateRandom(sizein, specs)
      break;
    default:
    return generateDepthFirst(sizein, specs)
  }
}
function generateDepthFirst(sizein ,specs){
  return {
    impCor: generateWallsDepthFirst(sizein),
    // impCor: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[86,86],[85,85],[84,84],[83,83],[82,82],[81,81],[80,80]],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[1,1]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function generateRandom(sizein, specs){
  var output=[];
  genRandomArray(sizein).forEach(function(row, rowI){
    row.forEach(function(value,colI){
      if(value===1){
        output.push([rowI,colI])
      }
    })
  })
  return {
    impCor: output,
    // impCor: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[86,86],[85,85],[84,84],[83,83],[82,82],[81,81],[80,80]],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function generateCellular(sizein, specs){
  return {
    impCor: makeWallsCellular(sizein),
    // impCor: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[86,86],[85,85],[84,84],[83,83],[82,82],[81,81],[80,80]],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function returnNumberOfNeighbors(arr, currentCor){
  var neighbors=0;
  var up=currentCor[0]-1;
  var down=currentCor[0]+1;
  var centerV=currentCor[0];
  var centerH=currentCor[1];
  var right=currentCor[1]+1;
  var left=currentCor[1]-1;
  if(isValid([arr.length,arr[0].length],[centerV,left]))
  {
    if(arr[centerV][left]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[up,left]))
  {
    if(arr[up][left]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[down,left]))
  {
    if(arr[down][left]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[up,centerH]))
  {
    if(arr[up][centerH]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[down,centerH]))
  {
    if(arr[down][centerH]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[centerV,right]))
  {
    if(arr[centerV][right]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[up,right]))
  {
    if(arr[up][right]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[down,right]))
  {
    if(arr[down][right]===1){
      neighbors++;
    }
  }
  return neighbors;

}
function genRandomArray(size){
  var output=[]
  for(var i=0; i<size[0]; i++){
    output.push([])
    for(var j=0; j<size[1]; j++){
      var ran=getRandomInt(0,3)
      if(ran===0){
        output[i].push(1);
      }
      else{
        output[i].push(0);

      }
    }
  }
  console.log(output);
  return output;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

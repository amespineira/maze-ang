/********NOTES********
currently, this does not allow for diagonal movement, as it shouldn't be necessary, and it can make things visually confusing
spec is a javascript object containing:
   impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
   size is the size of the two dimensional array, formatted [sY,sX]
   goal is the end point of the maze, formated [gY, gX]
   start is the starting point of the maze, formatted [sY, sX]

map is the map of coordinates, with all impassable coordinates containing a value of i, the goal a value of 1, x for not specified, and s for start
might want to change structure in terms of where start is used, maybe have it change? probably not...
should put in some sort of is valid check... find cases where input breaks it and add tests
*/
function MapObj(specs){
  this.impCor=specs.impCor;
  this.size=specs.size;
  this.goal=specs.goal;
  this.start=specs.start;
  this.init=initialize(specs.impCor, specs.size, specs.goal, specs.start);
  this.map=initialize(specs.impCor, specs.size, specs.goal, specs.start);
  this.relativeMap=this.generateRelativeMap();
  this.solved=this.solveMap();
}
function initialize(impCor, size, goal, start){
  var output=[];
  for(var i=0; i<size[0]; i++){
    output.push([]);
    for(var j=0; j<size[1]; j++){
      output[i].push('x');
    }
  }
  impCor.forEach(function(value){
    if(isValid(size, value)){
    output[value[0]][value[1]]="_";
    }
  })
  output[goal[0]][goal[1]]=1;
  output[start[0]][start[1]]='s';
  return output;
}
MapObj.prototype.solveMap= function(){
  var relativeMap=this.generateRelativeMap();
  var outputMap=initialize(this.impCor, this.size, this.goal, this.start);
  var currentCor=this.start;
  var numSteps=this.returnClosest(relativeMap, currentCor).value;
  condition=true;
  for(var i=0; i<numSteps-1; i++){
    var next=this.returnClosest(relativeMap, currentCor);
    if(next.solved===true){
      return relativeMap;
    }
    else{
      relativeMap[next.cor[0]][next.cor[1]]="p";
      outputMap[next.cor[0]][next.cor[1]]="p";

      currentCor=next.cor;
    }
  }
  return outputMap

}
MapObj.prototype.generateRelativeMap = function () {
  var condition=true;
  var relativeMap=initialize(this.impCor, this.size, this.goal, this.start)
  var foundx=false;
  for(var a=0; a<this.size[0]+this.impCor.length; a++){
    for(var i=0; i<this.size[0]; i++){
      for(var j=0; j<this.size[1]; j++){
        if(relativeMap[i][j]==="x"){
        relativeMap[i][j]=this.relativeValue(relativeMap, [i,j]);
        foundx=true;
        }
      }
    }
}

  return relativeMap;
};
MapObj.prototype.relativeValue= function(relativeMap, currentCor){ //no diagonals for now
  var adjacents=[]

  if(isValid(this.size, [currentCor[0]-1,currentCor[1]])){
  adjacents.push(relativeMap[currentCor[0]-1][currentCor[1]])
  }
  if(isValid(this.size, [currentCor[0]+1,currentCor[1]])){
  adjacents.push(relativeMap[currentCor[0]+1][currentCor[1]])
  }
  if(isValid(this.size, [currentCor[0],currentCor[1]-1])){
  adjacents.push(relativeMap[currentCor[0]][currentCor[1]-1])
  }
  if(isValid(this.size, [currentCor[0],currentCor[1]+1])){
  adjacents.push(relativeMap[currentCor[0]][currentCor[1]+1])
  }
  return adjacents.reduce(function(collector, value){
      if(collector==="x"){
        if(Number(value)){
        return Number(value)+1
        }
        if(value==="x"){
          return "x";
        }
      }
      else if(Number(value)<(collector-1)){
        return Number(value)+1
      }
      return collector;
  },"x")
}
MapObj.prototype.returnClosest= function(relativeMap, currentCor){
  var adjacents=[]
  if(isValid(this.size, [currentCor[0]-1,currentCor[1]])){
  var cor={
    value: relativeMap[currentCor[0]-1][currentCor[1]],
    cor: [currentCor[0]-1,currentCor[1]]
  }
  adjacents.push(cor);
  }
  if(isValid(this.size, [currentCor[0]+1,currentCor[1]])){
    var cor={
      value: relativeMap[currentCor[0]+1][currentCor[1]],
      cor: [currentCor[0]+1,currentCor[1]]
    }
    adjacents.push(cor);
  }
  if(isValid(this.size, [currentCor[0],currentCor[1]-1])){
    var cor={
      value: relativeMap[currentCor[0]][currentCor[1]-1],
      cor: [currentCor[0],currentCor[1]-1]
    }
    adjacents.push(cor);
  }
  if(isValid(this.size, [currentCor[0],currentCor[1]+1])){
    var cor={
      value: relativeMap[currentCor[0]][currentCor[1]+1],
      cor: [currentCor[0],currentCor[1]+1]
    }
    adjacents.push(cor);
  }
  var results= {
    value: "x",
    cor: [0,0],
    solved: false

  }
  adjacents.forEach(function(value){
    if(results.value==="x" &&  Number(value.value)){
      results.value=value.value;
      results.cor=value.cor
    }
    else if(Number(value.value) && value.value<results.value){
      results.value=value.value;
      results.cor=value.cor
    }
    else if(Number(value.value) && value.value===1){
      results.value=value.value;
      results.cor=value.cor;
      results.solved=true;
    }
  })
  return results;

}
function isValid(size, cor){
  if(cor[0]<size[0] && cor[1]<size[1]){
    if(cor[0]>=0 && cor[1]>=0){
    return true;
    }
  }
  return false;
}

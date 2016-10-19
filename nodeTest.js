console.log("some nonsense");
function Map(specs){
  this.impCor=specs.impCor;
  this.size=specs.size;
  this.goal=specs.goal;
  this.start=specs.start;
  this.map=this.genUnsolved(this.size)
}
Map.prototype.genUnsolved=function(size){
  console.log(size);
  var arr=[];
  for(var i=0; i<size[0]; i++){
    var temp=[];
    for(var j=0; j<size[1]; j++){
      temp.push(new Node());
    }
    arr.push(temp)
  }
  for(var i=0; i<size[0]; i++){
    for(var j=0; j<size[1]; j++){
      if(i<size[0]-1){
        arr[i][j].adjacents.push(arr[i+1][j])
      }
      if(i>0){
        arr[i][j].adjacents.push(arr[i-1][j])
      }
      if(j<size[1]-1){
        arr[i][j].adjacents.push(arr[i][j+1])
      }
      if(j>0){
        arr[i][j].adjacents.push(arr[i][j-1])
      }
    }
  }
  console.log(arr);
  arr[this.goal[0]][this.goal[1]].val="g";
  arr[this.goal[0]][this.goal[1]].distance="g";
  arr[this.start[0]][this.start[1]].val="s";
  arr[this.start[0]][this.start[1]].distance="s";
  this.impCor.forEach(function(cor){
    arr[cor[0]][cor[1]].val="_"
    arr[cor[0]][cor[1]].distance="_"
  })
  return arr
}
Map.prototype.print=function(){
  for(var i=0; i<this.map.length; i++){
    var string=""
    for(var j=0; j<this.map[i].length; j++){
      string=string+this.map[i][j].val+"   "
    }
    console.log(string);
  }
}
Map.prototype.solve=function(){
  this.map[this.goal[0]][this.goal[1]].genDistance("g");
  // this.map[this.start[0]][this.start[1]].genPath();
}
Map.prototype.printRel=function(){
  for(var i=0; i<this.map.length; i++){
    var string=""
    for(var j=0; j<this.map[i].length; j++){
      string=string+this.map[i][j].distance+"      "
    }
    console.log(string);
  }
}

var unId=0;
function Node(){
  this.distance="x";
  this.adjacents=[];
  this.val="x";
  this.id=unId++;
}
console.log("here");
Node.prototype.genPath=function(){
  console.log("next node is:::: *********");
  console.log(this);
  if(this.val==='g'){
    return true;
  }
  if(this.val!="s"){
    this.val="p";
  }

  return this.adjacents.reduce(function(nextPath, nextAdj){
    console.log(nextAdj);
    if(nextPath==="blank"){
      return nextAdj;
    }
    else{
      if(nextAdj.distance<nextPath.distance || isNaN(nextPath.distance)){
        return nextAdj
      }
    }
    return nextPath;
  },"blank").genPath()
}
Node.prototype.genDistance=function(last){
  if(last==='g'){
    this.distance=1;
  }
  else{
    this.distance=last+1;
  }
 var dis=this.distance
 return this.adjacents.filter(function(node){
    return node.distance==="x" || node.distance-dis>0
  }).forEach(function(node){
    node.genDistance(dis)
  })
}

var globalSize=87
var blankMap={
  impCor: [[1,0],[2,2],[2,3],[2,4],[2,1],[3,1],[4,1],[2,0]],
  // impCor is an array of impassable coordinates, formatted [[cy,cx],[cy,cx]....]
  size: [globalSize, globalSize],
  // size is the size of the two dimensional array, formatted [sy,sx]
  goal:[5,0],
  // goal is the end point of the maze, formated [gX, gY]
  start:[0,0]
  // start is the starting point of the maze, formatted [sX, sY]
};
var map=new Map(blankMap)
map.print()
map.solve()
// map.printRel()
// map.print()

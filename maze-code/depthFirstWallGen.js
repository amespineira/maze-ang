var start=[1,1]
var moved=false;
var done=false;
var steps=[]
function generateWallsDepthFirst(size){
  console.log("starting gen");
  var currentCor=[1,1];
  var prevCor=[0,0]
  var arr=genBlank(size);
  var nextStep;
  arr[1][1]=1;
  // console.log(arr);
  // while(done===false){
  for(var i=0; i<10000; i++){
    nextStep=calcNextStepPath(arr, currentCor, prevCor);
    arr=nextStep.arrO;
    prevCor=nextStep.prevO;
    currentCor=nextStep.corO;
    // console.log("***currentCor");
    // console.log(currentCor);
    // console.log("***prevCor");
    // console.log(prevCor);
    moved=true;
  }
  arr[1][1]=2;
  console.log("done with gen")
  return makeImpCorFromArr(arr);
}
function generateAlgorithmDemonstration(size){
  var currentCor=[1,1];
  var prevCor=[0,0]
  var arr=genBlank(size);
  var out=genBlank(size)
  var nextStep;
  arr[1][1]=1;
  out[1][1]=1;
  // console.log(arr);
  // while(done===false){
  for(var i=0; i<10000; i++){
    if(out[currentCor[0]][currentCor[1]]===0)
    {
      out[currentCor[0]][currentCor[1]]=i;
    }
    nextStep=calcNextStepPath(arr, currentCor, prevCor);
    arr=nextStep.arrO;
    prevCor=nextStep.prevO;
    currentCor=nextStep.corO;
    // console.log("***currentCor");
    // console.log(currentCor);
    // console.log("***prevCor");
    // console.log(prevCor);
    moved=true;
  }
  arr[1][1]=2;
  return out;
}
  //Solved if all cells have one or more neighbors...
  //if not, get next step
  //if no valid next step, go back one spot, if you go back all the way to the beggining, your done
function makeImpCorFromArr(arr){
  var out=[]
  for(var i=0; i<arr.length; i++){
    for(var j=0; j<arr[i].length; j++){
      if(arr[i][j]===0){
        out.push([i,j])
      }
    }
  }
  return out;
}

function calcNextStepPath(arr, currentCor, prevCor){
  var pref=[(currentCor[0]+(currentCor[0]-prevCor[0])),(currentCor[1]+(currentCor[1]-prevCor[1]))]
  var up=[(currentCor[0]-1),currentCor[1]];
  var down=[(currentCor[0]+1),currentCor[1]];
  var left=[currentCor[0],(currentCor[1]-1)];
  var right=[currentCor[0],(currentCor[1]+1)];
  var next=false;
  var viable=[];
  if(moved===true&&isValid([arr.length,arr[0].length],pref))
  {
    if(pathValidityTest(arr,pref)){
      next=true;
    }
  }
  if(isValid([arr.length,arr[0].length],left))
  {
    if(pathValidityTest(arr,left)){
      viable.push(left)
    }
  }
  if(isValid([arr.length,arr[0].length],up))
  {
    if(pathValidityTest(arr,up)){
      viable.push(up)
    }
  }
  if(isValid([arr.length,arr[0].length],down))
  {
      if(pathValidityTest(arr,down)){
        viable.push(down)
      }
  }
  if(isValid([arr.length,arr[0].length],right))
  {
    if(pathValidityTest(arr,right)){
      viable.push(right)
    }
  }
  if(viable.length===0){
    if(prevCor===start){
      done=true
      return {
        arrO: arr,
        corO: currentCor,
        prevO: prevCor
      }

    }
    return {
      arrO: arr,
      corO: prevCor,
      prevO: findOneBefore(arr, prevCor, currentCor)
    }
  }

  var chance=getRandomInt(0,viable.length);
  var chance2=getRandomInt(0,3)
  var cor=viable[chance]
  if(next===true){
    if(chance2===0){
        cor=pref
    }
  }
  arr[cor[0]][cor[1]]=1;
  return {
    arrO: arr,
    corO: cor,
    prevO: currentCor
  }

}

function findOneBefore(arr, currentCor, prevCor){
  var up=[(currentCor[0]-1),currentCor[1]];
  var down=[(currentCor[0]+1),currentCor[1]];
  var left=[currentCor[0],(currentCor[1]-1)];
  var right=[currentCor[0],(currentCor[1]+1)];
  var viable=[];
  if(isValid([arr.length,arr[0].length],left))
  {
    if(arr[left[0]][left[1]]===1&&left!=prevCor&&ocPathValidityTest(arr, left)){
      viable.push(left)
    }
  }
  if(isValid([arr.length,arr[0].length],up))
  {
    if(arr[up[0]][up[1]]===1&&up!=prevCor&&ocPathValidityTest(arr, up)){
      viable.push(up)
    }
  }
  if(isValid([arr.length,arr[0].length],down))
  {
    if(arr[down[0]][down[1]]===1&&down!=prevCor&&ocPathValidityTest(arr, down)){
      viable.push(down)
    }
  }
  if(isValid([arr.length,arr[0].length],right))
  {
    if(arr[right[0]][right[1]]===1&&right!=prevCor&&ocPathValidityTest(arr, right)){
      viable.push(right)
    }
  }
  if(viable.length===0){
    // done=true;
    viable.push(randOc(arr))
  }
  return viable[0];
}
function randOc(arr){
  var rand;
  for(var i=0; i<1000; i++){
    rand=[getRandomInt(0,arr.length),getRandomInt(0,arr.length)]
    if(arr[rand[0]][rand[1]]===1){
      return rand;
    }
  }
  return [rand]
}
function pathValidityTest(arr, currentCor){
  if(arr[currentCor[0]][currentCor[1]]!=1){
    if(returnNumberOfNeighborsNoDiagonals(arr, currentCor)===1){
        if(currentCor[0]>0&&currentCor[0]<(arr.length-1)){
          if(currentCor[1]>0&&currentCor[1]<(arr[0].length-1)){
            return true;
          }
        }
    }
  }
  return false;
}
function ocPathValidityTest(arr, currentCor){

    if(returnNumberOfNeighborsNoDiagonals(arr, currentCor)===1){
        if(currentCor[0]>0&&currentCor[0]<(arr.length-1)){
          if(currentCor[1]>0&&currentCor[1]<(arr[0].length-1)){
            return true;
          }
        }
    }

  return false;
}
function returnNumberOfNeighborsNoDiagonals(arr, currentCor){
  var neighbors=0;
  var left=currentCor[1]-1;
  var right=currentCor[1]+1;
  var centerH=currentCor[1];
  var centerV=currentCor[0];
  var up=currentCor[0]-1;
  var down=currentCor[0]+1;
  if(isValid([arr.length,arr[0].length],[centerV,left]))
  {
    if(arr[centerV][left]===1){
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
  return neighbors;

}

function genBlank(size){
  var output=[]
  for(var i=0; i<size[0]; i++){
    output.push([])
    for(var j=0; j<size[1]; j++){
      output[i].push(0);
    }
  }
  return output;
}

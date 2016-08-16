function makeWallsCellular(size){
  var startArr=genRandomArray(size);
  console.log(startArr);
  var output=[];
  for(var i=0; i<100; i++){
    startArr=calcNextStep(startArr)
  }
  startArr.forEach(function(row, rowI){
    row.forEach(function(value,colI){
      if(value===1){
        output.push([rowI,colI])
      }
    })
  })
  startArr[0]="different"
  return output;
}
function generateCellularAlgorithmDemo(size){
  var startArr=genRandomArray(size);
  console.log(startArr);
  var thing=startArr;
  localStorage.setItem("name", "andres");
  var output=[];
  for(var i=0; i<10; i++){
    output.push([])
    startArr=calcNextStep(startArr)
    startArr.forEach(function(row, rowI){
      output[i].push([])
      row.forEach(function(value,colI){
        if(value===1){
          output[i][rowI].push(1)
        }
        else if(value===0){
          output[i][rowI].push(0) 
        }
      })
  })
  }
  var other=startArr;
  startArr=[];
  console.log(output);
  return output;
}
function calcNextStep(arr){
  var next=arr;
  for(var i=0; i<arr.length; i++)
    {
      for(var j=0; j<next[i].length; j++){
        var neighbors=returnNumberOfNeighbors(next,[i,j])
        if(next[i][j]===0){
          if(neighbors===3){
            next[i][j]=1;
          }
        }
        else{
          if(neighbors>1&&neighbors<6){
            next[i][j]=1;
          }
          else{
            next[i][j]=0;
          }
        }
      }
    }
    // console.log("seeing if fuckin anything changed");
    // console.log(arr===next);
  return next;
}

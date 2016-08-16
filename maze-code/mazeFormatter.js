
function genImpCorFromWallCor (wallArray) { //formated [{startx, starty, endx, endy},
    var impCor=[];
    wallArray.forEach(function(value){
      if(value.startx===value.endx){
        for(var i=value.starty; i<=value.endy; i++){
        impCor.push([i,value.startx]);
        }
      }
      else if(value.starty===value.endy){
        for(var i=value.startx; i<=value.endx; i++){
        impCor.push([value.starty,i]);
        }
      }
    })
    return impCor
  }
function checkValidity (mapSpecs){

}

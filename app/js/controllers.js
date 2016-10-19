app.controller('mazeController', function($scope, MapObj) {
    console.log(MapObj);
    var globalSize=87
    var blankMap={
      impCor: [],
      // impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
      size: [globalSize, globalSize],
      // size is the size of the two dimensional array, formatted [sY,sX]
      goal:[globalSize-1,globalSize-1],
      // goal is the end point of the maze, formated [gY, gX]
      start:[0,0]
      // start is the starting point of the maze, formatted [sY, sX]
    };
    $scope.mapObj=new MapObj(blankMap);
    console.log($scope.mapObj);
});

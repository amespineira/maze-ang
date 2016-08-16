app.controller('mazeController', function($scope) {
  $scope.size=87;
  var blankMap={
  impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
  size: [87, 87],
  // size is the size of the two dimensional array, formatted [sY,sX]
  goal:[87-1,87-1],
  // goal is the end point of the maze, formated [gY, gX]
  start:[0,0]
  // start is the starting point of the maze, formatted [sY, sX]
  };
  $scope.currMazeSpecs=generateMaze([87, 87], blankMap, 'depth-first')
  $scope.maze=new MapObj ($scope.currMazeSpecs)
  $scope.view={}
  $scope.view.display=$scope.maze.map
  console.log($scope.maze);
  console.log($scope.currMazeSpecs);
  console.log('here');
  $scope.edit=function(block){

    switch($scope.editType){
    case 'start':
      block='s';
      break;
    case 'end':
      changeBlock(this, "1")
      break;
    case 'wall':
      changeBlock(this, "_")
      break;
    case 'clear':
      changeBlock(this, "x")
      break;
    }
  }
});

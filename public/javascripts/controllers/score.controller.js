angular
  .module('pongPal')
  .controller('ScoreController', ScoreController)

function ScoreController () {
  var vm = this;

  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vm.activeTm;
  vm.turnShots = 0;
  vm.frameShots = 0;
  vm.shootingTm;
  vm.activeFrame = 1;
  vm.t1p1shots = [];
  vm.t1p2shots = [];
  vm.t2p1shots = [];
  vm.t2p2shots = [];

  vm.miss = function (team, player) {
    var array = eval('vm.t' + team + 'p' + player + 'shots');
    array.push({
      frame: vm.activeFrame,
      result: 'miss'
    });
    console.log(vm.t1p1shots);
  };

}

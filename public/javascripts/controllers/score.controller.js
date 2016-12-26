angular
  .module('pongPal')
  .controller('ScoreController', ScoreController)

function ScoreController () {
  var vm = this;

  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vm.activeTm;
  vm.turnShots = 0;
  vm.frameShots = 0;
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

    if (vm.frameShots === 3) {
      vm.frameShots = 0;
      vm.activeFrame++;
      vm.turnShots = 0;
      team === 1 ? vm.activeTm = 2 : vm.activeTm = 1;
    } else if (vm.frameShots === 2) {
      vm.frameShots++;
      vm.turnShots++;
    } else if (vm.frameShots === 1) {
      vm.frameShots++;
      vm.turnShots = 0;
      team === 1 ? vm.activeTm = 2 : vm.activeTm = 1;
    } else {
      vm.frameShots++;
      vm.turnShots++
    }
  };

}

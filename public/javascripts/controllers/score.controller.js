angular
  .module('pongPal')
  .controller('ScoreController', ScoreController)

function ScoreController () {
  var vm = this;

  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('#modal1').modal('open');
  });

  $('.modal').modal({
    dismissible: false,
    in_duration: 1000,
    out_duration: 500
  })

  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vm.activeTm;
  vm.turnShots = 0;
  vm.frameShots = 0;
  vm.activeFrame = 1;
  vm.t1activeRack = '10-cup';
  vm.t2activeRack = '10-cup';
  vm.t1cupsAvail = 10;
  vm.t2cupsAvail = 10;
  vm.t1p1shots = [];
  vm.t1p2shots = [];
  vm.t2p1shots = [];
  vm.t2p2shots = [];

  vm.miss = function (team, player) {
    var pArray = eval('vm.t' + team + 'p' + player + 'shots');
    if (team === 1) {
      var cupsAvail = vm.t1cupsAvail;
      var rack = vm.t1activeRack;
    } else {
      var cupsAvail = vm.t2cupsAvail;
      var rack = vm.t2activeRack;
    };

    pArray.push({
      frame: vm.activeFrame,
      cups: cupsAvail,
      rack: rack,
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

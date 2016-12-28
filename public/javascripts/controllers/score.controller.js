angular
  .module('pongPal')
  .controller('ScoreController', ScoreController)

function ScoreController () {
  var vm = this;

  $(document).ready(function(){
    $('.modal').modal();
    $('#start-modal').modal('open');
  });

  $('.modal').modal({
    dismissible: false,
    in_duration: 400,
    out_duration: 200
  });

  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vm.activeTeam;
  vm.activeShooter;
  vm.turnShots = 0;
  vm.t1frame = 1;
  vm.t2frame = 1;
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
      var frame = vm.t1frame;
    } else {
      var cupsAvail = vm.t2cupsAvail;
      var rack = vm.t2activeRack;
      var frame = vm.t2frame;
    };

    pArray.push({
      frame: frame,
      cups: cupsAvail,
      rack: rack,
      result: 'miss'
    });

    if (vm.turnShots === 0) {
      if (player === 1) {
        vm.activeShooter = 'vm.t' + team + 'p2'
      } else {
        vm.activeShooter = 'vm.t' + team + 'p1'
      };
    };

  //   if (vm.frameShots === 3) {
  //     vm.frameShots = 0;
  //     vm.activeFrame++;
  //     vm.turnShots = 0;
  //     team === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
  //   } else if (vm.frameShots === 2) {
  //     vm.frameShots++;
  //     vm.turnShots++;
  //   } else if (vm.frameShots === 1) {
  //     vm.frameShots++;
  //     vm.turnShots = 0;
  //     team === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
  //   } else {
  //     vm.frameShots++;
  //     vm.turnShots++
  //   }
  };

  vm.splashModal = function(cup) {
    vm.activeCup = cup;
    // console.log('activeCup is ', vm.activeCup);
    $('#splash-modal').modal('open');
  }

  vm.closeModal = function() {
    vm.activeCup = null;
    vm.shotResult = null;
    $('#splash-modal').modal('close');
  }

  vm.splash = function(team, player, cup) {
    var pArray = eval('vm.t' + team + 'p' + player + 'shots');
    if (team === 1) {
      var cupsAvail = vm.t1cupsAvail;
      var rack = vm.t1activeRack;
    } else {
      var cupsAvail = vm.t2cupsAvail;
      var rack = vm.t2activeRack;
    };
  }

}

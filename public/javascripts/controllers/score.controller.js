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

  // vm.frames was just used for a scorecard template, can delete otherwise
  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  vm.activeTeam;
  vm.activeShooter;
  vm.activeCup = null;
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
  var doubleOpp = false;
  vm.showCups = {
    'l1': true,
    'l2': true,
    'l3': true,
    'l4': true,
    'l5': true,
    'l6': true,
    'l7': true,
    'l8': true,
    'l9': true,
    'l10': true,
    'r1': true,
    'r2': true,
    'r3': true,
    'r4': true,
    'r5': true,
    'r6': true,
    'r7': true,
    'r8': true,
    'r9': true,
    'r10': true,
  };

  vm.miss = function (team, player) {
    var pArray = eval('vm.t' + team + 'p' + player + 'shots');
    console.log('pArray is ', pArray);
    if (vm.activeCup !== null) {
      doubleOpp = true;
    };

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
      doubleOpp: doubleOpp,
      rack: rack,
      splash: false,
      cup: null,
      modifier: null
    });

    console.log(pArray);

    if (vm.turnShots === 0) {
      if (player === 1) {
        vm.activeShooter = 'vm.t' + team + 'p2'
      } else {
        vm.activeShooter = 'vm.t' + team + 'p1'
      };
    } else {
      vm.activeShooter = null;
    };

    if (vm.turnShots === 0) {
      vm.turnShots++;
    } else {
      vm.turnShots = 0;
      vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
      if (vm.activeCup) {
        vm.showCups[vm.activeCup] = false;
      }
    };

    console.log('vm.activeShooter is ', vm.activeShooter);
  };

  vm.splashModal = function(cup) {
    vm.splashedCup = cup;
    if (vm.activeShooter === 'vm.t1p1' || vm.activeShooter === 'vm.t2p1') {
      vm.shotMaker = 1;
    };
    if (vm.activeShooter === 'vm.t1p2' || vm.activeShooter === 'vm.t2p2') {
      vm.shotMaker = 2;
    };
    $('#splash-modal').modal('open');
  };

  vm.closeModal = function() {
    vm.shotResult = null;
    vm.shotMaker = null;
    vm.splashedCup = null;
    $('#splash-modal').modal('close');
  };

  vm.bonusCup = function(team, cup) {
    vm.bonusCup1 === null ? vm.bonusCup1 = cup : vm.bonusCup2 = cup;
    if (vm.bonusCup2 === null) {
      vm.msg === 'Cup ' + cup.substring(1) + ' has been selected. Select another cup or click cup ' + cup.substring(1) + ' again to de-select it.';
    }
  };

  vm.splash = function(team, result, player, cup) {
    if (result === 'spill') {
      vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
      vm.showCups[cup] = false;
      $('#splash-modal').modal('close');
      vm.shotResult = null;
      return;
    };

    var pArray = eval('vm.t' + team + 'p' + player + 'shots');
    console.log('pArray is ', pArray);
    if (vm.activeCup !== null) {
      doubleOpp = true;
    };

    if (cup === vm.activeCup) {
      var modifier = 'same'
    } else if (vm.activeCup !== null) {
      var modifier = 'double'
    } else {
      var modifier = null
    };

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
      doubleOpp: doubleOpp,
      rack: rack,
      splash: true,
      cup: cup,
      modifier: modifier
    });

    console.log('pArray is ', pArray);

    if (vm.turnShots === 0) {
      vm.turnShots++;
      vm.activeCup = cup;
    } else {
      if (modifier === 'double') {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 2 : vm.t2cupsAvail -= 2;
      } else if (modifier === 'same') {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.bonusPull = true;
        vm.msg = "A successful same cup shot! Please select the extra cups that the opposing team has pulled from the table before beginning your next turn.";
      } else {
        vm.turnShots = 0;
        vm.activeCup = null;
        vm.showCups[cup] = false;
        vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
      }
    };

    $('#splash-modal').modal('close');

    vm.shotResult = null;
    vm.shotMaker = null;
  }

}

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
  vm.bonusCupArray = [];
  var doubleOpp = false;
  var modifier = null;
  var bounceMod = null;

  vm.miss = function (player) {
    var pArray = eval('vm.t' + vm.activeTeam + 'p' + player + 'shots');
    console.log('pArray is ', pArray);
    if (vm.activeCup !== null) {
      doubleOpp = true;
    };

    if (vm.activeTeam === 1) {
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
      vm.turnShots++;
      if (player === 1) {
        vm.activeShooter = 'vm.t' + vm.activeTeam + 'p2'
      } else {
        vm.activeShooter = 'vm.t' + vm.activeTeam + 'p1'
      };
    } else {
      vm.turnShots = 0;
      vm.activeShooter = null;
      console.log('vm active cup is ', vm.activeCup);
      if (vm.activeCup) {
        vm.showCups[vm.activeCup] = false;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
      };
      if (bounceMod) {
        vm.bonusActive = true;
        vm.bonusToPull = 1;
        vm.msg = "Please select the extra cup the opposing team pulled as a result of the bounce."
      } else {
        vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
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

  vm.splash = function(result, player, cup) {
    if (result === 'spill') {
      vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
      vm.showCups[cup] = false;
      $('#splash-modal').modal('close');
      vm.shotResult = null;
      return;
    };

    var pArray = eval('vm.t' + vm.activeTeam + 'p' + player + 'shots');
    console.log('pArray is ', pArray);
    if (vm.activeCup !== null) {
      doubleOpp = true;
    };

    if (cup === vm.activeCup) {
      modifier = 'same';
    } else if (vm.activeCup !== null) {
      modifier = 'double';
    } else {
      modifier = null;
    };

    if (result === 'bounce') {
      if (vm.turnShots === 0) {
        vm.msg = "A successful bounce! An extra cup will be removed at the end of the turn.";
        bounceMod = true;
      }
    };

    if (vm.activeTeam === 1) {
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
    var otherP;

    player === 1 ? otherP = 2 : otherP = 1;

    if (vm.turnShots === 0) {
      vm.turnShots++;
      vm.activeCup = cup;
      vm.activeShooter = 'vm.t' + vm.activeTeam + 'p' + otherP;
    } else {
      if (modifier === 'double') {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 2 : vm.t2cupsAvail -= 2;
        vm.activeShooter = null;
        vm.msg = "Team " + vm.activeTeam + " hit double cups! They get balls back.";
      } else if (modifier === 'same') {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 2;
        vm.msg = "A successful same-cup shot! Please select the extra cups that the opposing team has pulled from the table before beginning your next turn.";
      } else {
        vm.turnShots = 0;
        vm.activeCup = null;
        vm.showCups[cup] = false;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
        vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
        vm.activeShooter = null;
      }
    };

    $('#splash-modal').modal('close');

    vm.shotResult = null;
    vm.shotMaker = null;
  };

  vm.bonusCup = function(cup) {
    if (vm.bonusCups[cup] !== true) {
      vm.bonusCups[cup] = true;
      vm.bonusCupArray.push(cup);
    } else {
      var cupIndex = vm.bonusCupArray.indexOf(cup);
      vm.bonusCupArray.splice(cupIndex, 1);
      vm.bonusCups[cup] = false;
    };

    console.log('vm.bonusCupCount is ', vm.bonusCupArray.length);
    console.log(vm.bonusCupArray);

    if (vm.bonusCupArray.length === vm.bonusToPull) {
      vm.bonusMsg = '';
      for (var i=0; i<vm.bonusCupArray.length; i++){
        if (i < vm.bonusCupArray.length-1) {
          vm.bonusMsg = vm.bonusMsg + vm.bonusCupArray[i].substring(1) + ' and ';
        } else {
          vm.bonusMsg = vm.bonusMsg + vm.bonusCupArray[i].substring(1) + '?';
        };
      };
      $('#bonus-modal').modal('open');
    };

    if (vm.bonusCupArray.length > vm.bonusToPull) {
      vm.msg = "You've selected too many cups; you can only pull " + vm.bonusToPull + " cups. Please de-select cups."
    } else {
      vm.msg = "A successful same cup shot! Please select the extra cups that the opposing team has pulled from the table before beginning your next turn."
    }
  };

  vm.redoBonus = function() {
    $('#bonus-modal').modal('close');
  };

  vm.confirmBonus = function() {
    for (var i=0; i<vm.bonusCupArray.length; i++) {
      vm.showCups[vm.bonusCupArray[i]] = false;
    };

    if (vm.activeTeam === 1) {
      vm.t1cupsAvail -= vm.bonusCupArray.length;
    } else {
      vm.t2cupsAvail -= vm.bonusCupArray.length;
    };

    if (modifier !== 'same' && modifier !== 'double') {
      vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
    };
    vm.bonusCupArray = [];
    vm.bonusActive = false;
    modifier = null;
    vm.msg = null;
    bounceMod = null;
    vm.activeCup = null;
  }

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
    'r10': true
  };

  vm.bonusCups = {
    'l1': false,
    'l2': false,
    'l3': false,
    'l4': false,
    'l5': false,
    'l6': false,
    'l7': false,
    'l8': false,
    'l9': false,
    'l10': false,
    'r1': false,
    'r2': false,
    'r3': false,
    'r4': false,
    'r5': false,
    'r6': false,
    'r7': false,
    'r8': false,
    'r9': false,
    'r10': false
  };

}

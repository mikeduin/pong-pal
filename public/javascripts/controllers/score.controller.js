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
  vm.bonusCupArray = [];
  vm.msgStack = [];
  vm.msg = vm.msgStack[vm.msgStack.length-1];
  vm.rackSelect = null;
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
  // CHANGE ALL VM.DOUBLEOPPS TO DOUBLEOPPS - DON'T NEED VM, WAS JUST INSTALLED TO TEST
  vm.doubleOpp = false;
  var modifier = null;
  var bounceMod = null;
  var bounceDbl = false;

  vm.rerack = function() {
    var side;
    vm.activeTeam === 1 ? side = 'r' : side = 'l';
    for (var i=0; i<11; i++) {
      var cup = '' + side + i;
      vm.showCups[cup] = true;
    };
    if (vm.rackSelect === '9-cup') {
      vm.showCups[side+'1'] = false;
      vm.activeTeam === 1 ? vm.t1activeRack = '9-cup' : vm.t2activeRack = '9-cup';
    };
    if (vm.rackSelect === '8-cup-W') {
      vm.showCups[side+'1'] = false;
      vm.showCups[side+'3'] = false;
      vm.activeTeam === 1 ? vm.t1activeRack = '8-cup-W' : vm.t2activeRack = '8-cup-W';
    };
    if (vm.rackSelect === '8-cup-E') {
      vm.showCups[side+'1'] = false;
      vm.showCups[side+'2'] = false;
      vm.activeTeam === 1 ? vm.t1activeRack = '8-cup-E' : vm.t2activeRack = '8-cup-E';
    };
    if (vm.rackSelect === 'base-seven') {
      vm.showCups[side+'1'] = false;
      vm.showCups[side+'2'] = false;
      vm.showCups[side+'3'] = false;
      vm.activeTeam === 1 ? vm.t1activeRack = 'base-seven' : vm.t2activeRack = 'base-seven';
    };
    if (vm.rackSelect === 'tri-tip') {
      vm.showCups[side+'2'] = false;
      vm.showCups[side+'6'] = false;
      vm.showCups[side+'10'] = false;
      vm.activeTeam === 1 ? vm.t1activeRack = 'tri-tip' : vm.t2activeRack = 'tri-tip';
    };


    //last
    $('#rerack-modal').modal('close');
    console.log('vm.t1activeRack is ', vm.t1activeRack);
    vm.rackSelect = null;
  }

  vm.openRack = function(){
    if (vm.activeTeam === 1) {
      vm.cupsToRack = vm.t1cupsAvail;
    } else {
      vm.cupsToRack = vm.t2cupsAvail;
    };
    $('#rerack-modal').modal('open');
  };

  vm.closeRack = function(){
    $('#rerack-modal').modal('close');
  };

  vm.miss = function (player) {
    var pArray = eval('vm.t' + vm.activeTeam + 'p' + player + 'shots');
    console.log('pArray is ', pArray);
    if (vm.activeCup !== null) {
      vm.doubleOpp = true;
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
      doubleOpp: vm.doubleOpp,
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
        vm.msg = "Please select the extra cup the opposing team pulled as a result of the bounce.";
      } else {
        vm.activeTeam === 1 ? vm.activeTeam = 2 : vm.activeTeam = 1;
        vm.activeCup = null;
        vm.doubleOpp = false;
      }
    };

    console.log('vm.activeShooter is ', vm.activeShooter);
  };

  vm.cupClick = function(cup) {
    if (vm.bonusActive) {
      vm.bonusCup(cup);
    } else {
      vm.splashModal(cup);
    };
  };

  vm.splashModal = function(cup) {
    vm.splashedCup = cup;
    vm.cupNumb = cup.substring(1);
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
    vm.cupNumb = null;
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
      vm.doubleOpp = true;
    };

    if (cup === vm.activeCup) {
      modifier = 'same';
    } else if (vm.activeCup !== null) {
      modifier = 'double';
    } else {
      modifier = null;
    };

    if (result === 'bounce') {
      if (bounceMod === true) {
        bounceDbl = true;
      } else {
        bounceMod = true;
      };
      if (vm.turnShots === 0) {
        vm.msg = "A successful bounce! An extra cup will be removed at the end of the turn.";
      };
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
      doubleOpp: vm.doubleOpp,
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
      vm.doubleOpp = true;
      vm.activeShooter = 'vm.t' + vm.activeTeam + 'p' + otherP;
    } else {
      if (modifier === 'double' && bounceDbl) {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 2 : vm.t2cupsAvail -= 2;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 2;
        vm.msg = "Two bounces into two different cups! Select the extra two cups that will be pulled from the table as a result of the bounces. Team " + vm.activeTeam + " will then get balls back.";
      } else if (modifier === 'same' && bounceDbl) {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 4;
        vm.msg = "TWO BOUNCES INTO THE SAME CUP! The holy grail of team shooting. Select the extra FOUR cups that will be pulled from the table as a result of the bounces. Team " + vm.activeTeam + " will then get balls back.";
      } else if (modifier === 'double' && bounceMod) {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.showCups[vm.activeCup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 2 : vm.t2cupsAvail -= 2;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 1;
        vm.msg = "A bounce shot AND double cups! Select the extra cup that will be pulled from the table as a result of the bounce. Team " + vm.activeTeam + " will then get balls back.";
      } else if (modifier === 'same' && bounceMod) {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 3;
        vm.msg = "A bounce shot AND same cups! Select the extra THREE cups that will be pulled from the table as a result. Team " + vm.activeTeam + " will then get balls back.";
      } else if (modifier === 'double') {
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
        vm.msg = "A successful same-cup shot! Select the extra cups that the opposing team has pulled from the table before beginning your next turn.";
      } else if (bounceMod) {
        vm.turnShots = 0;
        vm.showCups[cup] = false;
        vm.activeCup = null;
        vm.activeTeam === 1 ? vm.t1cupsAvail -= 1 : vm.t2cupsAvail -= 1;
        vm.bonusActive = true;
        vm.activeShooter = null;
        vm.bonusToPull = 1;
        vm.msg = "Select the extra cup the opposing team pulled as a result of the bounce."
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
        if (i < vm.bonusCupArray.length-2) {
          vm.bonusMsg = vm.bonusMsg + vm.bonusCupArray[i].substring(1) + ', ';
        } else if (i < vm.bonusCupArray.length-1) {
          vm.bonusMsg = vm.bonusMsg + vm.bonusCupArray[i].substring(1) + ' and ';
        } else {
          vm.bonusMsg = vm.bonusMsg + vm.bonusCupArray[i].substring(1) + '?';
        };
      };
      $('#bonus-modal').modal('open');
    };

    if (vm.bonusCupArray.length > vm.bonusToPull) {
      vm.msg = "You've selected too many cups; you can only pull " + vm.bonusToPull + " cups. Please de-select cups."
    };
  };

  vm.redoBonus = function() {
    $('#bonus-modal').modal('close');
  };

  vm.confirmBonus = function() {
    for (var i=0; i<vm.bonusCupArray.length; i++) {
      vm.showCups[vm.bonusCupArray[i]] = false;
      vm.bonusCups[vm.bonusCupArray[i]] = false;
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
    vm.doubleOpp = false;
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

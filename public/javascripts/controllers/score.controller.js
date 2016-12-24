angular
  .module('pongPal')
  .controller('ScoreController', ScoreController)

function ScoreController () {
  var vm = this;

  vm.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  vm.activeTm;
}

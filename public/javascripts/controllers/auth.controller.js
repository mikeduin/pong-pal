angular
  .module('pongPal')
  .controller('AuthController', AuthController)

AuthController.$inject = ['authService'];

function AuthController (authService) {
  var vm = this;

  vm.logIn = function() {
    authService.logIn().error(function(error){
      console.log('error in controller is ', error)
      // vm.error = error.message
    }).then(function(){
      $state.go('home')
    })
  }
}

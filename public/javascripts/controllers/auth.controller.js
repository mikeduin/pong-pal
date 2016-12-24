angular
  .module('pongPal')
  .controller('AuthController', AuthController)

AuthController.$inject = ['authService'];

function AuthController (authService) {
  var vm = this;

  vm.logIn = function() {
    authService.logIn().success(function(data){
      console.log(data)
    }).error(function(error){
      console.log('error is ', error)
    })
    // .error(function(error){
    //   console.log('error in controller is ', error)
    //   // vm.error = error.message
    // })
    // .then(function(){
    //   $state.go('home')
    // })
  }
}

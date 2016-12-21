angular
  .module('pongPal')
  .factory('authService', authService)

authService.$inject = ['$http', '$window']

function authService ($http, $window) {

  var auth = {};

  // Method saves JWT Token to local storage; pong-token functions as the unique key that we will read and write from. Note that if we ever change this key, everyone logged in will get logged out. Don't change unless you're intentionally changing to log everyone out.
  auth.saveToken = function(token) {
    $window.localStorage['pong-token'] = token;
  };

  // Method gets JWT Token from local storage
  auth.getToken = function() {
    return $window.localStorage['pong-token']
  };

  auth.isLoggedIn = function() {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp = Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      // This gets us the username of the currently logged in user from the payload
      return payload.username;
    }
  };

  auth.logIn = function() {
    $http.jsonp('/login/facebook').success(function(data){
      console.log('data returned to login function is ', data)
      return data;
      // auth.saveToken(data.token)
    })
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('pong-token')
  }

  return auth
}

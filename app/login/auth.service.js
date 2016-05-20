(function () {
    'use strict';
    function Auth(firebaseRef, $firebaseAuth) {
        return $firebaseAuth(firebaseRef);
    }   
    angular.module('sponzorme').constant('FirebaseUrl', 'https://sponzorme.firebaseio.com/')
    angular.module('sponzorme').service('firebaseRef', ['FirebaseUrl', Firebase]);
    angular.module('sponzorme').factory('Auth', Auth);
    Auth.$inject = ['firebaseRef', '$firebaseAuth'];
})();
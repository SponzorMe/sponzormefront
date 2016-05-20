(function () {
  'use strict';
  function LoginController($scope, $translate, loginRequest, $localStorage, $location, dialogRequest, $routeParams, $rootScope, userRequest, Auth, $log) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }

    var vm = this;
    var redirectTo = $localStorage.redirectTo;
    vm.loginWithEmail = function () {
      vm.credentials.loginType = 0; //Inform the user is email user
      doLogin();
    };
    vm.loginWithFacebook = function () {
      Auth.$authWithOAuthPopup('facebook', { scope: 'email, user_birthday, user_location' }).then(function (authData) {
        $log.debug(authData);
        vm.credentials = {
          email: authData.facebook.email,
          password: authData.facebook.id,
          name: authData.facebook.displayName,
          loginType: 1, //Inform the user is facebook user
          age: authData.facebook.cachedUserProfile.birthday,
          location: authData.facebook.cachedUserProfile.location.name
        };
        doLogin();
      });
    };

    function newUser() {
      vm.credentials.lang = $rootScope.currentLanguage();
      vm.credentials.type = 0;
      vm.credentials.ionic_id = '';
      vm.credentials.activated = 1;
      userRequest.createUser($scope.credentials).then(function (data) {
        $localStorage.cookiesponzorme = btoa($scope.create.email + ':' + $scope.create.password);
        $localStorage.token = btoa($scope.create.email + ':' + $scope.create.password);
        $localStorage.typesponzorme = data.User.type;
        $localStorage.id = data.User.id;
        $localStorage.email = data.User.email;
        $localStorage.demo = data.User.demo;
        $localStorage.startDate = Date.now();
        doLogin();
      }, function(err){
        $log.error('Error', err);
      });
    }

    function dataSerializer(data) {
      $localStorage.$reset();//Clean all data before serialize
      $localStorage.type = data.user.type;
      $localStorage.token = btoa(vm.credentials.email + ':' + vm.credentials.password);
      $localStorage.id = data.user.id;
      $localStorage.email = data.user.email;
      $localStorage.demo = data.user.demo;
      $localStorage.image = data.user.image;
      $localStorage.startDate = Date.now();
      $localStorage.rating = data.rating;
      $translate.use(data.user.lang);
      $localStorage.lastUpdate = new Date().getTime();
      if (data.user.sponzorships) {
        data.user.sponzorships = data.user.sponzorships.filter(function (e) {
          e.event.starts = e.event.starts.replace(' ', 'T');
          e.event.starts = new Date(e.event.starts).getTime();
          return e;
        });
      }
      if (data.eventTasks) {
        var filteredEvents = [];
        data.eventTasks.filter(function (e) {
          if (e.sponzorship.length) {
            return e.perks.filter(function (p) {
              if (p.sponzor_tasks.length) {
                filteredEvents.push(e);
                return e;
              }
            });
          }
        });
        data.user.eventTasks = filteredEvents;
      }
      if (data.user.events) {
        data.user.events = data.user.events.filter(function (e) {
          e.starts = e.starts.replace(' ', 'T');
          e.starts = new Date(e.starts).getTime();
          return e;
        });
      }
      if (data.events) {
        $localStorage.events = [];
        var parsedEvents = data.events.filter(function (e) {
          e.starts = e.starts.replace(' ', 'T');
          e.ends = e.ends.replace(' ', 'T');
          e.starts = new Date(e.starts).getTime();
          e.ends = new Date(e.ends).getTime();
          return e;
        });
        $localStorage.events = JSON.stringify(parsedEvents);
      }
      //Generating firstName, lastName for the user
      var tempName = data.user.name.split(' ');
      data.user.firstName = tempName[0];
      data.user.lastName = tempName[1];
      $localStorage.user = JSON.stringify(data.user);

    };

    function redirector(data) {
      if (data.user.type === '1' || data.user.type === 1) {
        if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('sponzors') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
          window.location.href = redirectTo;
        } else {
          $location.path('/sponzors/dashboard');
        }
      } else {
        if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('organizers') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
          window.location.href = redirectTo;
        }
        else {
          $location.path('/organizers/dashboard');
        }
      }
    }

    function doLogin() {
      dialogRequest.showLoading();
      loginRequest.authentication(vm.credentials).then(function (data) {
        dataSerializer(data);
        dialogRequest.closeLoading();
        redirector(data);
      }, function errorCallback(error) {
        dialogRequest.closeLoading();
        if (error.unactivatedAccount) {
          dialogRequest.showDialog('error', 'login.unactivatedAccount', false);
        }
        if (error.invalidEmail) {
          dialogRequest.showDialog('error', 'login.invalidEmail', false);
        }
        else if (error.invalidPassword) {
          dialogRequest.showDialog('error', 'login.invalidPassword', false);
        }
        else if (error.invalidType) {
          dialogRequest.showDialog('error', 'login.invalidType', false);
        }
        else if (error.newFacebookAccount) {
          //stuff to create new user from facebook
          newUser();
        }
        else {
          dialogRequest.showDialog('error', 'login.unknown', false);
        }
      });
    }
  }
  angular.module('sponzorme').controller('LoginController', LoginController);
  LoginController.$inject = ['$scope', '$translate', 'loginRequest', '$localStorage', '$location', 'dialogRequest', '$routeParams', '$rootScope', 'userRequest', 'Auth', '$log'];
})();

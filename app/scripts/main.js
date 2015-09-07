var idiomaselect="en";
var sponzorme = angular.module('sponzorme',
[ 'pascalprecht.translate','ngResource', 'ngRoute','userService',
  'loginService','ngDialog', 'base64', 'ngCookies','ngStorage',
  'angularFileUpload', 'ui.bootstrap', 'eventTypeService',
  'categoryService','google.places', 'eventService', 'rssService',
  'perkService','taskSponzorService', 'perkTaskService',
  'sponzorshipService', 'angularSpinner', 'CloudStorage',
  'allInterestsService', 'userInterestService'
])
.config(function ($translateProvider) {
  /* Languages configuration by Carlos Rojas
     THIS DOES NOT WORK --PLEASE FIX AND TRY AGAIN
  $translateProvider.useStaticFilesLoader({
        prefix: 'langs/lang-',
        suffix: '.json'
      });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage("es");
  $translateProvider.fallbackLanguage("en");
  */
  $translateProvider.translations('es', translationsES);
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('pt', translatiosnPT);
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
})

.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: '#042333'});
}])

.config(['CloudStorageConfigProvider', function (CloudStorageConfigProvider) {
    CloudStorageConfigProvider.setDefaults({PROJECT: '471996657056', clientId :'471996657056-lb3iuvrk8gaivcubp2bck9434opruhkk.apps.googleusercontent.com', apiKey : 'AIzaSyD-4feaf3-w-iz1wt4rfajI_hM9o2K4j00', scopes : 'https://www.googleapis.com/auth/devstorage.full_control', API_VERSION : 'v1'});
}])

.config(function ($routeProvider) {
    $routeProvider
      .when('', {
            templateUrl: 'views/main.html',
            controller: 'HomeController'
      })
      .when('/', {
            templateUrl: 'views/main.html',
            controller: 'HomeController'
      })
      .when('/activation/:token',{
            templateUrl: 'views/activation.html',
            controller: 'ActivationController'
      })
      .when('/testimonials', {
            templateUrl: 'views/testimonials.html',
            controller: 'HomeController'
      })
      .when('/privacy', {
            templateUrl: 'views/privacy.html',
            controller: 'HomeController'
      })
      .when('/login', {
            templateUrl: 'views/users/login.html',
            controller: 'LoginController'
      })
      .when('/resend',{
            templateUrl: 'views/resend.html',
            controller: 'ResendController'
      })
      .when('/forgot', {
            templateUrl: 'views/forgot.html',
            controller: 'ForgotController'
      })
      .when('/reset/:tokenReset', {
            templateUrl: 'views/reset.html',
            controller: 'ForgotController'
      })
      .when('/sponsors/create',{
            templateUrl: 'views/sponsors/create.html',
            controller: 'SponzorsCreateController'
      })
      .when('/users/create',{
            templateUrl: 'views/users/create.html',
            controller: 'UsersCreateController'
      })
      .when('/logout',{
            templateUrl: 'views/main.html',
            controller: 'logoutController'
      })
      .when('/users/dashboard',{
            templateUrl: 'views/users/dashboard/main.html',
            controller: 'UsersPrincipalController'
      })
      .when('/users/events',{
            templateUrl: 'views/users/dashboard/events.html',
            controller: 'UsersEventsController'
      })
      .when( '/users/sponzors',{
            templateUrl: 'views/users/dashboard/sponzors.html',
            controller: 'UsersSponzorsController'
      })
      .when( '/customization',{
            templateUrl: 'views/customization/customization.html',
            controller: 'UsersCustomController'
      })
      .when( '/users/friend',{
            templateUrl: 'views/users/dashboard/friend.html',
            controller: 'UsersFriendController'
      })
      .when( '/users/todo',{
            templateUrl: 'views/users/dashboard/todo.html',
            controller: 'UsersTodoController'
      })
      .when('/users/settings',{
            templateUrl: 'views/users/dashboard/settings.html',
            controller: 'UsersSettingsController'
      })
      .when('/sponsors/dashboard', {
            templateUrl: 'views/sponsors/dashboard/main.html',
            controller: 'SponsorsMainController'
      })
      .when('/sponsors/settings', {
            templateUrl: 'views/sponsors/dashboard/settings.html',
            controller: 'SponsorsSettingsController'
      })
      .when('/sponsors/friend', {
            templateUrl: 'views/sponsors/dashboard/friend.html',
            controller: 'SponsorsFriendController'
      })
      .when('/sponsors/following', {
            templateUrl: 'views/sponsors/dashboard/events.html',
            controller: 'SponsorsFollowingController'
      })
      .when('/sponsors/sponzoring', {
            templateUrl: 'views/sponsors/dashboard/sponzors.html',
            controller: 'SponsorsSponzorsController'
      })
      .otherwise({
        redirectTo: '/'
      });
});
/*
* Author: Sebastian Gomez
* This function allows change the language whatever be the route
* for this reason this is a global function
*/
sponzorme.run(function($rootScope,$translate,$location,allInterestsServiceRequest,$filter){
  $rootScope.changeLanguage = function(key){
      $translate.use(key);
      idiomaselect = key;
  }
  $rootScope.buildInterests = function(){
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata){
          var interests=adata.InterestCategory;
          var log = [];
          var a = "";
          angular.forEach(interests, function(value, key) {
              a=a+"</br>"+($filter('normalize')(value.name)+":'"+value.name+"',");
          }, log);
          document.write(a);
    });
  }
});
/*
* Author: Sebastian Gomez
* This filters replace & by AND it is used for categories and interests translations
*/
sponzorme.filter('normalize', function () {
      return function (input) {
          if (!input) return "";
          input = input
                  .replace('&', 'AND')
                  .replace(/\W+/g, "");
          return input;
      };
});
sponzorme.controller('HomeController', function ($scope, $translate, $sessionStorage, $location) {
      if($sessionStorage) {
          var cookie = $sessionStorage.cookiesponzorme;
          if(cookie == undefined){
                $scope.vieuser = 1;
          }else{
                $scope.vieuser = 0;
          }
          var typeini = $sessionStorage.typesponzorme;
          if (typeini != undefined){
             if(typeini == '1'){
               $scope.typeuser = 0;
            }else{
               $scope.typeuser = 1;
            }
          }
          $scope.userfroups = 0;
      }
      else{
         $location.path("/");
      }
});

sponzorme.controller('logoutController', function ($scope, $translate, $sessionStorage, $location, $localStorage) {

      delete $sessionStorage.cookiesponzorme;

      delete $sessionStorage.typesponzorme;

      delete $sessionStorage.token;

      delete $sessionStorage.developer;

      delete $sessionStorage.id;

      delete $sessionStorage.email;

      $localStorage.$reset();

      $scope.vieuser = 0;

      $scope.typeuser = 0;

      $scope.userfroups = 0;

      $location.path("/");
});

sponzorme.controller('LoginController', function ($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog) {

      delete $sessionStorage.cookiesponzorme;

      delete $sessionStorage.typesponzorme;

      delete $sessionStorage.token;

      delete $sessionStorage.developer;

      delete $sessionStorage.id;

      delete $sessionStorage.email;

      $localStorage.$reset();

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.sendfrom = function(){

            if($scope.email != undefined || $scope.password != undefined){
                  $scope.objuser = {}
                  $scope.objuser.email = $scope.email;
                  $scope.objuser.password = $scope.password;
                  $scope.objuser.password_confirmation = $scope.passwordtwo;
                  $scope.objuser.lang = idiomaselect;
                  $scope.loagind = true;
                  $scope.error_log=[];
                  loginRequest.login($scope.objuser).success(function(adata){
                        if(adata.user.activated){
                            var expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            $sessionStorage.cookiesponzorme = btoa($scope.email+':'+$scope.password);
                            $sessionStorage.typesponzorme = adata.user.type;
                            $sessionStorage.token = btoa($scope.email+':'+$scope.password);
                            $sessionStorage.id = adata.user.id;
                            $sessionStorage.email = adata.user.email;
                            idiomaselect = adata.user.lang;
                            var url = $location.host();
                            if(url == 'localhost'){
                                  $sessionStorage.developer = 1;
                            }
                            $scope.loagind = false;
                            if(adata.user.type == 1){
                                  $location.path("/sponsors/dashboard");
                            }else{
                                  $location.path("/users/dashboard");
                            }
                        }
                        else{
                          $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.UnactivatedAccount');
                          $scope.loagind = false;
                          ngDialog.open({ template: 'templateId', scope: $scope});
                        }

                  }).error(function(edata){
                        $scope.loagind = false;
                        ngDialog.open({ template: 'errorloging.html' });
                  });
            }
      }
});
sponzorme.controller('ResendController', function ($scope, $translate, loginRequest, ngDialog) {
  $scope.error_log=[];//We storage here all translate error during register process
  $scope.resend = function() {
    $scope.loagind = true;
    loginRequest.resendActivation($scope.email).success(function(adata){

      $scope.loagind = false;
      $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.ActivationLinkResent');
      ngDialog.open({ template: 'templateId' ,scope: $scope});
    }).error(function(edata){
          $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.InvalidEmail');
          $scope.loagind = false;
          ngDialog.open({ template: 'templateId', scope: $scope});
    });
  }

});
sponzorme.controller('SponzorsCreateController', function ($scope, $translate, $sessionStorage, userRequest, ngDialog, $location, usSpinnerService, $localStorage) {
      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.sendfrom = function(){
                  $scope.error_log=[];//We storage here all translate error during register process
                  if ($scope.passwordone != undefined || $scope.passwordtwo != undefined){//We verify the passwords not empty.
                        if ($scope.passwordone == $scope.passwordtwo){//We verify the passwords match atleast.
                              $scope.objuser = {}
                              $scope.objuser.email = $scope.email;//storage the email
                              $scope.objuser.password = $scope.passwordone;//storage the password
                              $scope.objuser.password_confirmation = $scope.passwordtwo;
                              $scope.objuser.lang = idiomaselect;//storage the current lang
                              $scope.objuser.type = 1;//the only difference beetwen the other method is the type.
                              $scope.objuser.name = $scope.name + " " + $scope.lastname;
                              $scope.loagind = true;
                              userRequest.createUser($scope.objuser).success(function(adata){
                                    if(adata.message == "Inserted"){
                                          var datuser = JSON.stringify(adata.User);
                                          $localStorage.sponzorme = datuser;
                                          var expireDate = new Date();
                                          expireDate.setDate(expireDate.getDate() + 1);
                                          $sessionStorage.cookiesponzorme = btoa($scope.email+':'+$scope.passwordone);
                                          $sessionStorage.token = btoa($scope.email+':'+$scope.passwordone);
                                          $scope.loagind = false;
                                          $sessionStorage.typesponzorme = adata.User.type;
                                          $sessionStorage.id = adata.User.id;
                                          $sessionStorage.email = adata.User.email;
                                          $location.path("/customization");
                                    }
                              }).error(function(data){
                                if(data.message == "Not inserted"){
                                    if(data.error.email){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterEmail'));
                                    }
                                    if(data.error.name){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterName'));
                                    }
                                    if(data.error.lastname){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterLastname'));
                                    }
                                    if(data.error.password){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterPassword'));
                                    }
                                }
                                $scope.loagind = false;
                                ngDialog.open({ template: 'templateId' ,scope: $scope});
                              });
                        }
                  }
                  else{
                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterPassword'));
                      ngDialog.open({ template: 'templateId' ,scope: $scope});
                  }
      }

});

sponzorme.controller('ActivationController',function($scope, $routeParams, $translate, $sessionStorage, loginRequest) {
      $scope.errorActivation = false;
      $scope.successActivation = false;
      loginRequest.tryActivation($routeParams.token).success(function(data){
          if(data.code==200){
            $scope.successActivation = true;
          }
      }).error(function(data){
          $scope.errorActivation = true;
      });
});

sponzorme.controller('UsersCreateController', function ($scope, $translate, $sessionStorage, userRequest, ngDialog, usSpinnerService, $location, $localStorage) {

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.sendfrom = function(){
                  $scope.error_log=[];
                  if ($scope.passwordone != undefined || $scope.passwordtwo != undefined){
                        if ($scope.passwordone == $scope.passwordtwo){
                              $scope.objuser = {}
                              $scope.objuser.email = $scope.email;
                              $scope.objuser.password = $scope.passwordone;
                              $scope.objuser.password_confirmation = $scope.passwordtwo;
                              $scope.objuser.lang = idiomaselect;
                              $scope.objuser.type = 0;
                              $scope.objuser.name = $scope.name + " " + $scope.lastname;
                              $scope.loagind = true;

                              userRequest.createUser($scope.objuser).success(function(adata){

                                    if(adata.message == "Inserted"){
                                          var datuser = JSON.stringify(adata.User);
                                          $localStorage.sponzorme = datuser;
                                          var expireDate = new Date();
                                          expireDate.setDate(expireDate.getDate() + 1);
                                          $sessionStorage.cookiesponzorme = btoa($scope.email+':'+$scope.passwordone);
                                          $sessionStorage.token = btoa($scope.email+':'+$scope.passwordone);
                                          $scope.loagind = false;
                                          $sessionStorage.typesponzorme = adata.User.type;
                                          $sessionStorage.id = adata.User.id;
                                          $sessionStorage.email = adata.User.email;
                                          $location.path("/customization");
                                    }
                              }).error(function(data){
                                if(data.message == "Not inserted"){
                                    if(data.error.email){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterEmail'));
                                    }
                                    if(data.error.name){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterName'));
                                    }
                                    if(data.error.lastname){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterLastname'));
                                    }
                                    if(data.error.password){
                                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterPassword'));
                                    }
                                }
                                $scope.loagind = false;
                                ngDialog.open({ template: 'templateId' ,scope: $scope});
                              });
                        }
                  }
                  else{
                      $scope.error_log.push(eval('translations'+idiomaselect.toUpperCase()+'.errorRegisterPassword'));
                      ngDialog.open({ template: 'templateId' ,scope: $scope});
                  }
      }

});

sponzorme.controller('UsersPrincipalController', function ($scope, $translate, $sessionStorage, $localStorage, $location, userRequest, eventRequest, rssRequest, usSpinnerService, $rootScope) {
      $scope.loadingevents = true;
      $scope.loadingrss=true;
      if($sessionStorage.cookiesponzorme &&
        $sessionStorage.email &&
        $sessionStorage.id &&
        $sessionStorage.token &&
        $sessionStorage.typesponzorme == 0
      ) {
            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }
            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                    $scope.typeuser = 0;
                }else{
                    $scope.typeuser = 1;
                }
            }
            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.userfroups = 0;

      $translate.use(idiomaselect);
      $scope.startcounter = 0;
      $scope.eventos = {};
      $scope.eventos.size = 0;
      $scope.event = {};
      this.peaks = [];
      $scope.sponzors = {};
      $scope.sponzors.size = 0;
      $scope.sponzors.balance = 0;
      $scope.users = {};
      $scope.users.size = 0;
      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  $scope.events = [];

                  $scope.users.size = adata.data.user.comunity_size;
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  angular.forEach(adata.data.user.events, function(value, key) {
                        if(value.lang == idiomaselect){
                              this.push(value);
                        }
                  },$scope.events);
                  $scope.eventos.size = $scope.events.length;
                  usSpinnerService.stop('spinner-2');
                  $scope.loadingevents = false;
                  $scope.event.current = $scope.events[0].id;
            });
      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.events = [];
            $scope.users.size = sponzormeObj.comunity_size;
            angular.forEach(sponzormeObj.events, function(value, key) {
                  if(value.lang == idiomaselect){
                        this.push(value);
                  }
            },$scope.events);
            $scope.eventos.size = $scope.events.length;
            usSpinnerService.stop('spinner-2');
            $scope.loadingevents = false;
            $scope.event.current = $scope.events[0].id;
      }

      $scope.$watch('event.current', function(newvalue, oldvalue){
            $scope.loadingpeaks=true;
            $scope.noPerksMessage=false;
            if($scope.event.current){
                  //Mostramos el boton de cargar.
                eventRequest.oneEvent(newvalue).success(function(adata)
                {
                  this.peaks=adata.data.event.perks;
                  $scope.loadingpeaks=false;
                  if(!this.peaks[0]){
                    $scope.noPerksMessage=true;
                  }
                  else{
                    $scope.noPerksMessage=false;
                  }
                }).error(function (error){
                    $scope.loadingpeaks=false;
                    $scope.noPerksMessage=true;
                });
            }
      });
      $scope.rss=[];
      rssRequest.rss(idiomaselect).success(function(data){
        $scope.rss=data.responseData.feed.entries;
        $scope.loadingrss=false;
      }).error(function(data){
        $scope.loadingrss=false;
        $scope.noRssMessage=true;
      });
      $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('UsersEventsController', function ($scope, $translate, $sessionStorage, $localStorage, FileUploader, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, $location, usSpinnerService) {

      $scope.loadingevents = true;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            var developer = $sessionStorage.developer;
            if (developer != undefined){
               if(developer == '1'){
                 $scope.developer = 1;
              }else{
                 $scope.developer = 0;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.event = {};
      $scope.event.current = "";

      eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata){
            $scope.type = {};
            $scope.type.list = adata.eventTypes;
            $scope.typefilter = [];
            angular.forEach(adata.eventTypes, function(value, key) {
                  if(value.lang == idiomaselect){
                        this.push(value);
                  }
            },$scope.typefilter);

      });

      $scope.categorias = {};

      categoryRequest.allCategories($scope.typeuser).success(function(adata){

            $scope.categorias.list = adata.categories;
            $scope.categoriasfilter = [];
            angular.forEach( adata.categories, function(value, key) {
                  if(value.lang == idiomaselect){
                        this.push(value);
                  }
            },$scope.categoriasfilter);
      });

      $scope.eventos = {};

      $scope.loadingpeaks=true;
      $scope.sponzors = {};
      $scope.sponzors.size = 0;

      $scope.sponzors.balance = 0;

      $scope.users = {};
      $scope.users.size = 0;

      $scope.peaks = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  $scope.events = [];
                  $scope.eventos = [];
                  $scope.users.size = adata.data.user.comunity_size;
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  angular.forEach(adata.data.user.events, function(value, key) {
                        if(value.lang == idiomaselect){
                              this.push(value);
                        }
                  },$scope.eventos);

                  for (var i = 0 ; i <= $scope.events.length; i++) {
                        $scope.eventos.size = i;
                  };

                  $scope.peaks = [];

                  $scope.loadingevents = false;
                  usSpinnerService.stop('spinner-1');

                  perkRequest.onePerk($scope.eventos[0].id).success(function(adata){
                      $scope.peaks.push(adata.data.Perk);
                      $scope.loadingpeaks=false; //Ocultamos el boton de cargar
                  });

            });
      }else{

            var sponzormeObj = JSON.parse($localStorage.sponzorme);

            $scope.eventos = [];
            angular.forEach(sponzormeObj.events, function(value, key) {
                  if(value.lang == idiomaselect){
                        this.push(value);
                  }
            },$scope.eventos);

            $scope.peaks = [];
            $scope.peakslist = [];
            $scope.loadingevents = false;
            usSpinnerService.stop('spinner-1');


            perkRequest.onePerk($scope.eventos[0].id).success(function(adata){
                $scope.peaks.push(adata.data.Perk);
                $scope.loadingpeaks=false; //Ocultamos el boton de cargar
            });
      }



      var url = $location.host();

      if(url == 'localhost'){
            perkRequest.allPerks().success(function(adata){
                $scope.peakslist = adata.Perk;
            });
      }





      $scope.userfroups = 0;

      $scope.sponzors = [];

      $scope.error_log = '';

      $translate.use(idiomaselect);

      $scope.menuprincipal = 'views/users/menu.html';

      $scope.today = function() {
      $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function () {
      $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
      };

      $scope.openfinal = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedfinal = true;
      };

      $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);
      $scope.events =
      [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
      ];

      $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
      }

      return '';
      };

      $scope.savetype = function(){
            $scope.category = {}
            $scope.category.name = $scope.nameevettype;
            $scope.category.description = $scope.descriptionevventtype;
            $scope.category.lang = idiomaselect;
            eventTypeRequest.createEventType($scope.category).success(function(adata){
                  $scope.nameevettype = '';
                  $scope.descriptionevventtype = '';
                  $scope.msgevent = adata.message;
                  $scope.categorias.list.push(adata.eventype);
            });
      }

      $scope.$watch('event.current', function(newvalue, oldvalue){
            $scope.loadingpeaks=true;
            if($scope.event.current){
                  //Mostramos el boton de cargar.
                  perkRequest.onePerk(newvalue).success(function(adata)
                  {
                      $scope.peaks = [];
                      $scope.peaks.push(adata.data.Perk);
                      $scope.loadingpeaks=false; //Ocultamos el boton de cargar
                  });
            }
      });

      var uploader = $scope.uploader = new FileUploader({
                  url: 'http://localhost/sponzormeyeo/app/upload.php'
            });

      $scope.newEvent = function(){

            uploader.uploadAll();

            $scope.events = {};
            $scope.events.title = $scope.titleevent;
            $scope.events.location = $scope.locationevent.name;
            $scope.events.location_reference = $scope.locationevent.reference;
            $scope.events.description = $scope.descriptionevent;
            $scope.events.starts = $scope.dtini;
            $scope.events.ends = $scope.dtfinal;
            $scope.events.lang = idiomaselect;
            $scope.events.type = $scope.typeevent;
            $scope.events.category = $scope.categoryevent;
            $scope.events.privacy = $scope.privacyevent;
            $scope.events.image = '/test.jpg';
            $scope.events.organizer = $sessionStorage.id;
            eventRequest.createEvent($scope.events).success(function(adata){
                  angular.forEach($scope.sponzors, function(value, key) {
                        $scope.perkitems = {};
                        $scope.perkitems.kind = value.kind;
                        $scope.perkitems.total_quantity = value.quantity;
                        $scope.perkitems.usd = value.usd;
                        $scope.perkitems.id_event = adata.event.id;
                        perkRequest.createPerk($scope.perkitems).success(function(pdata){
                             $scope.peaks.push(pdata.Perk);
                        });

                  },$scope.peaks);

                  $scope.eventos.push(adata.event);
                  $scope.events = {};
            });
      }

      $scope.editEvent = function(idevent){
            eventRequest.oneEvent(idevent).success(function(adata){

            });
      }

      $scope.saveperks = function(){
            $scope.perkitems = {};
            $scope.perkitems.kind = $scope.perkskind;
            $scope.perkitems.total_quantity = $scope.perksquantity;
            $scope.perkitems.usd = $scope.perksusd;
            $scope.perkitems.id_event = $scope.perksevents;
            perkRequest.createPerk($scope.perkitems).success(function(pdata){
                 this.push(pdata);
            });
      }

      $scope.addsponzor = function () {
        $scope.sponzors.push({
            kind: "",
            usd: 0,
            quantity: 1
        });
      }

      $scope.removeSponzor = function(index){
        $scope.sponzors.splice(index, 1);
      }

      $scope.updateeventtype = function(id, index, name, description, lang){
            $scope.eventput = {};
            $scope.eventput.name = name;
            $scope.eventput.description = description;
            $scope.eventput.lang = lang;
            eventTypeRequest.editEventTypePatch(id, $scope.eventput).success(function(adata){
                  $scope.type.list[index].id = adata.EventType.id;
                  $scope.type.list[index].name = adata.EventType.name;
                  $scope.type.list[index].description = adata.EventType.description;
                  $scope.type.list[index].lang = adata.EventType.lang;
                  ngDialog.open({ template: 'templateidsevent' });
            });
      }

      $scope.removeeventtype = function(index){
            var id = $scope.type.list[index].id;
            eventTypeRequest.deleteEventType(id).success(function(adata){
                  $scope.type.list.splice(index, 1);
                  if(adata.message == "Not inserted"){
                        switch(idiomaselect) {
                            case 'es':
                                $scope.error_log = translationsES.errorreg;
                                break;
                            case 'en':
                                $scope.error_log = translationsEN.errorreg;
                                break;
                            case 'pt':
                                $scope.error_log = translationsPT.errorreg;
                                break;
                        }
                  }

                  if(adata.message == "Deleted"){
                        switch(idiomaselect) {
                            case 'es':
                                $scope.error_log = translationsES.deleteelement;
                                break;
                            case 'en':
                                $scope.error_log = translationsEN.deleteelement;
                                break;
                            case 'pt':
                                $scope.error_log = translationsPT.deleteelement;
                                break;
                        }
                  }
                  ngDialog.open({ template: 'templateidsevent' });
            });
      }



      $scope.savecategory = function(){
            $scope.category = {};
            $scope.category.title = $scope.categorytitle;
            $scope.category.body = $scope.categorybody;
            $scope.category.lang = idiomaselect;

            categoryRequest.createCategory($scope.category).success(function(adata){
                  $scope.categorias.list.push(adata.category);
                  $scope.categorytitle = "";
                  $scope.categorybody = "";
                  ngDialog.open({ template: 'templateidsevent' });
            });
      }

      $scope.updateeventcategory = function(id, index, titulo, body, lang){
            $scope.categoryput = {};
            $scope.categoryput.title = titulo;
            $scope.categoryput.body = body;
            $scope.categoryput.lang = lang;
            categoryRequest.editCategoryPatch(id, $scope.categoryput).success(function(adata){
                  $scope.categorias.list[index].id = adata.category.id;
                  $scope.categorias.list[index].name = adata.category.name;
                  $scope.categorias.list[index].description = adata.category.description;
                  $scope.categorias.list[index].lang = adata.category.lang;
                  ngDialog.open({ template: 'templateidsevent' });
            });
      }

      $scope.removeeventcategory = function(index){
            var id = $scope.categorias.list[index].id;
            categoryRequest.deleteCategory(id).success(function(adata){
                  $scope.categorias.list.splice(index, 1);
                  if(adata.message == "Not inserted"){
                        switch(idiomaselect) {
                            case 'es':
                                $scope.error_log = translationsES.errorreg;
                                break;
                            case 'en':
                                $scope.error_log = translationsEN.errorreg;
                                break;
                            case 'pt':
                                $scope.error_log = translationsPT.errorreg;
                                break;
                        }
                  }

                  if(adata.message == "Deleted"){
                        switch(idiomaselect) {
                            case 'es':
                                $scope.error_log = translationsES.deleteelement;
                                break;
                            case 'en':
                                $scope.error_log = translationsEN.deleteelement;
                                break;
                            case 'pt':
                                $scope.error_log = translationsPT.deleteelement;
                                break;
                        }
                  }
                  ngDialog.open({ template: 'templateidsevent' });
            });
      }

});

sponzorme.controller('UsersSponzorsController', function ($scope, $translate, $sessionStorage, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService) {

      $scope.loadingevents = true;
      $scope.loadingtodo = true;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.userfroups = 0;

      $translate.use(idiomaselect);

      $scope.sponzors = [];

      $scope.todo = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;

                  $scope.todo = adata.data.user.perk_tasks;
                  $scope.sponzors = adata.data.user.sponzorships;
                  $scope.loadingevents = false;
                  $scope.loadingtodo = false;
                  usSpinnerService.stop('spinner-1');
                  usSpinnerService.stop('spinner-2');
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.todo = sponzormeObj.perk_tasks;
            $scope.sponzors = sponzormeObj.sponzorships;
            $scope.loadingevents = false;
            $scope.loadingtodo = false;
            usSpinnerService.stop('spinner-1');
            usSpinnerService.stop('spinner-2');
      }


      $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('UsersFriendController', function ($scope, $translate, $sessionStorage, userRequest, ngDialog) {

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.friend = {};
      $scope.friend.email = "";
      $scope.friend.message = "";

      $scope.invitefriend = function(){

            $scope.objuserinv = {};
            $scope.objuserinv.user_id = $sessionStorage.id;
            $scope.objuserinv.email = $scope.friend.email;
            $scope.objuserinv.message = $scope.friend.message;
            userRequest.invitedUser($scope.objuserinv).success(function(adata){
                  if (adata.code == 200){
                        ngDialog.open({ template: 'emailsend.html', scope: $scope });
                  }else{
                        ngDialog.open({ template: 'errorsend.html' });
                  }
            });

      }

      $scope.emailuser = $sessionStorage.email;

  $scope.menuprincipal = 'views/users/menu.html';


});

sponzorme.controller('UsersTodoController', function ($scope, $translate, $sessionStorage, $location, taskSponzorRequest, userRequest, eventRequest, perkTaskRequest, $localStorage, usSpinnerService) {

      $scope.loadingtodo = true;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.userfroups = 0;

      $translate.use(idiomaselect);

      $scope.todo = [];
      $scope.events = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;

                  $scope.todo = adata.data.user.perk_tasks;

                  $scope.loadingtodo = false;
                  usSpinnerService.stop('spinner-1');

                  angular.forEach(adata.data.user.events, function(value, key) {
                        if(value.lang == idiomaselect){
                              this.push(value);
                        }
                  },$scope.events);
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.todo = sponzormeObj.perk_tasks;
            $scope.events = sponzormeObj.events;
            $scope.loadingtodo = false;
            usSpinnerService.stop('spinner-1');
      }

      $scope.updatePeak = function(){
            eventRequest.oneEvent($scope.todo.event.id).success(function(adata){
                  $scope.peaks=adata.data.event.perks;
            });
      }

      $scope.addTodo = function (){
            //ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });
            $scope.perktask = {};
            $scope.perktask.user_id = $sessionStorage.id;
            $scope.perktask.perk_id = $scope.todo.peak.id;
            $scope.perktask.event_id = $scope.todo.event.id;
            $scope.perktask.title = $scope.todo.title;
            $scope.perktask.description = $scope.todo.description;
            $scope.perktask.type = 0;
            $scope.perktask.status = 0;

            perkTaskRequest.createPerkTask($scope.perktask).success(function(adata){
                  //Limpiamos los datos
                  if(adata.success){
                        $scope.todo.title="";
                        $scope.todo.description="";
                        $scope.updateTodos();
                        //ngDialog.close();
                        $scope.message="taskCreated";//Seteamos el mensaje de error
                        //ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope }); //Mostramos el mensaje
                  }else{
                        //ngDialog.close();
                        $scope.message="errorInFieldsTask";//Seteamos el mensaje de error
                        //ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope });
                  }
            }).error(function(data) {

            });
      }

      $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('UsersSettingsController', function ($scope, $translate, $sessionStorage, userRequest, FileUploader, $localStorage, CloudStorageService, CloudStorageConfig) {

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.account = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  $scope.account = adata.data.user;
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.todo = sponzormeObj.perk_tasks;
            $scope.sponzors = sponzormeObj.sponzorships;
            $scope.account = sponzormeObj;
      }



      $scope.editAccount = function(){

            $scope.account.location = $scope.account.location.formatted_address;
            userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata){
                  $scope.account = adata.User;
                  $localStorage.$reset();
            });
      }

      var uploader = $scope.uploader = new FileUploader({
                  url: 'http://localhost/sponzormeyeo/app/upload.php'
            });

  $scope.menuprincipal = 'views/users/menu.html';


});

sponzorme.controller('SponsorsMainController', function ($scope, $translate, $sessionStorage, userRequest, $localStorage, eventRequest, $location, usSpinnerService) {

      $scope.loadingsearch = true;

      if($sessionStorage.cookiesponzorme &&
        $sessionStorage.email &&
        $sessionStorage.id &&
        $sessionStorage.token &&
        $sessionStorage.typesponzorme == 1
      ){
            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
            $scope.account = [];

            if(!$localStorage.sponzorme){
                  userRequest.oneUser($sessionStorage.id).success(function(adata){
                        var datuser = JSON.stringify(adata.data.user);
                        $localStorage.sponzorme = datuser;
                        $scope.account = adata.data.user;
                  });

            }else{
                  var sponzormeObj = JSON.parse($localStorage.sponzorme);
                  $scope.todo = sponzormeObj.perk_tasks;
                  $scope.sponzors = sponzormeObj.sponzorships;
                  $scope.account = sponzormeObj;
            }

            $scope.searchloading = 1;

            eventRequest.allEvents().success(function(adata){
                  $scope.search = [];
                  $scope.search = adata.events;
                  $scope.searchloading = 0;
                  $scope.loadingsearch = false;
            });



            $scope.menuprincipal = 'views/sponsors/menu.html';
      }else{
           $location.path("/");
      }
});

sponzorme.controller('SponsorsSettingsController', function ($scope, $translate, $sessionStorage, userRequest, FileUploader, $localStorage) {

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.account = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  $scope.account = adata.data.user;
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.todo = sponzormeObj.perk_tasks;
            $scope.sponzors = sponzormeObj.sponzorships;
            $scope.account = sponzormeObj;
      }

      $scope.editAccount = function(){
            $scope.account.location = $scope.account.location.formatted_address;
            userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata){
                  $scope.account = adata.User;
                  $localStorage.$reset();
            });
      }

      var uploader = $scope.uploader = new FileUploader({
                  url: 'upload.php'
            });

  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('SponsorsFriendController', function ($scope, $translate, $sessionStorage, userRequest, ngDialog) {

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.invitefriend = function(){

            $scope.objuserinv = {};
            $scope.objuserinv.user_id = $sessionStorage.id;
            $scope.objuserinv.email = $scope.friend.email;
            $scope.objuserinv.message = $scope.friend.message;
            userRequest.invitedUser($scope.objuserinv).success(function(adata){
                  if (adata.code == 200){
                        ngDialog.open({ template: 'emailsend.html', scope: $scope });
                  }else{
                        ngDialog.open({ template: 'errorsend.html' });
                  }
            });

      }

      $scope.emailuser = $sessionStorage.email;

  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('SponsorsSponzorsController', function ($scope, $translate, $sessionStorage, $localStorage, userRequest, usSpinnerService) {

      $scope.loadingsponzors = true;
      $scope.loadingtodo = true;
      $scope.loadinglikesponzors = true;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      $scope.account = [];
      $scope.sponzors = [];
      $scope.sponzoringEventsloading = 1;

      $scope.taskorganizar = [];

      $scope.todo = [];
      $scope.todoperks = [];

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  $scope.sponzoringEventsloading = 0;
                  $scope.sponzors = adata.data.user.sponzorships;
                  $scope.todoperks = adata.data.user.perk_tasks;
                  $scope.taskorganizar = adata.data.user.tasks_sponzor_like_organizer;
                  $scope.loadingsponzors = false;
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.sponzors = sponzormeObj.sponzorships;
            $scope.todoperks = sponzormeObj.perk_tasks;
            $scope.taskorganizar = sponzormeObj.tasks_sponzor_like_organizer;
            $scope.loadingsponzors = false;
      }



      angular.forEach($scope.taskorganizar, function(value, key) {
            $scope.objtask = {};
            $scope.objtask.title = value.title;
            $scope.objtask.description = value.description;
            this.push($scope.objtask);

      },$scope.todo);

      $scope.loadingtodo = false;
      $scope.loadinglikesponzors = false;


  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('SponsorsFollowingController', function ($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest) {

      $scope.loadinglistsponzors = true;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }

      $scope.emailuser = $sessionStorage.email;

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
                  $scope.sponzors = adata.data.user.events;
                  $scope.loadinglistsponzors = false;
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
            $scope.sponzors = sponzormeObj.events;
            $scope.loadinglistsponzors = false;
      }



  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('UsersCustomController', function ($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest) {

      $scope.loadinglistsponzors = true;
      $scope.userData = {};
      $scope.categories = [];
      $scope.interestselectarray = [];
      $scope.step1 = true;
      $scope.step4 = false;

      if($sessionStorage) {

            var cookie = $sessionStorage.cookiesponzorme;

            if(cookie == undefined){
                  $scope.vieuser = 1;
            }else{
                  $scope.vieuser = 0;
            }

            var typeini = $sessionStorage.typesponzorme;
            if (typeini != undefined){
               if(typeini == '1'){
                 $scope.typeuser = 0;
              }else{
                 $scope.typeuser = 1;
              }
            }

            $scope.userfroups = 0;
      }else{
           $location.path("/");
      }



      $scope.emailuser = $sessionStorage.email;

      if(!$localStorage.sponzorme){
            userRequest.oneUser($sessionStorage.id).success(function(adata){
                  var datuser = JSON.stringify(adata.data.user);
                  $localStorage.sponzorme = datuser;
            });

      }else{
            var sponzormeObj = JSON.parse($localStorage.sponzorme);
      }

      categoryRequest.allCategories().success(function(adata){
            $scope.categories=adata.categories;
            allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata){
                  $scope.interests=adata.InterestCategory;
                  var log = [];
                  angular.forEach($scope.categories, function(value, key) {
                    value.interests=$scope.interests.filter(function (el) {
                      return el.category_id == value.id;
                    });
                  }, log);

            });
      });
      $scope.vieuser = 1;
      $scope.step1 = true;

      $scope.sendfrom = function(){
            $scope.objuser = {}
            $scope.objuser.age = $scope.userData.age;
            $scope.objuser.sex = $scope.userData.sex;
            $scope.objuser.lang = $scope.userData.lang;
            $scope.objuser.location = $scope.userData.location.reference;
            $scope.loagind = true;
            userRequest.editUserPatch($sessionStorage.id, $scope.objuser).success(function(adata){
                  if(adata.message == "Updated"){
                        var datuser = JSON.stringify(adata.User);
                        $localStorage.sponzorme = datuser;
                        $scope.loagind = false;
                        $scope.step1 = false;
                        $scope.step2 = true;
                        $scope.step4 = false;
                  }
            });
      }

      $scope.showInterests = function(categoryid){
            $scope.idselect = categoryid;
      }

      $scope.interestselect = function(interestselect){

            var searcharray = $scope.interestselectarray.indexOf(interestselect);
            if(searcharray == -1){
                  $scope.interestselectarray.push(interestselect);
            }else{
                  $scope.interestselectarray.splice(searcharray, 1);

            }
      }
      $scope.submitCategoryInfo = function(){
            $scope.loagind = true;
            angular.forEach($scope.interestselectarray, function(valuep, key) {
                  $scope.itemintere = {};
                  $scope.itemintere.interest_id = valuep;
                  $scope.itemintere.user_id = $sessionStorage.id;
                  userInterestRequest.createUserInterest($scope.itemintere).success(function(adata){

                  });
            });
            $scope.loagind = false;
            $scope.step1 = false;
            $scope.step2 = false;
            $scope.step4 = true;
            $localStorage.$reset();
      }
  $scope.menuprincipal = 'views/sponsors/menu.html';
});

sponzorme.controller('ForgotController', function ($scope, $translate,  $routeParams, $sessionStorage, $localStorage,ngDialog, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, loginRequest) {

  $scope.error_log=[];//We storage here all translate error during register process
  $scope.forgotPassword = function() {
    $scope.loagind = true;
    loginRequest.resetPassword($scope.email).success(function(adata){
      console.log(adata);
      $scope.loagind = false;
      $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.PasswordResetLinkSent');
      ngDialog.open({ template: 'templateId' ,scope: $scope});
    }).error(function(edata){
          $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.InvalidEmail');
          $scope.loagind = false;
          ngDialog.open({ template: 'templateId', scope: $scope});
    });
  }
  $scope.resetPassword = function(){
    $scope.errorActivation = false;
    $scope.successActivation = false;
  if($scope.password==$scope.passwordConfirmation){
    var formData={
      "email":$scope.email,
      "password":$scope.password,
      "password_confirmation":$scope.passwordConfirmation
    };
    console.log($routeParams.tokenReset);
    loginRequest.updatePassword($routeParams.tokenReset,formData).success(function(data){
          if(data.code==200){
            $scope.successActivation = true;
          }
          $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.PasswordChangedSuccesfully');
          ngDialog.open({ template: 'templateId' ,scope: $scope});
        }).error(function(edata){
              $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.InvalidData');
              $scope.loagind = false;
              ngDialog.open({ template: 'templateId', scope: $scope});
        });
      }
      else{
        $scope.error_log[0]=eval('translations'+idiomaselect.toUpperCase()+'.PasswordNoMatch');
        ngDialog.open({ template: 'templateId', scope: $scope});
      }

  }


});

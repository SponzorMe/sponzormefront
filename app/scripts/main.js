'use strict';
var idiomaselect = "en";
var sponzorme = angular.module('sponzorme', ['pascalprecht.translate', 'ngResource', 'ngRoute', 'userService',
    'loginService', 'ngDialog', 'base64', 'ngCookies', 'ngStorage',
    'angularFileUpload', 'ui.bootstrap', 'eventTypeService',
    'categoryService', 'google.places', 'eventService', 'rssService',
    'perkService', 'taskSponzorService', 'perkTaskService',
    'sponzorshipService', 'angularSpinner', 'CloudStorage',
    'allInterestsService', 'userInterestService', "naif.base64", 'imgurService', 'angularUtils.directives.dirPagination'
  ])
  .config(function($translateProvider) {
    $translateProvider.translations('es', translationsES);
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('pt', translatiosnPT);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
  })

.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
  usSpinnerConfigProvider.setDefaults({
    color: '#042333'
  });
}])

.config(function($routeProvider) {
  $routeProvider
    .when('', {
      templateUrl: 'views/main.html',
      controller: 'HomeController'
    })
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'HomeController'
    })
    .when('/activation/:token', {
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
    .when('/resend', {
      templateUrl: 'views/resend.html',
      controller: 'ResendController'
    })
    .when('/forgot', {
      templateUrl: 'views/forgot.html',
      controller: 'ForgotController'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .when('/support', {
      templateUrl: 'views/support.html'
    })
    .when('/reset/:tokenReset', {
      templateUrl: 'views/reset.html',
      controller: 'ForgotController'
    })
    .when('/sponsors/create', {
      templateUrl: 'views/sponsors/create.html',
      controller: 'SponzorsCreateController'
    })
    .when('/users/create', {
      templateUrl: 'views/users/create.html',
      controller: 'UsersCreateController'
    })
    .when('/logout', {
      templateUrl: 'views/main.html',
      controller: 'logoutController'
    })
    .when('/users/dashboard', {
      templateUrl: 'views/users/dashboard/main.html',
      controller: 'UsersPrincipalController'
    })
    .when('/users/events', {
      templateUrl: 'views/users/dashboard/events.html',
      controller: 'UsersEventsController'
    })
    .when('/users/sponzors', {
      templateUrl: 'views/users/dashboard/sponzors.html',
      controller: 'UsersSponzorsController'
    })
    .when('/customization', {
      templateUrl: 'views/customization/customization.html',
      controller: 'UsersCustomController'
    })
    .when('/users/friend', {
      templateUrl: 'views/users/dashboard/friend.html',
      controller: 'UsersFriendController'
    })
    .when('/users/settings', {
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
    .when('/event/:eventId', {
      templateUrl: 'views/event.html',
      controller: 'EventPageController'
    })
    .when('/add/event', {
      templateUrl: 'views/users/dashboard/add_event.html',
      controller: 'UsersEventsController'
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
sponzorme.run(function($rootScope, $translate, $location, allInterestsServiceRequest, $filter) {
  $rootScope.changeLanguage = function(key) {
    $translate.use(key);
    idiomaselect = key;
  };
  $rootScope.buildInterests = function() {
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata) {
      var interests = adata.InterestCategory;
      var log = [];
      var a = "";
      angular.forEach(interests, function(value, key) {
        a = a + "</br>" + ($filter('normalize')(value.name) + ":'" + value.name + "',");
      }, log);
      document.write(a);
    });
  };
});
/*
 * Author: Sebastian Gomez
 * This filters replace & by AND it is used for categories and interests translations
 */
sponzorme.filter('normalize', function() {
  return function(input) {
    if(!input) {
      return "";
    }
    input = input
      .replace('&', 'AND')
      .replace(/\W+/g, "");
    return input;
  };
});
sponzorme.controller('HomeController', function($scope, $translate, $sessionStorage, $location) {
  if ($sessionStorage) {
    var cookie = $sessionStorage.cookiesponzorme;
    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }
    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }
    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }
});

sponzorme.controller('logoutController', function($scope, $translate, $sessionStorage, $location, $localStorage) {

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

sponzorme.controller('LoginController', function($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog) {

  delete $sessionStorage.cookiesponzorme;

  delete $sessionStorage.typesponzorme;

  delete $sessionStorage.token;

  delete $sessionStorage.developer;

  delete $sessionStorage.id;

  delete $sessionStorage.email;

  $localStorage.$reset();

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.sendfrom = function() {

    if ($scope.email != undefined || $scope.password != undefined) {
      $scope.objuser = {};
      $scope.objuser.email = $scope.email;
      $scope.objuser.password = $scope.password;
      $scope.objuser.password_confirmation = $scope.passwordtwo;
      $scope.objuser.lang = idiomaselect;
      $scope.loagind = true;
      $scope.error_log = [];
      loginRequest.login($scope.objuser).success(function(adata) {
        if (adata.user.activated) {
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $sessionStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
          $sessionStorage.typesponzorme = adata.user.type;
          $sessionStorage.token = btoa($scope.email + ':' + $scope.password);
          $sessionStorage.id = adata.user.id;
          $sessionStorage.email = adata.user.email;
          idiomaselect = adata.user.lang;
          var url = $location.host();
          if (url == 'localhost') {
            $sessionStorage.developer = 1;
          }
          $scope.loagind = false;
          if (adata.user.type == 1) {
            $location.path("/sponsors/dashboard");
          } else {
            $location.path("/users/dashboard");
          }
        } else {
          $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.UnactivatedAccount');
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }

      }).error(function(edata) {
        $scope.loagind = false;
        ngDialog.open({
          template: 'errorloging.html'
        });
      });
    }
  };
});
sponzorme.controller('ResendController', function($scope, $translate, loginRequest, ngDialog) {
  $scope.error_log = []; //We storage here all translate error during register process
  $scope.resend = function() {
    $scope.loagind = true;
    loginRequest.resendActivation($scope.email).success(function(adata) {

      $scope.loagind = false;
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.ActivationLinkResent');
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }).error(function(edata) {
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.InvalidEmail');
      $scope.loagind = false;
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    });
  };

});
sponzorme.controller('SponzorsCreateController', function($scope, $translate, $sessionStorage, userRequest, ngDialog, $location, usSpinnerService, $localStorage) {
  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.sendfrom = function() {
    $scope.error_log = []; //We storage here all translate error during register process
    if ($scope.passwordone != undefined || $scope.passwordtwo != undefined) { //We verify the passwords not empty.
      if ($scope.passwordone == $scope.passwordtwo) { //We verify the passwords match atleast.
        $scope.objuser = {};
        $scope.objuser.email = $scope.email; //storage the email
        $scope.objuser.password = $scope.passwordone; //storage the password
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect; //storage the current lang
        $scope.objuser.type = 1; //the only difference beetwen the other method is the type.
        $scope.objuser.name = $scope.name + " " + $scope.lastname;
        $scope.loagind = true;
        userRequest.createUser($scope.objuser).success(function(adata) {
          if (adata.message == "Inserted") {
            var datuser = JSON.stringify(adata.User);
            $localStorage.sponzorme = datuser;
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $sessionStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
            $sessionStorage.token = btoa($scope.email + ':' + $scope.passwordone);
            $scope.loagind = false;
            $sessionStorage.typesponzorme = adata.User.type;
            $sessionStorage.id = adata.User.id;
            $sessionStorage.email = adata.User.email;
            $location.path("/customization");
          }
        }).error(function(data) {
          if (data.message == "Not inserted") {
            if (data.error.email) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterEmail'));
            }
            if (data.error.name) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterName'));
            }
            if (data.error.lastname) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterLastname'));
            }
            if (data.error.password) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
            }
          }
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        });
      }
    } else {
      $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }
  };

});

sponzorme.controller('ActivationController', function($scope, $routeParams, $translate, $sessionStorage, loginRequest) {
  $scope.errorActivation = false;
  $scope.successActivation = false;
  loginRequest.tryActivation($routeParams.token).success(function(data) {
    if (data.code == 200) {
      $scope.successActivation = true;
    }
  }).error(function(data) {
    $scope.errorActivation = true;
  });
});

sponzorme.controller('UsersCreateController', function($scope, $translate, $sessionStorage, userRequest, ngDialog, usSpinnerService, $location, $localStorage) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.sendfrom = function() {
    $scope.error_log = [];
    if ($scope.passwordone != undefined || $scope.passwordtwo != undefined) {
      if ($scope.passwordone == $scope.passwordtwo) {
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.passwordone;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect;
        $scope.objuser.type = 0;
        $scope.objuser.name = $scope.name + " " + $scope.lastname;
        $scope.loagind = true;

        userRequest.createUser($scope.objuser).success(function(adata) {

          if (adata.message == "Inserted") {
            var datuser = JSON.stringify(adata.User);
            $localStorage.sponzorme = datuser;
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $sessionStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
            $sessionStorage.token = btoa($scope.email + ':' + $scope.passwordone);
            $scope.loagind = false;
            $sessionStorage.typesponzorme = adata.User.type;
            $sessionStorage.id = adata.User.id;
            $sessionStorage.email = adata.User.email;
            $location.path("/customization");
          }
        }).error(function(data) {
          if (data.message == "Not inserted") {
            if (data.error.email) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterEmail'));
            }
            if (data.error.name) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterName'));
            }
            if (data.error.lastname) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterLastname'));
            }
            if (data.error.password) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
            }
          }
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        });
      }
    } else {
      $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }
  };
});

sponzorme.controller('UsersPrincipalController', function($scope, $translate, $sessionStorage, $localStorage, $location, userRequest, eventRequest, rssRequest, usSpinnerService, $rootScope, sponzorshipRequest) {
  $scope.loadingevents = true;
  $scope.loadingrss = true;
  $scope.tolsctive = 'active';
  if ($sessionStorage.cookiesponzorme &&
    $sessionStorage.email &&
    $sessionStorage.id &&
    $sessionStorage.token &&
    $sessionStorage.typesponzorme == 0
  ) {
    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }
    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }
    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.emailuser = $sessionStorage.email;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);
  $scope.startcounter = 0;
  $scope.eventos = {};
  $scope.eventos.size = eval('translations' + idiomaselect.toUpperCase() + '.calculating');
  $scope.event = {};
  $scope.peaks = [];
  $scope.sponzors = {};
  $scope.sponzors.size = eval('translations' + idiomaselect.toUpperCase() + '.calculating');
  $scope.sponzors.balance = eval('translations' + idiomaselect.toUpperCase() + '.calculating');
  $scope.users = {};
  $scope.users.size = 0;
  sponzorshipRequest.oneSponzorshipByOrganizer($sessionStorage.id).success(function(data) {
    $scope.sponzors.size = 0;
    $scope.sponzors.balance = 0;
    angular.forEach(data.SponzorsEvents, function(value, key) {
      if (value.status == 1) {
        $scope.sponzors.balance = parseInt($scope.sponzors.balance) + parseInt(value.usd);
      }
    });
    $scope.sponzors.size = data.SponzorsEvents.length;
  });
  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      $scope.events = [];

      $scope.users.size = adata.data.user.comunity_size;
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.events=adata.data.user.events;
      $scope.eventos.size = $scope.events.length;
      usSpinnerService.stop('spinner-2');
      $scope.loadingevents = false;
      $scope.event.current = $scope.events[0].id;
    });
  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.events = [];
    $scope.users.size = sponzormeObj.comunity_size;
    $scope.events = sponzormeObj.events;
    $scope.eventos.size = $scope.events.length;
    usSpinnerService.stop('spinner-2');
    $scope.loadingevents = false;
    $scope.event.current = $scope.events[0].id;
  }

  $scope.$watch('event.current', function(newvalue, oldvalue) {
    $scope.loadingpeaks = true;
    $scope.noPerksMessage = false;
    if ($scope.event.current) {
      eventRequest.oneEvent(newvalue).success(function(adata) {
        $scope.peaks = adata.data.event.perks;
        $scope.loadingpeaks = false;
        if (!$scope.peaks[0]) {
          $scope.noPerksMessage = true;
        } else {
          $scope.noPerksMessage = false;
        }
      }).error(function(error) {
        $scope.loadingpeaks = false;
        $scope.noPerksMessage = true;
      });
    }
  });
  $scope.rss = [];
  rssRequest.rss(idiomaselect).success(function(data) {
    $scope.rss = data.responseData.feed.entries;
    $scope.loadingrss = false;
  }).error(function(data) {
    $scope.loadingrss = false;
    $scope.noRssMessage = true;
  });

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('UsersEventsController', function($scope, $translate, $sessionStorage, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, imgurRequest) {
  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    var developer = $sessionStorage.developer;
    if (developer != undefined) {
      if (developer == '1') {
        $scope.developer = 1;
      } else {
        $scope.developer = 0;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }
  $scope.emailuser = $sessionStorage.email;
  $scope.event = {};
  eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata) {
    $scope.type = {};
    $scope.type.list = adata.eventTypes;
    $scope.typefilter=adata.eventTypes;
  });
  $scope.categorias = {};
  categoryRequest.allCategories($scope.typeuser).success(function(adata) {

    $scope.categorias.list = adata.categories;
    $scope.categoriasfilter = adata.categories;
  });
  $scope.eventos = [];
  $scope.currentPerkId = 0;
  $scope.peaks = [];
  $scope.getEventsByOrganizer = function(userId) {
    userRequest.oneUser(userId).success(function(adata) {
      $scope.eventos=adata.data.user.events;
      $scope.event.current = $scope.eventos[0].id;
    });
  };

  $scope.getEventsByOrganizer($sessionStorage.id);

  $scope.userfroups = 0;

  $scope.sponzors = [];

  $scope.error_log = '';

  $translate.use(idiomaselect);

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/users/menu.html';

  $scope.$watch('event.current', function(newvalue, oldvalue) {
    if (newvalue != "") { //Some validation to ensure no empty values
      $scope.updatePerks(newvalue);
    }
  });
  $scope.updatePerks = function(idevent) {
    $scope.loadingPerks = true;//We need put in load mode the widget
    $scope.noPerksMessage = false;//We suppose that exists persks
    $scope.loadingtasks = true;//Because we gonna get perk first and then tasks
    if (idevent) {
      eventRequest.oneEvent(idevent).success(function(adata) {
        $scope.peaks = adata.data.event.perks;
        if (!$scope.peaks[0]) {
          $scope.noPerksMessage = true;
          $scope.loadingPerks = false;
          $scope.currentPerk.Tasks = [];
          $scope.noTasksMessage = true;
          $scope.loadingtasks = false;
        } else {
          $scope.loadingPerks = false; //If here is because exists perks
          $scope.getPerk($scope.peaks[0].id); //We get the perks detail that include tasks
        }
      }).error(function(error) {
        $scope.loadingpeaks = false;
        $scope.noPerksMessage = true;
        $scope.currentPerk.Tasks = [];
        $scope.noTasksMessage = true;
        $scope.loadingtasks = false;
      });
    }
  };
  $scope.imageEvent = function(image) {
    $scope.currentImage = image;
    ngDialog.open({
      template: 'generalImage.html',
      scope: $scope
    });
  };
  $scope.getPerk = function(perkId) {
    $scope.loadingtasks = true;
    $scope.noTasksMessage = false;
    perkRequest.onePerk(perkId).success(function(adata) {
      $scope.currentPerk = adata.data;
      $scope.currentPerkId = perkId;
      if (!$scope.currentPerk.Tasks[0]) { //If here no tasks in this perk
        $scope.noTasksMessage = true;
        $scope.loadingtasks = false;
      } else { //If here there are tasks
        $scope.noTasksMessage = false;
        $scope.loadingtasks = false;
      }
    }).error(function(error) {
      $scope.loadingtasks = false;
      $scope.noPerksMessage = true;
    });
  };
  $scope.file = false; //By default no file to add.
  $scope.newEvent = function() {
    if ($scope.file) {
      var params = {
        image: $scope.file.base64,
        type: "base64"
      };
      imgurRequest.uploadImage(params).success(function(imageData) {
        $scope.newEvent = {};
        $scope.newEvent.image = imageData.data.link;
        $scope.newEvent.title = $scope.titleevent;
        $scope.newEvent.location = $scope.locationevent.name;
        $scope.newEvent.location_reference = $scope.locationevent.reference;
        $scope.newEvent.description = $scope.descriptionevent;
        $scope.newEvent.starts = $scope.dtini;
        $scope.newEvent.ends = $scope.dtfinal;
        $scope.newEvent.lang = idiomaselect;
        $scope.newEvent.type = $scope.typeevent;
        $scope.newEvent.category = $scope.categoryevent;
        $scope.newEvent.privacy = $scope.privacyevent;
        $scope.newEvent.organizer = $sessionStorage.id;
        eventRequest.createEvent($scope.newEvent).success(function(adata) {
          angular.forEach($scope.sponzors, function(value, key) {
            $scope.perkitems = {};
            $scope.perkitems.kind = value.kind;
            $scope.perkitems.total_quantity = value.quantity;
            $scope.perkitems.usd = value.usd;
            $scope.perkitems.id_event = adata.event.id;
            $scope.perkitems.reserved_quantity = 0;
            perkRequest.createPerk($scope.perkitems).success(function(pdata) {
              /*Empty Code, nothing necessary here*/
            }).error(function(edata) {
              console.log("Error creating a perk");
              console.log(edata);
            });
          });
          eventRequest.oneEvent(adata.event.id).success(function(response) { //we get the new  eventinfo
            $scope.eventos.push(response.data.event); //add new event to user event list.
            //if everything is ok, we clean the form
            $scope.titleevent = "";
            $scope.locationevent.name = "";
            $scope.locationevent.reference = "";
            $scope.locationevent = {};
            $scope.descriptionevent = "";
            $scope.dtini = "";
            $scope.dtfinal = "";
            $scope.typeevent = "";
            $scope.categoryevent = "";
            $scope.privacyevent = "";
            $scope.sponzors = {};
            $scope.loadingpeaks = false; // we stop the loading
            ngDialog.open({
              template: 'success',
              scope: $scope
            }); //finally we show a dialog telling the status of the things

          }).error(function(edata) {
            console.log("Error creating an event");
            console.log(edata);
          });
        });
      });
    } else {
      $scope.newEvent = {};
      $scope.newEvent.title = $scope.titleevent;
      $scope.newEvent.location = $scope.locationevent.name;
      $scope.newEvent.location_reference = $scope.locationevent.reference;
      $scope.newEvent.description = $scope.descriptionevent;
      $scope.newEvent.starts = $scope.dtini;
      $scope.newEvent.ends = $scope.dtfinal;
      $scope.newEvent.lang = idiomaselect;
      $scope.newEvent.type = $scope.typeevent;
      $scope.newEvent.category = $scope.categoryevent;
      $scope.newEvent.privacy = $scope.privacyevent;
      $scope.newEvent.image = 'https://lh6.googleusercontent.com/-tPiuqhhZ5YM/UwpwKcmnmHI/AAAAAAAABuA/NB2UukRdRg0/w500-h375-no/nohayfoto.png';//If no Image we set here some image
      $scope.newEvent.organizer = $sessionStorage.id;
      eventRequest.createEvent($scope.newEvent).success(function(adata) {
        angular.forEach($scope.sponzors, function(value, key) {
          $scope.perkitems = {};
          $scope.perkitems.kind = value.kind;
          $scope.perkitems.total_quantity = value.quantity;
          $scope.perkitems.usd = value.usd;
          $scope.perkitems.id_event = adata.event.id;
          $scope.perkitems.reserved_quantity = 0;
          perkRequest.createPerk($scope.perkitems).success(function(pdata) {
            /*empty Code, nothing necessary here*/
          }).error(function(edata) {
            console.log("Error creating a perk");
            console.log(edata);
          });
        });

        eventRequest.oneEvent(adata.event.id).success(function(response) { //we get the new  eventinfo
          $scope.eventos.push(response.data.event); //add new event to user event list.
          //if everything is ok, we clean the form
          $scope.titleevent = "";
          $scope.locationevent.name = "";
          $scope.locationevent.reference = "";
          $scope.locationevent = {};
          $scope.descriptionevent = "";
          $scope.dtini = "";
          $scope.dtfinal = "";
          $scope.typeevent = "";
          $scope.categoryevent = "";
          $scope.privacyevent = "";
          $scope.sponzors = {};
          $scope.loadingpeaks = false; // we stop the loading
          ngDialog.open({
            template: 'success',
            scope: $scope
          }); //finally we show a dialog telling the status of the things

        }).error(function(edata) {
          console.log("Error creating an event");
          console.log(edata);
        });
      });
    }
  };
  $scope.showTaskForm = function() {
      $scope.todo = {};
      ngDialog.open({
        template: 'formNewTask',
        scope: $scope
      });
    };
    /*this function takes the current perk and the current event, and add a task for the
      selected perk.*/
  $scope.addTask = function() {
    $scope.todo.perk_id = $scope.currentPerkId;
    $scope.todo.event_id = $scope.event.current;
    $scope.todo.status = 0; //We put the defaul status
    $scope.todo.user_id = $sessionStorage.id; //Get the organizer Id
    $scope.todo.type = 0; //If task is created by organizer the type is 0
    perkTaskRequest.createPerkTask($scope.todo).success(function(data) {
      ngDialog.closeAll();
      ngDialog.open({
        template: 'successCreatingTask',
        scope: $scope
      }); //finally we show a dialog telling the status of the things
      $scope.getPerk($scope.currentPerkId); //Refresh perks data.
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.removeTask = function(task_id) {
    perkTaskRequest.deletePerkTask(task_id).success(function(adata) {
      console.log("Deleted perk task: " + task_id);
      console.log(adata);
      $scope.getPerk($scope.currentPerkId);
    }).error(function(data) {
      console.log(adata);
      ngDialog.closeAll();
      ngDialog.open({
        template: 'errorDeletingTask',
        scope: $scope
      });
    });
  };
  $scope.formEditEvent = function(idevent) {
    $scope.eventData = {};
    eventRequest.oneEvent(idevent).success(function(adata) {
      $scope.eventData = adata.data.event;
      $scope.eventData.category = adata.data.category[0].id;
      $scope.eventData.type = adata.data.type[0].id;
      ngDialog.open({
        template: 'editForm',
        scope: $scope
      });
    });
  };
  $scope.doEditEvent = function(idevent) {
    //first we edit the perks
    angular.forEach($scope.eventData.perks, function(value, key) {
      if (value.id == -1) { //If new perk was added we insert that
        $scope.perkitems = {};
        $scope.perkitems.kind = value.kind;
        $scope.perkitems.total_quantity = value.total_quantity;
        $scope.perkitems.reserved_quantity = 0;
        $scope.perkitems.usd = value.usd;
        $scope.perkitems.id_event = idevent;
        perkRequest.createPerk($scope.perkitems).success(function(pdata) {}).error(function(edata) {
          console.log("Error creating a perk");
          console.log(edata);
        });
      } else { //If no perk was added just we edit the fields
        $scope.perkitems = value;
        perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function(pdata) {
          /*empty Code, nothing necessary here*/
        }).error(function(edata) {
          console.log("Error editing a perk");
          console.log(edata);
        });
      }
    });
    //Next we edit the event information
    eventRequest.editEventPatch(idevent, $scope.eventData).success(function(pdata) {
      $scope.getEventsBySponzor($sessionStorage.id);
      ngDialog.closeAll();
      $scope.updatePerks(idevent);
      ngDialog.open({
        template: 'successEditingEvent',
        scope: $scope
      });

    }).error(function(edata) {
      console.log("Error editing an event");
      console.log(edata);
    });
  };
  $scope.removeEvent = function(idevent) {
    eventRequest.oneEvent(idevent).success(function(adata) {
      if (adata.data.event.sponzorship.length == 0) { //If event does not have sponzorhips
        angular.forEach(adata.data.event.sponzor_tasks, function(value, key) { //First we delete the tasks
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function(adata) {
            console.log("Deleted task sponzor: " + value.id);
            console.log(adata);
          }).error(function(data) {
            console.log(adata);
          });
        });
        angular.forEach(adata.data.event.perk_tasks, function(value, key) { //First we delete the tasks
          perkTaskRequest.deletePerkTask(value.id).success(function(adata) {
            console.log("Deleted perk task: " + value.id);
            console.log(adata);
          }).error(function(data) {
            console.log(adata);
          });
        });
        angular.forEach(adata.data.event.perks, function(value, key) { //Then we delete the perks
          perkRequest.deletePerk(value.id).success(function(adata) {
            console.log("Deleted perk: " + value.id);
            console.log(adata);
          }).error(function(data) {
            console.log(adata);
          });
        });
        eventRequest.deleteEvent(adata.data.event.id).success(function(adata) {
          console.log("Deleted event: ");
          console.log(adata);
          ngDialog.open({
            template: 'successDeletingEvent',
            scope: $scope
          });
          $scope.getEventsBySponzor($sessionStorage.id);
        }).error(function(data) {
          console.log(adata);
        });
      } else { //If event has sponzorhips we can not delete
        ngDialog.open({
          template: 'errorDeletingEvent',
          scope: $scope
        }); //finally we show a dialog telling the status of the things
      }
    });

  };
  $scope.saveperks = function() {
    $scope.perkitems = {};
    $scope.perkitems.kind = $scope.perkskind;
    $scope.perkitems.total_quantity = $scope.perksquantity;
    $scope.perkitems.usd = $scope.perksusd;
    $scope.perkitems.id_event = $scope.perksevents;
    perkRequest.createPerk($scope.perkitems).success(function(pdata) {
      this.push(pdata);
    });
  };
  $scope.addsponzor = function() {
    $scope.sponzors.push({
      kind: "",
      usd: 0,
      quantity: 1,
      id: -1
    });
  };
  $scope.removeSponzor = function(index) {
    $scope.sponzors.splice(index, 1);
  };
  $scope.addEditPerk = function() {
    $scope.eventData.perks.push({
      kind: "",
      usd: 0,
      quantity: 1
    });
  };
  $scope.removeEditPerk = function(index) {
    $scope.eventData.perks.splice(index, 1);
  };
  $scope.getEventsByOrganizer($sessionStorage.id); //Here start the callback
  $translate.use(idiomaselect);
  $scope.$watch('event.current', function(newvalue, oldvalue) {
    if (newvalue != "") { //Some validation to ensure no empty values
      $scope.updatePerks(newvalue);
    }
  });
  $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('EventPageController', function($scope, $routeParams, $translate, $sessionStorage, eventRequest) {
  $scope.eventLoaded = false;
  $scope.event = {};
  eventRequest.oneEvent($routeParams.eventId).success(function(data) {
    $scope.eventLoaded = true;
    $scope.event = data.data;
  }).error(function(data) {
    $scope.eventLoaded = true;
  });
});

sponzorme.controller('UsersSponzorsController', function($scope, $translate, $sessionStorage, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog) {
  $scope.noSponzorshipsMessage = true;
  $scope.loadingsponzorships = true;
  $scope.loadingsponzorshipstasks = true;
  if ($sessionStorage) {
    var cookie = $sessionStorage.cookiesponzorme;
    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }
    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }
    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }
  $scope.emailuser = $sessionStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsByOrganizer = function() {
    sponzorshipRequest.oneSponzorshipByOrganizer($sessionStorage.id).success(function(data) {
      $scope.loadingsponzorships = false;
      $scope.noSponzorshipsMessage = false;
      $scope.loadingsponzorshipstasks = false;
      if (!data.SponzorsEvents[0]) {
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = data.SponzorsEvents;
        if ($scope.sponzorships[0].status != 0) {
          $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
        } else {
          $scope.noSponzorshipsTaskMessage = true;
        }
        $scope.sponzorships.current = $scope.sponzorships[0].id;
      }
    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsMessage = true;
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.getSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(data) {
        $scope.currentSponzorship = data;
      });
    };
    //This function changes to 1 the sponzorship status
  $scope.acceptSponzorship = function(sponzoshipId,i) {
      $scope.loadingsponzorships = true;
      $scope.loadingsponzorshipstasks = true;
      var data = {
        status: 1
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        //We make the email Request
        var info = {
          sponzorEmail: $scope.sponzorships[i].email,
          sponzorName: $scope.sponzorships[i].name,
          eventName: $scope.sponzorships[i].title,
          organizerEmail: $sessionStorage.email,
          lang: idiomaselect
        };
        sponzorshipRequest.sendSponzorshipEmail(info).success(function(Sdata){});
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
    $scope.loadingsponzorships = true;
    $scope.loadingsponzorshipstasks = true;
      var data = {
        status: 0
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value, key) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function(data) {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function(data) {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(data) {
          console.log(data);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.loadingsponzorshipstasks = true;
    $scope.noSponzorshipsTaskMessage = false;

      taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
        $scope.tasksSponzor = [];
        angular.forEach(data.tasks, function(value, key) {
          if (value.type == 0) {
            $scope.tasksSponzor.push(value);
          }
        });
        $scope.loadingsponzorshipstasks = false;

        if (!$scope.tasksSponzor[0]) {
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.noSponzorshipsTaskMessage = false;
        }

      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsTaskMessage = true;
      });
      $scope.sponzorships.current = sponzorshipId;
    };
    //This function changes to 1 the sponzor task status
  $scope.completeTask = function(taskSponzorId) {
      data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
        $scope.getTaskSponzor($scope.sponzorships.current);
      }).error(function(data) {
        console.log(data);
      });
    };
    //This function changes to 0 the sponzor task status
  $scope.uncompleteTask = function(taskSponzorId) {
    data = {
      status: 0
    };
    taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function(data) {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.seeCause = function(sponzorship) {
    console.log("hola");
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };


  $scope.toggleSidebar = function() {
    console.log($scope.tolsctive);
        $scope.tolsctive = !$scope.tolsctive;
        $scope.$apply();
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };
$scope.getSponzorshipsByOrganizer();
  $scope.menuprincipal = 'views/users/menu.html';
});

sponzorme.controller('UsersFriendController', function($scope, $translate, $sessionStorage, userRequest, ngDialog) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.friend = {};
  $scope.friend.email = "";
  $scope.friend.message = "";

  $scope.invitefriend = function() {
    $scope.loadingInvite = true;
    $scope.objuserinv = {};
    $scope.objuserinv.user_id = $sessionStorage.id;
    $scope.objuserinv.email = $scope.friend.email;
    $scope.objuserinv.message = $scope.friend.message;
    userRequest.invitedUser($scope.objuserinv).success(function(adata) {
      $scope.friend.tempEmail = $scope.friend.email;
      $scope.friend.email = "";
      $scope.friend.message = "";
      if (adata.code == 200) {
        ngDialog.open({
          template: 'emailsend.html',
          scope: $scope
        });

      } else {
        ngDialog.open({
          template: 'errorsend.html'
        });
      }
      $scope.loadingInvite = false;
    });
  };

  $scope.emailuser = $sessionStorage.email;

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/users/menu.html';


});

sponzorme.controller('UsersSettingsController', function($scope, $translate, $sessionStorage, userRequest, $localStorage, CloudStorageService, CloudStorageConfig, imgurRequest) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.emailuser = $sessionStorage.email;

  $scope.account = [];

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.account = adata.data.user;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.todo = sponzormeObj.perk_tasks;
    $scope.sponzors = sponzormeObj.sponzorships;
    $scope.account = sponzormeObj;
  }
  $scope.file = false; //By default no file to update.
  $scope.editAccount = function() {
    $scope.loadingEditAccount = true;
    $scope.account.location = $scope.account.location.formatted_address;
    if ($scope.file) {
      var params = {
        image: $scope.file.base64,
        type: "base64"
      };
      imgurRequest.uploadImage(params).success(function(data) {
        $scope.account.image = data.data.link;
        userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $localStorage.$reset();
          $scope.loadingEditAccount = false;
          $scope.file = false;
        }).error(function(eData) {
          console.log(eData);
        });
      });
    } else {
      userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
        $scope.account = adata.User;
        $localStorage.$reset();
        $scope.loadingEditAccount = false;
        $scope.file = false;
      });
    }
  };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/users/menu.html';


});

sponzorme.controller('SponsorsMainController', function($scope, $translate, $sessionStorage, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest) {

  $scope.loadingsearch = true;
  if ($sessionStorage.cookiesponzorme &&
    $sessionStorage.email &&
    $sessionStorage.id &&
    $sessionStorage.token &&
    $sessionStorage.typesponzorme == 1
  ) {
    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
    $scope.account = [];

    if (!$localStorage.sponzorme) {
      userRequest.oneUser($sessionStorage.id).success(function(adata) {
        var datuser = JSON.stringify(adata.data.user);
        $localStorage.sponzorme = datuser;
        $scope.account = adata.data.user;
      });

    } else {
      var sponzormeObj = JSON.parse($localStorage.sponzorme);
      $scope.todo = sponzormeObj.perk_tasks;
      $scope.sponzors = sponzormeObj.sponzorships;
      $scope.account = sponzormeObj;
    }

    $scope.searchloading = true;
    $scope.getAllEvents = function() {
      eventRequest.allEvents().success(function(adata) {
        $scope.search = [];
        $scope.search = adata.events;
        $scope.searchloading = 0;
        $scope.loadingsearch = false;
        $scope.setUpcomingEvents();
        $scope.setBestEvents();
      });
    };
    $scope.setUpcomingEvents = function() {
      $scope.upcomingEvents = [];
      var currentDate = new Date();
      for (var i = 0; i < $scope.search.length; i++) { //Choose randomly events
        var eventDate = new Date($scope.search[i].starts);
        if (eventDate > currentDate) {
          $scope.upcomingEvents.push($scope.search[i]);
        }
      }
    };
    $scope.setBestEvents = function() {
      $scope.bestEvents = [];
      for (var i = 0; i < $scope.search.length / 2; i++) { //Choose randomly events
        if ($scope.bestEvents.indexOf($scope.search[Math.floor(Math.random() * $scope.search.length)]) == -1) {
          $scope.bestEvents.push($scope.search[Math.floor(Math.random() * $scope.search.length)]);
        }
      }
    };
    $scope.showPerks = function(eventId) {
        $scope.loadingpeaks = true;
        $scope.noPerksMessage = true;
        eventRequest.oneEvent(eventId).success(function(data) {
          $scope.currentEvent = data.data.event;
          $scope.currentOrganizer = data.data.organizer[0];
          $scope.loadingpeaks = false;
          if ($scope.currentEvent.perks[0]) {
            $scope.noPerksMessage = false;
          } else {
            $scope.noPerksMessage = true;
          }
          ngDialog.open({
            template: 'perks',
            scope: $scope
          });
        }).error(function(data) {

        });
      };
      //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.perkToSponzor = perk;
      console.log($scope.perkToSponzor);
      ngDialog.open({
        template: 'formCreateSponzorship',
        scope: $scope
      });
    };
    $scope.createSponzorship = function() {
      /**
        this function have two steps, first, create the sponzorhip
        second create the sponzor tasks
      */
      var data = {
        status: 0,
        "sponzor_id": $sessionStorage.id,
        "perk_id": $scope.perkToSponzor.id,
        "event_id": $scope.perkToSponzor.id_event,
        "cause": $scope.perkToSponzor.cause,
        "organizer_id": $scope.currentOrganizer.id
      };
      console.log(data);

      ngDialog.closeAll();
      sponzorshipRequest.createSponzorship(data).success(function(sData) {
        perkRequest.onePerk($scope.perkToSponzor.id).success(function(sPerkData) {
          angular.forEach(sPerkData.data.Tasks, function(value, key) {
            var taskSponzor = {
              status: 0,
              "sponzor_id": $sessionStorage.id,
              "perk_id": $scope.perkToSponzor.id,
              "event_id": $scope.perkToSponzor.id_event,
              "organizer_id": $scope.currentOrganizer.id,
              "sponzorship_id": sData.Sponzorship.id,
              "task_id": value.id
            };
            taskSponzorRequest.createTaskSponzor(taskSponzor).success(function(sTaskSponzorData) {});
          });
          ngDialog.open({
            template: 'SponzorshipComplete'
          });
          $location.path("/sponsors/following"); //redirection to Following page
        }).error(function(eData) {
          console.log(eData);
        });
      }).error(function(eData) {
        console.log(eData);
      });
    };
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
          $scope.tolsctive = !$scope.tolsctive;
          if($scope.tolsctive == true){
             $scope.tolsctive = 'active';
          }
      };
    $scope.getAllEvents();

    $scope.menuprincipal = 'views/sponsors/menu.html';
  } else {
    $location.path("/");
  }
});

sponzorme.controller('SponsorsSettingsController', function($scope, $translate, $sessionStorage, userRequest, $localStorage,imgurRequest) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.emailuser = $sessionStorage.email;

  $scope.account = [];

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.account = adata.data.user;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.todo = sponzormeObj.perk_tasks;
    $scope.sponzors = sponzormeObj.sponzorships;
    $scope.account = sponzormeObj;
  }
  $scope.file = false; //By default no file to update.
  $scope.editAccount = function() {
    $scope.loadingEditAccount = true;
    $scope.account.location = $scope.account.location.formatted_address;
    if ($scope.file) {
      var params = {
        image: $scope.file.base64,
        type: "base64"
      };
      imgurRequest.uploadImage(params).success(function(data) {
        $scope.account.image = data.data.link;
        userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $localStorage.$reset();
          $scope.loadingEditAccount = false;
          $scope.file = false;
        }).error(function(eData) {
          console.log(eData);
        });
      });
    } else {
      userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
        $scope.account = adata.User;
        $localStorage.$reset();
        $scope.loadingEditAccount = false;
        $scope.file = false;
      });
    }
  };
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('SponsorsFriendController', function($scope, $translate, $sessionStorage, userRequest, ngDialog) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.invitefriend = function() {
    $scope.loadingInvite = true;
    $scope.objuserinv = {};
    $scope.objuserinv.user_id = $sessionStorage.id;
    $scope.objuserinv.email = $scope.friend.email;
    $scope.objuserinv.message = $scope.friend.message;
    userRequest.invitedUser($scope.objuserinv).success(function(adata) {
      $scope.friend.tempEmail = $scope.friend.email;
      $scope.friend.email = "";
      $scope.friend.message = "";
      if (adata.code == 200) {
        ngDialog.open({
          template: 'emailsend.html',
          scope: $scope
        });

      } else {
        ngDialog.open({
          template: 'errorsend.html'
        });
      }
      $scope.loadingInvite = false;
    });
  };

  $scope.emailuser = $sessionStorage.email;

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('SponsorsSponzorsController', function($scope, $translate, $sessionStorage, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog) {

  $scope.noSponzorshipsMessage = true;
  $scope.loadingsponzorships = true;
  $scope.loadingsponzorshipstasks = true;

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.emailuser = $sessionStorage.email;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsBySponzor = function() {
    sponzorshipRequest.oneSponzorshipBySponzor($sessionStorage.id).success(function(data) {
      $scope.loadingsponzorships = false;
      $scope.noSponzorshipsMessage = false;
      $scope.loadingsponzorshipstasks = false;
      if (!data.SponzorsEvents[0]) {
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = [];
        angular.forEach(data.SponzorsEvents, function(value, key) {
          if (value.status == 1) {
            $scope.sponzorships.push(value);
          }
        });
        if ($scope.sponzorships[0].status != 0) {
          $scope.getTaskSponzor($scope.sponzorships[0]); //Fit the tasks with the first sponzorships
        } else {
          $scope.noSponzorshipsTaskMessage = true;
        }
        $scope.sponzorships.current = $scope.sponzorships[0].id;
      }
    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsMessage = true;
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.getSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(data) {
        $scope.currentSponzorship = data;
      });
    };
    //This function changes to 1 the sponzorship status
  $scope.acceptSponzorship = function(sponzoshipId) {
      data = {
        status: 1
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
      data = {
        status: 0
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value, key) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function(data) {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function(data) {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(data) {
          console.log(data);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorship) {
      $scope.sponzorships.current = sponzorship.id;
      $scope.currentSponzorship = sponzorship;
      taskSponzorRequest.tasksBySponzorship(sponzorship.id).success(function(data) {
        $scope.tasksSponzor = data.tasks;
        $scope.loadingsponzorshipstasks = false;

        if (!$scope.tasksSponzor[0]) {
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.noSponzorshipsTaskMessage = false;
        }

      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsTaskMessage = true;
      });
    };
    //This function changes to 1 the sponzor task status
  $scope.completeTask = function(taskSponzorId) {
      data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
        $scope.getTaskSponzor($scope.currentSponzorship);
      }).error(function(data) {
        console.log(data);
      });
    }
    //This function changes to 0 the sponzor task status
  $scope.uncompleteTask = function(taskSponzorId) {
    data = {
      status: 0
    };
    taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function(data) {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.showTaskForm = function() {
    $scope.todo = {};
    ngDialog.open({
      template: 'formNewTask',
      scope: $scope
    });
  };
  $scope.addTaskSponzor = function() {
    console.log($scope.currentSponzorship);
    $scope.todo.perk_id = $scope.currentSponzorship.perk_id;
    $scope.todo.event_id = $scope.currentSponzorship.event_id;
    $scope.todo.status = 0; //We put the defaul status
    $scope.todo.user_id = $sessionStorage.id; //Get the organizer Id
    $scope.todo.type = 1; //If task is created by sponzor the type is 1
    /** First we crete the perk task, and then we create the task sponzor **/
    perkTaskRequest.createPerkTask($scope.todo).success(function(data) {
      var taskSponzor = {
        status: 0,
        "sponzor_id": $sessionStorage.id,
        "perk_id": $scope.currentSponzorship.perk_id,
        "event_id": $scope.currentSponzorship.event_id,
        "organizer_id": $scope.currentSponzorship.organizer_id,
        "sponzorship_id": $scope.currentSponzorship.id,
        "task_id": data.PerkTask.id
      };
      taskSponzorRequest.createTaskSponzor(taskSponzor).success(function(sTaskSponzorData) {
        $scope.getTaskSponzor($scope.currentSponzorship); //Refresh perks data.
      });
      ngDialog.closeAll();
      ngDialog.open({
        template: 'successCreatingTask',
        scope: $scope
      }); //finally we show a dialog telling the status of the things
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.getSponzorshipsBySponzor();
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.menuprincipal = 'views/sponsors/menu.html';
});

sponzorme.controller('SponsorsFollowingController', function($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog) {

  $scope.loadinglistsponzors = true;

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.emailuser = $sessionStorage.email;

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.sponzors = adata.data.user.events;
      $scope.loadinglistsponzors = false;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.sponzors = sponzormeObj.events;
    $scope.loadinglistsponzors = false;
  }
  $scope.loadSponzorships = function() {
      sponzorshipRequest.oneSponzorshipBySponzor($sessionStorage.id).success(function(data) {
        console.log(data);
        $scope.loadingsponzorships = false;
        $scope.noSponzorshipsMessage = false;
        $scope.loadingsponzorshipstasks = false;
        if (!data.SponzorsEvents[0]) {
          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.sponzorships = [];
          angular.forEach(data.SponzorsEvents, function(value, key) {
            if (value.status == 0) {
              $scope.sponzorships.push(value);
            }
          });
          if ($scope.sponzorships[0] && $scope.sponzorships[0].status == 0) {
            $scope.getTaskSponzor($scope.sponzorships[0].id) //Fit the tasks with the first sponzorships
            $scope.sponzorships.current = $scope.sponzorships[0].id;
          } else {
            $scope.noSponzorshipsMessage = true;
            $scope.noSponzorshipsTaskMessage = true;
          }

        }
      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value, key) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function(data) {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function(data) {
          $scope.loadSponzorships();
        }).error(function(data) {
          console.log(data);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.sponzorships.current = sponzorshipId;
    taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
      $scope.loadingsponzorshipstasks = false;
      $scope.tasksSponzor = [];
      angular.forEach(data.tasks, function(value, key) {
        if (value.type == 0) {
          $scope.tasksSponzor.push(value);
        }
      });
      if (!$scope.tasksSponzor[0]) {
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.noSponzorshipsTaskMessage = false;
      }

    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.loadSponzorships();
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/sponsors/menu.html';


});

sponzorme.controller('UsersCustomController', function($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest) {

  $scope.loadinglistsponzors = true;
  $scope.userData = {};
  $scope.categories = [];
  $scope.interestselectarray = [];
  $scope.step1 = true;
  $scope.step4 = false;

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }



  $scope.emailuser = $sessionStorage.email;

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
  }

  categoryRequest.allCategories().success(function(adata) {
    $scope.categories = adata.categories;
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata) {
      $scope.interests = adata.InterestCategory;
      var log = [];
      angular.forEach($scope.categories, function(value, key) {
        value.interests = $scope.interests.filter(function(el) {
          return el.category_id == value.id;
        });
      }, log);

    });
  });
  $scope.vieuser = 1;
  $scope.step1 = true;

  $scope.sendfrom = function() {
    $scope.objuser = {}
    $scope.objuser.age = $scope.userData.age;
    $scope.objuser.sex = $scope.userData.sex;
    $scope.objuser.lang = $scope.userData.lang;
    $scope.objuser.location = $scope.userData.location.reference;
    $scope.loagind = true;
    userRequest.editUserPatch($sessionStorage.id, $scope.objuser).success(function(adata) {
      if (adata.message == "Updated") {
        var datuser = JSON.stringify(adata.User);
        $localStorage.sponzorme = datuser;
        $scope.loagind = false;
        $scope.step1 = false;
        $scope.step2 = true;
        $scope.step4 = false;
      }
    });
  };

  $scope.showInterests = function(categoryid) {
    $scope.idselect = categoryid;
  };

  $scope.interestselect = function(interestselect) {

    var searcharray = $scope.interestselectarray.indexOf(interestselect);
    if (searcharray == -1) {
      $scope.interestselectarray.push(interestselect);
    } else {
      $scope.interestselectarray.splice(searcharray, 1);

    }
  };
  $scope.submitCategoryInfo = function() {
    $scope.loagind = true;
    angular.forEach($scope.interestselectarray, function(valuep, key) {
      $scope.itemintere = {};
      $scope.itemintere.interest_id = valuep;
      $scope.itemintere.user_id = $sessionStorage.id;
      userInterestRequest.createUserInterest($scope.itemintere).success(function(adata) {

      });
    });
    $scope.loagind = false;
    $scope.step1 = false;
    $scope.step2 = false;
    $scope.step4 = true;
    $localStorage.$reset();
  };
  $scope.menuprincipal = 'views/sponsors/menu.html';
});

sponzorme.controller('ForgotController', function($scope, $translate, $routeParams, $sessionStorage, $localStorage, ngDialog, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, loginRequest) {

  $scope.error_log = []; //We storage here all translate error during register process
  $scope.forgotPassword = function() {
    $scope.loagind = true;
    loginRequest.resetPassword($scope.email).success(function(adata) {
      console.log(adata);
      $scope.loagind = false;
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.PasswordResetLinkSent');
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }).error(function(edata) {
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.InvalidEmail');
      $scope.loagind = false;
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    });
  };
  $scope.resetPassword = function() {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    if ($scope.password == $scope.passwordConfirmation) {
      var formData = {
        "email": $scope.email,
        "password": $scope.password,
        "password_confirmation": $scope.passwordConfirmation
      };
      console.log($routeParams.tokenReset);
      loginRequest.updatePassword($routeParams.tokenReset, formData).success(function(data) {
        if (data.code == 200) {
          $scope.successActivation = true;
        }
        $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.PasswordChangedSuccesfully');
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }).error(function(edata) {
        $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.InvalidData');
        $scope.loagind = false;
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      });
    } else {
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.PasswordNoMatch');
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }

  };


});

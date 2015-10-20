'use strict';
(function(){
angular.module("sponzorme")
.controller('OrganizersEventsController', OrganizersEventsController);

function OrganizersEventsController($scope, $translate, $sessionStorage, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, imgurRequest) {
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

  $scope.menuprincipal = 'views/organizers/menu.html';

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
  $scope.menuprincipal = 'views/organizers/menu.html';
};
})();

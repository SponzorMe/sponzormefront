'use strict';
(function(){

function OrganizersEventsController($scope, $translate, $sessionStorage, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, imgurRequest, taskSponzorRequest, $rootScope) {
  $rootScope.userValidation("0");//Validation
  //Vars Initialization
  $scope.sponzors = [];
  $scope.error_log = '';
  $scope.eventos = [];
  $scope.currentPerkId = 0;
  $scope.currentPerk = {};
  $scope.peaks = [];
  $scope.tolsctive = 'active';
  $scope.emailuser = $sessionStorage.email;
  $scope.file = false; //By default no file to add.
  $scope.event = {};
  eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata) {
    $scope.type = {};
    $scope.type.list = adata.eventTypes;
    $scope.typefilter = adata.eventTypes;
  });
  $scope.categorias = {};
  categoryRequest.allCategories($scope.typeuser).success(function(adata) {
    $scope.categorias.list = adata.categories;
    $scope.categoriasfilter = adata.categories;
  });
  $scope.getEventsByOrganizer = function(userId) {
    $scope.loadingEvents = true;
    $scope.noEventsMessage = false;
    $scope.loadingtasks = true;
    $scope.noTasksMessage = false;
    $scope.loadingPerks = true;
    $scope.noPerksMessage = false;
    userRequest.oneUser(userId).success(function(adata) {
      $scope.eventos = adata.data.user.events;
      $scope.loadingEvents = false;      
      if($scope.eventos[0]){
        $scope.event.current = $scope.eventos[0].id;
      }
      else{
        $scope.loadingtasks = false;
        $scope.loadingPerks = false;
        $scope.noEventsMessage = true;
      }
    });
  };  
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.$watch('event.current', function(newvalue) {
    if (newvalue !== '' && newvalue !== "0" &&  typeof newvalue !== 'undefined') { //Some validation to ensure no empty values
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
      }).error(function() {
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
    }).error(function() {
      $scope.loadingtasks = false;
      $scope.noPerksMessage = true;
    });
  };
  $scope.createNewEvent = function(){
      $scope.newEvent.title = $scope.titleevent;
      $scope.newEvent.location = $scope.locationevent.formatted_address;
      $scope.newEvent.location_reference = $scope.locationevent.place_id;
      $scope.newEvent.description = $scope.descriptionevent;
      $scope.newEvent.starts = moment($scope.dtini).format('YYYY-MM-DD hh:mm:ss');
      $scope.newEvent.ends = moment($scope.dtfinal).format('YYYY-MM-DD hh:mm:ss');
      $scope.newEvent.lang = idiomaselect;
      $scope.newEvent.type = $scope.typeevent;
      $scope.newEvent.category = $scope.categoryevent;
      $scope.newEvent.privacy = $scope.privacyevent;
      $scope.newEvent.organizer = $sessionStorage.id;

      eventRequest.createEvent($scope.newEvent).success(function(adata) {
        angular.forEach($scope.sponzors, function(value) {
          $scope.perkitems = {};
          $scope.perkitems.kind = value.kind;
          $scope.perkitems.total_quantity = value.quantity;
          $scope.perkitems.usd = value.usd;
          $scope.perkitems.id_event = adata.event.id;
          $scope.perkitems.reserved_quantity = 0;
          perkRequest.createPerk($scope.perkitems).success(function() {
            /*Empty Code, nothing necessary here*/
          }).error(function(eData) {
            console.log('Error creating a perk');
            console.log(eData);
          });
        });
        eventRequest.oneEvent(adata.event.id).success(function(response) { //we get the new  eventinfo
          $scope.eventos.push(response.data.event); //add new event to user event list.
          //if everything is ok, we clean the form
          $scope.titleevent = '';
          $scope.locationevent.name = '';
          $scope.locationevent.reference = '';
          $scope.locationevent = {};
          $scope.descriptionevent = '';
          $scope.dtini = '';
          $scope.dtfinal = '';
          $scope.typeevent = '';
          $scope.categoryevent = '';
          $scope.privacyevent = '';
          $scope.sponzors = {};
          $scope.loadingpeaks = false; // we stop the loading
          $scope.loadingNewEvent = false;
          $scope.errorNewEvent = false;
          ngDialog.open({
            template: 'success',
            scope: $scope
          }); //finally we show a dialog telling the status of the things

        }).error(function(edata) {
        console.log('Error getting an event');
        console.log(edata);
        $scope.loadingNewEvent = false;
        $scope.errorNewEvent = true;
      });        
    }).error(function(edata) {
        console.log('Error creating an event');
        console.log(edata);
        $scope.loadingNewEvent = false;
        $scope.errorNewEvent = true;
    });
  };  
  $scope.newEvent = function() {
    $scope.loadingNewEvent = true;
    $scope.errorNewEvent = false;
    $scope.newEvent = {};
    if ($scope.file) {
      var params = {
        image: $scope.file.base64,
        type: 'base64'
      };      
      imgurRequest.uploadImage(params).success(function(imageData) {
        $scope.newEvent.image = imageData.data.link;
        $scope.createNewEvent();  
      });
    } else {
      $scope.newEvent.image = 'https://lh6.googleusercontent.com/-tPiuqhhZ5YM/UwpwKcmnmHI/AAAAAAAABuA/NB2UukRdRg0/w500-h375-no/nohayfoto.png';//If no Image we set here some image
      $scope.createNewEvent();
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
    perkTaskRequest.createPerkTask($scope.todo).success(function() {
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
      console.log('Deleted perk task: ' + task_id);
      console.log(adata);
      $scope.getPerk($scope.currentPerkId);
    }).error(function() {
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
    });
  };
  $scope.doEditEvent = function(idevent) {
    //first we edit the perks
    angular.forEach($scope.eventData.perks, function(value) {
      if (value.id === -1) { //If new perk was added we insert that
        $scope.perkitems = {};
        $scope.perkitems.kind = value.kind;
        $scope.perkitems.total_quantity = value.total_quantity;
        $scope.perkitems.reserved_quantity = 0;
        $scope.perkitems.usd = value.usd;
        $scope.perkitems.id_event = idevent;
        perkRequest.createPerk($scope.perkitems).success(function() {}).error(function(edata) {
          console.log('Error creating a perk');
          console.log(edata);
        });
      } else { //If no perk was added just we edit the fields
        $scope.perkitems = value;
        perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function() {
          /*empty Code, nothing necessary here*/
        }).error(function(eData) {
          console.log('Error editing a perk');
          console.log(eData);
        });
      }
    });
    //Next we edit the event information
    eventRequest.editEventPatch(idevent, $scope.eventData).success(function() {
      $scope.getEventsByOrganizer($sessionStorage.id);
      ngDialog.closeAll();
      $scope.updatePerks(idevent);
      ngDialog.open({
        template: 'successEditingEvent',
        scope: $scope
      });

    }).error(function(edata) {
      console.log('Error editing an event');
      console.log(edata);
    });
  };
  $scope.removeEvent = function(idevent) {
    eventRequest.oneEvent(idevent).success(function(adata) {
      if (adata.data.event.sponzorship.length === 0) { //If event does not have sponzorhips
        angular.forEach(adata.data.event.sponzor_tasks, function(value) { //First we delete the tasks
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {
            console.log('Deleted task sponzor: ' + value.id);
          }).error(function(eData) {
            console.log(eData);
          });
        });
        angular.forEach(adata.data.event.perk_tasks, function(value) { //First we delete the tasks
          perkTaskRequest.deletePerkTask(value.id).success(function() {
            console.log('Deleted perk task: ' + value.id);
            console.log();
          }).error(function(eData) {
            console.log(eData);
          });
        });
        angular.forEach(adata.data.event.perks, function(value) { //Then we delete the perks
          perkRequest.deletePerk(value.id).success(function() {
            console.log('Deleted perk: ' + value.id);
          }).error(function(eData) {
            console.log(eData);
          });
        });
        eventRequest.deleteEvent(adata.data.event.id).success(function() {
          console.log('Deleted event: ');
          ngDialog.open({
            template: 'successDeletingEvent',
            scope: $scope
          });
          $scope.getEventsBySponzor($sessionStorage.id);
        }).error(function(eData) {
          console.log(eData);
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
      kind: '',
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
      kind: '',
      usd: 0,
      quantity: 1
    });
  };
  $scope.removeEditPerk = function(index) {
    $scope.eventData.perks.splice(index, 1);
  };
  $scope.getEventsByOrganizer($sessionStorage.id); //Here start the callback
  $translate.use(idiomaselect);
  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersEventsController', OrganizersEventsController);

})();

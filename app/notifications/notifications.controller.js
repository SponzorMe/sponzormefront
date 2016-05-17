(function () {
    'use strict';

    function NotificationController($scope, userRequest, $localStorage, $rootScope, $firebaseArray, $log) {

        if ($localStorage.id) {
            $scope.help = $localStorage.help;
            var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
            $scope.notifications = $firebaseArray(notificationsRef);
            notificationsRef.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if ($localStorage.lastUpdate < current.date && current.to === $localStorage.id) {
                    $localStorage.help = true;
                    $scope.help = true;
                    userRequest.home($localStorage.id).then(function successCallback(response) {
                        console.log(response);
                        $localStorage.lastUpdate = new Date().getTime();

                        if ($localStorage.type !== '1' && response.data.user.events.length) {
                            response.data.user.events = response.data.user.events.filter(function (e) {
                                e.starts = e.starts.replace(' ', 'T');
                                e.starts = new Date(e.starts).getTime();
                                return e;
                            });
                        }

                        if ($localStorage.type === '1' && response.data.events.length) {
                            var parsedEvents = response.data.events.filter(function (e) {
                                e.starts = e.starts.replace(' ', 'T');
                                e.ends = e.ends.replace(' ', 'T');
                                e.starts = new Date(e.starts).getTime();
                                e.ends = new Date(e.ends).getTime();
                                return e;
                            })
                            $localStorage.events = JSON.stringify(parsedEvents);
                        }

                        if ($localStorage.type === '1' && response.data.user.sponzorships.length) {
                            response.data.user.sponzorships = response.data.user.sponzorships.filter(function (e) {
                                e.event.starts = e.event.starts.replace(' ', 'T');
                                e.event.starts = new Date(e.event.starts).getTime();
                                return e;
                            });
                        }

                        if ($localStorage.type !== '1' && response.data.eventTasks.length) {
                            var filteredEvents = [];
                            response.data.eventTasks.filter(function (e) {
                                if (e.sponzorship.length) {
                                    return e.perks.filter(function (p) {
                                        if (p.sponzor_tasks.length) {
                                            filteredEvents.push(e);
                                            return e;
                                        }
                                    });
                                }
                            });
                            response.data.user.eventTasks = filteredEvents;
                        }

                        $localStorage.user = JSON.stringify(response.data.user);
                        $localStorage.$apply();
                    });
                }
            });
        }
    }
    angular.module('sponzorme').controller('NotificationController', NotificationController);
    NotificationController.$inject = ['$scope', 'userRequest', '$localStorage', '$rootScope', '$firebaseArray', '$log'];
})();
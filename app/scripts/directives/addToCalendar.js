'use strict';

angular
  .module('jshor.angular-addtocalendar', [])
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(http(s)?|data):/);
    }
  ])
  .controller('AddtocalendarCtrl', ['$scope',
    function ($scope) {


      $scope.description = $scope.description || '';

      /**
       * Renders a .ics file and downloads it to the client browser.
       * The name of the file will be the event title with alphanumeric chars
       * having the extension `.ics`.
       *
       * @param  {Boolean} encodeUri  encode the
       * @return {String}  ics calendar data
       */
      function getIcsCalendar(encodeUri) {

        function formatIcsText(s, maxLength) {
          if (!s || !s.length) return s;
          return wrap(s.replace(/\n/g, '\\n'), maxLength);
        }

        function wrap(s, maxLength) {
          if (!maxLength) maxLength = 75;
          if (!s || s.length <= maxLength) {
            return s;
          } else {
            return s.substring(0, maxLength).replace(/\n/g, '\\n') + "\r\n " + wrap(s.substring(maxLength), 75);
          }
        }

        var elements = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'CLASS:PUBLIC',
          'DESCRIPTION:' + formatIcsText($scope.description, 62),
          'DTSTART:' + $scope.startDate,
          'DTEND:' + $scope.endDate,
          'LOCATION:' + formatIcsText($scope.location, 64),
          'SUMMARY:' + formatIcsText($scope.title, 66),
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'END:VCALENDAR'
        ];

        return elements.join('\n');

      }

      /**
       * Generates a url to add event to Yahoo! Calendar.
       *
       * @return {String} yahoo cal url
       */
      function getYahooCalendarUrl() {

        var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
        yahooCalendarUrl += '&title=' + encodeURIComponent($scope.title);
        yahooCalendarUrl += '&st=' + encodeURIComponent($scope.startDate) + '&et=' + encodeURIComponent($scope.endDate);
        yahooCalendarUrl += '&desc=' + encodeURIComponent($scope.description);
        yahooCalendarUrl += '&in_loc=' + encodeURIComponent($scope.location);

        return yahooCalendarUrl;

      };

      /**
       * Generates a url to add event to Google Calendar.
       *
       * @return {String} google cal url
       */
      function getGoogleCalendarUrl() {

        var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
        googleCalendarUrl += '&text=' + encodeURIComponent($scope.title);
        googleCalendarUrl += '&dates=' + encodeURIComponent($scope.startDate) + '/' + encodeURIComponent($scope.endDate);
        googleCalendarUrl += '&details=' + encodeURIComponent($scope.description);
        googleCalendarUrl += '&location=' + encodeURIComponent($scope.location);

        return googleCalendarUrl;

      };

      /**
       * Generates a url to add event to Windows Live Calendar.
       *
       * @return {String} microsoft cal url
       */
      function getMicrosoftCalendarUrl() {

        var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
        microsoftCalendarUrl += '&summary=' + encodeURIComponent($scope.title);
        microsoftCalendarUrl += '&dtstart=' + encodeURIComponent($scope.startDate) + '&dtend=' + encodeURIComponent($scope.endDate);
        microsoftCalendarUrl += '&description=' + encodeURIComponent($scope.description);
        microsoftCalendarUrl += '&location=' + encodeURIComponent($scope.location);

        return microsoftCalendarUrl;

      };

      function dlIcal() {

        // render safe filename for iCal (only \w chars) based on event title
        var fileName = $scope.title.replace(/[^\w ]+/g, '') + '.ics';

        download(getIcsCalendar(), fileName, 'application/octet-stream');

      }

      $scope.calendarUrl = {
        microsoft: getMicrosoftCalendarUrl(),
        google: getGoogleCalendarUrl(),
        yahoo: getYahooCalendarUrl(),
        icalendar: getIcsCalendar(),
        dlIcal: dlIcal
      };

    }

  ])
  .directive('addtocalendar', function () {

    return {

      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@'
      },
      controller: 'AddtocalendarCtrl',
      template: `
      <md-button class="md-raised" ng-click="calendarUrl.dlIcal()">iCalendar</md-button>
      <md-button class="md-raised md-primary" href="{{calendarUrl.google}}" target="_blank">Google Calendar</md-button>
      <md-button class="md-raised md-primary" ng-click="calendarUrl.dlIcal()">Outlook</md-button>
      <md-button class="md-raised md-warn" href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</md-button>
      <md-button class="md-raised md-warn" href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</md-button>
      <a </a>
      <a</a>
      <a</a>
      <a </a>`
    };

  });

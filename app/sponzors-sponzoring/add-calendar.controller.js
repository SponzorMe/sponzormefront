(function() {
  'use strict';

  function addCalendarController($scope) {
    $scope.currentSponzorship.event.description = $scope.currentSponzorship.event.description || '';

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
          return s.substring(0, maxLength).replace(/\n/g, '\\n') + '\r\n ' + wrap(s.substring(maxLength), 75);
        }
      }

      var elements = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        'DESCRIPTION:' + formatIcsText($scope.currentSponzorship.event.description, 62),
        'DTSTART:' + $scope.starts,
        'DTEND:' + $scope.ends,
        'LOCATION:' + formatIcsText($scope.currentSponzorship.event.location, 64),
        'SUMMARY:' + formatIcsText($scope.currentSponzorship.event.title, 66),
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
      yahooCalendarUrl += '&title=' + encodeURIComponent($scope.currentSponzorship.event.title);
      yahooCalendarUrl += '&st=' + encodeURIComponent($scope.starts) + '&et=' + encodeURIComponent($scope.ends);
      yahooCalendarUrl += '&desc=' + encodeURIComponent($scope.currentSponzorship.event.description);
      yahooCalendarUrl += '&in_loc=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return yahooCalendarUrl;

    };

    /**
     * Generates a url to add event to Google Calendar.
     *
     * @return {String} google cal url
     */
    function getGoogleCalendarUrl() {

      var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
      googleCalendarUrl += '&text=' + encodeURIComponent($scope.currentSponzorship.event.title);
      googleCalendarUrl += '&dates=' + encodeURIComponent($scope.starts) + '/' + encodeURIComponent($scope.ends);
      googleCalendarUrl += '&details=' + encodeURIComponent($scope.currentSponzorship.event.description);
      googleCalendarUrl += '&location=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return googleCalendarUrl;

    };

    /**
     * Generates a url to add event to Windows Live Calendar.
     *
     * @return {String} microsoft cal url
     */
    function getMicrosoftCalendarUrl() {

      var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
      microsoftCalendarUrl += '&summary=' + encodeURIComponent($scope.currentSponzorship.event.title);
      microsoftCalendarUrl += '&dtstart=' + encodeURIComponent($scope.starts) + '&dtend=' + encodeURIComponent($scope.ends);
      microsoftCalendarUrl += '&description=' + encodeURIComponent($scope.currentSponzorship.event.description);
      microsoftCalendarUrl += '&location=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return microsoftCalendarUrl;

    };

    function dlIcal() {

      // render safe filename for iCal (only \w chars) based on event title
      var fileName = $scope.currentSponzorship.event.title.replace(/[^\w ]+/g, '') + '.ics';

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
  angular.module('sponzorme').controller('addCalendarController', addCalendarController);
})();

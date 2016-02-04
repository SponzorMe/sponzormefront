(function() {
  'use strict';
  angular
    .module('sponzorme')
    .constant('DEFAULTLANG', 'en')
    .constant('DEMOSTEPS', 4)
    .constant('MAXPERKLIMIT', 200)
    .constant('MAXAGE', 100)
    .constant('MINAGE', 16)
    .constant('SPONZORSHIPSTATUSES',['pending','accepted', 'save', 'paid', 'payment in process'])
    .constant('EXPIRATIONTIME', 1);//It means a Day
})();

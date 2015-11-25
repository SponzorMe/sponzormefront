/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function sponzorshipRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allSponzorships: function(){
				return $http.get(apiPath + 'sponzorships');

			},
			oneSponzorship: function(sponzorshipId){
				return $http.get(apiPath + 'sponzorships/' + sponzorshipId);

			},
			oneSponzorshipByOrganizer: function(organizerId){
				return $http.get(apiPath + 'sponzorships_organizer/' + organizerId);
			},
			oneSponzorshipBySponzor: function(sponzorId){
				return $http.get(apiPath + 'sponzorships_sponzor/' + sponzorId);
			},
			sendSponzorshipEmail: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorship_email',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createSponzorship: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createSponzorshipToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $.param(data)
				});
			},
			deleteSponzorship: function(sponzorshipId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editSponzorshipPatch: function(sponzorshipId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editSponzorshipPut: function(sponzorshipId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('sponzorshipService', ['ngStorage'])
		.factory('sponzorshipRequest', sponzorshipRequest);
})();

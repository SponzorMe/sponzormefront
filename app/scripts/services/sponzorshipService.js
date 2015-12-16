/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function sponzorshipRequest($http, $localStorage, $httpParamSerializerJQLike, URL) {
		var token = $localStorage.token;
		return {
			allSponzorships: function(){
				return $http.get(URL + 'sponzorships');

			},
			oneSponzorship: function(sponzorshipId){
				return $http.get(URL + 'sponzorships/' + sponzorshipId);

			},
			oneSponzorshipByOrganizer: function(organizerId){
				return $http.get(URL + 'sponzorships_organizer/' + organizerId);
			},
			oneSponzorshipBySponzor: function(sponzorId){
				return $http.get(URL + 'sponzorships_sponzor/' + sponzorId);
			},
			sendSponzorshipEmail: function(data){
				return $http({
					method: 'POST',
					url: URL + 'sponzorship_email',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			sendSponzorshipEmailOrganizer: function(data){
				return $http({
					method: 'POST',
					url: URL + 'sponzorship_email_organizer',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createSponzorship: function(data){
				return $http({
					method: 'POST',
					url: URL + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createSponzorshipToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: URL + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteSponzorship: function(sponzorshipId){
				return $http({
					method: 'DELETE',
					url: URL + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editSponzorshipPatch: function(sponzorshipId, data){
				return $http({
					method: 'PATCH',
					url: URL + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editSponzorshipPut: function(sponzorshipId, data){
				return $http({
					method: 'PUT',
					url: URL + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('sponzorshipRequest', sponzorshipRequest);
})();

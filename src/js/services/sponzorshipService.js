/**
* @Servicio de Sponzorships (Beneficios) 
*
* @author Sebastian
* @version 0.1
*/
angular.module('sponzorshipService', ['ngCookies'])
	.factory('sponzorshipRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allSponzorships : function(){
				return $http.get(path + 'sponzorships');
					
			},
			oneSponzorship : function(sponzorshipId){
				return $http.get(path + 'sponzorships/' + sponzorshipId);
				
			},
			createSponzorship : function(data){
				return $http({
					method: 'POST',
					url: path + 'sponzorships',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteSponzorship : function(sponzorshipId){
				return $http({
					method: 'DELETE',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editSponzorshipPatch : function(sponzorshipId,data){
				return $http({
					method: 'PATCH',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editSponzorshipPut : function(sponzorshipId,data){
				return $http({
					method: 'PUT',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
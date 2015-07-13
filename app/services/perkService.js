/**
* @Servicio de Perks (Beneficios) 
*
* @author Sebastian
* @version 0.1
*/
angular.module('perkService', ['ngCookies'])
	.factory('perkRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allPerks : function(){
				return $http.get(path + 'perks');
					
			},
			onePerk : function(perkId){
				return $http.get(path + 'perks/' + perkId);
				
			},
			createPerk : function(data){
				return $http({
					method: 'POST',
					url: path + 'perks',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deletePerk : function(perkId){
				return $http({
					method: 'DELETE',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editPerkPatch : function(perkId,data){
				return $http({
					method: 'PATCH',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editPerkPut : function(perkId,data){
				return $http({
					method: 'PUT',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
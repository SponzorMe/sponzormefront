/**
* @Servicio de interests_category 
*
* @author Sebastian
* @version 0.1
*/
angular.module('eventTypeService', ['ngCookies'])
	.factory('eventTypeRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allInterestsCategoriesId : function(){
				return $http.get(path + 'interests_category');
					
			},
			oneInterestsCategory : function(interestsCategoryId){
				return $http.get(path + 'interests_category/' + interestsCategoryId);
				
			},
			createInterestsCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'interests_category',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteInterestsCategory : function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editInterestsCategoryPatch : function(interestsCategoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editInterestsCategoryPut : function(interestsCategoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
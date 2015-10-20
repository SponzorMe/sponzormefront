/**
* @Servicio de UserCategory (Categorias de preferencia de los usuarios) 
*
* @author Sebastian
* @version 0.1
*/
angular.module('userInterestService', ['ngCookies'])
	.factory('userInterestRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allUserCategories : function(){
				return $http.get(path + 'user_categories');
			},
			oneUserCategory : function(userCategoryId){
				return $http.get(path + 'user_categories/' + userCategoryId);
			},
			createUserCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'user_categories',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUserCategory : function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserCategoryPatch : function(userCategoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserCategoryPut : function(userCategoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
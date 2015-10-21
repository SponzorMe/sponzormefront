/**
* @Servicio de UserCategory (Categorias de preferencia de los usuarios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userInterestRequest($http, $cookies) {
		var token = $cookies.get('token');
		return {
			allUserCategories: function(){
				return $http.get(apiPath + 'user_categories');
			},
			oneUserCategory: function(userCategoryId){
				return $http.get(apiPath + 'user_categories/' + userCategoryId);
			},
			createUserCategory: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'user_categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUserCategory: function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserCategoryPatch: function(userCategoryId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserCategoryPut: function(userCategoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('userInterestService', ['ngCookies'])
		.factory('userInterestRequest', userInterestRequest);
})();

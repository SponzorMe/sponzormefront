/**
* @Servicio de UserCategory (Categorias de preferencia de los usuarios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userCategoryRequest($http, $localStorage, $httpParamSerializerJQLike, URL) {
		var token = $localStorage.token;
		return {
			allUserCategories: function(){
				return $http.get(URL + 'user_categories');
			},
			oneUserCategory: function(userCategoryId){
				return $http.get(URL + 'user_categories/' + userCategoryId);
			},
			createUserCategory: function(data){
				return $http({
					method: 'POST',
					url: URL + 'user_categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUserCategory: function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserCategoryPatch: function(userCategoryId, data){
				return $http({
					method: 'PATCH',
					url: URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserCategoryPut: function(userCategoryId, data){
				return $http({
					method: 'PUT',
					url: URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('userCategoryRequest', userCategoryRequest);
})();

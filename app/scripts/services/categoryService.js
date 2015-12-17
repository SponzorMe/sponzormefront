/**
* @Servicio de Categories
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function categoryRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			*/
			allCategories: function(){
				return $http.get($rootScope.getConstants().URL + 'categories');

			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			*/
			oneCategory: function(categoryId){
				return $http.get($rootScope.getConstants().URL + 'categories/' + categoryId);

			},
			createCategory: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteCategory: function(categoryId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editCategoryPatch: function(categoryId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editCategoryPut: function(categoryId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('categoryRequest', categoryRequest);
})();

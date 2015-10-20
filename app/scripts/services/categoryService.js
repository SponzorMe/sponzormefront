/**
* @Servicio de Categories
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){
angular.module('categoryService', ['ngStorage'])
	.factory('categoryRequest', categoryRequest);

	function categoryRequest($http,$sessionStorage) {
		var token = $sessionStorage.token;
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			*/
			allCategories : function(){
				return $http.get(apiPath + 'categories');

			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			*/
			oneCategory : function(categoryId){
				return $http.get(apiPath + 'categories/' + categoryId);

			},
			createCategory : function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'categories',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteCategory : function(categoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editCategoryPatch : function(categoryId,data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editCategoryPut : function(categoryId,data){
				return $http({
					method: 'PUT',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	};
})();

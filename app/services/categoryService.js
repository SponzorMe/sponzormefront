/**
* @Servicio de Categories 
*
* @author Sebastian
* @version 0.1
*/
angular.module('categoryService', ['ngCookies'])
	.factory('categoryRequest', function($http,$cookieStore) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookieStore.get('token');
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			*/
			allCategories : function(){
				return $http.get(path + 'categories');
				
			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			*/
			oneCategory : function(categoryId){
				return $http.get(path + 'categories/' + categoriesId);
				
			},
			createCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'categories',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteCategory : function(categoryId){
				return $http({
					method: 'DELETE',
					url: path + 'categories/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editCategoryPatch : function(categoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'categories/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editCategoryPut : function(categoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'categories/' + CategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
/**
* @Servicio de interests_category
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function allInterestsServiceRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allInterestsCategoriesId: function(){
				return $http.get(apiPath + 'interests_category');

			},
			oneInterestsCategory: function(interestsCategoryId){
				return $http.get(apiPath + 'interests_category/' + interestsCategoryId);

			},
			createInterestsCategory: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'interests_category',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteInterestsCategory: function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editInterestsCategoryPatch: function(interestsCategoryId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editInterestsCategoryPut: function(interestsCategoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('allInterestsService', ['ngCookies'])
		.factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();

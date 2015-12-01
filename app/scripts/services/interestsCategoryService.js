/**
* @Servicio de interests_category
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function allInterestsServiceRequest($http, $localStorage, $httpParamSerializerJQLike) {
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
					data: $httpParamSerializerJQLike(data)
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
					data: $httpParamSerializerJQLike(data)
				});
			},
			editInterestsCategoryPut: function(interestsCategoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('allInterestsService', ['ngStorage'])
		.factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();

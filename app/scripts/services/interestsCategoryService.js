/**
* @Servicio de interests_category
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function allInterestsServiceRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allInterestsCategoriesId: function(){
				return $http.get($rootScope.getConstants().URL + 'interests_category');

			},
			oneInterestsCategory: function(interestsCategoryId){
				return $http.get($rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId);

			},
			createInterestsCategory: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'interests_category',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteInterestsCategory: function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editInterestsCategoryPatch: function(interestsCategoryId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editInterestsCategoryPut: function(interestsCategoryId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();

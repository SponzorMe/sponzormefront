/**
* @Servicio de Rating (Beneficios)
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function ratingRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allRatings: function(){
				return $http.get($rootScope.getConstants().URL + 'ratings');

			},
			oneRating: function(ratingsId){
				return $http.get($rootScope.getConstants().URL + 'ratings/' + ratingsId);
			},
			ratingBySponzorship: function(sponzorshipId,type){
				return $http.get($rootScope.getConstants().URL + 'ratings/sponzorship/' + sponzorshipId+'/'+type);
			},
			createRating: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'ratings',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createRatingToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'ratings',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteRating: function(ratingId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editRatingsPatch: function(ratingId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editRatingPut: function(ratingId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('ratingRequest', ratingRequest);
})();

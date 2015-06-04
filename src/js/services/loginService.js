/**
* @Servicio de Login 
*
* @author Sebastian
* @version 0.1
*/
angular.module('loginService', [])
	.factory('loginRequest', function($http) {
		var path = "http://api.sponzor.me/"; //API path
		return {
			/**
			* Login function return the user info if the credentials match
			* @param {JSON} credentials.email
			* @param {JSON} credentials.password
			* @returns success(function(data, status, headers, config)
			*/
			login : function(credentials){
				data={"email":credentials.email,"password":credentials.password};
				return $http({
					method: 'POST',
					url: path + 'auth',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			}	
		}
	});
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
			},
			resetPassword : function(email){
				data = {"email":email};
				return $http({
					method: 'POST',
					url: path + 'send_reset_password',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			tryActivation: function(token){
				return $http.get(path + 'verify_activation/' + token);
			},
			resendActivation: function(email){
				data={"email":email};
				return $http({
					method: 'POST',
					url: path + 'send_activation',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			updatePassword: function(token,data){
				console.log(token);
				return $http({
					method: 'POST',
					url: path + 'update_password/'+token,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});

			}
		}
	});

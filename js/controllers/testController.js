angular.module('sponzormeApp', ['loginService','userService','ngCookies']);

angular.module('sponzormeApp').controller('testController', ['$scope','loginRequest','userRequest','$cookies',testController]);
function testController($scope, loginRequest, userRequest,$cookies) {
	$scope.login = function(){
		var credentials={};
		credentials.email="admin@sponzor.me";
		credentials.password="sponzorme";
		loginRequest.login(credentials).success(function (data){
			$cookies.put('token', btoa(credentials.email+':'+credentials.password));
		});
	}
	$scope.logout = function(){
			$cookies.remove('token');
	}
	$scope.allUsers = function(){
		userRequest.allUsers().success(function (data){
			console.log(data);
		});
	}
	$scope.oneUser = function(userId){
		userRequest.oneUser(userId).success(function (data){
			console.log(data);
		});
	}
	$scope.createUser = function(){
		user={
			"email":'seagomezar@gmail.com',
			"name":'Sebastian Gomez',
			"password":"sebastian03",
			"password_confirmation":"sebastian03",
			"type":2,
		}
		userRequest.createUser(user).success(function (data){
			console.log(data);
		});
	}
	$scope.editUserPatch= function(userId){
		user={
			"name":'Pepe de Jesus',
		}
		userRequest.editUserPatch(userId, user).success(function (data){
			console.log(data);
		});
	}
	$scope.editUserPut= function(userId){
		user={
			"name":'Pepe de Jesus',
		}
		userRequest.editUserPut(userId, user).success(function (data){
			console.log(data);
		});
	}
	$scope.deleteUser= function(userId){
		user={
			"name":'Pepe de Jesus',
		}
		userRequest.deleteUser(userId).success(function (data){
			console.log(data);
		});
	}

}
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
angular.module('imgurService',[])
	.factory('imgurRequest', function($http) {
		var path = "https://api.imgur.com/3/image"; //API path
    var clientId ="bdff09d775f47b9";
		return {
			uploadImage : function(data){
				return $http({
					method: 'POST',
					url: path,
          headers: {
              "Authorization": "Client-ID " + clientId
          },
					data: data
				});
			}
		}
	});

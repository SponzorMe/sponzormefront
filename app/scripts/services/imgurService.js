/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function imgurRequest($http) {
    var clientId = 'bdff09d775f47b9'; //Private API Cliente Id for imgur
		return {
			uploadImage: function(data){
				return $http({
					method: 'POST',
					url: imgurPath,
          headers: {
              'Authorization': 'Client-ID ' + clientId
          },
					data: data
				});
			}
		};
	}
	angular.module('imgurService', [])
		.factory('imgurRequest', imgurRequest);
})();

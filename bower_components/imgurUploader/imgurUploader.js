(function(){

    angular.module("imgurUploader", []).provider("$imgur", function () {

        this.clientId = "bdff09d775f47b9"; // change here with your clientId
        this.apiBase = "https://api.imgur.com/3";

        this.$get = ['$q', '$http', function ($q, $http) {

            Imgur.prototype = {

                getclientId: function() {
                    return this.clientId;
                },

                /*
                 * Upload a new image.
                 */
                imageUpload: function(params) {

                    var url = this.apiBase + "/image";

                    return this._makeRequest(url, "POST", params);
                },

                /**
                 * Executes a request with the given url, method, and optional
                 * params and returns a $q promise for the result
                 * @param {string} url - the url to access
                 * @param {string} method - the http method to use
                 * @param {?object} params - any parameters to pass
                 * @returns {Promise<object>} a promise for the result
                 */
                _makeRequest: function(url, method, params) {

                    var settings = {
                        method: method,
                        url: url,
                        headers: {
                            "Authorization": "Client-ID " + this.clientId
                        }
                    };

                    if(params) {
                        settings.params = params;
                    }

                    var deferred = $q.defer();

                    $http(settings)
                        .success(function (result) {
                            deferred.resolve(result);
                        })
                        .error(function (error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }
            };

            return new Imgur(this.clientId);
        }];
    });

})();

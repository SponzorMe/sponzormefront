/**
 * angular-cloud-storage version 0.0.1
 * License: CC BY SA .
 * Licencia Creative Commons Atribución-CompartirIgual 4.0 Internacional.
 * Copyright (C) 2015, @luisjhoham.
 */

(function (root) {
	'use strict';

	function factory(angular, cloudstorage) {

		return angular
			.module('CloudStorage', [])

			.provider('CloudStorageConfig', function () {
				var _config = {};

				return {
					setDefaults: function (config) {
						_config = config || _config;
					},
					$get: function () {
						return {
							config: _config
						};
					}
				};
				
				
			})

			.factory('CloudStorageService', ['$rootScope', function ($rootScope) {
				var config = {};
				var scopes = '';
				var apiKey = '';
			    var	clientId = '';

				/**
			     * Google Cloud Storage API request to retrieve the list of buckets in
			     * your Google Cloud Storage project.
			     */
			     config.listBuckets = function(){
			     	console.log(gapi);
			      var request = gapi.client.storage.buckets.list({
			        'project': PROJECT
			      });
			      executeRequest(request, 'listBuckets');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve the list of objects in
			     * your Google Cloud Storage project.
			     */
			    config.listObjects = function(){
			      var request = gapi.client.storage.objects.list({
			        'bucket': BUCKET
			      });
			      executeRequest(request, 'listObjects');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve the access control list on
			     * a bucket in your Google Cloud Storage project.
			     */
			    config.listBucketsAccessControls = function() {
			      var request = gapi.client.storage.bucketAccessControls.list({
			          'bucket': BUCKET
			      });
			      executeRequest(request, 'listBucketsAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve the access control list on
			     * an object in your Google Cloud Storage project.
			     */
			    config.listObjectsAccessControls = function() {
			      var request = gapi.client.storage.objectAccessControls.list({
			          'bucket': BUCKET,
			          'object': object
			      });
			      executeRequest(request, 'listObjectsAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve a bucket in
			     * your Google Cloud Storage project.
			     */
			    config.getBucket = function() {
			      var request = gapi.client.storage.buckets.get({
			        'bucket': BUCKET
			      });
			      executeRequest(request, 'getBucket');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve a bucket's Access Control
			     * List in your Google Cloud Storage project.
			     */
			    config.getBucketAccessControls = function() {
			      var request = gapi.client.storage.bucketAccessControls.get({
			        'bucket': BUCKET,
			        'entity': GROUP
			      });
			      executeRequest(request, 'getBucketAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to retrieve an object's Access Control
			     * List in your Google Cloud Storage project.
			     */
			    config.getObjectAccessControls = function() {
			      var request = gapi.client.storage.objectAccessControls.get({
			        'bucket': BUCKET,
			        'object': object,
			        'entity': GROUP
			      });
			      executeRequest(request, 'getObjectAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to insert a bucket into
			     * your Google Cloud Storage project.
			     */
			    config.insertBucket = function() {
			      resource = {
			        'name': BUCKET
			      };

			      var request = gapi.client.storage.buckets.insert({
			          'project': PROJECT,
			          'resource': resource
			      });
			      executeRequest(request, 'insertBucket');
			    }

			    /**
			     * Google Cloud Storage API request to insert an object into
			     * your Google Cloud Storage bucket.
			     */
			    config.insertObject = function(event) {
			      try{
			        var fileData = event.target.files[0];
			      } 
			      catch(e) {
			        //'Insert Object' selected from the API Commands select list
			        //Display insert object button and then exit function
			        filePicker.style.display = 'block';
			        return;
			      }
			      const boundary = '-------314159265358979323846';
			      const delimiter = "\r\n--" + boundary + "\r\n";
			      const close_delim = "\r\n--" + boundary + "--";

			      var reader = new FileReader();
			      reader.readAsBinaryString(fileData);
			      reader.onload = function(e) {
			        var contentType = fileData.type || 'application/octet-stream';
			        var metadata = {
			          'name': fileData.name,
			          'mimeType': contentType
			        };

			        var base64Data = btoa(reader.result);
			        var multipartRequestBody =
			          delimiter +
			          'Content-Type: application/json\r\n\r\n' +
			          JSON.stringify(metadata) +
			          delimiter +
			          'Content-Type: ' + contentType + '\r\n' +
			          'Content-Transfer-Encoding: base64\r\n' +
			          '\r\n' +
			          base64Data +
			          close_delim;

			        //Note: gapi.client.storage.objects.insert() can only insert
			        //small objects (under 64k) so to support larger file sizes
			        //we're using the generic HTTP request method gapi.client.request()
			        var request = gapi.client.request({
			          'path': '/upload/storage/' + API_VERSION + '/b/' + BUCKET + '/o',
			          'method': 'POST',
			          'params': {'uploadType': 'multipart'},
			          'headers': {
			            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
			          },
			          'body': multipartRequestBody});
			          //Remove the current API result entry in the main-content div
			          listChildren = document.getElementById('main-content').childNodes;
			          if (listChildren.length > 1) {
			            listChildren[1].parentNode.removeChild(listChildren[1]);
			          }
			        try{
			          //Execute the insert object request
			          executeRequest(request, 'insertObject');
			          //Store the name of the inserted object 
			          object = fileData.name;	  
			        }
			        catch(e) {
			          alert('An error has occurred: ' + e.message);
			        }
			      }
			    }

			    /**
			     * Google Cloud Storage API request to insert an Access Control List into
			     * your Google Cloud Storage bucket.
			     */
			    config.insertBucketAccessControls = function() {
			      resource = {
			        'entity': ENTITY,
			        'role': ROLE
			      };

			      var request = gapi.client.storage.bucketAccessControls.insert({
			          'bucket': BUCKET,
			          'resource': resource
			      });
			      executeRequest(request, 'insertBucketAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to insert an Access Control List into
			     * your Google Cloud Storage object.
			     */
			    config.insertObjectAccessControls = function() {
			      resource = {
			        'entity': ENTITY,
			        'role': ROLE_OBJECT
			      };

			      var request = gapi.client.storage.objectAccessControls.insert({
			          'bucket': BUCKET,
			          'object': object,
			          'resource': resource
			      });
			      executeRequest(request, 'insertObjectAccessControls');
			    }

			    /**
			     * Google Cloud Storage API request to delete a Google Cloud Storage bucket.
			     */
			    config.deleteBucket = function() {
			      var request = gapi.client.storage.buckets.delete({
			          'bucket': BUCKET
			      });
			      executeRequest(request, 'deleteBucket');
			    }

			    /**
			     * Google Cloud Storage API request to delete a Google Cloud Storage object.
			     */
			    config.deleteObject = function() {
			      var request = gapi.client.storage.objects.delete({
			          'bucket': BUCKET,
			          'object': object
			      });
			      executeRequest(request, 'deleteObject');
			    }

			    /**
			     * Removes the current API result entry in the main-content div, adds the
			     * results of the entry for your function.
			     * @param {string} apiRequestName The name of the example API request.
			     */
			    config.updateApiResultEntry = function(apiRequestName) {
			      listChildren = document.getElementById('main-content')
			        .childNodes;
			      if (listChildren.length > 1) {
			        listChildren[1].parentNode.removeChild(listChildren[1]);
			      }
			      if (apiRequestName != 'null') {
			        window[apiRequestName].apply(this);
			      }
			    }

			    /**
			     * Determines which API request has been selected, and makes a call to add
			     * its result entry.
			     */
			    config.runSelectedApiRequest = function() {
			      var curElement = document.getElementById('api-selection-options');
			      var apiRequestName = curElement.options[curElement.selectedIndex].value;
			      updateApiResultEntry(apiRequestName);
			    }

			    /**
			     * Binds event listeners to handle a newly selected API request.
			     */
			    config.addSelectionSwitchingListeners = function() {
			      document.getElementById('api-selection-options')
			        .addEventListener('change',
			      runSelectedApiRequest, false);
			    }

			    /**
			     * Template for getting JavaScript sample code snippets.
			     * @param {string} method The name of the Google Cloud Storage request
			     * @param {string} params The parameters passed to method
			     */
			    config.getCodeSnippet = function(method, params) {
			      var objConstruction = "// Declare your parameter object\n";
			      objConstruction += "var params = {};";
			      objConstruction += "\n\n";

			      var param = "// Initialize your parameters \n";
			      for (i in params) {
			        param += "params['" + i + "'] = ";
			        param += JSON.stringify(params[i], null, '\t');
			        param += ";";
			        param += "\n";
			      }
			      param += "\n";

			      var methodCall = "// Make a request to the Google Cloud Storage API \n";
			      methodCall += "var request = gapi.client." + method + "(params);";
			      return objConstruction + param + methodCall;
			    }


			    /**
			     * Executes your Google Cloud Storage request object and, subsequently,
			     * inserts the response into the page.
			     * @param {string} request A Google Cloud Storage request object issued
			     *    from the Google Cloud Storage JavaScript client library.
			     * @param {string} apiRequestName The name of the example API request.
			     */
			    config.executeRequest = function(request, apiRequestName) {
			      request.execute(function(resp) {
			        console.log(resp);
			        var apiRequestNode = document.createElement('div');
			        apiRequestNode.id = apiRequestName;

			        var apiRequestNodeHeader = document.createElement('h2');
			        apiRequestNodeHeader.innerHTML = apiRequestName;

			        var apiRequestExplanationNode = document.createElement('div');
			        apiRequestExplanationNode.id = apiRequestName + 'RequestExplanation';

			        var apiRequestExplanationNodeHeader = document.createElement('h3');
			        apiRequestExplanationNodeHeader.innerHTML = 'API Request Explanation';
			        apiRequestExplanationNode.appendChild(apiRequestExplanationNodeHeader);

			        var apiRequestExplanationEntry = document.createElement('p');
			        apiRequestExplanationEntry.innerHTML = 
			          listApiRequestExplanations[apiRequestName];
			        apiRequestExplanationNode.appendChild(apiRequestExplanationEntry);

			        apiRequestNode.appendChild(apiRequestNodeHeader);
			        apiRequestNode.appendChild(apiRequestExplanationNode);

			        var apiRequestCodeSnippetNode = document.createElement('div');
			        apiRequestCodeSnippetNode.id = apiRequestName + 'CodeSnippet';

			        var apiRequestCodeSnippetHeader = document.createElement('h3');
			        apiRequestCodeSnippetHeader.innerHTML = 'API Request Code Snippet';
			        apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetHeader);

			        var apiRequestCodeSnippetEntry = document.createElement('pre');

			        //If the selected API command is not 'insertObject', pass the request
			        //paramaters to the getCodeSnippet method call as 'request.B.rpcParams'
			        //else pass request paramaters as 'request.B' 
			        // if (apiRequestName != 'insertObject') {
			        //   apiRequestCodeSnippetEntry.innerHTML = 
			        //     getCodeSnippet(request.B.method, request.B.rpcParams);
			        //   //Selected API Command is not 'insertObject'
			        //   //hide insert object button
			        //   filePicker.style.display = 'none';
			        // } else {
			        //   apiRequestCodeSnippetEntry.innerHTML = 
			        //     getCodeSnippet(request.B.method, request.B);
			        // }
			        // apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetEntry);
			        // apiRequestNode.appendChild(apiRequestCodeSnippetNode);

			        var apiResponseNode = document.createElement('div');
			        apiResponseNode.id = apiRequestName + 'Response';

			        var apiResponseHeader = document.createElement('h3');
			        apiResponseHeader.innerHTML = 'API Response';
			        apiResponseNode.appendChild(apiResponseHeader);

			        var apiResponseEntry = document.createElement('pre');
			        apiResponseEntry.innerHTML = JSON.stringify(resp, null, ' ');

			        apiResponseNode.appendChild(apiResponseEntry);
			        apiRequestNode.appendChild(apiResponseNode);

			        var content = document.getElementById('main-content');
			        content.appendChild(apiRequestNode);
			      });
			    }

			    /**
			     * Handle authorization click event.
			     */
			    config.handleAuthClick = function(clientId, scopes, event) {
			      gapi.auth.authorize({
			        client_id: clientId,
			        scope: scopes,
			        immediate: false
			      }, config.handleAuthResult);
			      return false;
			    }

			    /**
			     * Handle authorization.
			     */
			    config.handleAuthResult = function(clientId, scopes, authResult) {
			    	console.log(authResult);
			      if (authResult && !authResult.error) {
			        initializeApi();
					filePicker.onchange = insertObject;
			      } else {
			        config.handleAuthClick(clientId, scopes);
			      }
			    }

			    /**
			     * Authorize Google Cloud Storage API.
			     */
			    config.checkAuth = function(clientId, scopes) {
			      gapi.auth.authorize({
			        client_id: clientId,
			        scope: scopes,
			        immediate: true
			      }, config.handleAuthResult(clientId, scopes));
			    }

			    /**
			     * Load the Google Cloud Storage API.
			     */
			    config.initializeApi = function() {
			      gapi.client.load('storage', API_VERSION);
			    }

			    /**
			     * Set required API keys and check authentication status.
			     */
			    config.handleClientLoad = function(apiKey, clientId, scopes) {
			    	scopes = scopes;
			    	apiKey = apiKey;
			    	clientId = clientId;
			      	gapi.client.setApiKey(apiKey);
			      	config.checkAuth(clientId, scopes);
			    }

				return config;
			}])

			.directive('usSpinner', ['$window', 'usSpinnerConfig', function ($window, usSpinnerConfig) {
				return {
					scope: true,
					link: function (scope, element, attr) {
						var SpinnerConstructor = Spinner || $window.Spinner;

						scope.spinner = null;

						scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

						scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
							scope.$eval(attr.spinnerStartActive) : scope.key ?
							false : true;

						function stopSpinner() {
							if (scope.spinner) {
								scope.spinner.stop();
							}
						}

						scope.spin = function () {
							if (scope.spinner) {
								scope.spinner.spin(element[0]);
							}
						};

						scope.stop = function () {
							scope.startActive = false;
							stopSpinner();
						};

						scope.$watch(attr.usSpinner, function (options) {
							stopSpinner();

							options = options || {};
							for (var property in usSpinnerConfig.config) {
							    if (options[property] === undefined) {
							        options[property] = usSpinnerConfig.config[property];
							    }
							}

							scope.spinner = new SpinnerConstructor(options);
							if (!scope.key || scope.startActive) {
								scope.spinner.spin(element[0]);
							}
						}, true);

						scope.$on('us-spinner:spin', function (event, key) {
							if (key === scope.key) {
								scope.spin();
							}
						});

						scope.$on('us-spinner:stop', function (event, key) {
							if (key === scope.key) {
								scope.stop();
							}
						});

						scope.$on('$destroy', function () {
							scope.stop();
							scope.spinner = null;
						});
					}
				};
			}]);
	}

	if (typeof define === 'function' && define.amd) {
		/* AMD module */
		define(['angular', 'cloudstorages'], factory);
	} else {
		/* Browser global */
		factory(root.angular);
	}
}(window));

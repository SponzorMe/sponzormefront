'use strict';
(function() {
  function UploadController($scope) {
    $scope.creds = {
      bucket: 'sponzormewebappimages/users',
      access_key: 'AKIAJDGUKWK3H7SJZKSQ',
      secret_key: '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'
    };
    $scope.sizeLimit = 10585760; // 10MB in Bytes
    $scope.account.image = false;
    $scope.uploadImage = function() {
      AWS.config.update({
        accessKeyId: $scope.creds.access_key,
        secretAccessKey: $scope.creds.secret_key
      });
      AWS.config.region = 'us-west-2';
      var bucket = new AWS.S3({
        params: {
          Bucket: $scope.creds.bucket
        }
      });
      if ($scope.file) {
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          console.log('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
          return false;
        }
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = btoa($scope.uniqueString()+ new Date().getTime() + $scope.uniqueString()).replace("=",$scope.uniqueString())+'.' + $scope.getExtension($scope.file.name);
        var params = {
          Key: uniqueFileName,
          ContentType: $scope.file.type,
          Body: $scope.file,
          ServerSideEncryption: 'AES256'
        };
        bucket.putObject(params, function(err, data) {
            if (err) {
              console.log(err.message, err.code);
              return false;
            } else {
              var params = {Bucket: 'sponzormewebappimages', Key: "users/"+uniqueFileName};
              bucket.getSignedUrl('getObject', params, function (err, url) {
                $scope.account.image = url;
                $scope.$digest();
              });
            }
          });
      } else {
        // No File Selected
        console.log('Please select a file to upload');
      }
    }
    $scope.getExtension = function(filename){
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    };
    $scope.fileSizeLabel = function() {
      // Convert Bytes To MB
      return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };
    $scope.uniqueString = function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  }
  angular.module('sponzorme').controller('UploadController', UploadController);
})();

angular.module('customizationService', [])
	.factory('Customization', function($http) {
		var newURL = window.location.host + "/" + window.location.pathname;
		var pathArray = newURL.split( "/" );
		var newPathname = "";
		for (i = 0; i < pathArray.length-2; i++) {
			if(pathArray[i]!="")
		  		newPathname += pathArray[i]+"/";
		}		
		newPathname=window.location.protocol + "//"+ newPathname;
		var path = newPathname;
		var path = 'http://www.sponzor.me/';
		return {
			// get all the categories
			getCategories : function() {				
				global = $http.get(path + 'api/categories');
				return global;
			},
			getCategories1 : function() {				
				global = $http.get(path + 'api/categories');
				return global;
			},				
			getInterests : function() {
				global = $http.get(path + 'api/interests');
				return global;
			},
			getInterestsByCategories : function(id) {
				global = $http.get(path + 'api/interests/categories/'+id);
				return global;
			},
			saveInterests : function(interests,id) {
				a={'interests': interests};
				return $http({
					method: 'POST',
					url: path + 'api/save/interests/'+id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(a)
				});
			},			
			saveUser : function(commentData,id) {
				return $http({
					method: 'POST',
					url: path + 'api/update/'+id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},
			getEvents : function() {
				global = $http.get(path + 'api/v1/events');
				return global;
			},
			getEventsByOrganizer : function(organizer) {
				global = $http.get(path + 'api/v1/events/by/'+organizer);
				return global;
			},
			getEventsBySponzors : function(sponzor,status) {
				global = $http.get(path + 'api/v1/events/by/sponzor/'+sponzor+"/"+status);
				return global;
			},
			searchEvents : function(text) {
				global = $http.get(path + 'api/v1/events/parameter/'+text);
				return global;
			},
			getSponzors : function() {
				global = $http.get(path + 'api/v1/sponzors');
				return global;
			},
			getPeaks : function(idEvent) {
				global = $http.get(path + 'api/v1/peaks/'+idEvent);
				return global;
			},
			saveEvent : function(eventData) {
				return $http({
					method: 'POST',
					url: path + 'api/v1/create/event',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(eventData)
				});
			},
			setSponzorPeak : function(data) {
				return $http({
					method: 'POST',
					url: path + 'api/v1/sponzor/event',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			removeEvent : function(idEvent){
				global = $http.get(path + 'api/v1/remove/event/'+idEvent);
				return global;
			},
			getSponzorsByOrganizer : function(idOrganizer){
				global = $http.get(path + 'api/v1/sponzors/by/'+idOrganizer);
				return global;
			},
			updateRelSponzorPeak : function(idRelSponzorPeak,newState){
				global = $http.get(path + 'api/v1/update/relsponzorpeak/'+idRelSponzorPeak+'/'+newState);
				return global;
			},
			removeRelSponzorPeak : function(idRelSponzorPeak){
				global = $http.get(path + 'api/v1/remove/relsponzorpeak/'+idRelSponzorPeak);
				return global;
			},
			getUserInfo : function(idOrganizer)	{
				Data={"userId":idOrganizer};
				return $http({
					method: 'POST',
					url: path + 'api/v1/user/SebasGameMaster',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(Data)
				});
			},
			countAllUsers : function()	{
				global = $http.get(path + 'api/v1/count/users/SebasGameMaster');
				return global;
			},
			editAccount : function(data){
				console.log(data);
				return $http({
					method: 'POST',
					url: path + 'api/v1/edit/user/SebasGameMaster',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			inviteFriend : function(email, message){
				Data={"email":email,"message":message};
				return $http({
					method: 'POST',
					url: path + 'api/v1/invitefriend',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(Data)
				});
			},
			getEventbriteEvents : function(userToken){
				global = $http.get(path + 'api/v1/eventbrite/events/'+userToken);
				return global;
			},
			getMeetupGroups : function(userToken){
				global = $http.get(path + 'api/v1/meetup/groups/'+userToken);
				return global;
			},
			getMeetupEventsByGroup : function(groupId,userToken){
				global = $http.get(path + 'api/v1/meetup/events/'+groupId+'/'+userToken);
				return global;
			},
			unconnectMeetup : function(userId){
				global = $http.get(path + 'api/v1/meetup/unconnect/'+userId);
				return global;
			},
			unconnectEventbrite : function(userId){
				global = $http.get(path + 'api/v1/eventbrite/unconnect/'+userId);
				return global;
			},
			getPeakTodo : function(peakId){
				global = $http.get(path + 'api/v1/peak/todo/'+peakId);
				return global;
			},
			setPeakTodo : function(title, description, event, peak, type, relPeak){
				Data={"title":title,"description":description,"event":event,"peak":peak,"type":type,"relPeak":relPeak};
				return $http({
					method: 'POST',
					url: path + 'api/v1/set/peak/todo',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(Data)
				});
			},
			removeTodo : function(todoId){
				global = $http.get(path + 'api/v1/peak/todo/remove/'+todoId);
				return global;
			},
			getTaskBySponzorRelPeak : function(realPeak,type){
				global = $http.get(path + 'api/v1/get/task/relpeak/'+realPeak+"/"+type);
				return global;
			},
			updateStatusTaskSponzorPeak : function(idSponzorTask,status){
				global = $http.get(path + 'api/v1/update/task/sponzor/'+idSponzorTask+'/'+status);
				return global;
			},
			removeTaskSponzorPeak : function(idTaskSponzor){
				global = $http.get(path + 'api/v1/rel_peak/todo/remove/'+idTaskSponzor);
				return global;
			},
			getDemoStatus : function(userId){
				global = $http.get(path + 'api/v1/get/demo/status/'+userId);
				return global;
			},
			setDemoStatus : function(userId,newStatus){
				global = $http.get(path + 'api/v1/set/demo/status/'+userId+'/'+newStatus);
				return global;
			}			
		}

	});
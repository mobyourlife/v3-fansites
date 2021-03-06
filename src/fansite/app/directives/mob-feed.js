angular.module('MobYourLife')

.directive('mobFeed', function () {
	return {
		scope: {
			data: '='
		},
		link: function (scope, element, attr) {
			scope.hasPicture = (scope.data.type == 'photo');
			scope.hasVideo = (scope.data.type == 'video');
			scope.hasMedia = (scope.hasPicture || scope.hasVideo);
		},
		templateUrl: '/templates/mob-feed.html'
	}
});
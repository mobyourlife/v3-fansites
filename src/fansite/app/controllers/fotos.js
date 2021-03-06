angular.module('MobYourLife')

.controller('FotosCtrl', function ($rootScope, $scope, $routeParams, $timeout, FotosApi) {
	var busy = false;
	$scope.fotos = [];

	$rootScope.$broadcast('setPageTitle', 'Fotos');
	$rootScope.activeTextPage = $routeParams.page || '';

	if ($routeParams.page) {
		for (var i = 0; i < $rootScope.albumPages.length; i++) {
			var cur = $rootScope.albumPages[i];
			if (cur.path === $routeParams.page) {
				$rootScope.$broadcast('setPageTitle', cur.name);
			}
		}
	}

	var getMoreFotos = function (callback) {
		if (busy) {
			return;
		}

		var args = [];
		busy = true;

		if ($scope.fotos.length > 0) {
			var last = $scope.fotos.length - 1;
			var item = $scope.fotos[last];
			args['direction'] = 'before';
			args['ne'] = item._id;
			args['time'] = item.time;
		}

		if ($routeParams.page) {
			var regex = /-([0-9]+)$/;
			var match = $routeParams.page.match(regex);

			if (match) {
				args['page'] = match[1];
			}
		}

		FotosApi.getFotos(args)
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					var exists = false;

					for (var j = 0; j < $scope.fotos.length; j++) {
						if ($scope.fotos[j]._id === data[i]._id) {
							exists = true;
						}
					}

					if (!exists) {
						$scope.fotos.push(data[i]);
					}
				}
			})
			.catch(function (err) {
				console.error(err);
				$timeout(function() {
					getMoreFotos();
				}, 500);
			})
			.finally(function () {
				busy = false;

				if (callback) {
					callback();
				}
			});
	}

	/* lore more content as the user scrolls */
	$rootScope.$on('shouldLoadMoreContent', function() {
		getMoreFotos();
	});

	/* load first contents, do it three subsequent times do load more content and do it faster than it would happen in a single request */
	getMoreFotos(function () {
		getMoreFotos(function () {
			getMoreFotos();
		});
	});
});
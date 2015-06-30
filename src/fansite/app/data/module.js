angular.module('MobYourLife.Data', [])

.service('BaseApi', function ($rootScope, $http) {
	var baseApi = 'http://api.mobyourlife.com.br/api/';

	this.getApi = function (method, args) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		var params = args ? { params: args } : {};
		return $http.get(uri, params);
	}

	this.postApi = function (method, args) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		var params = args ? { params: args } : {};
		return $http.post(uri, params);
	}
});
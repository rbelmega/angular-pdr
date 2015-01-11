var filters = {};

filters.showSearchText = function($routeParams) {
	return function(input) {
		var pos = input.search($routeParams.searchText);
		var element = input.substring(pos, pos + $routeParams.searchText.length);
		return element;
	}
};

filters.part1 = function($routeParams) {
	return function(input) {
		var regex = /(<([^>]+)>)/ig;
		input = input.replace(regex, "");
		input = input.replace(/&#?[a-z0-9]+;/g, "");

		var pos = input.search($routeParams.searchText);
		return input.substring(pos - 100 || 0, pos);
	}
};
filters.part2 = function($routeParams) {
	return function(input) {
		var regex = /(<([^>]+)>)/ig;
		input = input.replace(regex, "");
		input = input.replace(/&#?[a-z0-9]+;/g, "");

		var pos = input.search($routeParams.searchText);
		return input.substring(pos + $routeParams.searchText.length, pos + $routeParams.searchText.length + 100);
	}
};

mainApp.filter('unsafe', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
});

mainApp.filter(filters);

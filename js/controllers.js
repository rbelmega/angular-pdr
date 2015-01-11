var controllers = {};

controllers.mainCtrl = function($rootScope, $scope, $location, $timeout) {
	function beforeExit(e) {
		e.preventDefault();

		document.removeEventListener("backbutton", beforeExit, false);
		document.addEventListener("backbutton", exitFromApp, false);

		$scope.showExit = true;
		$scope.$digest();
		$timeout(function() {
			document.addEventListener("backbutton", beforeExit, false);
			document.removeEventListener("backbutton", exitFromApp, false);
			$scope.showExit = false;
		}, 2000);
	}

	function exitFromApp(e) {
		e.preventDefault();
		navigator.app.exitApp();
	}

	$scope.showExit = false;
	$scope.activeMenu = 'home';
	$scope.showSearch = false;
	$scope.showControlls = false;
	$scope.topicName = "Головна";
	$scope.showSearchOverlay = false;
	$scope.selectedMenuItem = [];
	$scope.selectedMenuItem.push('home');

	$scope.showMain = function() {
		$scope.selectedMenuItem.pop();
		$scope.selectedMenuItem.push('home');
		$scope.go('/');
		$scope.topicName = 'Головна';
		$scope.activeMenu = 'home';
		$scope.showSearchOverlay = false;
	};

	$scope.showSigns = function() {
		$scope.selectedMenuItem.pop();
		$scope.selectedMenuItem.push('signs');
		$scope.go('/signs');
		$scope.topicName = 'Дорожні знаки';
		$scope.activeMenu = 'signs';
		$scope.showSearchOverlay = false;
	};

	$scope.showFinesPage = function() {
		$scope.selectedMenuItem.pop();
		$scope.selectedMenuItem.push('fines');
		$scope.go('/fines');
		$scope.topicName = 'Штрафи';
		$scope.activeMenu = 'fines';
		$scope.showSearchOverlay = false;
	};

	$scope.showSearchPage = function() {
		$scope.searchText = "";
		$scope.showSearch = !$scope.showSearch;
		$scope.activeMenu = 'search';
		$scope.showSearchOverlay = !$scope.showSearchOverlay;
		if ($scope.showSearch) {
			$scope.tmpSearch = $scope.selectedMenuItem[0];
		} else {
			$scope.activeMenu = $scope.selectedMenuItem[0];
		}
	};

	$scope.share = function() {
		window.plugins.socialsharing.shareViaTwitter('Message via Twitter');
	};
	$scope.searchClick = function(searchText) {
		$scope.activeMenu = 'searchList';
		$scope.showSearch = false;
		$scope.topicName = 'Пошук: ' + searchText;
		$scope.showSearchOverlay = false;
		$scope.selectedMenuItem.pop();
		$scope.selectedMenuItem.push('search');
		$location.path("/search/" + searchText)
	};

	$scope.$on("change", function(event, data) {
		$scope.showControlls = true;
		$scope.topicName = data;
		$scope.showSearch = false;
	});

	$scope.$on("changeActiveMenu", function(event, data) {
		$scope.activeMenu = data;
		$scope.showControlls = false;
	});

	$scope.back = function() {
		$scope.showControlls = false;
		if ($scope.activeMenu === 'home') {
			$scope.topicName = 'Головна';
		}
		if ($scope.activeMenu === 'signs') {
			$scope.topicName = 'Дорожні знаки';
		}
		if ($scope.activeMenu === 'search') {
			$scope.topicName = 'Пошук';
		}
		history.back();
	};

	$scope.go = function(path) {
		$scope.showSearch = false;
		$scope.showControlls = false;
		$location.path(path);
	};




	$scope.animateRibbon = function() {

		//return
		//return true;
	};

	document.addEventListener("backbutton", beforeExit, false);
};

controllers.topics = function($scope, listOfTopic) {

	$scope.lists = listOfTopic.getItems();

};

controllers.search = function($rootScope, $scope, itemsFactory, $routeParams) {

	itemsFactory.getFilteredItem($routeParams.searchText).then(function(data){
		$scope.lists = data;
	});
//	$scope.lists = itemsFactory.getFilteredItem($routeParams.searchText);

};
controllers.fineCtrl = function(finesFactory, $scope) {

	finesFactory.getFines().then(function(data){
		$scope.fines = data;
	});
//	$scope.lists = itemsFactory.getFilteredItem($routeParams.searchText);

};

controllers.item = function($scope, itemsFactory, $routeParams, $compile, listOfTopic, $location) {

	itemsFactory.getItemById(+$routeParams.id + 1, function(data) {
		$scope.itemTextCaption = listOfTopic.getItems()[$routeParams.id].name;
		$scope.arrayItems = data;
		$scope.itemText = data;
		//$el = $compile(data)($scope);
		//$('#item').html('');
		//$('#item').append($el);

		$scope.$emit('change', $scope.itemTextCaption);

	});
	$scope.item = $routeParams.id;

	if ($scope.item == 32) {
		$location.path('/signs');
	}

};

controllers.navCtrl = function($scope, itemsFactory, $location) {

	$scope.go = function(path) {
		$location.path(path);
	};
};

controllers.signCtrl = function($scope, signFactory, $routeParams) {
	$scope.goTo = function(item){
		$scope.go('signs/' + item);
	};
	$scope.categories = signFactory.get();
	$scope.sign = $routeParams.sign;

	signFactory.getSignById(+$scope.sign, function(data) {
		$scope.signs = data
	});

	$scope.setTopic = function(topic) {
		$scope.$emit('change', topic);
	};

	!$scope.sign && $scope.$emit('change', "Дорожні знаки");
	!$scope.sign && $scope.$emit('changeActiveMenu', "signs");

};

var directives = {};
directives.repeatDone = function() {
	return function(scope, element, attrs) {
		if (scope.$last) {
			scope.$eval(attrs.repeatDone);
		}
	}
};

mainApp.directive(directives);
mainApp.controller(controllers);
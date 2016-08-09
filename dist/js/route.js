shopApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 
	$stateProvider.state("mad", {
			url : '/mad',
			templateUrl : 'templates/header.html'
	}).state("mad.product-category",{
			url : '/products/:category',
			templateUrl : 'templates/product-list.html',
			controller : 'ProductListCtrl'
	});

	$urlRouterProvider.otherwise('/mad/products/All');
	
}]);

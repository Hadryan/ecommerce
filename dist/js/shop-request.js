shopApp.service('$shopRequest', ['$http', function($http){
	this.listProduct = function(category){
		return $http.get("http://test-prod-api.herokuapp.com/products" + (category !== "All" ? "?cat=" + category : ""));
	}
}]);
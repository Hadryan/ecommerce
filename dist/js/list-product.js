shopApp.controller('ProductListCtrl', ['$scope', '$shopRequest', '$timeout', '$stateParams', '$filter', function($scope, $shopRequest, $timeout, $stateParams, $filter){
	var productList, gridItems = 9, maxWidth = 0, maxHeight = 0;
	var isCategoriesKnown = $scope.categoryList ? true : false;
	if(!isCategoriesKnown){
		$scope.$parent.categoryList = [];
	}
	$scope.getProductList = function(){
		$shopRequest.listProduct($scope.selectedCategory).then(function(promise){
			productList = $filter('orderBy')(promise.data.products, $scope.sort);
			$scope.productCount = gridItems;
			angular.forEach(productList,function(product){
				if(!isCategoriesKnown && $scope.categoryList.indexOf(product.cat) === -1){
					$scope.$parent.categoryList.push(product.cat);
				}
				imageSplit = product.img.split("/");
				if(imageSplit[3] > maxWidth){
					maxWidth = imageSplit[3];
				}
				if(imageSplit[4] > maxHeight){
					maxHeight = imageSplit[4];
				}
			});
			$scope.$parent.categoryList.unshift("All");
			$scope.load();
		});
	};

	$scope.load = function(){
		if(productList.length <= $scope.productCount){
			return;
		}
		$scope.productList = productList.slice(0, $scope.productCount);
		$scope.productCount += gridItems;
		console.log("product count " + $scope.productList.length);
		console.log("next count " + $scope.productCount);
		$timeout(function(){
			$('md-card').width(maxWidth);
			$('md-card').css({"max-height": maxHeight, "max-width": maxWidth});
			$(".product-image").load(function(){
				console.log("image loaded");
				setHeight('sideNavContent');
			});
		},0);
	};

	$scope.sortList = [
						{
							name: "Price: Low to High",
							value:"price"
						},
						{
							name: "Price: High to Low",
							value:"-price"
						},
						{
							name: "Score: High to Low",
							value:"-score"
						},
						{
							name: "Score: Low to High",
							value:"score"
						}
						];
	$scope.sort = $scope.sortList[0].value;

	$scope.$parent.selectedCategory = $stateParams.category;

	$scope.$parent.toggle = function(category){
		window.location.hash = "#/mad/products/" + category;
	};

	window.onresize = function(){
		setHeight('sideNavContent');// No I18N
	};

	$scope.getProductList();
}]);
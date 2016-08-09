var shopApp = angular.module('shop', ['ngMaterial', 'ui.router', 'ngAnimate', 'ngSanitize']);

function setHeight(className){
	if($('.' + className + ":visible").length > 0){
		var t = $('.' + className + ":visible").offset().top; // No I18N
		$('.' + className).css("max-height", $(window).height() - t + "px"); // No I18N
		$('.' + className).css("height", $(window).height() - t + "px"); // No I18N
	}
}

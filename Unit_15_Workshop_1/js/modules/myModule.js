MainController.$inject = ['$scope'];

//says in notes to inject location service, but doesn't show this line
MainController.$inject = ['$location'];

angular.module ('myModule' , ['ngRoute']).
		config (
 
				function($routeProvider) {
					
					
					$routeProvider.
						when ('/' , {templateUrl:'partials/basic-template.html' , controller:BasicController}).
						when ('/home' , {templateUrl:'partials/basic-template.html' , controller:BasicController}).
						when ('/faq' , {templateUrl:'partials/faq-template.html' , controller:FAQController}).
						when ('/categories' , {templateUrl:'partials/categories-template.html' , controller:CategoriesController}).
						otherwise ({redirectTo: '/' , templateUrl:'partials/home.html'});
					
					}
		
				).
				
		controller('MainController', MainController);

 
 function MainController($scope , $location) {
	 
	 $scope.setRoute = function(route)	{$location.path(route);
	                                     console.log('SetRoute function is executed');}

    }

	
function BasicController($scope)
{
	$scope.title = "You are Entitled!!!";
	$scope.body = "You are Welcome!!!";
	console.log("Code in BasicController IS executed");	
}

function FAQController($scope)
{
	$scope.title = "FAQ You Ask Hole!!";
	$scope.body = "You are Welcome!!!";
	console.log("Code in FAQController IS executed");

}

function CategoriesController($scope)
{
	$scope.title = "Categories";
	$scope.body = "You are Welcome!!!";
	console.log("Code in CategoriesController IS executed");

}


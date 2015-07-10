albumController.$inject = ['$scope'];

//inject http service
albumController.$inject = ['$http'];


//declare a global variable to store current album when clicked
var currentAlbum;

angular.module ('myModule' , ['ngRoute']).
		config (
 
				function($routeProvider) {
					
					
					$routeProvider.
						when ('/' , {templateUrl:'partials/basic-template.html' , controller:BasicController}).
						when ('/album' , {templateUrl:'partials/album-template.html' , controller:AlbumController}).
						otherwise ({redirectTo: '/' , templateUrl:'partials/home.html'});
					
					}
		
				).
				
		controller('albumController', albumController);

 
 function albumController($scope , $location) {
	 
	 $scope.setRoute = function(route)	{$location.path(route);
	                                     console.log('SetRoute function is executed');}
										 
	//just using THIS line because got an error saying album controller wasn't a function, so having it return true
	return true;
    }

	
function BasicController($scope , $http)
{
	$http.get('/Unit_16_Workshop_1/json/album.json').
			success(function(data, status, headers, config) {

					$scope.albumList = data.albums;
					$('[data-role="listview"]').listview();
					$("#albumList").listview("refresh");

					}).
			error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	
					console.log("Failed to read json file");
	
					});
			
    //when click on an album, this function is called to store information about the current album
	$scope.setCurrentAlbum = function (i)
			{
	
			currentAlbum = $scope.albumList[i];
			console.log("Did enter setalbum function current album is " + currentAlbum.title);
			}
				
  
	console.log("Code in BasicController IS executed");	
}

function AlbumController($scope , $http)
{
				
  //retrieve value from currentAlbum global variable
	$scope.album = currentAlbum;
	console.log("Code in AlbumController IS executed");	
	console.log("Current album is " + currentAlbum.title);
	console.log("In Scope is " + $scope.album);
}


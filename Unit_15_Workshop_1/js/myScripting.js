 function MyFirstController($scope) {
        $scope.taskList=[{name:'hoover', description:'halls and rooms'},{name:'dishes',description:'clean all dishes'}];

		$scope.newTask = function ()
								{$("#editArea").show(); }
								
		$scope.addTheTask = function () 
								{	
								  var newTask = new Object();
								  newTask.name = $scope.taskName;
								  newTask.description = $scope.taskDescription;
								  
								  var validTask = validateTask(newTask);
												  
								  if (validTask === true)
									  {		  
										  $scope.taskList.push(newTask);
										  //Need to remove values from scope variables to stop them being picked up if user types nothing 
										  //when adding next task
										  $scope.taskName='';
										  $scope.taskDescription='';
														  
										  $scope.$apply();  
										  removeEditArea();
									  }
								}
								
		$scope.delete = function (index)
								{
								 var confirmDeleteLines = [ "Are you SURE you want to delete this task?",
															"Name: " + $scope.taskList[index].name , 
															"Description: " + $scope.taskList[index].description] ;
													   
								 var confirmDeleteMessage = confirmDeleteLines.join("\n");
													   
								 if (confirm(confirmDeleteMessage))
									{$scope.taskList.splice(index , 1);}
								
								 $scope.$apply();	
								 }
						
    }

 MyFirstController.$inject = ['$scope'];
 angular.module('app', []).controller('MyFirstController', MyFirstController);

  $(function() {
    $( document ).tooltip();
  }); 

function removeEditArea()
					{
						$("#taskName").val('');
						$("#taskDescription").val('');
						$("#editArea").hide();
					}

function validateTask(task)
	{
	var validTask = true;
	
	for (key in task)
		{	
		if ((task[key] === '') || (task[key] === undefined))
			{alert("You must enter a task " + key + "!!!");
			 validTask = false ;}
		}
	return validTask;	
}
					
					
					

						



					

					
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};
	
	var urlAPI = 'http://178.62.189.172/api/v1'

	// when landing on the page, get all todos and show them
	$http.get(urlAPI + '/todos')
		.success(function(data) {
            console.log("data");
            console.log(data.data);
			$scope.todos = data.data.list;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post(urlAPI + '/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete(urlAPI + '/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
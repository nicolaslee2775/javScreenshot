angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, codeValidationService, apiService, ngProgressFactory) {
	$scope.model = {
		codeStr: 'abp108',

		imageArray: [
			{site: 'javFree', type: 'screenshot', src: 'http://cf.javfree.me/HLIC/ABP-108.jpeg'},
			{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-1.jpg'},
			{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-2.jpg'},
			{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-3.jpg'},
		]
	}

	$scope.progressbar = ngProgressFactory.createInstance();
	$scope.progressbar.setColor('#8cb4ff');

	$scope.search = function search() {
		$scope.progressbar.start();

		var validResult = codeValidationService.codeValidate($scope.model.codeStr);
		//console.log($scope.model.codeStr);
		console.log(validResult);


		/*apiService.search(validResult).then(function(result) {
			console.log(result);
			result.javFree.screenshot.forEach(function(imageSrc) {
				$scope.model.imageArray.push({
					src: imageSrc,
					class: 'screenshot'
				});
			});
			result.javFree.screenshotL.forEach(function(imageSrc) {
				$scope.model.imageArray.push({
					src: imageSrc,
					class: 'screenshotL'
				});
			});
			console.log($scope.model.imageArray);
			$scope.$apply();
		});*/

		/*apiService.search(validResult)
			.then(
				function() {
					console.log('done!');
				}, 
				null, 
				function(newImages) {
					// update progress
					$scope.model.imageArray = $scope.model.imageArray.concat(newImages);
				}
			);*/
		
		apiService.search(validResult)
			.then(function(data) {
				$scope.model.imageArray = data;
				$scope.progressbar.complete();
			});
	}

	
})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

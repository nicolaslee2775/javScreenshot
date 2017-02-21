angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('codeValidationService', function() {
	var self = this;

	self.prefixValidate = function(code) {
		var regexPrefix = new RegExp("^[ ]*([a-zA-Z]+)[ ]*$");
		var result = regexPrefix.exec(code);
		
		if (result === null) return { valid: false };
		return {
			valid: true,
			prefix: result[1].toUpperCase(),
			prefixL: result[1].toLowerCase()
		};
	};

	self.suffixValidate = function(code) {
		var regexsuffix = new RegExp("^[ ]*([0-9]+)[ ]*$");
		var result = regexsuffix.exec(code);

		if (result === null) return { valid: false };
		return {
			valid: true,
			suffix: result[1]
		};
	};

	self.codeValidate = function(code) {
		var regexHyphen = new RegExp("([a-zA-Z]+)[ ]*-[ ]*([0-9]+)");
		var regexSpace = new RegExp("([a-zA-Z]+)[ ]*([0-9]+)");
		
		result = regexHyphen.exec(code) || regexSpace.exec(code);

		//console.log("result", result);

		if(result === null) return { valid: false };
		
		var prefix = result[1].toUpperCase(),
			prefixL = result[1].toLowerCase(),
			suffix = result[2];

		return {
			valid: true,
			code: prefix + "-" + suffix,
			codeL: prefixL + "-" + suffix,
			prefix: prefix,
			prefixL: prefixL,
			suffix: suffix
		}
	};
})

.service('apiService', function($q, $http, $timeout) {
	var self = this;

	/*self.search = function(code) {
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				var data = {
					javFree: {
						cover: ['http://cf.javfree.me/HLIC/ABP-108.jpg'],
						screenshot : ['http://cf.javfree.me/HLIC/ABP-108.jpeg'],
						screenshotL : [
							'http://cf.javfree.me/HLIC/ABP-108-1.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-2.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-3.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-4.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-5.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-6.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-7.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-8.jpg',
							'http://cf.javfree.me/HLIC/ABP-108-10.jpg'
						]
					},
					javPop: {
						cover: ['http://javpop.com/img/abp/abp-108_poster.jpg'],
						screenshot : ['http://javpop.com/img/abp/abp-108_screenshot.jpg']
					},
					javSumo : {
						cover: ['http://pics.dmm.co.jp/mono/movie/adult/118abp108/118abp108pl.jpg'],
						screenshot : ['http://image.jav-fan.com/1402/140220/ABP-108_s.jpg']
					}
				};
				resolve(data);	
			}, 0);
		});
	};*/

	/*self.search = function(code) {
		var deferred = $q.defer();

		var javFree = $timeout(function() {
			deferred.notify([
				{site: 'javFree', type: 'cover', src: 'http://cf.javfree.me/HLIC/ABP-108.jpg'},
				{site: 'javFree', type: 'screenshot', src: 'http://cf.javfree.me/HLIC/ABP-108.jpeg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-1.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-2.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-3.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-4.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-5.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-6.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-7.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-8.jpg'},
				{site: 'javFree', type: 'screenshotL', src: 'http://cf.javfree.me/HLIC/ABP-108-10.jpg'},
			]);
		}, 500);
		var javPop = $timeout(function() {
			deferred.notify([
				{site: 'javPop', type: 'cover', src: 'http://javpop.com/img/abp/abp-108_poster.jpg'},
				{site: 'javPop', type: 'screenshot', src: 'http://javpop.com/img/abp/abp-108_screenshot.jpg'},
			]);
		}, 1000);
		var javSumo = $timeout(function() {
			deferred.notify([
				{site: 'javSumo', type: 'cover', src: 'http://pics.dmm.co.jp/mono/movie/adult/118abp108/118abp108pl.jpg'},
				{site: 'javSumo', type: 'screenshot', src: 'http://image.jav-fan.com/1402/140220/ABP-108_s.jpg'},
			]);
		}, 2000);

		$q.all([javFree, javPop, javSumo]).then(function() {
			deferred.resolve();
		});

		return deferred.promise;
	};*/

	self.search = function(code) {
		var deferred = $q.defer();

		/*
		$timeout(function() {
			var response = {
				javFree: {
					cover: ['http://cf.javfree.me/HLIC/ABP-108.jpg'],
					screenshot : ['http://cf.javfree.me/HLIC/ABP-108.jpeg'],
					screenshotL : [
						'http://cf.javfree.me/HLIC/ABP-108-1.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-2.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-3.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-4.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-5.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-6.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-7.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-8.jpg',
						'http://cf.javfree.me/HLIC/ABP-108-10.jpg'
					]
				},
				javPop: {
					cover: ['http://javpop.com/img/abp/abp-108_poster.jpg'],
					screenshot : ['http://javpop.com/img/abp/abp-108_screenshot.jpg']
				},
				javSumo : {
					cover: ['http://pics.dmm.co.jp/mono/movie/adult/118abp108/118abp108pl.jpg'],
					screenshot : ['http://image.jav-fan.com/1402/140220/ABP-108_s.jpg']
				}
			};

			var data = [];
			for(var site in response) {
				for(var type in response[site]) {
					if(type === 'cover') continue;
					response[site][type].forEach(function(src) {
						data.push({
							site: site,
							type: type,
							src: src
						});
					});
				}
			}
			deferred.resolve(data);

		}, 0);*/

		$http({
			method: 'POST',
  			url: 'http://127.0.0.1:5000/jav',
			//url: 'http://192.168.0.102:5000/jav',
			//dataType: 'jsonp',
			//headers: {'Authorization': 'Token token=xxxxYYYYZzzz'},
			//crossDomain : true,
			//withCredentials: true,
			data: {
				prefix: code.prefix,
				suffix: code.suffix,
				javfree: true
			}
		}).then(function(response) {
			//console.log(response);

			var imageArray = [];
			for(var site in response.data) {
				for(var type in response.data[site]) {
					if(type === 'screenshot' || type === 'screenshotL') {
						response.data[site][type].forEach(function(src) {
							imageArray.push({
								site: site,
								type: type,
								src: src
							});
						});
					}
				}
			}
			deferred.resolve(imageArray);
		});
			
		return deferred.promise;
	};

})
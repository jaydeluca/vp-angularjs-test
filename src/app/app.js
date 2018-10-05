import angular from 'angular';
import Chart from 'chart.js';
require("angular-route");

import '../style/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute'])
  .controller('AppCtrl', function ($scope, $route) {
    // Home page controller
  })
  .controller('LeaderboardCtrl', function ($scope, $http) {
    // Leaderboard controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=10'
    }).then(function successCallback(response) {
      $scope.users = response.data.results.map(user => {
        user.steps = randomInt(1000, 20000);
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./home.html'),
        controller: 'AppCtrl'
      })
      .when('/leaderboard', {
        template: require('./leaderboard.html'),
        controller: 'LeaderboardCtrl'
      })
    $locationProvider.hashPrefix('');
  });

export default MODULE_NAME;

'use strict';

var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function($routeProvider){

  $routeProvider
    .when('/', {
      controller: 'topics',
      templateUrl: "view/list.html"
    })
    .when('/show/:id', {
      controller: 'item',
      templateUrl: "view/item.html"
    })
    .when('/signs', {
      controller: 'signCtrl',
      templateUrl: "view/pictures.html"
    })
    .when('/signs/:sign', {
      controller: 'signCtrl',
      templateUrl: "view/sign.html"
    })
    .when('/search/:searchText', {
      controller: 'search',
      templateUrl: "view/search.html"
    })
});

var body = document.getElementsByClassName('container-view')[0],
    timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }

  timer = setTimeout(function(){
    body.classList.remove('disable-hover')
  }, 500);
}, false);


(function () {

  mainApp.factory('cordovaReady', function() {
    return function (fn) {

      var queue = [];

      var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
      };

      document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function () {
        return impl.apply(this, arguments);
      };
    };
  });
})();
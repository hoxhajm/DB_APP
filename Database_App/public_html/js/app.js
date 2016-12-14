var app = angular.module('ngschool', ['crudServices','ngRoute']);
app.conf=function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/home.html' 
    })
    .when('/index', { 
      controller: 'MainController', 
      templateUrl: 'views/main.html' 
    })
//    .when('/opzioni', { 
//      controller: 'OpzioniController', 
//      templateUrl: 'views/opzioni.html' 
//    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
};

app.config(app.conf);
app.config(['$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
}]);

angular.module('crudServices', []);

angular.module('crudServices').service('apiService', [ '$http', apiService ]);
function apiService($http){
    var URL = "http://10.0.245.77/msDebug";
    
    var callBackend = function (request){
        var data = request.data;
        
        var onReady = request.onReady;
        
        var onError = function(response){
            console.log('error', response);
        };

        $http({
            url : URL+"/pagetodbandback.php",
            method : "POST",
            data : data,
            dataType : "json",
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(onReady, onError);
    };
    
    return {
        'callBackend' : callBackend
    };
}

app.controller('MainController', ['$scope', '$window', '$routeParams','$http', 'apiService', mainController]);
    
function mainController ($scope, $window, $routeParams, $http, apiService) {
    var vm = $scope;
    
    vm.f_code = null;
    vm.list = []; // list of databases
 
    // INIZIALLIZZO IL DB CON VALORI VALIDI
    vm.database = {
        'ip':'localhost',
        'porta':'3306',
        'dbname':'mainsim3_demo2',
        'user':'root',
        'password':'root'
    };
    // INIZIALIZZO LE ACTION A NULL
    vm.action={
        'do':null,
        'search':null
    };
    // INIZIALLIZZO LE COLS E ROWS PER NG-REPEAT
    vm.columns = [];
    vm.rows = [];
    // CARICO IL RISULTATO NELL'NG-REPEAT
    vm.loadResult = function (result){
        vm.columns.length = 0;
        vm.rows.length = 0;
        angular.forEach(result.columns, function(v,k){
            vm.columns.push(v);
        });
        angular.forEach(result.rows, function(v,k){
            vm.rows.push(v);
        });
        
    };
    
    // CARICO L'OGGETTO DELL'F-CODE
    vm.loadItemByFcode = function(request){
        var result = request.data;
        $scope.row = request.data.item;
        vm.loadResult(result);
        console.log(request);
    };
    // CARICO LA LISTA DEI FILENAME DI BACKUP
    vm.loadBackupList = function(request){
        var result = request.data;
        $scope.list = request.data.items;
        vm.loadResult(result);
        console.log(request);
    };
    // FUNCTION PER RECUPERARE IL LINK DI DOWNLOAD DEL BACKUP
    vm.getLink = function(request){
        var result = request.data;
        $scope.data = request.data;
        vm.loadResult(result);
        console.log(request);
    };
    // FUNCTION PER LA RICERCA TRAMITE F-CODE
    vm.searchByFcode = function(action_to_do){
        
        var data = {
            'database': vm.database,
            'action': {
                'do': action_to_do, 
                'search':vm.action.search
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.loadItemByFcode
        });
    };
    // FUNCTION PER IL RIPRISTINO DEL BACKUP
    vm.recoverBackup = function(backdw, v){
        var data = {
            'database': vm.database,
            'action': {
                'do': backdw, 
                'search': v
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.recoverAlert
        });
    };
    // ALERT DI AVVENUTO RIPRISTINO
    vm.recoverMsg = "Ripristino eseguito con successo!";
    
    vm.recoverAlert = function() {
        $window.alert(vm.recoverMsg);
    };
    // FUNCTION ELIMINAZIONE DEL BACKUP
    vm.deleteBackup = function(deleteb, filename){
        var data = {
            'database': vm.database,
            'action': {
                'do': deleteb, 
                'search': filename
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.loadBackupList
        });
    };
    // ALERT DI AVVENUTA ELIMINAZIONE
    vm.deleteMsg = "Backup eliminato con successo!";
    
    vm.deleteAlert = function() {
        $window.alert(vm.deleteMsg);
    };
    // FUNCTION PER SCARICARE IL BACKUP
//    vm.downloadBackup = function(downloadb, filename) {
//        var data = {
//            'database': vm.database,
//            'action': {
//                'do': downloadb, 
//                'search': filename
//            }
//        };
//        apiService.callBackend({
//            'data': data,
//            'onReady': vm.getLink
//        });
//        
//    };
    // FUNCTION PER MOSTRARE LA LISTA DEI BACKUP
    vm.showBackupList = function(showb) {
        var data = {
            'database': vm.database,
            'action': {
                'do': showb, 
                'search': ""
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.loadBackupList
        });
    };
    // ALERT DI AVVENUTO BACKUP
    vm.downloadMsg = "Il download dal backup è cominciato!";
    
    vm.downloadAlert = function() {
        $window.alert(vm.downloadMsg);
    };
    // FUNCTION DI BACKUP DEL DB E VISUALIZZAZIONE DELLA LISTA COMPLETA
    vm.requestBackup = function(action_to_do){
        
        var data = {
            'database': vm.database,
            'action': {
                'do': action_to_do, 
                'search': ""
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.loadBackupList
        });
    };
    // PULIZIA DEL FORM
    vm.cleanForm = function(){
        vm.database = {
            'ip':null,
            'porta':null,
            'dbname':null,
            'user':null,
            'password':null
        };
    };
    
    // LISTA DEI BACKUP DEL DB PRECARICATA
    vm.init= function(){
        var data = {
            'database': vm.database,
            'action': {
                'do': 'showb', 
                'search': ""
            }
        };
        apiService.callBackend({
            'data': data,
            'onReady': vm.loadBackupList
        });
    };    
    vm.init();
};
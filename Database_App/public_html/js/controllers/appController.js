app.controller('AppController', [function() {
    var vm = this;
    vm.nav = [
       {
        url:"#/",
        title:"Home"
       },{
        url:"#/index",
        title:"Control Panel"
       }
//       ,{
//        url:"#/opzioni",
//        title:"Opzioni"
//       }
    ];
    vm.today = new Date();

}]);

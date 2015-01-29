/**
 * Created by dalkegama on 21/01/2015.
 */



var myApp = angular.module('myApp',[
    'myApp.filter',
]);

myApp.controller('NewsController',['$scope','$http','$interval',
    function ($scope,$http,$interval) {
        $scope.newsItems = [];

        $http.jsonp('http://pipes.yahoo.com/pipes/pipe.run?_id=f53de95ad9cfa91e4de371f75f16ab75&_render=json&_callback=JSON_CALLBACK')
        .success(function(data){
                if(data.value.items){
                    $scope.newsItems
                }
            $scope.newsItems = data.value.items;
        });

        $interval(function(news){
            $scope.newsItems.push(news);
            console.log($scope.newsItems);
        },5000);
}]);

angular.module('myApp.filter',[])
    .filter('htmlToPlainText',function(){
    return function(text){
        return String(text).replace(/<[^>]+>/gm, '')
    }
});
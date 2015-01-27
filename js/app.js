/**
 * Created by dalkegama on 21/01/2015.
 */

'use strict';

var myApp = angular.module('myApp',[
    'myApp.filter'
]);

myApp.controller('MyController',['$scope','$http', function ($scope,$http) {
    $http.get('http://pipes.yahoo.com/pipes/pipe.run?_id=f53de95ad9cfa91e4de371f75f16ab75&_render=json').success(function(data){
        $scope.newsItems = data.value.items;
        console.log(data.value.items);
    });
    //$scope.colorList = [
    //    {
    //        "colorName": "red",
    //        "hexValue": "#f00"
    //    },
    //    {
    //        "colorName": "green",
    //        "hexValue": "#0f0"
    //    },
    //    {
    //        "colorName": "blue",
    //        "hexValue": "#00f"
    //    },
    //    {
    //        "colorName": "cyan",
    //        "hexValue": "#0ff"
    //    },
    //    {
    //        "colorName": "magenta",
    //        "hexValue": "#f0f"
    //    },
    //    {
    //        "colorName": "yellow",
    //        "hexValue": "#ff0"
    //    },
    //    {
    //        "colorName": "black",
    //        "hexValue": "#000"
    //    }
    //];
}]);

angular.module('myApp.filter',[])
    .filter('htmlToPlainText',function(){
    return function(text){
        return String(text).replace(/<[^>]+>/gm, '')
    }
});
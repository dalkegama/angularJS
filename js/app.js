/**
 * Created by dalkegama on 21/01/2015.
 */

'use strict';

var myApp = angular.module('myApp',[
    'myApp.filter',
    'ngAnimate'
]);

myApp.controller('NewsController',['$scope','$http','$timeout','$filter',
    function ($scope,$http,$timeout,$filter) {
        function newsCollection(news){
            for(var i = 0; i < $scope.newsItems.length; i++){
                if($scope.newsItems[i].id === news.id){
                    return true;
                }
            }
            return false;
        }

        function addNews(newsItems){
            var changed = false;
            angular.forEach(newsItems, function(news){
                if(!newsCollection(news)){
                    $scope.newsItems.push(news);
                    changed = true;
                }
            });

            if(changed){
                $scope.newsItems= $filter('orderBy')($scope.newsItems,'pubDate');
            }
        }

        $scope.feeds = [{
            url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=f53de95ad9cfa91e4de371f75f16ab75&_render=json'
        }];
        $scope.newsItems = [];

        $scope.fetchFeed = function (feed){
            feed.items = [];
            var apiUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=f53de95ad9cfa91e4de371f75f16ab75&_render=json&_callback=JSON_CALLBACK';

            $http.jsonp(apiUrl).success(function(data){
                if(data.value){
                    feed.items = data.value.items;
                }
                addNews(feed.items);
            }).error(function(data){
               console.log('Error Fetching feed',data)
            });

            $timeout(function(){
               $scope.fetchFeed(feed);
                console.log("Fetched")
            },30000);
        };

        $scope.addFeed = function(feed){
            if(feed.$valid){
                var newFeed = angular.copy(feed);
                $scope.feeds.push(newFeed);
                $scope.fetchFeed(newFeed);
                $scope.newFeed.url = '';
                console.log('Added a news Feed');
            }
        };

        $scope.deleteFeed = function(feed){
            $scope.feeds.splice($scope.feeds.indexOf(feed),1);
        };

        $scope.fetchFeed($scope.feeds[0]);
        //$scope.newsItems = [];

        //$http.jsonp('http://pipes.yahoo.com/pipes/pipe.run?_id=f53de95ad9cfa91e4de371f75f16ab75&_render=json&_callback=JSON_CALLBACK')
        //.success(function(data){
        //        if(data.value.items){
        //            $scope.newsItems
        //        }
        //    $scope.newsItems = data.value.items;
        //    console.log($scope.newsItems);
        //});
        //
        //$interval(function(news){
        //    $scope.newsItems.push(news);
        //    console.log($scope.newsItems);
        //},500);
}]);

angular.module('myApp.filter',[])
    .filter('htmlToPlainText',function(){
    return function(text){
        return String(text).replace(/<[^>]+>/gm, '')
    }
});
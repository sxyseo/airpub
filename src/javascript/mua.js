(function(duoshuo) {
  if (!duoshuo) return;
  if (!duoshuo.API) return;
  var database = duoshuo.API;
  angular.module('mua', ['ui.bootstrap', 'ui.router', 'snap'])
    .config(function($stateProvider, $urlRouterProvider, snapRemoteProvider) {
      snapRemoteProvider.globalOptions.disable = 'right';
      $urlRouterProvider.otherwise("/404");
      $stateProvider
        .state('home', {
          url: "",
          templateUrl: "views/archive.html",
          controller: 'articles'
        })
        .state('index', {
          url: "/",
          templateUrl: "views/archive.html",
          controller: 'articles'
        })
        .state('article', {
          url: "/article/:uri",
          templateUrl: "views/single.html",
          controller: 'article'
        })
        .state('404', {
          url: "/404",
          templateUrl: "views/404.html"
        })
        .state('admin', {
          url: "/admin",
          templateUrl: "views/admin.html",
          controller: 'admin'
        })
    })
    // archive ctrler
    .controller('articles', function($scope, $state) {
      if ($scope.articles && $scope.articles.length > 0) return;
      database.get('threads/list', {
        limit: 30,
        page: 1
      }, function(data) {
        if (data.code !== 0) $scope.addAlert('danger','获取信息失败，请重试');
        $scope.articles = data.response || [];
        $scope.$apply();
        return;
      });
    })
    // article ctrler
    .controller('article', function($scope, $state) {
      var uri = $state.params.uri;
      if (!uri) return; // go 404
      return;
    })
    // all ui behaviors
    .controller('ui', function($scope) {
      $scope.alerts = [];
      $scope.addAlert = function(type, msg) {
        $scope.alerts.push({msg: msg, type: type || 'success'});
      };
      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
    })
    // admin ctrler
    .controller('admin', function($scope, $state) {

    })
})(window.DUOSHUO);

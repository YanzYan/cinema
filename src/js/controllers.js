//angular.module('starter.controllers', [])

app.controller('TabsCtrl',['$rootScope', '$state',function($rootScope, $state){
    $rootScope.$on('$ionicView.beforeEnter', function () {
      $rootScope.hideTabs = false;
//你想要显示的页面路由
      if ($state.current.name != 'tab.film' && $state.current.name != 'tab.cinema' && $state.current.name != 'tab.mine') {
        $rootScope.hideTabs = true;
      }
    });
}])

  .controller('FilmCtrl',['$scope', '$state', '$http', '$ionicLoading',function($scope, $state , $http, $ionicLoading) {
    loading();
    getAddr();
    function loading(){
      $ionicLoading.show({
        //template: '正在加载....',
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>', //替换默认动画
        //duration: 6500   //指定显示时长，后自动隐藏
      });
      getDate();
    }
    function getDate(){
      $http.get('https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=3')
        .success(function(response){
          $scope.hot = response.data.movies;
      });
      $http.get('https://m.maoyan.com/movie/list.json?type=coming&offset=0&limit=4')
        .success(function(response){
          $scope.coming = response.data.movies;
          //console.log(JSON.stringify($scope.coming));
          $ionicLoading.hide();
        })
        .error(function (mes) {
          $ionicLoading.hide();
          alert(mes);
        });
      //存在跨域问题
      $http.get("https://m.maoyan.com/cinemas.json").success(function(response) {
        $scope.data = response.data;
          $scope.value = [];
          for(var i in response.data) {
            //$scope.keys.push(i);
            $scope.value.push(response.data[i]);
          }
        $scope.selectedSite = $scope.value[0];
      });
    }
    function getAddr(){
      $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
          //alert('国家：' + remote_ip_info.country + ',省：' + remote_ip_info.province + ',市：' + remote_ip_info.city + ',区：'
          //  + remote_ip_info.district + ',ISP：' + remote_ip_info.isp + ',类型：' + remote_ip_info.type + ',其他：' + remote_ip_info.desc);
          $scope.addr = remote_ip_info.city;
        } else {
          alert('没有找到匹配的IP地址信息！');
        }
        $ionicLoading.hide();
      });
    }
    $scope.getLocation = function(){
      getAddr();
      alert("您所在的区域是"+$scope.addr);
    }
    $scope.goFilmDetail = function(id){
      $state.go('tab.film-detail',{
        id: id
      });
    }
    $scope.goFilmList = function(coming){
      $state.go('tab.film-list',{
        coming: coming
      });
    }
    $scope.goCinemaDetail = function(id){
      $state.go('cinema-detail',{
        cinemaId: id
      })
    }
    $scope.goFilmSearch = function(){
      $state.go('tab.film-search')
    }
  }])

.controller('CinemaCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', '$http', function($scope, $state, $ionicSlideBoxDelegate, $http) {
  $scope.selectedSite = 0;
  //存在跨域问题
  $http.get("https://m.maoyan.com/cinemas.json").success(function(response) {
    $scope.data = response.data;
  //  $scope.keys = [];
    $scope.value = [];
    for(var i in response.data){
      //$scope.keys.push(i);
      $scope.value.push(response.data[i]);
    }
    $scope.selectedSite = $scope.value[0];
  });
  $scope.goCinemaDetail = function(id){
    $state.go('cinema-detail',{
      cinemaId: id
    })
  }
}])

.controller('FilmDetailCtrl', ['$scope','$http','$state','$ionicViewSwitcher','$stateParams','$ionicLoading','$sce',function($scope,$http,$state,$ionicViewSwitcher,$stateParams,$ionicLoading,$sce) {
  $scope.goBuyTicket = function(id){
    $state.go('buy-ticket',{
      id: id
    });
    $ionicViewSwitcher.nextDirection("forwoard");
  }
  loading();
  function loading(){
    $ionicLoading.show({
      //template: '正在加载....',
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>', //替换默认动画
      //duration: 6500   //指定显示时长，后自动隐藏
    });
    getData();
  }
  function getData(){
    $scope.id = $stateParams.id;
    console.log($stateParams.id);
    $scope.url = 'http://m.maoyan.com/movie/'+ $scope.id + '.json';
    $http.get($scope.url)
      .success(function(response){
        $scope.filmData = response.data.MovieDetailModel;
        //$scope.vd = $sce.getTrustedResourceUrl($scope.filmData.vd);
        //console.log($scope.filmData);
        console.log($scope.filmData.vd);
        $ionicLoading.hide();
      })
      .error(function (mes) {
        $ionicLoading.hide();
        alert(mes);
      });
  }
}])

  .controller('BuyTicketCtrl', ['$scope','$ionicViewSwitcher','$stateParams',function($scope,$ionicViewSwitcher,$stateParams) {
    $ionicViewSwitcher.nextDirection("forwoard");
    $scope.id = $stateParams.id;
    console.log($scope.id);
  }])

  .controller('CinemaDetailCtrl', ['$rootScope','$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$http',function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $http) {
    $rootScope.updateSwiper = function() {
      mySwiper.update();
    };
    getData();
    $scope.slideIndex=0;
    $scope.slideChanged = function(index){
      $scope.slideIndex = index;
      if($scope.slideIndex == 0){
        console.log("slide 0");
      } else if($scope.slideIndex == 1){
          console.log("slide 1");
        }else if($scope.slideIndex == 2){
          console.log("slide 2");
        }else if($scope.slideIndex == 3){
        console.log("slide 3");
      }
    }
    $scope.activeSlide = function(index){
      $ionicSlideBoxDelegate.slide(index);
    }

    function getData(){
      $scope.cinemaId = $stateParams.cinemaId;
      console.log($scope.cinemaId)
      $scope.url = 'https://m.maoyan.com/showtime/wrap.json?cinemaid=' + $scope.cinemaId + '&movieid=';
      //$scope.url = 'https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=3';
      $http.get($scope.url)
        .success(function(response){
          $scope.cinema = response.data;
          console.log(response)
        })
        //.error(function (mes) {
        //  alert(mes)
        //})
    }
  }])

  .controller('FilmListCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', '$http', '$stateParams', '$ionicLoading',function($scope, $state, $ionicSlideBoxDelegate, $http, $stateParams,$ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
      loading();
    });
    if($stateParams.coming != undefined){
      $scope.hotClass=false;
      $scope.comingClass=true;
    }else {
      $scope.hotClass=true;
      $scope.comingClass=false;
    }
    $scope.activeSlide = function(index){
      $ionicSlideBoxDelegate.slide(index);
      if(index==0){
        $scope.hotClass=true;
        $scope.comingClass=false;
      }else if(index == 1){
        $scope.hotClass=false;
        $scope.comingClass=true;
      }
    }

    function loading(){
      $ionicLoading.show({
        //template: '正在加载....',
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>', //替换默认动画
        //duration: 6500   //指定显示时长，后自动隐藏
      });
      getData();
    }
    function getData(){
      $http.get('https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000')
        .success(function(response){
          $scope.hot = response.data.movies;
          $ionicLoading.hide();
        })
        .error(function (mes) {
          $ionicLoading.hide();
        });
      $http.get('https://m.maoyan.com/movie/list.json?type=coming&offset=0&limit=1000')
        .success(function(response){
          $scope.coming = response.data.movies;
          //console.log(JSON.stringify($scope.coming));
          $ionicLoading.hide();
        })
        .error(function (mes) {
          $ionicLoading.hide();
        });
    }
    $scope.goDetail = function(id){
      $state.go('tab.film-detail',{
        id: id
      });
    }
  }])

  .controller('MineCtrl', ['$scope',function($scope) {
  }])
  .controller('FilmSearchCtrl', ['$scope','$http','$state',function($scope,$http,$state) {
    $scope.hot = [];

    getDate();
    function getDate(){
      $http.get('https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000')
        .success(function(response){
          $scope.hot = response.data.movies;
        });
      $http.get('https://m.maoyan.com/movie/list.json?type=coming&offset=0&limit=1000')
        .success(function(response){
          $scope.coming = response.data.movies;
          $scope.all = $scope.hot.concat($scope.coming);
        })
    }
    $scope.searchCont = {};
    $scope.ItemArr2 = []; //搜索后页面遍历显示的数组
    $scope.search = function() {
      $scope.box = false;
      //console.log($scope.searchCont.key);//搜索内容
      $scope.ItemArr2 = []; //每次搜索先清空数组内容
      for (var i = 0; i < $scope.all.length; i++) {
        var num = i;
        if ($scope.all[num].nm.indexOf($scope.searchCont.key) >= 0) {
          $scope.ItemArr2.push($scope.all[num]);
        }
      }
      //console.log($scope.ItemArr2);
      if ($scope.ItemArr2 == '') {
        //console.log('未找到匹配的电影');
        $scope.box = true;
        $scope.ItemArr2 = []; //每次搜索先清空数组内容
      }
    }
    $scope.goDetail = function(id){
      $state.go('tab.film-detail',{
        id: id
      });
    }

    $scope.clearSearch = function () {
        alert(111)
        $scope.searchName = '';
        console.log($scope.searchName)
        $scope.ItemArr2 = [];
      }
  }])

.controller('CinemaSearchCtrl', ['$scope','$http','$state',function($scope,$http,$state) {

  $http.get("https://m.maoyan.com/cinemas.json").success(function(response) {
    //$scope.data = response.data;
      $scope.value = [];
    $scope.data = [];
      for(var i in response.data){
        $scope.value.push(response.data[i]);
      }
    for(var i=0;i<$scope.value.length;i++){
      for(var j=0;j<$scope.value[i].length;j++){
        $scope.data.push($scope.value[i][j]);
      }
    }

  });
  $scope.goCinemaDetail = function(id){
    $state.go('cinema-detail',{
      cinemaId: id
    })
  }

  $scope.searchCont = {};
  $scope.ItemArr2 = []; //搜索后页面遍历显示的数组
  $scope.search = function() {
    $scope.box = false;
    $scope.ItemArr2 = []; //每次搜索先清空数组内容
    for (var i=0;i<$scope.data.length;i++){
      if ($scope.data[i].nm.indexOf($scope.searchCont.key) >= 0
        || $scope.data[i].addr.indexOf($scope.searchCont.key) >= 0) {
        $scope.ItemArr2.push($scope.data[i]);
      }
    }
    //console.log($scope.ItemArr2);
    if ($scope.ItemArr2 == '') {
      $scope.box = true;
      $scope.ItemArr2 = []; //每次搜索先清空数组内容
    }
  }
  $scope.goDetail = function(id){
    $state.go('tab.film-detail',{
      id: id
    });
  }

  $scope.clearSearch = function () {
    alert(111)
    $scope.searchName = '';
    console.log($scope.searchName)
    $scope.ItemArr2 = [];
  }
}]);


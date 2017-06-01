/**
 * Created by edianzu on 2017/5/8.
 */
/**
 * Created by edianzu on 2017/4/22.
 */
app.directive('filmDate', function(){
    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      template: '<p></p>',
      link: function(scope,element,attrs){
        element.bind('click',function(){
          $(this).addClass('choose-date') && $(this).siblings('p').removeClass('choose-date');
        })
      }
    }
  })
  .directive('expand', function(){
    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      template: '<a>展开</a>',
      link: function(scope,element,attrs){
        element.bind('click',function(){
          if($(this).text() == '展开') {
            $(this).text('收起') && $(this).parent().siblings('div').css('display','block');
          }else if($(this).text() == '收起'){
            $(this).text('展开') && $(this).parent().siblings('div').css('display','-webkit-box');
          }
        })
      }
    }
  })

.directive("swiperDirective", ["$rootScope", function($rootScope) {
  return {
    restrict: "A",
    controller: function() {
      this.ready = function() {
        //$rootScope.updateSwiper();
        mySwiper.update();
      }
    },
    link: function(scope, element, attrs, ctrl) {
      mySwiper = new Swiper(".swiper-container", {
        loop: false,
        pagination: '.swiper-pagination',
        slidesPerView : 4.2,
        centeredSlides : true,
        //paginationClickable: true
        onSlideChangeEnd: function(swiper){
          console.log(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
          scope.index = swiper.activeIndex;
          //console.log(scope.index)
        }
      });
      console.log(mySwiper);
    }
  }
}])

  .directive("swiperSlide", [function() {
    return {
      restrict: "A",
      require: "^swiperDirective",
      link: function(scope, element, attrs, ctrl) {
        if (scope.$last) {
          ctrl.ready();
        }
      }
    }
  }])

.run(['$rootScope', function($rootScope) {
  $rootScope.updateSwiper = function() {
    mySwiper.update();
  }
}])


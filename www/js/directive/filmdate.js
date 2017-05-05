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
});


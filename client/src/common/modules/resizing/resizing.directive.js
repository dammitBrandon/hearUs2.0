angular.module('resize.directive', [])
.directive('huResize', function($log){
    return {
      replace: false,
      restrict: 'AE',
      link: function(){
        $log.log('resize up');
        if($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar') ) {
          var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
          console.log('current pad ', currentPad);
        } else {
          console.log('not loaded');
        }
      }
    };
  });
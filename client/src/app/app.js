angular.module('hearUs', [
  'templates-app',
  'templates-common',
  'templates-jade_app',
  'templates-jade_common',
  'header',
  'ui.router',
  'ui.map',
  'mm.foundation',
  'landing',
  'issueSearch',
  'districtSearch',
  'bill',
  'congressman',
  'geolocate',
  'resize.directive',
  'hearUsFilters'
])
  .config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: "/",
        controller: "AppCtrl"
      });
  })
  .run(function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    })
  .controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | The Hear Us Project';
      }
    });
  })
  .directive('resize', function() {
    return {
      replace: false,
      restrict: 'AE',
      link: function(scope, elems, attrs) {
        $()
        $(document).ready(function(){

          "use strict";

          // Nav Sticky
//          debugger;

          $(window).scroll(function(){
            if($(window).scrollTop() > 500 && !$('.mobile-toggle').is(":visible")){
              $('.top-bar').addClass('nav-sticky');
            }else{
              $('.top-bar').removeClass('nav-sticky');
            }
          });

          // Offscreen Nav

          $('.offscreen-toggle').click(function(){
            $('.main-container').toggleClass('reveal-nav');
            $('.offscreen-container').toggleClass('reveal-nav');
            $('.offscreen-menu .container').toggleClass('reveal-nav');
          });

          $('.main-container').click(function(){
            if($(this).hasClass('reveal-nav')){
              $('.main-container').toggleClass('reveal-nav');
              $('.offscreen-container').toggleClass('reveal-nav');
              $('.offscreen-menu .container').toggleClass('reveal-nav');
            }
          });

          // Detect logo dimensions and add correct class

          var logoImage = $('.top-bar .logo:first-of-type');

          var theImage = new Image();
          theImage.src = logoImage.attr("src");

          var logoWidth = theImage.width;
          var logoHeight = theImage.height;
          var logoRatio = logoWidth / logoHeight;

          if(logoRatio > 2.8){
            $('.top-bar .logo').addClass('logo-wide');
          }

          if(logoRatio < 2){
            $('.top-bar .logo').addClass('logo-square');
          }

          // Smooth scroll

          $('.inner-link').smoothScroll({offset: -96, speed: 800});

          // Mobile Toggle

          $('.mobile-toggle').click(function(){
            $('nav').toggleClass('open-nav');
          });

          // Fullscreen nav toggle

          $('.fullscreen-nav-toggle').click(function(){
            if(!$('.fullscreen-nav-container').hasClass('show-fullscreen-nav')){
              $('.fullscreen-nav-container').addClass('show-fullscreen-nav');
              setTimeout(function(){
                $('.fullscreen-nav-container').addClass('fade-fullscreen-nav');
              },100);
              $(this).addClass('toggle-icon');
            }else{
              $(this).removeClass('toggle-icon');
              $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
              setTimeout(function(){

                $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
              },500);
            }
          });

          $('.fullscreen-nav-container .menu li a').click(function(){
            $('.fullscreen-nav-toggle').removeClass('toggle-icon');
            $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
            setTimeout(function(){
              $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
            },500);
          });

          // Margin first section for top bar

          if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
            $('.main-container').first().css('margin-top', $('nav').outerHeight());
          }

          $(window).resize(function(){
            if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
              $('.main-container').first().css('margin-top', $('nav').outerHeight());
            }
          });

          // Pad first section for overlay bar
          console.log('checking now');
//          debugger;
          if($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar') ){
            var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
            console.log('currentpad ', currentPad);
            var newPad = currentPad + $('nav').outerHeight() - 48;
            console.log('new padding ', newPad);
            if(currentPad > 0){
              console.log('current > 0');
              $('.main-container').children(':first').css('padding-top', newPad);
            }else if($('.main-container').find(':first').hasClass('hero-slider')){
              console.log('else if');
              var height = parseInt($('.hero-slider .slides li:first-child').outerHeight());
              var newHeight = height + $('nav').outerHeight();
              $('.hero-slider .slides li').css('height', newHeight);
            }
          }


          // Fullwidth Subnavs

          // Position Fullwidth Subnavs fullwidth correctly

          $('.subnav-fullwidth').each(function () {
            $(this).css('width', $('.container').width());
            var offset = $(this).closest('.has-dropdown').offset();
            offset = offset.left;
            var containerOffset = $(window).width() - $('.container').outerWidth();
            containerOffset = containerOffset /2;
            offset = offset - containerOffset - 15;
            $(this).css('left', -offset);
          });

          $(window).resize(function () {
            $('.subnav-fullwidth').each(function () {
              $(this).css('width', $('.container').width());
              var offset = $(this).closest('.has-dropdown').offset();
              offset = offset.left;
              var containerOffset = $(window).width() - $('.container').outerWidth();
              containerOffset = containerOffset /2;
              offset = offset - containerOffset - 15;
              $(this).css('left', -offset);
            });
          });


          // Scroll Reveal

          if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
            window.scrollReveal = new scrollReveal();
          }else{
            $('body').addClass('pointer');
          }

          // Slider Initializations

//      $('.hero-slider').flexslider({});
//      $('.image-slider').flexslider({ animation: "slide"});
//      $('.testimonials-slider').flexslider({ directionNav: false });

          // Slide Sizes

          $('.slider-fullscreen .slides li').each(function(){
            $(this).css('height', $(window).height());
          });

          $('.fullscreen-element').each(function(){
            $(this).css('height', $(window).height());
          });


          // Feature Selector

          $('.selector-tabs li').click(function(){
            $(this).parent('.selector-tabs').children('li').removeClass('active');
            $(this).addClass('active');

            var activeTab = $(this).index() + 1;

            $(this).closest('.feature-selector').find('.selector-content').children('li').removeClass('active');
            $(this).closest('.feature-selector').find('.selector-content').children('li:nth-child('+activeTab+')').addClass('active');
          });

          // Append .background-image-holder <img>'s as CSS backgrounds

          $('.background-image-holder').each(function(){
            var imgSrc= $(this).children('img').attr('src');
            $(this).css('background', 'url("' + imgSrc + '")');
            $(this).children('img').hide();
            $(this).css('background-position', '50% 0%');
          });

          // Accordion

          $('.accordion li').click(function(){
            $(this).parent('.accordion').children('li').removeClass('active');
            $(this).addClass('active');
          });

          /************** Parallax Scripts **************/

          var isFirefox = typeof InstallTrigger !== 'undefined';
          var isIE = /*@cc_on!@*/ false || !!document.documentMode;
          var isChrome = !!window.chrome;
          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          var prefix;

          if (isFirefox) {
            prefix = '-moz-';
          } else if (isIE) {

          } else if (isChrome || isSafari) {
            prefix = '-webkit-';
          }

          $('.main-container section:first-child').addClass('first-child');

          $('.parallax-background').each(function () {

            if ($(this).closest('section').hasClass('first-child') && !$(this).closest('section').hasClass('slider-fullscreen')) {
              $(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
              $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

            } else {

              $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
              $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
              $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');

            }

          });

          if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
            skrollr.init({
              forceHeight: false
            });

            // Multi Layer Parallax

            $('.hover-background').each(function(){
              $(this).mousemove(function( event ) {
                $(this).find('.background-image-holder').css('transform', 'translate(' + -event.pageX /30 + 'px,' + -event.pageY /45+ 'px)');
                $(this).find('.layer-1').css('transform', 'translate(' + -event.pageX /50 + 'px,' + -event.pageY /50+ 'px)');
                $(this).find('.layer-2').css('transform', 'translate(' + -event.pageX /60 + 'px,' + -event.pageY /60+ 'px)');
              });
            });
          }

          // Map Holder Overlay

          $('.map-holder').click(function(){
            $(this).addClass('on');
          });

          $(window).scroll(function(){
            if($('.map-holder').hasClass('on')){
              $('.map-holder').removeClass('on');
            }
          });

          // Map Details Holder

          $('.details-holder').each(function(){
            $(this).css('height', $(this).width());
          });

          $('.details-holder').mouseenter(function(){
            $(this).closest('.map-overlay').addClass('fade-overlay');
          }).mouseleave(function(){$(this).closest('.map-overlay').removeClass('fade-overlay');});

          // Countdown

          $('.countdown').each(function(){
            $(this).countdown({until: new Date($(this).attr('data-date'))});
          });

          // Twitter Feed

          if($('#tweets').length){
            twitterFetcher.fetch($('#tweets').attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);

          }

          // Contact form code

          $('form.email-form').submit(function (e) {
            // return false so form submits through jQuery rather than reloading page.
            if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            var thisForm 		= $(this).closest('.email-form'),
              error 			= 0,
              originalError 	= thisForm.attr('original-error'),
              loadingSpinner;

            if (typeof originalError !== typeof undefined && originalError !== false) {
              thisForm.find('.form-error').text(originalError);
            }


            $(thisForm).find('.validate-required').each(function(){
              if($(this).val() === ''){
                $(this).addClass('field-error');
                error = 1;
              }else{
                $(this).removeClass('field-error');
              }
            });

            $(thisForm).find('.validate-email').each(function(){
              if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
                $(this).addClass('field-error');
                error = 1;
              }else{
                $(this).removeClass('field-error');
              }
            });


            if (error === 1){
              $(this).closest('.email-form').find('.form-error').fadeIn(200);
            }else {
              // Hide the error if one was shown
              $(this).closest('.email-form').find('.form-error').fadeOut(200);
              // Create a new loading spinner while hiding the submit button.
              loadingSpinner = $('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
              $(thisForm).find('input[type="submit"]').hide();

              jQuery.ajax({
                type: "POST",
                url: "mail/mail.php",
                data: thisForm.serialize(),
                success: function (response) {
                  // Swiftmailer always sends back a number representing numner of emails sent.
                  // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
                  $(thisForm).find('.form-loading').remove();
                  $(thisForm).find('input[type="submit"]').show();
                  if($.isNumeric(response)){
                    if(parseInt(response) > 0){
                      thisForm.find('.form-success').fadeIn(1000);
                      thisForm.find('.form-error').fadeOut(1000);
                      setTimeout(function(){ thisForm.find('.form-success').fadeOut(500); }, 5000);
                    }
                  }
                  // If error text was returned, put the text in the .form-error div and show it.
                  else{
                    // Keep the current error text in a data attribute on the form
                    thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                    // Show the error with the returned error text.
                    thisForm.find('.form-error').text(response).fadeIn(1000);
                    thisForm.find('.form-success').fadeOut(1000);
                  }
                },
                error: function (errorObject, errorText, errorHTTP) {
                  // Keep the current error text in a data attribute on the form
                  thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                  // Show the error with the returned error text.
                  thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
                  thisForm.find('.form-success').fadeOut(1000);
                  $(thisForm).find('.form-loading').remove();
                  $(thisForm).find('input[type="submit"]').show();
                }
              });
            }
            return false;
          });


          // Expanding Lists (updated in Pivot 1.4.0)

          $('.expanding-ul li').click(function(){
            $('.expanding-ul li').removeClass('active');
            $(this).addClass('active');
          });
        });
      }
    };
  });


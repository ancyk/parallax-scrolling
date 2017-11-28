(function (){
  var $window = $(window);
  var $parallax = $('.parallax');
  var $btnUp = $('#btn-up');
  var $header = $('header');
  var $menuTop = $('#menu-top');
  var $htmlBody = $('html, body');
  var $scrollTop, $imgOffset;
  var nrLink;
  
  
  // zmiana wyglądu menu
  function changeMenuStyle() {
    if (($scrollTop <= 200) && ($window.outerWidth(true) >= 1024)) {
      $header.removeClass('menu-min');
      $header.addClass('menu-start');
    } else {
      $header.removeClass('menu-start');
      $header.addClass('menu-min');
    }
  }
  
  // pojawienie się przycisku
  function buttonUp() {
    if ($scrollTop >=300) {
      $btnUp.fadeIn(600);
    } else {
      $btnUp.fadeOut(600);
    }
  }
  
  // efekt parallax JS oraz powiększenie obrazów
  // na mniejszych urządzeniach mobilnych
  function parallaxEffect() {
    $parallax.each(function() {
      $imgOffset = $(this).offset().top;
      
      if ($window.width() < 780) {
        $(this).css('backgroundSize', '250%');
      } else {
        $(this).css('backgroundSize', 'cover');
      }
      
      $(this).css({
        backgroundPosition: '50%' + ' ' + (Math.round(($imgOffset - $scrollTop)*3/8)-120) + 'px'
      });
    });
  }
  
  // aktywny element menu
  function activeElement() {
    if ($window.outerWidth(true) >= 768) {
      if (($scrollTop > ($('.bg1').offset().top + 300)) && ($scrollTop < ($('.bg2').offset().top - 300))) {
        $('#menu-top > [href="#sec1"]').addClass('current');
      } else {
        $('#menu-top > [href="#sec1"]').removeClass('current');
      }
      if (($scrollTop > ($('.bg2').offset().top - 300)) && ($scrollTop < ($('.bg3').offset().top - 300))) {
        $('#menu-top > [href="#sec2"]').addClass('current');
      } else {
        $('#menu-top > [href="#sec2"]').removeClass('current');
      }
      if (($scrollTop > ($('.bg3').offset().top - 300)) && ($scrollTop < ($('.bg4').offset().top - 300))) {
        $('#menu-top > [href="#sec3"]').addClass('current');
      } else {
        $('#menu-top > [href="#sec3"]').removeClass('current');
      }
      if (($scrollTop > ($('.bg4').offset().top - 300)) && ($scrollTop < ($('.bg5').offset().top - 300))) {
        $('#menu-top > [href="#sec4"]').addClass('current');
      } else {
        $('#menu-top > [href="#sec4"]').removeClass('current');
      }
      if (($scrollTop > ($('.bg5').offset().top - 300)) && ($scrollTop < ($('footer').offset().top))) {
        $('#menu-top > [href="#sec5"]').addClass('current');
      } else {
        $('#menu-top > [href="#sec5"]').removeClass('current');
      }
    }
  }
  
  // urządzenia mobilne
  function mobileDevices() {
    if ($window.outerWidth(true) < 768) {
      $menuTop.hide();
      $menuTop.addClass('mobile');
    } else {
      $menuTop.show();
      //$menuTop.removeClass('mobile');
    }
  }
  
  $scrollTop = $window.scrollTop();
  changeMenuStyle();
  buttonUp();
  mobileDevices();
  
  // reakcje na przewijanie strony
  $window.on('scroll', function() {
    $scrollTop = $window.scrollTop();
    changeMenuStyle();
    buttonUp();
    parallaxEffect();
    activeElement();
  });
  
  // reakcje na zmianę rozmiaru okna
  $window.on('resize', function() {
    changeMenuStyle();
    parallaxEffect();
    activeElement();
    mobileDevices();
  });
  
  // płynne przewijanie strony - przycisk
  $btnUp.on('click', function(e) {
    e.preventDefault();
    $htmlBody.animate({
      scrollTop: 0
    }, 1000, 'swing');
  });
  
  // płynne przewijanie strony - elementy menu
  $('[href^="#sec"]').on('click', function(e) {
    e.preventDefault();
    nrLink = (this.getAttribute('href')).substring(4,5);
    $htmlBody.animate({
      scrollTop: $('#sec' + nrLink).offset().top
    }, 1000, 'swing');
  });
  
  // reakcja na wciśnięcie menu mobilnego
  $('#menu-toggle').on('click', function() {
    $menuTop.slideToggle();
    $('#menu-toggle i').toggleClass('fa-bars');
    $('#menu-toggle i').toggleClass('fa-times');
  });
  
  // zwinięcie menu po kliknięciu
  $('#menu-top a').on('click', function() {
    if (($menuTop.hasClass('mobile')) && ($window.outerWidth(true)) < 768) {
      $menuTop.slideUp();
      $('#menu-toggle i').toggleClass('fa-bars');
      $('#menu-toggle i').toggleClass('fa-times');
    }
  });
  
})();
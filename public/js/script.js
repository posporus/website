/*$(window).scroll(function(){

  console.log($("#secondpage").offset(),$(window).scrollTop());
})*/
/*$(window).scroll(function(){
  //console.log(translatePos("#thirdpage",0,255))
  $("#secondpage").css('background-color','rgba(0,0,0,'+translatePos("#secondpage",0,1)+')')
  //translatePos("#secondpage",50,255);
});*/

$(document).ready(function() {

  //lockedAllowed = window.screen.lockOrientation(portrait);

  vidsize();
  $(window).resize(function(){
    vidsize();
    //console.log("resize")
  });

  var currentslide = 1;
	$('#fullpage').fullpage({
    controlArrows: true,
    loopHorizontal: false,
    fixedElements: '.bottomlinks',
    onLeave: function(){
      $('.arrowUp').fadeOut(100);
      $('.arrowDown').fadeOut(100);
    },
    afterLoad: function(a,i) {
      currentslide = i;
      if(i == 1) {
        $('.arrowUp').fadeOut(100);
        $('.arrowDown').fadeIn(100);
      }
      if(i == 2) {
        $('.arrowUp').fadeIn(100);
        $('.arrowDown').fadeOut(100);
      }
      /*else {
        $('.arrowUp').fadeIn(100);
        $('.arrowDown').fadeIn(100);
      }*/
    }
  });

  //FULLPAGE Arrows
    $('.arrowUp').click(function(){
        $.fn.fullpage.moveSectionUp();
    });

    $('.arrowDown').click(function(){
        $.fn.fullpage.moveSectionDown();
    });
    $.fn.fullpage.afterLoad(function(index){
      alert(index)
    });
//Move section up on video end.
  var video = videojs('my-player').ready(function(){
  var player = this;

    player.on('ended', function() {
      $.fn.fullpage.moveSectionUp();
    });
  });


});

function vidsize() {
  var playerwidth = $(window).width();//*0.5;
  var playerheight = $(window).height();//*0.5625;
  $('#teaser video').css({
    width:playerwidth,
    height:playerheight
  });
  console.log(playerwidth,playerheight)
}

function translatePos(element,minvalue,maxvalue) {

  var minpos = $(element).offset().top;
  var maxpos = $(element).offset().top + $(element).outerHeight();
  var posrange = maxpos - minpos;

  var valuerange = maxvalue - minvalue;

  var scrollpos = $(window).scrollTop() + $(window).height();

  if(scrollpos < minpos) {
    return minvalue;
  }
  else if (scrollpos > maxpos) {
    return maxvalue;
  }
  else{
    scrolly = (scrollpos - minpos)/posrange;
    valuey = scrolly*valuerange+minvalue
    return valuey;
  }

}

//---------------SMOOTH SCROLL-------------------
//focus auskommentiert, weil blauer rahmen erzeugt wurde
//rest muss ich nicht verstehen

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          //$target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            //$target.focus(); // Set focus again
          };
        });
      }
    }
  });

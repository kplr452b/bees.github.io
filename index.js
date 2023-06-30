var $content = $('header .content')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});


/* 

    $content is a reference to the HTML elements with the class "content" that are descendants of the "header" element.
    $blur is a reference to the HTML elements with the class "overlay" that are descendants of the "header" element.
    wHeight is set to the height of the browser window using the $(window).height() function.


    It attaches an event handler to the window's "resize" event using the $(window).on('resize', function(){}) method. This event handler function will be executed whenever the browser window is resized.

    Inside the event handler function, it updates the value of the wHeight variable to the new height of the window using $(window).height() again. This ensures that wHeight always reflects the current window height after resizing.

*/



window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


/* 

The code creates a global variable window.requestAnimFrame and assigns it a self-invoking function
Inside the self-invoking function, it returns the window.requestAnimationFrame function if it exists in the current browser, which is a standard method for scheduling animation frames.

If window.requestAnimationFrame is not available, the code checks for vendor-prefixed versions of the function:

   1- window.webkitRequestAnimationFrame is the vendor-prefixed version used in WebKit-based browsers like Google Chrome and Safari.
   2- window.mozRequestAnimationFrame is the vendor-prefixed version used in Mozilla Firefox.

If none of the vendor-prefixed versions are available, the code defines a fallback function that uses window.setTimeout to approximate the frame rate at 60 frames per second (1000ms / 60fps).

    the self-invoking function is immediately executed, which assigns the appropriate requestAnimationFrame method to the window.requestAnimFrame variable, making it available for use in the codebase.

 so in this way animation-related code will use the most optimized and appropriate method for requesting animation frames, depending on the browser's capabilities.
*/



function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

/* 
      latestKnownScrollY: This property represents the latest known scroll position along the vertical axis. It is initialized to 0 when a new Scroller object is created.

    ticking: This property is used to keep track of whether a scroll event is currently being handled. It is initially set to false when a new Scroller object is created.

*/


Scroller.prototype = {
 
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    $blur.css('background-image',$('header:first-of-type').css('background-image'));
  },


  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 2
      , opaScroll = 1.4 - currentScrollY / 400;
   if(currentScrollY > wHeight)
     $('nav').css('position','fixed');
   else
     $('nav').css('position','absolute');
    
    $content.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};


var scroller = new Scroller();  
scroller.init();


$( document ).ready(function() {  

  var width = $(window).width();
  var height = $(window).height();
  var slideNum = 0;
  var sections = [];

  $(".slide_container").css("height", height + "px");

  $(".slide_container").each(function() {
    sections.push( $(this).attr('id') );
  });


  // ------------------------------------------------
  // Events
  // ------------------------------------------------

  $( window ).resize(function() {
    width = $(window).width();
    height = $(window).height();
    $(".slide_container").css("height", height + "px");
    var target = "#" + sections[slideNum];
    $('html,body').animate({
      scrollTop: $(target).offset().top
    }, 250);
  });


  $( window ).scroll(function() {
    slideNum = Math.floor( $(document).scrollTop() / height );
    if(slideNum < 0) { slideNum = 0; };
    if(slideNum > sections.length - 1) {  slideNum = sections.length - 1; }
  });

  $( "#down" ).click(function(e) {
    var num = slideNum + 1;
    if(num > sections.length - 1) {  num = sections.length - 1; }
    var target = "#" + sections[num]; 
    $('html,body').animate({
      scrollTop: $(target).offset().top
    }, 250);
  });

  $( "#up" ).click(function(e) {
    var num = slideNum - 1;
    if(num < 0) {  num = 0; }
    var target = "#" + sections[num]; 
    $('html,body').animate({
      scrollTop: $(target).offset().top
    }, 250);
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 37 || e.keyCode == 38) {
      var num = slideNum - 1;
      if(num < 0) {  num = 0; }
      var target = "#" + sections[num]; 
      $('html,body').animate({
        scrollTop: $(target).offset().top
      }, 250);
    };

    if (e.keyCode == 39 || e.keyCode == 40) {
      var num = slideNum + 1;
      if(num > sections.length - 1) {  num = sections.length - 1; }
      var target = "#" + sections[num]; 
      $('html,body').animate({
        scrollTop: $(target).offset().top
      }, 250);
    };
  });

  // ------------------------------------------------
  // Functions
  // ------------------------------------------------



  // ------------------------------------------------
  // utilitits
  // ------------------------------------------------

  //smooth scroll
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
       $('html,body').animate({
        scrollTop: target.offset().top
        }, 250);
        return false;
        }
      }
    });

});
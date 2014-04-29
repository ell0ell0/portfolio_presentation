$( document ).ready(function() {     
  
var pause;

if( $(window).width() > 680 ) {
  pause = false;
} else {
  pause = true;
}

if (Modernizr.canvas) {
  /*--------------------------------
  Letters
  --------------------------------*/

  var canvas =  document.querySelector('#canvas'),
                  readout = document.querySelector('#readout'),
                  context = canvas.getContext('2d');
                  context.canvas.width  = $("#intro").width();
                  context.canvas.height = $("#intro").height();

  var center = { 
    x: context.canvas.width/2,
    y: context.canvas.height/2
  };

  var diag = Math.sqrt(context.canvas.width*context.canvas.width + context.canvas.height*context.canvas.height);
  // var radius = context.canvas.width/160; 
  var damping = 0.01;

  var radius = 100;

  var letters = [];
  var fontSize = Math.floor(context.canvas.width/180);

  //need to delay all the canvas stuff for a bit to let the font load
  setTimeout(function() {

    var mousePos = {
      x: -1000,
      y: -1000
    };

    // setup all the letters
    function createTextObj(text) {
      var textObj = {
        text: text,
        w: 0,
        h: 0,
        origin: {
            x: 0,
            y: 0
          },
        pos: {
            x: 0,
            y: 0
          },
        vel: {
            x: 0,
            y: 0
          },
        force: {
            x: 0,
            y: 0
          }
      };
      return textObj;
    }

    letters.push(createTextObj("L"));
    letters.push(createTextObj("e"));
    letters.push(createTextObj("e"));
    letters.push(createTextObj(" "));
    letters.push(createTextObj("W"));
    letters.push(createTextObj("i"));
    letters.push(createTextObj("l"));
    letters.push(createTextObj("l"));
    letters.push(createTextObj("i"));
    letters.push(createTextObj("a"));
    letters.push(createTextObj("m"));
    letters.push(createTextObj("s"));

    var totalWidth = 0;

    //draw the letters and get the widths
    for(var i = 0; i<letters.length; i++) {
      drawText(letters[i]);
      totalWidth += letters[i].w;
    }

    //base the letter spacing on the size of the screen
    var letterspace = (context.canvas.width - totalWidth) / (letters.length + 11);
    //add in the letterspace unit to the total width of the text block
    totalWidth += letterspace * (letters.length - 1);

    var start = {
      x: center.x - (totalWidth/2), 
      y: center.y + 10
    };

    eraseBackground();

    //place the letters and define their origin points
    for(var i = 0; i<letters.length; i++) {
      letters[i].pos.x = start.x;
      letters[i].pos.y = Math.random() * -150;
      letters[i].origin.x = start.x;
      letters[i].origin.y = start.y;

      drawText(letters[i]);

      start.x += letters[i].w + letterspace;
    }

    
    function update() {
      for(var i = 0; i<letters.length; i++) {
        letters[i].force.x = 0;
        letters[i].force.y = 0;

        //Add attraction force
        var dif = {
          x: letters[i].pos.x - letters[i].origin.x,
          y: letters[i].pos.y - letters[i].origin.y
        };
        //normalize the vector
        var length = Math.sqrt(dif.x*dif.x + dif.y*dif.y);
        if(length > 0) {
          dif.x /= length;
          dif.y /= length;
        }

        //var pct = 1 - (length/diag);
        // NOTE the arbitrary number is the scale (how strong the force is ) 
        letters[i].force.x = letters[i].force.x - dif.x * 0.25;
        letters[i].force.y = letters[i].force.y - dif.y * 0.25;

    //MOUSE INTERACTION/////////////////////////////////////////////////////////////////////////////////
        var dist = getDist(letters[i].pos.x, letters[i].pos.y, mousePos.x, mousePos.y);
        
        if(dist < radius) {
          var mDif = {
            x: letters[i].pos.x - mousePos.x,
            y: letters[i].pos.y - mousePos.y
          };
          //normalize the vector
          var mLength = Math.sqrt(mDif.x*mDif.x + mDif.y*mDif.y);
          if(mLength > 0) {
            mDif.x /= mLength;
            mDif.y /= mLength;
          };
          
          //var mPct = 1 - (mLength/(radius));
          // NOTE the arbitrary number is the scale (how strong the force is ) 
          letters[i].force.x = letters[i].force.x + mDif.x * 0.75;
          letters[i].force.y = letters[i].force.y + mDif.y * 0.75;
        }
    /////////////////////////////////////////////////////////////////////////////////////////////////////

        //add damping
        letters[i].force.x = letters[i].force.x - letters[i].vel.x * damping;
        letters[i].force.y = letters[i].force.y - letters[i].vel.y * damping;

        //update forces
        letters[i].vel.x += letters[i].force.x;
        letters[i].vel.y += letters[i].force.y;
        letters[i].pos.x += letters[i].vel.x;
        letters[i].pos.y += letters[i].vel.y;


        var origDist = getDist(letters[i].pos.x, letters[i].pos.y, letters[i].origin.x, letters[i].origin.y);
        if (origDist < 1 && letters[i].vel.x < 0.4 && letters[i].vel.y < 0.4) {
          letters[i].pos.x = letters[i].origin.x;
          letters[i].pos.y = letters[i].origin.y;
          letters[i].force.x = 0;
          letters[i].force.y = 0;
          letters[i].vel.x = 0;
          letters[i].vel.y = 0;
        }

      }
      /*-----------------------------------
      particle updates
      -----------------------------------*/
      var trash = [];

      for (var i = 0; i < particles.length; i++) {
        particles[i].pos.x += particles[i].vector.x * 1.01;
        particles[i].pos.y += particles[i].vector.y * 1.01;
        particles[i].radius *= 1.025;

        if (particles[i].pos.x + particles[i].radius < 0 || 
            particles[i].pos.x - particles[i].radius > context.canvas.width ||
            particles[i].pos.y + particles[i].radius < 0 || 
            particles[i].pos.y - particles[i].radius > context.canvas.height ||
            particles[i].radius > 250) {

            trash.push(i);
        };
      }

      for (var i = 0; i < trash.length; i++) {
        particles.splice(trash[i], 1);
        particles.push(createParticle(mousePos));
      }

    }

    function animate() {
      if (!pause) {
        eraseBackground();
        update();

        for (var i = 0; i<particles.length; i++) {
          context.beginPath();
          context.arc(particles[i].pos.x, particles[i].pos.y, particles[i].radius, 0, 2 * Math.PI, false);
          context.fillStyle = "rgba(255, 255, 255, 0.1)";
          context.fill();
        }

        for(var i = 0; i<letters.length; i++) {
          drawText(letters[i]);
        }

        window.requestNextAnimationFrame(animate);
      }
    }

    canvas.onmousemove = function (e) {
      mousePos = windowToCanvas(canvas, e.clientX, e.clientY);
    }

    function windowToCanvas(canvas, x, y) {
       var bbox = canvas.getBoundingClientRect();
       return { x: x - bbox.left * (canvas.width  / bbox.width),
                y: y - bbox.top  * (canvas.height / bbox.height)
              };
    }

    animate();

    $( window ).resize(function() {

    //reset the carousel after resize (just in case)
    waitForFinalEvent(function(){

      if( $(window).width() > 680 && pause != false ) {
        pause = false;
        animate();
      } 
      if( $(window).width() < 680 && pause != true ) {
        pause = true;
        animate();
      } 

      eraseBackground();

      context.canvas.width  = $("#intro").width();
      context.canvas.height = $("#intro").height();

      center = { 
        x: context.canvas.width/2,
        y: context.canvas.height/2
      };

      fontSize = Math.floor(context.canvas.width/120);
      totalWidth = 0;

      //draw the letters and get the widths
      for(var i = 0; i<letters.length; i++) {
        drawText(letters[i]);
        totalWidth += letters[i].w;
      }
      //base the letter spacing on the size of the screen
      letterspace = (context.canvas.width - totalWidth) / (letters.length + 11);
      //add in the letterspace unit to the total width of the text block
      totalWidth += letterspace * (letters.length - 1);

      start = {
        x: center.x - (totalWidth/2), 
        y: center.y + 10
      };

      eraseBackground();

      //place the letters and define their origin points
      for(var i = 0; i<letters.length; i++) {
        letters[i].origin.x = start.x;
        letters[i].origin.y = start.y;

        drawText(letters[i]);

        start.x += letters[i].w + letterspace;
      }

    }, 200, "reset stuff");

  });

  }, 200);

  function eraseBackground() {
    context.clearRect(0,0,canvas.width,canvas.height);
  }

  function drawText(text) {
    context.save();
    
    context.font = '700 ' + fontSize + 'em Ubuntu';
    context.textAlign = 'left';
    context.fillStyle = 'white';
    context.fillText(text.text, text.pos.x, text.pos.y);

    var metrics = context.measureText(text.text);
    text.w = metrics.width;
    text.h = metrics.height;
    
    context.restore();
  }

  /*--------------------------------
  Particlefield
  --------------------------------*/
  var numParticles = 200;
  var particles = [];

  function createParticle(origin) {
    var x = Math.random() * context.canvas.width;
    var y = Math.random() * context.canvas.height;

    var dist = getDist(x, y, origin.x, origin.y);

    if( dist < 200 ) {
      createParticle(origin);
    }

    var speed = map(dist, 0, context.canvas.width, 0, 250, true);

    var particle = {
      pos: {
        x: x,
        y: y
      },
      radius: 3,
      vector: {
        x: (x - origin.x) / speed,
        y: (y - origin.y) / speed
      }
    };
    return particle;
  }

  for (var i = 0; i < numParticles; i++) {
    particles.push(createParticle(center));
  } 
}




    // ------------------------------------------------
    // utilitits
    // ------------------------------------------------
    function map(value, inputMin, inputMax, outputMin, outputMax, clamp){
      var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
      if( clamp ){
        if(outputMax < outputMin){
          if( outVal < outputMax )outVal = outputMax;
          else if( outVal > outputMin )outVal = outputMin;
        }else{
          if( outVal > outputMax )outVal = outputMax;
          else if( outVal < outputMin )outVal = outputMin;
        }
      }
      return outVal;
    }

    function getDist(x1, y1, x2, y2) {
      return Math.round( Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)) );
    }

    function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }

    //wait for timer
    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();

});
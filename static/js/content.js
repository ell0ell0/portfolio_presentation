var contents=[

  {words:["<h1>A brief-ish history of me</h1>"]},

  {image:['time.jpg']},

  {image:['winter07cover.jpg', 'merrill.jpg']},

  {image:['slime.jpg']},

  {image:['joint1.jpg']},
  
  {image:['joint2.jpg']},

  {image:['animals.jpg']},

  {image:['animals2.jpg']},

  {image:['rna.jpg']},

  {image:['drug.jpg']},

  {image:['stat1.jpg']},

  {image:['03RW.jpg']},

  {image:['rw1.jpg']},

  {image:['rw2.jpg']},

  {image:['rw3.jpg']},

  {image:['rw4.jpg']},

  {image:['rw5.jpg']},

  {image:['rw6.jpg']},

  {image:['rw7.jpg']},

  {image:['rw8.jpg']},

  {words:["<h1>I'd learned what I could<br>but i wanted to do more...</h1>"]},

  {image:['parsons.jpg']},

  {words:["<h1>I made some pretty weird stuff...</h1>"]},

  {image:['omnom_story-590x525.jpg']},

  {image:['omnom1.jpg']},

  {image:['omnom1a.jpg']},

  {image:['omnom2.jpg']},

  {video:['<iframe src="//player.vimeo.com/video/23781859?title=0&amp;byline=0&amp;portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {video:['<iframe src="//player.vimeo.com/video/23781904?title=0&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {video:['<iframe src="//player.vimeo.com/video/26242060?title=0&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {video:['<iframe src="//player.vimeo.com/video/38695916?title=0&amp;byline=0&amp;portrait=0" width="500" height="363" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {words:["<h1>But also some really great stuff.</h1>"]},

  {image:['sketches.jpg']},

  {image:['rough4.jpg']},

  {image:['rough2.jpg']},

  {image:['rough1.jpg']},

  {image:['NPD_Poster1.jpg']},

  {video:['<iframe src="//player.vimeo.com/video/38656957?title=0&amp;byline=0&amp;portrait=0" width="500" height="381" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {video:['<iframe src="//player.vimeo.com/video/23808797?title=0&amp;byline=0&amp;portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>']},

  {video:['<iframe width="560" height="315" src="//www.youtube.com/embed/iSnjcxtBIUY" frameborder="0" allowfullscreen></iframe>']},

  {video:['<iframe width="420" height="315" src="//www.youtube.com/embed/MgdegK4dZLg" frameborder="0" allowfullscreen></iframe>']},

  {image:['CFPB.jpg']},

  {words:["<h1>The government... Wait, what? Why?</h1>"]},

  {image:['oldform.jpg'], url:'https://help.consumerfinance.gov/app/mortgage/ask'},

  {image:['newform.jpg'], url:'https://help.consumerfinance.gov/app/debtcollection/ask#currentPage=0'},

  {image:['complaintMobile.png']},

  {image:['cfCurrent.jpg'], url:'http://www.consumerfinance.gov/'},

  // {image:['cfNew.jpg'], url:'http://ell0ell0.github.io/ConsumerFinance.gov-preview/'},

  {image:['cfMobile.png'], url:'http://ell0ell0.github.io/ConsumerFinance.gov-preview/'},

  {image:['blog_build_v3.jpg'], url:'http://refresh.demo.cfpb.gov/blog/'},

  {image:['events_v2.jpg'], url:'static/img/events_v2.png'},

  {image:['contact_jj_v6.jpg'], url:'static/img/contact_jj_v6.png'},

  {image:['history4.jpg'], url:'static/img/history4.png'},

  {image:['icons.jpg'], url:'http://cfpb.github.io/design-manual/identity/identity.html'},

  {image:['cfpb_doc.png'], url:'static/img/cfpb_doc.pdf'},

  {image:['404.png'], url:'http://ell0ell0.github.io/flashlight/'},

  {words:["<h1>That's quite a range. How do I resolve all that?</h1>"]},

  {words:["<h1>what I hope it shows is intelligence and a bit of charm.</h1>"]},

  {words:["<h1>But really... I love making stuff, thinking about problems and trying out solutions.</h1>"]},

  {words:["<h1>I'm a junkie for that feeling you get when you finish a project and you just want to grab the nearest person and say 'check out this awesome thing I made!'</h1>"]},

  {words:["<h1>Thank you!</h1>"]}
];

for (var i = 0; i < contents.length; i++) {

  var beginString = '<section class="slide_container" id="' + i + '"><div class="dummy"></div><div class="img_wrapper"><div class="centerer"></div>';    
  var endString = '</div></section>';
  var contentString = '';

  if ( contents[i].hasOwnProperty('image') ) {
    for (var j = 0; j < contents[i].image.length; j++) {
      var url = '<a href="static/img/' + contents[i].image[j];
      if ( contents[i].hasOwnProperty('url') ) {
        url = '<a href="' + contents[i].url;
      }
      contentString += url + '" target="_blank"><img alt="' + contents[i].image[j] + '" src="static/img/' + contents[i].image[j] + '"></a>';
    } 
    $( "#content" ).append( beginString + contentString + endString);
  }

  if ( contents[i].hasOwnProperty('words') ) {
    beginString = '<section class="slide_container" id="' + i + '">';
    endString = '</section>';
    contentString = contents[i].words[0];
    $( "#content" ).append( beginString + contentString + endString);
  }

  if ( contents[i].hasOwnProperty('video') ) {
    contentString = contents[i].video[0];
    $( "#content" ).append( beginString + contentString + endString);
  }
};
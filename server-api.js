
// server.js
// where your node app starts

// init project
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const requestProxy = require("express-request-proxy");
const app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.txt');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//Status///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/status', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  request('https://kayoanime.com/', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemList = {
      api_info: 'API is Online, probably.',
      status: '200'
    };
    
    res.json(itemList);
  });
  
});


//Recent Update Series///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/list/series-recent', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  request('https://kayoanime.com/', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('ul.posts-items').eq(0).find('li.post-item');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('img').attr('src');
      let title = item.find('h2.post-title').text().trim();
      let date = item.find('span.date').text().trim();
      let url = item.find('a').attr('href');
      let content = url.replace('https://kayoanime.com/','').replace('/','').trim();
      
      if (title.includes("Top")){
        if (title.includes("List")){
        
        } else {
          itemList.data.push({ cover, title, date, url, content });
        }
      } else {
        itemList.data.push({ cover, title, date, url, content });
      }
 
      
    };
    
    res.json(itemList);
  });
  
});

//Recent Update Movie///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/list/movies-recent', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  request('https://kayoanime.com/', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('ul.posts-items').eq(1).find('li.post-item');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      var cover = item.find('img').attr('src');
      let title = item.find('h2.post-title').text().trim();
      let date = item.find('span.date').text().trim();
      let url = item.find('a').attr('href');
      let content = url.replace('https://kayoanime.com/','').replace('/','').trim();
      
      if (typeof cover == 'undefined'){
        cover = item.find('div').eq(0).attr('style').replace('background-image: url(','').replace(')','').trim();
      }
 
      itemList.data.push({
        cover, title, date, url, content
      });
    };
    
    res.json(itemList);
  });
  
});


//Search///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/search/:query', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var query = req.params.query;
  request('https://kayoanime.com/?s='+query, function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('li.post-item');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('img').attr('src');
      let title = item.find('h2.post-title').text().trim();
      let date = item.find('span.date').text().trim();
      let url = item.find('a').attr('href').trim();
      let content = item.find('a').attr('href').replace('https://kayoanime.com/','').replace('/','').trim();
 
      itemList.data.push({
        cover, title, date, url, content
      });
    };
    
    
    res.json(itemList);
  });
  
});

//Videos Info///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/content/:contentid', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var contentid = req.params.contentid;
  request('https://kayoanime.com/'+contentid, function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('div.entry-content div.toggle');
    let episodeList = $('.lists .video-block');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let title = item.find('h3.toggle-head').text().trim();
      var content_html = item.find("div.toggle-content").html().replace(/\n/g,'<br>');
      
      var html = html + content_html;
      

      itemList.data.push({
        title, content_html
      });
    };
    
    res.json(itemElements);
    
    
  });
  
});


//Genre List ///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/list/genre', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  request('https://kayoanime.com/', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('ul#menu-genres > li.menu-item-object-category');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let genre = item.text().trim();
      let url = item.find('a').attr('href').trim();
      let content = item.find('a').attr('href').replace('https://kayoanime.com/','').replace('/','').trim();
 
      itemList.data.push({
        genre, url, content
      });
    };
    
    res.json(itemList);
  });
  
});

//Genre Open///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/genre/:query', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var query = req.params.query;
  request('https://kayoanime.com/'+query, function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('li.post-item');
    let itemList = {
      api_info: 'API is LIMITED!',
      request_info: 'This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('img').attr('src');
      let title = item.find('h2.post-title').text().trim();
      let date = item.find('span.date').text().trim();
      let url = item.find('a').attr('href').trim();
      let content = item.find('a').attr('href').replace('https://kayoanime.com/','').replace('/','').trim();
 
      itemList.data.push({
        cover, title, date, url, content
      });
    };
    
    
    res.json(itemList);
  });
  
});
// server.js
// where your node app starts

// init project
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const requestProxy = require("express-request-proxy");
const app = express();
var http = require("http");
var fs = require("fs");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


//Recent Update Series///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get("/", function (req, res) {
  // we're using the request library to get the HTML of the page.
  request("https://kayoanime.com/", function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end("server error");
      return;
    }

    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);

    // Looking for all elements with a class
    let itemElements = $("ul.posts-items");
    let itemList = {
      api_info: "API is LIMITED!",
      request_info:
        "This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com",
      data: [],
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      var shtml = itemElements.html().replace(/\n/g, "");
      var html = shtml;
      
    }
    
    var html = html.replace("undefined", "");
    var dhtml = html.replace(/https:\/\/kayoanime.com\//g, "/content/")
        
    var text = fs.readFileSync('public/indexp.html','utf8').replace('indexp',dhtml);
    

    res.send(text);
  });
});

//Search///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get("/search/:query", function (req, res) {
  // we're using the request library to get the HTML of the page.
  var query = req.params.query;
  request("https://kayoanime.com/?s=" + query, function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end("server error");
      return;
    }

    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);

    // Looking for all elements with a class
    let itemElements = $("li.post-item");
    let itemList = {
      api_info: "API is LIMITED!",
      request_info:
        "This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com",
      data: [],
    };

    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

     var shtml = item.html().replace(/\n/g, "<br>");
     var html = html + shtml;

    }
    
    if (typeof html == "undefined") {
      var html = html+'Sorry, but nothing matched your search terms. Please try again with some different keywords.';
    }
    
    var html = html.trim().replace("undefined", "");
    var dhtml = html.replace(/<br>/g, "");
    var dhtml = dhtml.replace(/https:\/\/kayoanime.com\//g, "/content/")
        
    var text = fs.readFileSync('public/genre.html','utf8').replace('genrep',dhtml);
    var html = text.replace('genrename', 'Searching for "'+query+'"');
    var html = html.replace('animoatitle', 'Searching for "'+query+'" - ANIMOA')

    res.send(html);
  });
});

//Videos Info///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get("/content/:contentid", function (req, res) {
  // we're using the request library to get the HTML of the page.
  var contentid = req.params.contentid;
  request("https://kayoanime.com/" + contentid, function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end("server error");
      return;
    }

    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);

    // Looking for all elements with a class
    let itemElements = $("div.entry-content div.toggle");
    let episodeList = $(".lists .video-block");
    let itemList = {
      api_info: "API is LIMITED!",
      request_info:
        "This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com",
      data: [],
    };

    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let title = item.find("h3.toggle-head").text().trim();
      var content_html = item.html().replace(/\n/g, "<br>");

      var html = html + content_html;

    }
    
    var html = html.replace("undefined", "");
    var dhtml = html.replace(/<br>/g, "");
    var dhtml = dhtml.replace('width=', 'al');
    var dhtml = dhtml.replace('height=', 'lu');
        
    var text = fs.readFileSync('public/content.html','utf8').replace('contentp',dhtml);
    

    res.send(text);

  });
});

//Genre List ///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get("/list/genre", function (req, res) {
  // we're using the request library to get the HTML of the page.
  request("https://kayoanime.com/", function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end("server error");
      return;
    }

    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);

    // Looking for all elements with a class
    let itemElements = $("ul#menu-genres > li.menu-item-object-category");
    let itemList = {
      api_info: "API is LIMITED!",
      request_info:
        "This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com",
      data: [],
    };

    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      var shtml = item.html().replace(/\n/g, "<br>");
      var html = html + shtml;

    }

    var html = html.replace("undefined", "");
    var dhtml = html.replace(/<br>/g, "");
    var dhtml = html.replace(/https:\/\/kayoanime.com\//g, "/genre/")
        
    var text = fs.readFileSync('public/genrelist.html','utf8').replace('genrelistp',dhtml);
    

    res.send(text);
  });
});

//Genre Open///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get("/genre/:query", function (req, res) {
  // we're using the request library to get the HTML of the page.
  var query = req.params.query;
  request("https://kayoanime.com/" + query, function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end("server error");
      return;
    }

    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);

    // Looking for all elements with a class
    let itemElements = $("li.post-item");
    let itemList = {
      api_info: "API is LIMITED!",
      request_info:
        "This API is for testing ONLY. Your request will be limited. If you want to use it on your project, you need to buy the source code from me and host the API by yourself. Only with 20$ (paypal only) you can have the source code and unlimited request forever. Email me at willyeff2@gmail.com",
      data: [],
    };

    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      var shtml = item.html().replace(/\n/g, "<br>");
      var html = html + shtml;

    }
    
    var html = html.replace("undefined", "");
    var dhtml = html.replace(/<br>/g, "");
    var dhtml = dhtml.replace(/https:\/\/kayoanime.com\//g, "/content/")
        
    var text = fs.readFileSync('public/genre.html','utf8').replace('genrep',dhtml);
    var html = text.replace('genrename', query);
    var querycap = query.replace(/\b\w/g , function(m){ return m.toUpperCase(); } );
    var html = html.replace('animoatitle', querycap+' - ANIMOA')

    res.send(html);
    
  });
});

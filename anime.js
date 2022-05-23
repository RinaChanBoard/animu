


//This is for anime things/////


//HOME Recent Update SUB///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/anime/list/recent', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var page = req.params.page;
  request('https://vidembed.io/?page=1', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('.video-block');
    let paginationList = $('.pagination li');
    let itemList = {
      api_info: 'API by KuronekoNy4n',
      request_info: 'https://www.facebook.com/addstring',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('a .img .picture img').attr('src');
      let title = item.find('a .name').text().trim();
      let date = item.find('a .meta .date').text().trim();
      let vid_id = item.find('a').attr('href').replace('/videos/','');
 
      itemList.data.push({
        cover, title, date, vid_id
      });
    };
  
    
    res.json(itemList);
  });
  
});


//Search///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/anime/search/:query', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var query = req.params.query;
  var page = req.params.page;
  request('https://vidembed.io/search.html?keyword='+query+'&page=1', function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('.video-block');
    let paginationList = $('.pagination li');
    let itemList = {
      api_info: 'API by KuronekoNy4n',
      request_info: 'https://www.facebook.com/addstring',
      data:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('a .img .picture img').attr('src');
      let dtitle = item.find('a .name').text().trim();
      let stitle = dtitle.substring(dtitle.indexOf("Episode"), dtitle.lastIndexOf("")).trim();
      let title = dtitle.replace(stitle, '').trim();
      let date = item.find('a .meta .date').text().trim();
      let vid_id = item.find('a').attr('href').replace('/videos/','');
 
      itemList.data.push({
        cover, title, date, vid_id
      });
    };
    
    
    res.json(itemList);
  });
  
});

//Videos Info///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/anime/info/videos/:anime', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var anime = req.params.anime;
  request('https://vidembed.io/videos/'+anime, function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('.video-info-left');
    let episodeList = $('.lists .video-block');
    let itemList = {
      api_info: 'API by KuronekoNy4n',
      request_info: 'https://www.facebook.com/addstring',
      data:[],
      episode:[]
    };
    
    for (let i = 0; i < itemElements.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = itemElements.eq(i);

      // .find() searches within an element for the selector
      let title = item.find('h1').eq(0).text().trim();
      let title2 = item.find('.video-details .date').text().trim();
      let description = item.find('.video-details .post-entry').text().trim();
      let stream = 'https:' + item.find('.watch_play .play-video iframe').attr('src');
      let download = stream.replace('streaming.php', 'download');
      let download_id = download.substring(download.indexOf("id="), download.lastIndexOf('&title')).replace('id=','');
      
      itemList.data.push({
        title, title2, description, stream, download, download_id
      });
    };
    
    for (let i = 0; i < episodeList.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = episodeList.eq(i);

      // .find() searches within an element for the selector
      let cover = item.find('.picture img').attr('src');
      let depisode = item.find('a .name').text().trim();
      let episode = depisode.substring(depisode.indexOf("Episode"), depisode.lastIndexOf("")).trim();
      let date = item.find('a .meta .date').text().trim();
      let type = item.find('.type').text().trim();
      let vid_id = item.find('a').attr('href').replace('/videos/','');

      itemList.episode.push({
        cover, episode, type, date, vid_id
      });
    };
    
    res.json(itemList);
  });
  
});


//Download///////////////////////////////////////////////////////////////////////////

// this url will return the data our page needs
app.get('/anime/get/download/:download', function(req, res) {
   
  // we're using the request library to get the HTML of the page.
  var download = req.params.download;
  request('https://vidembed.io/download?id='+download, function (err, response, body) {
    
    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }
    
    // cheerio.load takes a string of HTML and returns a jQuery-like interface
    let $ = cheerio.load(body);
    
    // Looking for all elements with a class
    let itemElements = $('.content_c_bg');
    let downloadList = $('.dowload');
    let itemList = {
      api_info: 'API by KuronekoNy4n',
      request_info: 'https://www.facebook.com/addstring',
      data:[]
    };
    
     for (let i = 0; i < downloadList.length; i++) {
      // .eq(n) gets the nth item from an element collection
      let item = downloadList.eq(i);
      
      let res = item.find('a').text().replace('Download\n', '').replace('Download ', '').replace('(', '').replace(')', '').trim();
      let url = encodeURI(item.find('a').attr('href'));
       
       
       if (download == 'For Ad'){ 
       } else {
         itemList.data.push({
        res, url
      });
    };
       }
    
    res.json(itemList);
  });
  
});
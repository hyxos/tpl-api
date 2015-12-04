function grabIndexUrls ($) {
  var titles = $('div > div > div.title.align-top > a');
  var urls = titles.map(function (index, div) { // collecting urls
    return $(div).attr('href')
  });    
}

function createRequests (urls) {
  var requests = [];
  urls.map(function (index, url) { // creating promises from requests on urls
    requests.push(scrape(root + url));
  });  
}

function moveToNextPage() {
  var nextPage = $('.pagination-next').attr('href');
  var nextPageOptions = {
    uri: root + nextPage,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  rp(nextPageOptions)
  .then(function ($) {
    console.log('in next set of querires')
    grabIndexUrls($)
    
  })
}

grabIndexUrls then create requests then q.all then moveToNextPage then loop

q.all(createRequests)



    // once all promises are resolved
    q.all(requests).then(function (results) { // q.all is a single promise to represent all url query promises
      console.log('done ' + results.length); // move to next series of pages...
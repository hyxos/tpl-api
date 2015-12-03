var Crawler = require("simplecrawler");
var myCrawler = new Crawler("www.torontopubliclibrary.ca/");
myCrawler.maxDepth = 2;

myCrawler.start();

myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
  console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
  console.log("It was a resource of type %s", response.headers['content-type']);

    // Do something with the data in responseBuffer
  //   crawler.discoverResources = function(buf, queueItem) {
  //   // scan buffer for URLs, and then:

  //   crawler.queueURL(aDiscoveredURL, queueItem);
  // };
});


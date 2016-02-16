var youtubePlaylist = ["i0Fh1SkjXPQ","7HSyOHae_6U"];
var videoQueue = [];

var event2 = new Event('build');

// Listen for the event.

var player;

var host = location.origin

// var socket = io(host);


function onYouTubeIframeAPIReady() {
        console.log("Youtube player just executed");
        player = new YT.Player('youtubePlayer', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': yt_loadPlaylist,
            // 'onStateChange': onPlayerStateChange
          }
        });
}

function yt_loadPlaylist(){
  console.log("We are good to go"); 
  // $(document).dispatchEvent(event2);
  player.loadPlaylist({playlist:youtubePlaylist,
                    index:1,
                    startSeconds:1})
}






function init() {
        console.log("Called init function");
        console.log(gapi);
        gapi.client.setApiKey('AIzaSyAVg_OF07UhbZaXzfYQABKQIddtjoUEtCQ');
        gapi.client.load('youtube', 'v3');
      }


// Search for a specified string.
function search(term) {
  var q = term;

  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: '25'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result.items);
    return response.result.items

  });
}
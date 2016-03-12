var youtubePlaylist = ["i0Fh1SkjXPQ","7HSyOHae_6U"];
var videoQueue = [];

var event2 = new Event('build');

var w = window.innerWidth;
var h = window.innerHeight;

// Listen for the event.

var player;

var host = location.origin

// var socket = io(host);


function onYouTubeIframeAPIReady() {
        console.log("Youtube player just executed");
        player = new YT.Player('youtubePlayer', {
          height: String(h),
          width: String(w),
          playerVars: {
            controls: 0,
            disablekb: 1
        },
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': yt_loadPlaylist,
            'onStateChange': onPlayerStateChange
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



function onPlayerStateChange(YPState){
  console.log("state changed");
  player.getVideoUrl();

  if(YPState.data == 0){
    var lastVideoLink = player.getVideoUrl();
    temp = lastVideoLink.split("v=");
    var lastVideo = temp[1];
    console.log(lastVideo);
    // console.log(videoQueue.length);
    console.log(videoQueue);
    console.log(videoQueue.indexOf(String(lastVideo)));


    if(videoQueue.length != 0 && lastVideo == "7HSyOHae_6U" || videoQueue.indexOf(lastVideo) > -1){
        if(lastVideo == "7HSyOHae_6U"){
          console.log("New Video about to load");
          var nextVideo = videoQueue[0];
          console.log(nextVideo);
          player.loadVideoById(nextVideo);
        }
        else{
          console.log("changed the video")
          var nextVideo = videoQueue[videoQueue.indexOf(lastVideo)+1];
          player.loadVideoById(nextVideo);
        }

    }


  }
  
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
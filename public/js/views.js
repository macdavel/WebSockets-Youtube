

var DummyReactWrapper = React.createClass({
  getInitialState: function(){
    return {queuedVideos: []};
  },
  handleVideoQueue: function(video){

    this.socket.emit('addVideo', video);

    this.setState({queuedVideos: videoQueue});
  },
  componentDidMount: function(){
    this.socket = io(host);
    console.log("Component Ready");
    console.log(this.socket);
    this.socket.on('news', function(data){
      console.log("Connection has been Made");
    })
    this.socket.on('addVideo', function(video){

      console.log("Received addvideo request");
      videoQueue.push(video);
      this.setState({queuedVideos: videoQueue});

    }.bind(this))
    // init();
  },
  render: function(){
    return(
      <div>
          <PlaylistBox playlistsongs = {this.state.queuedVideos}/>
          <SearchBox handleQueing = {this.handleVideoQueue} />
      </div>
      )
  }

})









var SearchBox = React.createClass({
  getInitialState: function() {
    return {search_term: '', collectedSearchResults: [] };
  },
  handleSearchTermChange: function(e) {
    this.setState({search_term: e.target.value});
  },
  handleSearch: function(term, thisHolder){

    var q = term;
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      maxResults: '25'
    });

    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      thisHolder.setState({collectedSearchResults: response.result.items});
      // console.log(thisHolder.state.collectedSearchResults);
    });

  },
  handleSubmit: function(e) {
    // console.log(this.state.collectedSearchResults);
    e.preventDefault();
    // console.log("Successfullll");
    var searchquery = this.state.search_term.trim();
    // console.log(searchquery);
    this.handleSearch(searchquery, this);
    this.setState({search_term: ''});
    // console.log("Printing");
    
  },
  handleChangeCollectedSearch: function(e){
    // console.log("This is it!");
    this.setState({collectedSearchResults:[]});
  },
  render: function() {
    return (
      <div className = "search-section-container">
     		<div className = "search-container">
              <div className = "search-box-wrapper">
                <label> <input
                			 placeholder="Search your favourite songs" 
                			 value={this.state.search_term}
                			 onChange={this.handleSearchTermChange}
                			 type="text"/>
                			  <button className="pure-button" 
                			 	 onClick={this.handleSubmit} > Search </button>
               </label>
              </div>
              
        </div>

        <RenderSearchResults {...this} collectedSearchResults={this.state.collectedSearchResults}/>
      </div>

    );
  }
});




var ReactYoutubeSearchResult = React.createClass({
	handleAddButtonClick: function(){
    this.props.props.handleChangeCollectedSearch();



    var temp_propHolder = {
      thumbnailURL: this.props.thumbnailURL,
      title: this.props.title,
      videoURL: this.props.videoURL
    }

    // videoQueue.push(temp_propHolder);
    // console.log(this);
    this.props.props.props.handleQueing(temp_propHolder);
    // youtubePlaylist.push(this.props.videoURL);
    // player.B.playlist.push(this.props.videoURL)
    // console.log(player);
    // console.log(player.getPlaylist());
    // player.setShuffle({shufflePlaylist:true});
    // player.nextVideo();



    // player.loadVideoById(this.props.videoURL, 5, "large")
		
	},

	  render: function() {
      // console.log("I am making the divs")
	    return (
	      <div className = "result-div">
  		    <div className ="thumbnail"> <img className="thumbnail-image" src={this.props.thumbnailURL}></img></div>
  		    <div className = "description">{this.props.title}</div>
  		    <button id="add-button" className="pure-button custom-results-button" onClick={this.handleAddButtonClick}> ADD Song</button>
  		  </div>
	    );
	  }
});





var RenderSearchResults = React.createClass({
  render: function() {
    var youtubeResults = this.props.collectedSearchResults.map(function(youtubeResult){
      return (
        <ReactYoutubeSearchResult {...this} thumbnailURL={youtubeResult.snippet.thumbnails.high.url} title={youtubeResult.snippet.title} key = {youtubeResult.id.videoId}  videoURL = {youtubeResult.id.videoId} />
      );
    }.bind(this));
    return (
      <div className = "result-container">
        {youtubeResults}       
      </div>      
    );
  }
})


















var PlaylistBox = React.createClass({

  componentDidMount: function(){
    // init();
    // console.log("Loaded youtube APIS")
  },

  render: function(){
    // console.log(this);
    var playlistresults = this.props.playlistsongs.map(function(playlistObject){
      return (
        <PlaylistItem {...this} thumbnailURL={playlistObject.thumbnailURL} handleQueing = {this.handleQueing} title={playlistObject.title}  videoURL = {playlistObject.videoURL} />
      );
    }.bind(this));

    return (

      
          
          <div className = "youtube-container">
          {playlistresults}       
        </div> 
      
    );
  },
})


var PlaylistItem = React.createClass({

  handleClick: function(){
    // console.log("Handling button another click");
    // console.log(this);
    // this.handleQueing();
    player.loadVideoById(this.props.videoURL, 5, "large")
  },
  render: function() {
      return (
        <div className = "youtube-child" onClick ={this.handleClick} >
                <img className= "ychild-thumbnail"src={this.props.thumbnailURL}></img>
                <div className = "ychild-description"> {this.props.title}</div>
          </div>
      );
    }



})





ReactDOM.render(
  <DummyReactWrapper />,
  document.getElementById('react-container')
);
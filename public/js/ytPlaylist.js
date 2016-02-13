// var PlaylistBox = React.createClass({

// 	render: function(){
// 		var playlistresults = this.props.playlistSongs.map(function(playlistObject){
//       return (
//         <PlaylistItem {...this} thumbnailURL={playlistObject.thumbnailURL} handleQueing = {this.handleQueing} title={playlistObject.title}  videoURL = {playlistObject.videoURL} />
//       );
//     }.bind(this));

//     return (

//     	<div class="yplayer-container">
//             <div id = "youtubePlayer"> </div>
// 	        <div className = "youtube-container">
// 		      {playlistresults}       
// 		    </div> 
//         </div>
//     );
// 	},
// })


// var PlaylistItem = React.createClass({

// 	handleClick: function(){
// 		console.log("Handling button click");
// 		// this.handleQueing();
// 		player.loadVideoById(this.props.videoURL, 5, "large")
// 	},
// 	render: function() {
// 	    return (
// 	      <div className = "youtube-child" onclick ={this.handleClick} >
//                 <img className= "ychild-thumbnail"src={this.props.thumbnailURL}></img>
//                 <div className = "ychild-description"> {this.props.title}</div>
//           </div>
// 	    );
// 	  }



// })
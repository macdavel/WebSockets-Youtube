










function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



$(document).ready(function(){
	// $('form').submit(false);
	console.log("Ready!!!")
	var randID = makeid();
	var newString = '<a href="/'+randID+'">Create New Playlist</a>'
	$("#Option1").html(newString);



})


function handleSubmit(){
	console.log("Excecuting")
	console.log($('input').val());
}



$('#theButton').click(function(){
	console.log("clicking")
	console.log($('#theInput').val());
	var link = "/"+String($('#theInput').val())
	console.log(link);
	var win = window.open(link, '_self');
})

$('#begin-button').click(function(){
	$('.welcome-content').hide();
	$('.mainContent').show()
})

$('#theOtherButton').click(function(){
	console.log("clicking")
	console.log($('#theOtherInput').val());
	var link = "/"+String($('#theOtherInput').val())
	console.log(link);
	var win = window.open(link, '_self');
})


$('#Option2').click(function(){
	$("#Option2").css("display", "block")
	var thestring = '<div class="pure-menu pure-menu-horizontal"><ul class="pure-menu-list">'
	var counter = 0;

    for (var i = 0; i < rooms.length; i++) {
    	console.log("In this part");
    	console.log(rooms[i].length);
    	counter++;
    	if(rooms[i].length < 19){
    		console.log("Another one!")
    		var addition = '<li class="pure-menu-item"><a href="'+rooms[i]+'" class="pure-menu-link">'+rooms[i]+'</a></li>'
    		thestring += addition;
    	}
    	
    };
    if(counter ==0){
    	thestring += '<li class="pure-menu-item"><a href="default" class="pure-menu-link">No Playlists Available</a></li>'
    }

	thestring += '</ul></div>'


	$("#form1").show();
	$("#form1").html(thestring);
})



var rooms = [];
var socket = io(location.origin);
socket.emit('requestRooms')
socket.on('rooms', function(data){
	console.log(data);
	rooms = data;
})
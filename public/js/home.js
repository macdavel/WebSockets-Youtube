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
	$("#form1").show();
})

$('#Option3').click(function(){
	$("#Option3").css("display", "block")
	$("#form2").show();
})
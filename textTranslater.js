var context;
var time = 0.0;
var canvas;
function vec2( x , y )
{
	this.x = x;
	this.y = y;
	this.add = function( vec )
	{
		return new vec2( vec.x + this.x , vec.y + this.y );
	}
	this.mul = function( f )
	{
		return new vec2( f * this.x , f * this.y );
	}
}
window_size = new vec2( 256 , 256 );
function init()
{
	canvas = document.getElementById( "canvas" );
	context = canvas.getContext( "2d" );
	//window.setInterval( draw , 16 );
	//alert( translate( "hoch im norden" , "ge" , "ru" ) );
	printTranslate( document.getElementById( "text" ).textContent );
}
function updateSize()
{
	window_size = new vec2( canvas.width , canvas.height );
}
function clear()
{
	context.fillStyle = "#FFFFFF";
	context.fillRect( 0 , 0 , window_size.x , window_size.y );
}
function translate( text , sourceLang , targetLang )
{
	var url = "https://translate.googleapis.com/translate_a/t?client=t&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI( text );
	xhr = new XMLHttpRequest();
	xhr.open( "GET" , url , false );
  	xhr.send( null );
   return xhr.responseText.replace( new RegExp( "]" , "g" ) , "" )
   .replace( new RegExp( '\\[' , "g" ) , "" )
   .split( "," )[0]
   .replace( new RegExp( '"' , "g" ) , "" );
}
function drawText( text , color , size , pos )
{
	context.fillStyle = color;
	context.font = size + "pt serif";
	context.fillText( text , pos.x , pos.y );
}
function drawTextCentered( text , color , size , pos )
{
	context.fillStyle = color;
	context.font = size + "pt serif";
	var text_width = context.measureText( text ).width;
	context.fillText( text , pos.x - text_width / 2 , pos.y );
}
function drawTranslatedTextAsync( text , color , size , pos )
{
	function afunc()
	{
		var transl = translate( text , "auto" , "ru" );
		drawTextCentered( transl , color , size , pos );
	}
	setTimeout( afunc , 0 );
}
function printTranslate( text )
{
	var lines = text.split( "\n" );
	
	canvas.width = 512;
	updateSize();
	clear();
	var size = 20;
	var space = 30;
	canvas.height = lines.length * space;
	var src_lang = "ge";
	for( var i = 0; i < lines.length; i++ )
	{
		var words = lines[i].split( " " );
		var pos = 0;
		for( var j = 0; j < words.length; j++ )
		{
			if( words[j] == "" ) continue;
			drawText( words[j] , "#000000" , size , new vec2( pos , space * i ) );
			var word_width = context.measureText( words[j] + " " ).width;
			drawTranslatedTextAsync( words[j] , "#008844" , size / 2 , new vec2( pos + word_width / 2 , space * i - size ) );
			pos += word_width;
		}
	}
}
var trans_arr = new Array();
var arr_output;
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
	//window.setInterval( draw , 16 );
	//alert( translate( "produced" , "auto" , "ru" ) );
    arr_output = $( "#array" );
	printTranslate( document.getElementById( "text" ).textContent );
}
function translate( text , sourceLang , targetLang )
{
	var send = text.replace( new RegExp( '[.," ]' , "g" ) , "" );
	//return send;
	var url = "https://translate.googleapis.com/translate_a/t?client=t&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI( send );
	xhr = new XMLHttpRequest();
	xhr.open( "GET" , url , false );
  	xhr.send( null );
    var word_arr = xhr.responseText.replace( new RegExp( "]" , "g" ) , "" )
    .replace( new RegExp( '\\[' , "g" ) , "" )
    .replace( new RegExp( '"' , "g" ) , "" )
    .split( "," );
    var new_arr = new Array();
    var start = "А".charCodeAt( 0 );
    var end = "я".charCodeAt( 0 );
    for( var i = 0; i < word_arr.length; i++ )
    {
        var ch = word_arr[i].charCodeAt( 0 );
        if( ch > start && ch < end && word_arr[i] != "" )
        {
            new_arr[new_arr.length] = word_arr[i];
        }
    }
    return new_arr;
}
function printTranslatedTextAsync( text , id , w , i , pid )
{
	function afunc()
	{
		/*
        word_arr[index] = transl;
		printTextCentered( transl[0] , color , size , pos );*/
        var transl = translate( text , "ge" , "ru" );
        trans_arr[i] = transl;
        var elem = $( "#" + id );
        elem.append( transl[0] );
        $( "#" + pid ).mouseover(
            function()
            {
                arr_output.empty();
                for( j in trans_arr[i] )
                    arr_output.append( "{" + trans_arr[i][j] + "}" );
            }
        );
        var lof = elem.offset();
        var lw = elem.width();
        elem.offset( { top: lof.top , left: lof.left + w / 2 - lw / 2 } );
	}
	setTimeout( afunc , 0 );
}
function printTranslate( text )
{
    var lines = text.split( "\n" );
    var output = $( "#output" );
    var size = 14;
    var space = 25;
    var fsize = 6;
    var indx = 0;
    for( var i = 0; i < lines.length; i++ )
    {
        if( lines[i] == "" ) continue;
        var words = lines[i].split( " " );
        for( var j = 0; j < words.length; j++ )
        {
            if( words[j] == "" ) continue;
            var id = "word" + i + "" + j;
            output.append( "<div class='word' id='" + id + 
                          //"' style='left:" + pos + "px;" + " top:" + ypos + "px;" + 
                          "'>" + words[j] + "</div>" );
            var w = $( "#" + id ).width();
            var pos = $( "#" + id ).offset();
            var lid = "trword" + indx;
            output.append(
                "<div class='trword' id='" + lid +
                "' style='left:" + ( pos.left ) + "px;" + " top:" + ( pos.top - fsize ) + "px;" + "'>" +
                "</div>"
            );
            printTranslatedTextAsync( words[j] , lid , w , indx , id );
            indx++;
        }
        output.append( "</br></br>" );
    }
	/*var lines = text.split( "\n" );
	canvas.width = 512;
	updateSize();
	clear();
	var size = 20;
	var space = 30;
	canvas.height = lines.length * space;
	var src_lang = "ge";
	var width = canvas.width;
	context.font = size + "pt serif";
	for( var i = 0; i < lines.length; i++ )
	{
		width = Math.max( width , context.measureText( lines[i] ).width );
	}
	canvas.width = width;
    var word_arr = new Array();
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
	}*/
}

var cycleID;

var hashtag;

var arrColors = ['#059EE2','#76BF46','#782B90','#F47E1F'];
var currColor = 0;

var getTweets = function(){
	$.ajax({
		ajax: 'GET',
		dataType: 'jsonp',
		url: 'path/to/twitterfeed.php',
		jsonpCallback: 'showTweets',
		jsonp: 'false'
	});
}

var cycleTweets = function(){
	cycleID = setInterval(function(){
		backgroundColor();
		var currTweet = $('.tweet.current');
		var nextTweet = $('.tweet.current').next();
		
		$('.tweet.previous').removeClass('previous');
		$(currTweet).addClass('previous');
		$(currTweet).removeClass('current');
		if(nextTweet.length != 0) {
			$(nextTweet).addClass('current');
		} else {
			clearInterval(cycleID);
			getTweets();
		}
	}, 10000);
}

var showTweets = function(data) {
	
	var list = document.getElementById('twitter-feed');
	$(list).empty();
	for(var i=0;i<data.statuses.length;i++) {
		var tweetText = data.statuses[i].text;
		console.log(data.statuses[i].user);
		var tweetUser = data.statuses[i].user.screen_name;
		var tweetUserURL = data.statuses[i].user.url;
		$(list).append('<li class="tweet"><p class="tweet-text">'+tweetText+'</p><p class="tweet-user"><a href="http://twitter.com/'+tweetUser+'"><img src="images/twitter_logo.png" width="14"/>@'+tweetUser+'</a></p></li>');
		
	}
	$('.tweet').first().addClass('current');
	cycleTweets();
}

var loadTweetDisplay = function(callback){
	if(document.getElementById('twitter') === null) {
		var player = document.getElementById('header');
		$(player).after('<div id="twitter"><h2 class="twitter-hashtag">#'+hashtag+'</h2><ul id="twitter-feed"></ul></div>');
		console.log('Loading tweets display');
		callback();
	}
}

var backgroundColor = function() {
	$('#twitter').css('backgroundColor', arrColors[currColor]);
	if(currColor+1 < arrColors.length) {
		currColor++;
	} else {
		currColor = 0;
	}
}


jQuery(document).ready(function(){

	var thisScript = document.getElementById('twitter-feed-script');
	hashtag = thisScript.getAttribute('data-hashtag');
	
	loadTweetDisplay(function(){
		getTweets();
		backgroundColor();
	});
});





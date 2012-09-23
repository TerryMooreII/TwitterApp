
var Tweet = function(createdAt, fromUser, fromUserName, location, profileImgUrl, sourceUrl, text){
	this.createdAt = createdAt;
	this.fromUser = fromUser;
	this.fromUserLink = 'http://twitter.com/#!/' + fromUser;
	this.fromUserName = fromUserName;
	this.location = location;
	this.profileImgUrl = profileImgUrl;
	this.sourceUrl = '<a class="linkToTweet" href="' + sourceUrl + '">Link</a>';
	this.text = text;

}

var TwitterViewModel = function(){

	var self = this;

	self.search = ko.observable();
	self.tweets = ko.observableArray([]);
	self.hashSearch = ko.observable();

	self.init = function(){
		self.getTweets('cardinalNow');
	};

	self.search.subscribe(function(form) {
		self.getTweets($(searchValue).val());
	});
	
	self.sanitize = function(search){
		return search.replace('#', '%23')
	};

	self.hashSearch.subscribe(function(search){
		self.getTweets(search);
		console.log(search);
		$('#searchValue').value(search);
	});

	self.getTweets = function(search){

		search = self.sanitize(search);
		var url = 'http://search.twitter.com/search.json?callback=?&q=' + search; 
 		self.clearTweets();
		$.getJSON(url, function(json){
			$.each(json.results, function(k, tweet){
				self.tweets.push( new Tweet(tweet.created_at.split('+')[0], 
										tweet.from_user, 
										tweet.from_user_name, 
										tweet.geo, 
										tweet.profile_image_url,  
										tweet.source,
										self.hyperLinks(tweet.text)));				
			});
		});
	};

	self.hyperLinks = function replaceURLWithHTMLLinks(text) {
	    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    text = text.replace(exp,"<a href='$1'>$1</a>"); 

		var exp = /(#[A-Za-z0-9]*)/ig;
	    text = text.replace(exp,"<a href='#' data-bind='click: viewModel.hashSearch.bind($1)'>$1</a>"); 

	    return text;
	}	

	self.clearTweets = function(){
		self.tweets([]);
	}

}


var viewModel = new TwitterViewModel();
ko.applyBindings(viewModel);

viewModel.init();
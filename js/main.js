
var Tweet = function(createdAt, fromUser, fromUserName, location, profileImgUrl, sourceUrl, text){
	this.createdAt = createdAt;
	this.fromUser = fromUser;
	this.fromUserName = fromUserName;
	this.location = location;
	this.profileImgUrl = profileImgUrl;
	this.sourceUrl = sourceUrl;
	this.text = text;
}

var TwitterViewModel = function(){

	var self = this;

	self.search = ko.observable();
	self.tweets = ko.observableArray([]);

	var init = function(){

	};

	self.search.subscribe(function(form) {
		self.getTweets($(searchValue).val())	
	});

	self.getTweets = function(search){
		var url = 'http://search.twitter.com/search.json?callback=?&q=' + search; 
 		self.clearTweets();
		$.getJSON(url, function(json){
			$.each(json.results, function(k, tweet){
				self.tweets.push( new Tweet(tweet.created_at, 
										tweet.from_user, 
										tweet.from_user_name, 
										tweet.geo, 
										tweet.profile_image_url, 
										tweet.source,
										tweet.text));				
			});
		console.log(self.tweets());
		});
	};

	self.clearTweets = function(){
		self.tweets([]);
	}

}


var viewModel = new TwitterViewModel();

ko.applyBindings(viewModel);
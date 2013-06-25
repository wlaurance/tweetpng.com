var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
    app.get("/:username/tweet", function(req, res){
        var url = "https://twitter.com/" + req.params.username;
        request(url, function(err, rrr, body){
            $ = cheerio.load(body);
            var tweet = $('.tweet-text').html();
            var fullName = $('.profile-field').html();
            var screenName = $('.screen-name').html();
            var timeStamp = $('._timestamp').html();
            var avatarURL = $('.content div a img').attr('src');
            if (tweet === null){
                tweet = "This user's tweets are protected.";
                avatarURL = "/images/protected.png";
            }
            if (fullName === null){
                tweet = "This user does not exist.";
                avatarURL = "/images/not_exist.png";
            }
            res.render("tweet", {fullName:fullName,
                                 screenName:screenName,
                                 timeStamp:timeStamp,
                                 tweet:tweet,
                                 avatarURL:avatarURL});
        });
    });
};
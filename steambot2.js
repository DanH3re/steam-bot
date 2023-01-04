const config = require('./commentconfig.json');

const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');

const client = new SteamUser();
const community = new SteamCommunity();

const user = config.toWho;
const message = config.comment;
//Our account details
const logOnOptions = {
  accountName: config.username, 
  password: config.password
};
//Try to log on
client.logOn(logOnOptions);
//We logged on
client.on('loggedOn', function(details) {
  console.log('Bot ' + client.steamID.getSteamID64() + ' successfully logged into Steam!'); 
  client.setPersona(SteamUser.EPersonaState.Online); 
});
//Error login to Steam
client.on('error', function(err) {
  console.log('Error: ' + err);
});
//Got web session and cookies
client.on('webSession', function(sessionID, cookies) {
console.log('Got web session from Steam.');
community.setCookies(cookies);
//We can now post a comment
//Custom function to post and log comments on steam profiles
setInterval(function(){ 
commentOnUserProfile(user, message)
}, config.commentInterval);


});
function commentOnUserProfile(steamID, message) {
  community.postUserComment(steamID, message, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Successfully commented: ' + message)
    }
  });
}

function donothing() {

}


    
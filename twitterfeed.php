<?php
session_start();
require_once("path/to/twitteroauth.php"); //Path to twitteroauth library
 
$search = "?f=realtime&q=%23TheEdgeTV%20lang%3Aen&src=typd";
$notweets = 15;
$consumerkey = "XXXXXXXXXXXXXXXX";
$consumersecret = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$accesstoken = "000000000-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$accesstokensecret = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
   
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
  
$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=".$search);
  
echo json_encode($tweets);

?>

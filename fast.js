/**
 * Ping script. This does a couple of pings to
 * www.google.com and inputs those into a database.
 *
 * It's intended to show how my internet is doing over
 * time and whether or not I'm actually getting the
 * internet connectivity issues that it seems like I am.
 */
var pg = require("pg");
var ping = require("ping");

ping.promise.probe("www.google.com").then(function(res) {
  console.log(JSON.stringify(res));
});

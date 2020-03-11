/**
 * Ping script. This does a couple of pings to
 * www.google.com and inputs those into a database.
 *
 * It's intended to show how my internet is doing over
 * time and whether or not I'm actually getting the
 * internet connectivity issues that it seems like I am.
 */
const pg = require("pg");
const ping = require("ping");

// configure hosts and rows to insert into Postgres
const hosts = ["www.google.com", "www.twitter.com", "www.cloudflare.com"];
const conn = pg.Connection();

Promise.all(
  hosts.map(host => {
    ping.promise.probe(host).then(res => {
      return [
        res.host,
        res.alive,
        res.numeric_host,
        res.avg,
        res.max,
        res.min
      ];
    }).catch(error => {
      console.log("Error connecting to host.");
    });
  })
).then(values => {
  console.log(values);
});

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
const hosts = ["www.google.com", "www.cloudflare.com"];
const pool = new pg.Pool();

Promise.all(
  hosts.map(async host => {
    try {
      const res = await ping.promise
        .probe(host, {
          timeout: 10,
          extra: ["-c", "5"]
        });
      return [
        res.host,
        res.alive,
        res.numeric_host,
        res.avg,
        res.max,
        res.min
      ];
    }
    catch (error) {
      console.log("Error connecting to host.");
      return null;
    }
  })
).then(values => {
  // insert all of the values into postgres
  let valuesFiltered = values.filter(i => {
    return i != null;
  });
  valuesFiltered.forEach(value => {
    const queryText = `
      INSERT INTO fantasy.fast
      (timestamp, host, alive, numeric_host, average, minimum, maximum)
      VALUES
      (to_timestamp(${Date.now()} / 1000), $1, $2, $3, $4, $5, $6)
    `;

    pool
      .query(queryText, value)
      .then(_ => {
        console.log("Inserted row: " + JSON.stringify(value));
      })
      .catch(err => {
        console.log(
          "Error inserting row: " +
            JSON.stringify(value) +
            ", " +
            JSON.stringify(err)
        );
      });
  });
});

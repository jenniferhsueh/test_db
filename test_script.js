const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM Students where name=$2 AS $1", ["1"], (err, result) => {
    if (err) {
      console.error("error running query", err);
      client.end();
      return ;
    }
    console.log(JSON.stringify(result.rows[0])); //output: 1
    client.end();
  });
});
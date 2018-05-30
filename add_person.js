const knex = require("knex");
const settings = require("./settings"); // settings.json
const input = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

knex.select('title', 'author', 'year').from('books')
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${input}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let sum = result.rows.length
    console.log(`Found ${sum} person(s) by the name ${input}:`)
    for (let buddy of result.rows) {
      let birthday = buddy.birthdate.toString()
      console.log( buddy.first_name, buddy.last_name, 'born', birthday.substring(0,15));
    }
    client.end();
  });
});
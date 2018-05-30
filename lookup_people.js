const pg = require("pg");
const settings = require("./settings");

const input = process.argv.slice(2)

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  const input = process.argv.slice(2)
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people WHERE first_name = '${input}'`, [], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let totalPeople = result.rows.length;
    console.log(totalPeople)
    console.log("Found " + totalPeople + " persons(s) by the name " + input); //output: 1
    for (var k of result.rows) {
      let birthday = k.birthdate.toString();
      let bday = birthday
      console.log(k.first_name + " " + k.last_name + ", " + "born " + birthday.slice(4, 15))
    }
    client.end();
  });
});

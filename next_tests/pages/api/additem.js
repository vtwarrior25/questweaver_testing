// This should add a new custom item to the database
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

const connection = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
}

const db = pgp(connection);

export default function handler (req, res) {
  

  let q = req.query;
  if (q.type === 'item') {
    let itemaddquery = new PQ({
      text:`
        INSERT INTO 
        
      `
    })
  } else if (q.type === 'weapon') {
    
  } else {
    // How should we handle a create item query that isn't for a weapon or item???
  }
}
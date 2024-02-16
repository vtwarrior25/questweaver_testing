
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'questweaver',
  user: 'questweaver',
  password: 'p0pchuck$',
}

const db = pgp(connection);
const getAlignments = new PQ({text: 'SELECT * FROM alignment'});

function runquery() {
  db.any(getAlignments)
  .then (alignments => {
    //console.log("got alignments");
    //console.log(alignments);
    return alignments;
  }).catch (error => {
    error.log("bad");
    return "bad";
});
}



export default function handler(req, res) {
  let result = runquery();
  console.log(result);
  res.status(200).json(result);
}
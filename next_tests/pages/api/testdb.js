import { NextResponse } from 'next/server';
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

/*
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
*/


export default function handler(req, res) {
  //let result = runquery();
  try {
  db.any(getAlignments)
  .then (alignments => {
    return res.status(200).send(alignments);
  }).catch (error => {
    console.log(error);
    return res.status(500).send({error: 'Server error'});
});
} catch {
  return res.status(500).send({error: 'Server error'});
}
}
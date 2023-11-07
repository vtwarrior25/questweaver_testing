var express = require('express');
var router = express.Router();

function rollDice (die, num) { 
  console.log(`die = ${die}, num = ${num}`);
  dicerolls = [];
  for (let i = 0; i < num; i++) {
    dicerolls.push(Math.ceil(Math.random() * Number(die)));
  }
  return dicerolls;
}

function rollCheck(name, rolltype, die, number, mod){
  check = {
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
  }

  check.name = name;
  check.rolltype = rolltype;

  dicerolls = rollDice(Number(die), Number(number));
  rolltotal = 0;
  dicerolls.forEach( num => {
    rolltotal += num;
    check.rolls.push(num);
  })
  rolltotal = rolltotal + Number(mod);
  rollstring = '';
  basestring = '';
  i = 0;
  for (roll of dicerolls){
    if (Number(roll) < 0 || i == 0) {
      rollstring = `${rollstring} ${roll}` 
    } else {
      rollstring = `${rollstring}+${roll}` 
    }
    i++;
  }
  if (Number(mod) < 0) {
    rollstring = `${rollstring}${mod}`
    basestring = `${number}d${die}${mod}`
  } else if (Number(mod) == 0) {
    rollstring = `${rollstring}`
    basestring = `${number}d${die}`
  } else {
    rollstring = `${rollstring}+${mod}`
    basestring = `${number}d${die}+${mod}`
  }

  check.rollstring = rollstring.trim();
  check.rolltotal = rolltotal;
  check.basestring = basestring;
  return check;
}

router.get('/', function(req, res) {
  let q = req.query;
  check = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
  console.log(`rolltotal = ${rolltotal}`);
  res.send(check);
});

module.exports = router;


/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/
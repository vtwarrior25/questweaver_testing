function rollDice (die, num) { 
  console.log(`die = ${die}, num = ${num}`);
  let dicerolls = [];
  for (let i = 0; i < num; i++) {
    dicerolls.push(Math.ceil(Math.random() * Number(die)));
  }
  return dicerolls;
}

function rollCheck(name, rolltype, die, number, mod) {
  let check = {
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
  }

  check.name = name;
  check.rolltype = rolltype;

  let dicerolls = rollDice(Number(die), Number(number));
  let rolltotal = 0;
  dicerolls.forEach( num => {
    rolltotal += num;
    check.rolls.push(num);
  })
  rolltotal = rolltotal + Number(mod);
  let rollstring = '';
  let basestring = '';
  let i = 0;
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

function multiRollCheck (name, rolltype, mod, rollstodo) {
  let allrolls = [];
  let baserolllist = "";
  let i = 0;

  let check = {
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
  }

  console.log(rollstodo);
  console.log(Number(rollstodo[0].die));

  check.name = name;
  check.rolltype = rolltype;
  
  for (roll of rollstodo) {
    rollresults = rollDice(Number(roll.die), Number(roll.val));
    if (rollresults.length !== 0){
      check.rolls.push(rollresults);
      allrolls = allrolls.concat(rollresults);
      if (i < 1){
        baserolllist = `${baserolllist}${roll.val}d${roll.die}`
      } else {
        baserolllist = `${baserolllist}+${roll.val}d${roll.die}`
      }
    }
    i++;
  }

  let rollstring = '';
  let rolltotal = 0;
  
  i = 0;
  for (roll of allrolls){
    if (Number(roll) < 0 || i === 0) {
      rollstring = `${rollstring}${roll}`
    } else {
      rollstring = `${rollstring}+${roll}`
    }
    rolltotal = rolltotal + Number(roll);
    i++;
  }

  // Dealing with mod  
  if (mod !== 0) {
    rolltotal = rolltotal + mod;
    if (mod > 0) {
      rollstring = `${rollstring}+${mod}`;
    } else {
      rollstring = `${rollstring}-${mod}`;
    }
  }
  
  check.rollstring = rollstring;
  check.rolltotal = rolltotal;
  check.basestring = baserolllist;
  console.log("check");
  console.log(check);
  return check;
}

export default function handler(req, res) {
  let q = req.query;
  let fincheck = {};
  switch (q.checkmode) {
    case "single":
      fincheck = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
      console.log(`rolltotal = ${rolltotal}`);
      break;
    case "multi":
      //let rollstodo = [Number(q.d20num), Number(q.d12num), Number(q.d10num), Number(q.d8num), Number(q.d6num), Number(q.d4num)];
      let rollstodo = q.rollstodo
      fincheck = multiRollCheck(q.name, q.rolltype, Number(q.mod), JSON.parse(rollstodo));
      break;
    case "advantage":
      // Roll the same check 2 times, return the roll with greater total
      let roll1 = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
      let roll2 = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
      console.log(roll1);
      console.log(roll2);
      if (Number(roll1.rolltotal) > Number(roll2.rolltotal)) {
        fincheck = {...roll1};
      } else {
        fincheck = {...roll2};
      }
      fincheck.rolltype = `${fincheck.rolltype} (Advantage)`;
      break;
    case "disadvantage":
      // Roll the same check 2 times, return the roll with lower total
      let roll3 = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
      let roll4 = rollCheck(q.name, q.rolltype, Number(q.die), Number(q.num), Number(q.mod));
      console.log(roll3);
      console.log(roll4);
      if (Number(roll3.rolltotal) > Number(roll4.rolltotal)) {
        fincheck = {...roll4};
      } else {
        fincheck = {...roll3};
      }
      fincheck.rolltype = `${fincheck.rolltype} (Disadvantage)`;
      break;
  }
  res.status(200).json(fincheck);
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/
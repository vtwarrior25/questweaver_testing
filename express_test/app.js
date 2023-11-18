var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var http = require('http');
var sockio = require('socket.io');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var diceRollRouter = require('./routes/rollCheck');
var getCharacterInfoRouter = require('./routes/getCharacterInfo');

const httpServer = http.createServer(app);
const io = new sockio.Server(httpServer, {

})


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



io.on("connection", (socket) => {
  
  socket.emit('rolldiceresult', {
    rolls: [ 6 ],
    rollstring: '6+3',
    rolltotal: 9,
    basestring: '1d20+3',
    name: 'Strength',
    rolltype: 'Ability'
  })

  socket.on('rolldice', (data) => {
    let rollresult = rollCheck(data.name, data.rolltype, data.die, data.num, data.mod);
    console.log(rollresult);
    socket.emit('rolldiceresult', rollresult);
  })
});

httpServer.listen(4000, () => 'Server is running on port 4000');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/rollcheck', diceRollRouter);
app.use ('/getcharacterinfo', getCharacterInfoRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

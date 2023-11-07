var express = require('express');
var router = express.Router();
var testobject = {
  item: {
    name: "Scale Mail",
    value: 50,
    description: "This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.",
    weight: 45,
    rarity: {
      rarityname: "",
      raritydescription: "",
    }
  },
  armorclass: 14,
  strengthreq: 0,
  stealthdisadvantage: true,
  word: 'booty',
}

function beans() {
  return "Bungus Beans";
}


router.get('/', function(req, res) {
  let queries = req.query;
  testobject.word = "booty"; 
  if (queries.name == "bungus") {
    testobject.word = beans();
  } 
    res.send(testobject);
});

module.exports = router;
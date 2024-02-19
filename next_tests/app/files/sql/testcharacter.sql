/*
This contains the INSERT statements that create a test character for our system.
These INSERT statements will serve as the basis for the INSERT statements
that the server will use to insert actual character data.
*/



INSERT INTO playercharacter (name, armorclass, maxhealth, currenthealth, speed, initiative, proficiencybonus, characterlevel, spellsavedc, spellattackmodifier, totalhitdice, numhitdice) VALUES
("Jerome", 14, 20, 20, 30, )


SELECT * 
FROM charactersavingthrow c 
  JOIN playercharacter p ON c.playercharacterid = p.playercharacterid 
  JOIN savingthrow s ON c.savingthrowid = s.savingthrowid 
  JOIN ability a ON s.abilityid = a.abilityid
WHERE c.playercharacter = //provide characterid or token thing

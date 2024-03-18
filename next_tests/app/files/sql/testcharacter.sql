/*
This contains the INSERT statements that create a test character for our system.
These INSERT statements will serve as the basis for the INSERT statements
that the server will use to insert actual character data.
*/


-- Inserting the basic character info
WITH pcid AS (
  INSERT INTO playercharacter (playercharacterid, playerid, name, race, subrace, class, subclass, armorclass, maxhealth, currenthealth, speed, initiative, proficiencybonus, characterlevel, spellsavedc, spellattackmodifier, spellabilitymodifier, totalhitdice, numhitdice) VALUES
(DEFAULT, (SELECT playerid FROM player WHERE username = 'khaotic'), 'Richard3', (SELECT raceid FROM race WHERE name = 'Human'), NULL, (SELECT classid FROM class WHERE name = 'Barbarian'), NULL, 14, 20, 20, 30, 12, 2, 1, NULL, NULL, NULL, 2, 2) RETURNING playercharacterid
)
INSERT INTO playercharacternote (playercharacterid, alignmentid, organizations, allies, enemies, backstory, other) VALUES
((SELECT * FROM pcid), (SELECT alignmentid FROM alignment WHERE name = 'Neutral'), 'This is Organizations', 'This is Allies', 'This is Enemies', 'This is Backstory', 'This is Other');


-- Inserting the ability, skill, saving throw, passive ability, defense, proficiency, and features
WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Richard3'
)
INSERT INTO characterability (playercharacterid, abilityid, score, modifier) VALUES
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Strength'), 17, +1),
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Dexterity'), 12, +1),
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Constitution'), 14, +1),
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Intelligence'), 8, +1),
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Wisdom'), 10, +1),
((SELECT * FROM pcid), (SELECT abilityid FROM ability WHERE name = 'Charisma'), 13, +1);


WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Richard3'
)
INSERT INTO characterskill (playercharacterid, skillid, proficient, bonus) VALUES
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Acrobatics'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Animal Handling'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Arcana'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Athletics'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Deception'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'History'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Insight'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Intimidation'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Investigation'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Medicine'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Nature'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Perception'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Performance'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Persuasion'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Religion'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Sleight of Hand'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Stealth'), false, 2),
((SELECT * FROM pcid), (SELECT skillid FROM skill WHERE name = 'Survival'), false, 2);


WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Richard3'
)
INSERT INTO charactersavingthrow (playercharacterid, savingthrowid, proficient, bonus) VALUES 
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Strength'), false, 2),
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Dexterity'), false, 2),
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Constitution'), false, 2),
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Intelligence'), false, 2),
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Wisdom'), false, 2),
((SELECT * FROM pcid), (SELECT savingthrowid FROM savingthrow WHERE name = 'Charisma'), false, 2);


WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Richard3'
)
INSERT INTO characterpassiveability (playercharacterid, passiveperception, passiveinvestigation, passiveinsight) VALUES
((SELECT * FROM pcid), 10, 10, 10);


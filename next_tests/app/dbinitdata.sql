/*
Tables to insert data into initially:
- Ability (do first)
- Alignment
- Skill (FK to Ability)
- Class
- Subclass
- Saving Throw
- Dice
- Game Log Tag
- Language
- Creature Size
- Defense
- Proficiency Type
- Proficiency
- Feature Tables (this will suck, don't do it yet)
- Monster Type
- Race
- Subrace
- Spell
- Spell List
- Rarity
- Possible Weapon Property



Tables that need some initial data:
- Item
- Armor
- Weapon

*/

INSERT INTO ability (name, abbrev, description) VALUES
('Strength', 'Str', ''),
('Dexterity', 'Dex', ''),
('Constitution', 'Con', ''),
('Intelligence', 'Int', ''),
('Wisdom', 'Wis', ''),
('Charisma', 'Cha', '');


INSERT INTO skill (name, abilityid, description) VALUES 
('Acrobatics', SELECT abilityid from ability where abbrev = 'Dex', ''),
('Animal Handling', SELECT abilityid from ability where abbrev = 'Wis', ''),
('Arcana', SELECT abilityid from ability where abbrev = 'Int', ''),
('Athletics', SELECT abilityid from ability where abbrev = 'Str', ''),
('Deception', SELECT abilityid from ability where abbrev = 'Cha', ''),
('History', SELECT abilityid from ability where abbrev = 'Int', ''),
('Insight', SELECT abilityid from ability where abbrev = 'Wis', ''),
('Intimidation', SELECT abilityid from ability where abbrev = 'Cha', ''),
('Investigation', SELECT abilityid from ability where abbrev = 'Int', ''),
('Medicine', SELECT abilityid from ability where abbrev = 'Wis', ''),
('Nature', SELECT abilityid from ability where abbrev = 'Int', ''),
('Perception', SELECT abilityid from ability where abbrev = 'Wis', ''),
('Performance', SELECT abilityid from ability where abbrev = 'Cha', ''),
('Persuasion', SELECT abilityid from ability where abbrev = 'Cha', ''),
('Religion', SELECT abilityid from ability where abbrev = 'Int', ''),
('Sleight of Hand', SELECT abilityid from ability where abbrev = 'Dex', ''),
('Stealth', SELECT abilityid from ability where abbrev = 'Dex', ''),
('Survival', SELECT abilityid from ability where abbrev = 'Wis', '');


INSERT INTO alignment (name, description, abbrev) VALUES 
('Lawful Good', 'Lawful good (LG) creatures can be counted on to do the right thing as expected by society. Gold dragons, paladins, and most dwarves are lawful good.', 'LG'),
('Neutral Good', 'Neutral good (NG) folk do the best they can to help others according to their needs. Many celestials, some cloud giants, and most gnomes are neutral good.', 'NG'),
('Chaotic Good', 'Chaotic good (CG) creatures act as their conscience directs, with little regard for what others expect. Copper dragons, many elves, and unicorns are chaotic good.', 'CG'),
('Lawful Neutral', 'Lawful neutral (LN) individuals act in accordance with law, tradition, or personal codes. Many monks and some wizards are lawful neutral.', 'LN'),
('Neutral', 'Neutral (N) is the alignment of those who prefer to steer clear of moral questions and don''t take sides, doing what seems best at the time. Lizardfolk, most druids, and many humans are neutral.', 'N'),
('Chaotic Neutral', 'Chaotic neutral (CN) creatures follow their whims, holding their personal freedom above all else. Many barbarians and rogues, and some bards, are chaotic neutral.', 'CN'),
('Lawful Evil ', 'Lawful evil (LE) creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order. Devils, blue dragons, and hobgoblins are lawful evil.', 'LE'),
('Neutral Evil', 'Neutral evil (NE) is the alignment of those who do whatever they can get away with, without compassion or qualms. Many drow, some cloud giants, and goblins are neutral evil.', 'NE'),
('Chaotic Evil', 'Chaotic evil (CE) creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust. Demons, red dragons, and orcs are chaotic evil.', 'CG');


INSERT INTO savingthrow (name, abilityid) VALUES
('Strength', SELECT abilityid from ability where abbrev = 'Str'),
('Dexterity', SELECT abilityid from ability where abbrev = 'Dex'),
('Constitution', SELECT abilityid from ability where abbrev = 'Con'),
('Intelligence', SELECT abilityid from ability where abbrev = 'Int'),
('Dexterity', SELECT abilityid from ability where abbrev = 'Dex'),
('Charisma', SELECT abilityid from ability where abbrev = 'Cha');


INSERT INTO creaturesize (name, description) VALUES
('Tiny', ""),
('Small', ""),
('Medium', ""),
('Large', ""),
('Huge', ""),
('Gargantuan', "");


INSERT INTO dice (name, sides) VALUES
('d20', 20),
('d12', 12),
('d10', 10),
('d8', 8),
('d6', 6),
('d4', 4);


INSERT INTO 





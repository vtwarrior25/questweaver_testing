/*
Tables to insert data into initially:
- *Ability (do first)
- *Alignment
- *Skill (FK to Ability)
- *Class
- *Subclass
- *Saving Throw
- *Dice
- ??Game Log Tag
- *Creature Size
- *Defense
- Proficiency Type
- Proficiency
- Feature Tables (this will suck, don't do it yet)
- *Monster Type
- *Race
- *Subrace
- Spell
- Spell List
- *Rarity
- *Possible Weapon Property



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
('Acrobatics', (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), ''),
('Animal Handling', (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), ''),
('Arcana', (SELECT abilityid FROM ability WHERE abbrev = 'Int'), ''),
('Athletics', (SELECT abilityid FROM ability WHERE abbrev = 'Str'), ''),
('Deception', (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), ''),
('History', (SELECT abilityid FROM ability WHERE abbrev = 'Int'), ''),
('Insight', (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), ''),
('Intimidation', (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), ''),
('Investigation', (SELECT abilityid FROM ability WHERE abbrev = 'Int'), ''),
('Medicine', (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), ''),
('Nature', (SELECT abilityid FROM ability WHERE abbrev = 'Int'), ''),
('Perception', (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), ''),
('Performance', (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), ''),
('Persuasion', (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), ''),
('Religion', (SELECT abilityid FROM ability WHERE abbrev = 'Int'), ''),
('Sleight of Hand', (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), ''),
('Stealth', (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), ''),
('Survival', (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), '');


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
('Strength', (SELECT abilityid FROM ability WHERE abbrev = 'Str')),
('Dexterity', (SELECT abilityid FROM ability WHERE abbrev = 'Dex')),
('Constitution', (SELECT abilityid FROM ability WHERE abbrev = 'Con')),
('Intelligence', (SELECT abilityid FROM ability WHERE abbrev = 'Int')),
('Wisdom', (SELECT abilityid FROM ability WHERE abbrev = 'Wis')),
('Charisma', (SELECT abilityid FROM ability WHERE abbrev = 'Cha'));


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


INSERT INTO class (name, hitdice, hitpoints1stlevel, hitpointshigherlevel, description, spellcastingabilityid) VALUES
('Barbarian',SELECT diceid FROM dice WHERE sides = 12,'12',SELECT diceid FROM dice WHERE sides = 12,'', NULL),
('Bard', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', SELECT abilityid FROM ability WHERE abbrev = 'Cha'),
('Cleric', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', SELECT abilityid FROM ability WHERE abbrev = 'Wis'),
('Druid', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', SELECT abilityid FROM ability WHERE abbrev = 'Wis'),
('Fighter', SELECT diceid FROM dice WHERE sides = 10, '10', SELECT diceid FROM dice WHERE sides = 10, '', NULL),
('Monk  ', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', NULL),
('Paladin', SELECT diceid FROM dice WHERE sides = 10, '10', SELECT diceid FROM dice WHERE sides = 10, '', SELECT abilityid FROM ability WHERE abbrev = 'Cha'),
('Ranger', SELECT diceid FROM dice WHERE sides = 10, '10', SELECT diceid FROM dice WHERE sides = 10, '', SELECT abilityid FROM ability WHERE abbrev = 'Wis'),
('Rogue', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', NULL),
('Sorcerer', SELECT diceid FROM dice WHERE sides = 6, '6', SELECT diceid FROM dice WHERE sides = 6, '', SELECT abilityid FROM ability WHERE abbrev = 'Cha'),
('Warlock', SELECT diceid FROM dice WHERE sides = 8, '8', SELECT diceid FROM dice WHERE sides = 8, '', SELECT abilityid FROM ability WHERE abbrev = 'Cha'),
('Wizard', SELECT diceid FROM dice WHERE sides = 6, '6', SELECT diceid FROM dice WHERE sides = 6, '', SELECT abilityid FROM ability WHERE abbrev = 'Int');
INSERT INTO class (name, hitdice, hitpoints1stlevel, hitpointshigherlevel, description, spellcastingabilityid)
('Barbarian', (SELECT diceid FROM dice WHERE sides = 12), '12', (SELECT diceid FROM dice WHERE sides = 12),'', NULL),
('Bard', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', (SELECT abilityid FROM ability WHERE abbrev = 'Cha')),
('Cleric', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', (SELECT abilityid FROM ability WHERE abbrev = 'Wis')),
('Druid', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', (SELECT abilityid FROM ability WHERE abbrev = 'Wis')),
('Fighter', (SELECT diceid FROM dice WHERE sides = 10), '10', (SELECT diceid FROM dice WHERE sides = 10), '', NULL),
('Monk  ', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', NULL),
('Paladin', (SELECT diceid FROM dice WHERE sides = 10), '10', (SELECT diceid FROM dice WHERE sides = 10), '', (SELECT abilityid FROM ability WHERE abbrev = 'Cha')),
('Ranger', (SELECT diceid FROM dice WHERE sides = 10), '10', (SELECT diceid FROM dice WHERE sides = 10), '', (SELECT abilityid FROM ability WHERE abbrev = 'Wis')),
('Rogue', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', NULL),
('Sorcerer', (SELECT diceid FROM dice WHERE sides = 6), '6', (SELECT diceid FROM dice WHERE sides = 6), '', (SELECT abilityid FROM ability WHERE abbrev = 'Cha')),
('Warlock', (SELECT diceid FROM dice WHERE sides = 8), '8', (SELECT diceid FROM dice WHERE sides = 8), '', (SELECT abilityid FROM ability WHERE abbrev = 'Cha')),
('Wizard', (SELECT diceid FROM dice WHERE sides = 6), '6', (SELECT diceid FROM dice WHERE sides = 6), '', (SELECT abilityid FROM ability WHERE abbrev = 'Int'));


INSERT INTO subclass (name, description) VALUES
('Path of the Berserker',''),
('College of Valor', '' ),
('Life Domain', '' ),
('Circle of the Moon', '' ),
('Champion', '' ),
('Way of the Open Hand', '' ),
('Oath of Devotion', '' ),
('Hunter', '' ),
('Thief', '' ),
('Divine Soul', '' ),
('The Undying', '' ),
('School of Illusions', ''),


INSERT INTO monstertype (name) VALUES 
('Aberration'),
('Animal'),
('Beast'),
('Construct'),
('Dragon'),
('Elemental'),
('Fey'),
('Fiend'),
('Giant'),
('Humanoid'),
('Monstrosity'),
('Ooze'),
('Plant'),
('Undead');


INSERT INTO rarity (name) VALUES 
('Common'),
('Uncommon'),
('Rare'),
('Very Rare'),
('Legendary'),
('Artifact');


INSERT INTO gamelogtag (name) VALUES
('Diceroll'),
('Health'),
('Turn Order'),
(''),
('');

INSERT INTO conditions (name, description) VALUES
('Blinded', ''),
('Charmed', ''),
('Deafened', ''),
('Frightened', ''),
('Grappled', ''),
('Incapacitated', ''),
('Invisible', ''),
('Paralyzed', ''),
('Petrified', ''),
('Poisoned', ''),
('Prone', ''),
('Restrained', ''),
('Stunned', ''),
('Unconscious', ''),
('Exhaustion', '');

INSERT INTO defense (name, description) VALUES
('Fire', ''),
('Acid', ''),
('Bludgeoning', ''),
('Damage from Spells', ''),
('Thunder', ''),
('Psychic', ''),
('Radiant', ''),
('Poison', ''),
('Piercing', ''),
('Necrotic', ''),
('Lightning', ''),
('Trap Dammage', ''),
('Cold', ''),
('Force', ''),
('Range Attacks', ''),
('Slashing', '');

INSERT INTO race (name) VALUES
('Dwarf'),
('Elf'),
('Halfling'),
('Alseid'),
('Catfolk'),
('Darakhul'),
('Derro'),
('Drow'),
('Erina'),
('Gearforged'),
('Minotaur'),
('Mushroomfolk'),
('Satarre'),
('Shade'),
('Human'),
('Dragonborn'),
('Half-Elf'),
('Half-Orc'),
('Tiefling');


INSERT INTO subrace (name) VALUES
('Hill Dwarf'),
('High Elf'),
('Stoor Halfling'),
('Lightfoot'),
('Malkin'),
('Pantheran'),
('Derro Heritage'),
('Dragonborn Heritage'),
('Drow Heritage'),
('Dwarf Heritage'),
('Elf/Shadow fey Heritage'),
('Gnome Heritage'),
('Halfing Heritage'),
('Human/Half-Elf Heritage'),
('Kobold Heritage'),
('Ravenfolk'),
('Tiefling Heritage'),
('Trollkin Heritage'),
('Far-Touched'),
('Mutated'),
('Uncorrupted'),
('Delver'),
('Fever-Bit'),
('Purified'),
('Dwarf Chassis'),
('Gnome Chassis'),
('Human Chassis'),
('Kobold Chassis'),
('Acid Cap'),
('Favored'),
('Morel'),
('Rock Gnome');

INSERT INTO possibleweaponproperty (possibleweaponproperty, description) VALUES
('Ammunition',''),
('Finesse',''),
('Heavy',''),
('Light',''),
('Range',''),
('Reach',''),
('Special',''),
('Two-Handed',''),
('Versatile','');





CREATE TYPE defense_type AS ENUM ('Resistance', 'Vulnerability', 'Immunity');

--
-- TODO:
-- How will we store race/subrace and class/subclass info about a character?
--	- In the playercharacter table?
--	- In seperate tables for each (race, subrace, class, subclass)?
--	- In a single seperate table with columns for playercharacter id and for each item
--




/*
------------------------------------------------------------------------
Other Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS effecttype (
	effecttypeid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 						varchar(30) UNIQUE,
	description			varchar(100)
);


CREATE TABLE IF NOT EXISTS dice (
	diceid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 			varchar(10) UNIQUE,
	sides  		integer
);

/*
CREATE TABLE IF NOT EXISTS gamelogtag (
	gamelogtagid 				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name								varchar(50) UNIQUE
);
*/

CREATE TYPE gamelogtag AS ENUM ('Diceroll', 'Health', 'Turn Order');


/*
CREATE TABLE IF NOT EXISTS language (
	languageid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name					varchar(50),
	description			varchar(100)
);
*/


CREATE TABLE IF NOT EXISTS alignment (
	alignmentid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name		varchar(50) UNIQUE,
	description			varchar(200),	
	abbrev 					char(2)
);

/*
CREATE TABLE IF NOT EXISTS creaturesize (
	creaturesizeid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name									varchar(20) UNIQUE,
	description						varchar(2000)
);
*/

CREATE TYPE creaturesize AS ENUM ('Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan');


/*
------------------------------------------------------------------------
Supporting Tables
------------------------------------------------------------------------
*/


/* *CREATE TABLE IF NOT EXISTS ability (
	abilityid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name									varchar(14) UNIQUE,
	abbrev								char(3),
	description						varchar(2000)
);*/

CREATE TYPE ability AS ENUM ('Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'); 


/*
 Str, Dex, Con, Int, Wis, Cha (the base abilities)
*/


CREATE TABLE IF NOT EXISTS skill (
	skillid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name						varchar(24) UNIQUE,
	abilityid				integer REFERENCES ability(abilityid) NOT NULL,
	description			varchar(2000)
);
/*
 ~18 rows, one for each skill (Acrobatics, Animal Handling, etc) 
*/

CREATE TABLE IF NOT EXISTS savingthrow (
	savingthrowid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name							varchar(20) UNIQUE,
	abilityid					integer REFERENCES ability(abilityid) NOT NULL
);

/*
Str, Dex, Con, Int, Wis, Cha (the saving throw versions)
*/


CREATE TABLE IF NOT EXISTS defense (
	defenseid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name						varchar(24) UNIQUE,
	description			varchar(200)
);

CREATE TYPE defensetype AS ENUM ('Resistance', 'Vulnerability', 'Immunity');


CREATE TABLE IF NOT EXISTS condition (
	conditionid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name						varchar(24) UNIQUE,
	description			varchar(200)
);


/*
CREATE TABLE IF NOT EXISTS proficiencytype (
	proficiencytypeid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name											varchar(20) UNIQUE,
	description								varchar(2000)
);
*/
/*
Armor, Weapons, Tools, Languages 
*/

CREATE TYPE proficiencytype AS ENUM('Armor', 'Weapons', 'Tools', 'Languages', 'Skills');


CREATE TABLE IF NOT EXISTS proficiency (
	proficiencyid 							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name												varchar(30) UNIQUE,
	description									varchar(200),
	proficiencytype							proficiencytype
);



/*
------------------------------------------------------------------------
Character Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS player (
	playerid		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	username		varchar(30) NOT NULL UNIQUE,
	password		varchar(30) NOT NULL
);


CREATE TABLE IF NOT EXISTS race (
	raceid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name								varchar(20) UNIQUE,
	creaturesize				creaturesize NOT NULL
);


CREATE TABLE IF NOT EXISTS subrace (
	subraceid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	raceid				integer REFERENCES race(raceid) NOT NULL,
	name		 			varchar(30) UNIQUE
);


CREATE TABLE IF NOT EXISTS class (
	classid									integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name										varchar(20) UNIQUE,
	hitdice									integer REFERENCES dice(diceid),
	hitpoints1stlevel				integer,
	hitpointshigherlevel		integer,
	description							varchar(2000),
	spellcastingabilityid		integer REFERENCES ability(abilityid)
);


CREATE TABLE IF NOT EXISTS subclass (
	subclassid								integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	classid 									integer REFERENCES class(classid) NOT NULL,
	name											varchar(40) UNIQUE,
	description								varchar(2000),
	spellcastingabilityid			integer REFERENCES ability(abilityid)
);


CREATE TABLE IF NOT EXISTS playercharacter (
	playercharacterid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playerid								integer REFERENCES player(playerid) NOT NULL,
	name 										varchar(40),
	race										integer REFERENCES race(raceid) NOT NULL,
	subrace									integer REFERENCES subrace(subraceid),
	class										integer REFERENCES class(classid) NOT NULL,
	subclass								integer REFERENCES subclass(subclassid),
	armorclass							integer,
	maxhealth								integer,
	currenthealth 					integer,
	speed										integer,
	initiative							integer,
	proficiencybonus				integer,
	characterlevel					integer,
	spellsavedc							integer,
	spellattackmodifier			integer,
	spellabilitymodifier		integer,
	totalhitdice						integer,
	numhitdice							integer
);



CREATE TABLE IF NOT EXISTS playercharacternote (
	characternoteid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid				integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	alignmentid							integer REFERENCES alignment(alignmentid) NOT NULL,
	organizations						varchar(2000),
	allies									varchar(2000),
	enemies									varchar(2000),
	backstory								varchar(2000),
	other										varchar(2000)
);


	/*
	gender									varchar(10),
	eyes										varchar(10),
	creaturesizeid									integer REFERENCES creaturesize(creaturesizeid) NOT NULL,
	height									integer,
	faith										varchar(20),
	hair										varchar(10),
	skin										varchar(10),
	age											integer,
	weight									integer,
	personalitytraits			varchar(200),
	ideals									varchar(200),
	bonds										varchar(200),
	flaws										varchar(200),
	appearance							varchar(400),
	*/


CREATE TABLE IF NOT EXISTS gamelog (
	gamelogid 					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	gamelogtag	 				gamelogtag,
	content 						varchar(200),
	playercharacterid		integer REFERENCES playercharacter(playercharacterid)
);

/*
------------------------------------------------------------------------
Feature Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS feature (
	featureid						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name								varchar(20) UNIQUE,
	description					varchar(2000)
);

CREATE TABLE IF NOT EXISTS proficiencyfeature (
	proficiencyid						integer REFERENCES proficiency(proficiencyid) NOT NULL
) INHERITS (feature);

CREATE TABLE IF NOT EXISTS actionfeature (
	uses									integer,
	usesperlevel					integer,
	recovery							integer
) INHERITS (feature); 

CREATE TABLE IF NOT EXISTS speedfeature (
	speed								integer
) INHERITS (feature);

CREATE TABLE IF NOT EXISTS abilityscorefeature (
	abilityid							integer REFERENCES ability(abilityid) NOT NULL,
	scorebonus						integer
) INHERITS (feature);

CREATE TABLE IF NOT EXISTS abilityactionfeature (
	abilityid									integer REFERENCES ability(abilityid) NOT NULL,
	uses											integer
) INHERITS (feature);

CREATE TABLE IF NOT EXISTS classactionfeature (
	level											integer,
	uses											integer,
	recovery									integer
) INHERITS (feature);

/*
CREATE TABLE IF NOT EXISTS manualfeature (
	manualfeatureid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	featureid						integer REFERENCES feature(featureid) NOT NULL
) INHERITS (feature);
*/

CREATE TABLE IF NOT EXISTS defensefeature (
	defenseid							integer REFERENCES defense(defenseid) NOT NULL
) INHERITS (feature);

CREATE TABLE IF NOT EXISTS conditionfeature (
	conditionid						integer REFERENCES condition(conditionid) NOT NULL
) INHERITS (feature);


/*
------------------------------------------------------------------------
Character Supporting Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS characterability (
	characterabilityid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid					integer REFERENCES playercharacter(playercharacterid) NOT NULL,
  abilityid        					integer REFERENCES ability(abilityid) NOT NULL,
	score											integer,
	modifier									integer
);
/*
Str for Jerome, score of 16, mod 3
*/

CREATE TABLE IF NOT EXISTS characterskill (
	characterskillid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid				integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	skillid									integer REFERENCES skill(skillid) NOT NULL,
	proficient							boolean,
	bonus										integer
);
/*
Animal Handling for Jerome
*/

CREATE TABLE IF NOT EXISTS charactersavingthrow (
	charactersavingthrowid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid							integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	savingthrowid									integer REFERENCES savingthrow(savingthrowid) NOT NULL,
	proficient										boolean,
	bonus													integer
);

CREATE TABLE IF NOT EXISTS characterpassiveability (
	characterpassiveabilityid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid								integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	passiveperception								integer,
	passiveinvestigation						integer,
	passiveinsight									integer
);

/*
TODO consider moving the contents of this table to the main playercharacter table
*/

CREATE TABLE IF NOT EXISTS characterdefense (
	characterdefense				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid				integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	defenseid								integer REFERENCES defense(defenseid) NOT NULL
);

/*
CREATE TABLE IF NOT EXISTS characterlanguage (
	characterlanguageid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid						integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	languageid 									integer REFERENCES language(languageid) NOT NULL
);
*/

CREATE TABLE IF NOT EXISTS characterproficiency (
	characterproficiencyid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid							integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	proficiency										integer REFERENCES proficiency(proficiencyid) NOT NULL
);


CREATE TABLE IF NOT EXISTS characterfeature (
	characterfeatureid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid					integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	featureid									integer REFERENCES feature(featureid) NOT NULL
);


/*
------------------------------------------------------------------------
Class Tables
------------------------------------------------------------------------
*/



/*
How would we deal with non-spellcasting classes? We need to fix this somehow
*/


CREATE TABLE IF NOT EXISTS classfeature (
	classfeatureid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	classid							integer REFERENCES class(classid) NOT NULL,
	featureid						integer REFERENCES feature(featureid) NOT NULL,
	characterlevel			integer						
);


CREATE TABLE IF NOT EXISTS subclassfeature (
	subclassfeatureid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	subclassid						integer REFERENCES subclass(subclassid) NOT NULL,
	featureid							integer REFERENCES feature(featureid) NOT NULL,
	characterlevel				integer						
);


CREATE TABLE IF NOT EXISTS classproficiency (
	classproficiencyid		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	classid								integer REFERENCES class(classid) NOT NULL,
	proficiencyid					integer REFERENCES proficiency(proficiencyid) NOT NULL
);


/*
------------------------------------------------------------------------
Monster Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS encounter (
	encounterid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name						varchar(20) UNIQUE
);


CREATE TABLE IF NOT EXISTS monstertype (
	monstertypeid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name								varchar(20) UNIQUE
);


CREATE TABLE IF NOT EXISTS monstergroup (
	monstergroupid								integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	encounterid										integer REFERENCES encounter(encounterid) NOT NULL,
	creaturesize								 	creaturesize NOT NULL,
	monstertypeid									integer REFERENCES monstertype(monstertypeid) NOT NULL,
	alignment											integer REFERENCES alignment(alignmentid) NOT NULL,
	groupname											varchar(20),
	description										varchar(2000),
	hitdie												integer,
	hitdienum											integer,
	challengerating								integer,
	xp														integer,
	armorclass										integer,
	speed													integer,
	initiative										integer,
	skills												varchar(500),
	features											varchar(500),
	notes													varchar(2000)
);

CREATE TABLE IF NOT EXISTS monsterinstance (
	monsterinstanceid		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monstergroupid			integer REFERENCES monstergroup(monstergroupid) NOT NULL,
	maxhealth						integer,
	currenthealth				integer
);


CREATE TABLE IF NOT EXISTS monsterability (
	monsterabilityid		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monstergroupid			integer REFERENCES monstergroup(monstergroupid) NOT NULL,
	abilityid						integer REFERENCES ability(abilityid) NOT NULL,
	score								integer,
	modifier						integer
);

/*
TODO should we store modifiers for things that have scores, or should we calculate the modifiers on the fly from the scores? 
*/

/*
CREATE TABLE IF NOT EXISTS monsterfeature (
	monsterfeatureid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	featureid							integer REFERENCES feature(featureid) NOT NULL,
	monsterid							integer REFERENCES monstergroup(monstergroupid) NOT NULL
);
*/


/*
------------------------------------------------------------------------
Race Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS racefeature (
	racefeatureid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	raceid							integer REFERENCES race(raceid) NOT NULL,
	featureid						integer REFERENCES feature(featureid) NOT NULL				
);


CREATE TABLE IF NOT EXISTS subracefeature (
	subracefeatureid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	subraceid							integer REFERENCES subrace(subraceid) NOT NULL,
	featureid							integer REFERENCES feature(featureid) NOT NULL						
);


/*
------------------------------------------------------------------------
Spell Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS spell (
	spellid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name								varchar(40) UNIQUE,
	description					varchar(500),
	school							VARCHAR(40),
	casttime 						varchar(40),
	spellrange					VARCHAR(40),
	ritual							boolean,
	duration						varchar(40),
	components					varchar(100),
	saveability					integer REFERENCES ability(abilityid)
);


/* TODO maybe make this table inherit from spell?? */
CREATE TABLE IF NOT EXISTS dicerollspell (
	dicerollspellid 			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spellid 							integer REFERENCES spell(spellid) NOT NULL,
	effectdicenum					integer,
	effectdicetype				integer REFERENCES dice(diceid) NOT NULL,
	effecttype						integer REFERENCES effecttype(effecttypeid) NOT NULL
);

CREATE TABLE IF NOT EXISTS spellfeature (
	spellid							integer REFERENCES spell(spellid) NOT NULL
) INHERITS (feature);


/*
TODO Do we need this table? We could just do a check if a spell is a dice roll spell, and render as manual if not, instead of using this additional table 
*/
/*
CREATE TABLE IF NOT EXISTS manualspell (
	manualspellid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spellid 					integer REFERENCES spell(spellid) NOT NULL
);
*/



CREATE TABLE IF NOT EXISTS spelllist (
	spelllistid 			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spellid 					integer REFERENCES spell(spellid) NOT NULL,
	classid						integer REFERENCES class(classid) NOT NULL,
	subclassid				integer REFERENCES subclass(subclassid),
	spelllevel				integer
);





/*
------------------------------------------------------------------------
Item Tables
------------------------------------------------------------------------
*/

/*
CREATE TABLE IF NOT EXISTS rarity (
	rarityid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name  					varchar(50) UNIQUE					
);
*/
/*
Common, Uncommon, Rare, Very Rare 
*/

CREATE TYPE rarity AS ENUM ('Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact');

CREATE TABLE IF NOT EXISTS item (
	itemid 						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 							varchar(50) UNIQUE,
	value							integer,
	description				varchar(500),
	weight						integer,
	rarity						rarity
);


CREATE TABLE IF NOT EXISTS armor (
	armorid								integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	itemid 								integer REFERENCES item(itemid) NOT NULL,
	armorclass						integer,
	dexmodifier						boolean,
	dexmodifiermax				integer,
	strengthrequirement		integer,
	stealthdisadvantage		boolean 
);

CREATE TYPE weapontype AS ENUM ('Martial', 'Simple');

CREATE TYPE weaponrange AS ENUM ('Melee', 'Ranged');

CREATE TABLE IF NOT EXISTS weapon (
	weaponid 					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	itemid						integer REFERENCES item(itemid) UNIQUE NOT NULL,
	weapontype				weapontype NOT NULL,
	weaponrange				weaponrange NOT NULL
	--damagebonus				integer			
);

/*
CREATE TABLE IF NOT EXISTS possibleweaponproperty (
	possibleweaponpropertyid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name  													varchar(50) UNIQUE,
	description											varchar(100)												
);
*/
/*
Finesse, Thrown, Light 
*/

CREATE TYPE possibleweaponproperty AS ENUM ('Ammunition', 'Finesse', 'Heavy', 'Light', 'Loading', 'Range', 'Reach', 'Special', 'Thrown', 'Two-Handed', 'Versatile');


CREATE TABLE IF NOT EXISTS weaponproperty (
	weaponpropertyid 						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	weaponid										integer REFERENCES weapon(weaponid) NOT NULL,
	possibleweaponproperty			possibleweaponproperty NOT NULL
);

CREATE TYPE characterinventorysection AS ENUM ('Equipment, Backpack');

CREATE TABLE IF NOT EXISTS characterinventory (
	characterinventoryid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid						integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	characterinventorysection		characterinventorysection,
	itemid											integer REFERENCES item(itemid) NOT NULL,
	quantity										integer
);

/*
------------------------------------------------------------------------
Attack Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS attack (
	attackid						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 								varchar(40) UNIQUE NOT NULL,
	range								integer, -- Maybe make this a varchar??
	attackmodifierid		integer REFERENCES ability(abilityid) NOT NULL,
	damagemodifierid		integer REFERENCES ability(abilityid) NOT NULL,
	diceid							integer REFERENCES dice(diceid) NOT NULL,
	numdamagedie				integer,
	effecttypeid				integer REFERENCES effecttype(effecttypeid) NOT NULL,
	description 				varchar(300)
);
/*
For this, we will need to join the ability FKs with entries in characterability associated with the character id
*/


CREATE TABLE IF NOT EXISTS monsterattack (
	monsterattackid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monstergroupid				integer REFERENCES monstergroup(monstergroupid) NOT NULL,
	attackid							integer REFERENCES attack(attackid) NOT NULL
);


CREATE TABLE IF NOT EXISTS characterattack (
	characterattackid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid					integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	attackid									integer REFERENCES attack(attackid) NOT NULL
);


CREATE TABLE IF NOT EXISTS weaponattack (
	weaponattackid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	weaponid							integer REFERENCES weapon(weaponid) NOT NULL,
	attackid							integer REFERENCES attack(attackid) NOT NULL
);


CREATE TABLE IF NOT EXISTS attackfeature (
	attackid							integer REFERENCES attack(attackid) NOT NULL
) INHERITS (feature);



/*
------------------------------------------------------------------------
Turn Order
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS turnorder (
	turnorderid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playercharacterid		integer REFERENCES playercharacter(playercharacterid) UNIQUE,
	initiative					integer
);












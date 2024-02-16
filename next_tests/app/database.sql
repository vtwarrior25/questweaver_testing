
/*
------------------------------------------------------------------------
User Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS player (
	userid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	username			varchar(30) NOT NULL
);



/*
------------------------------------------------------------------------
Other Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS effecttype (
	effecttypeid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	effectname 			varchar(30),
	description				varchar(100)
);


CREATE TABLE IF NOT EXISTS dice (
	diceid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	dicename 	varchar(10),
	dicesides  integer
);


CREATE TABLE IF NOT EXISTS gamelogtag (
	gamelogtagid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	tagname						varchar(50),
	tagdescription			varchar(100)	
);


CREATE TABLE IF NOT EXISTS gamelog (
	gamelogid 			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	gamelogtagid	 	integer REFERENCES gamelogtag(gamelogtagid) NOT NULL,
	content 					varchar(200)
);


CREATE TABLE IF NOT EXISTS language (
	languageid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	languagename		varchar(50),
	/*description			varchar(100)*/	
);


CREATE TABLE IF NOT EXISTS alignment (
	alignmentid 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	alignmentname	varchar(50),
	description			varchar(200),	
	abbrev 					char(2)
);

CREATE TABLE IF NOT EXISTS creaturesize (
	sizeid					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	sizename				varchar(20),
	description			varchar(2000)
);



/*
------------------------------------------------------------------------
Character Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS playercharacter (
	playercharacterid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	playername 							varchar(40),
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
	character_noteid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	characterid							integer REFERENCES playercharacter(playercharacterid) NOT NULL,
	alignmentid							integer REFERENCES alignment(alignmentid) NOT NULL,
	/*
	gender									varchar(10),
	eyes										varchar(10),
	size_id									integer REFERENCES creature_size(creature_size_id) NOT NULL,
	height									integer,
	faith										varchar(20),
	hair										varchar(10),
	skin										varchar(10),
	age											integer,
	weight									integer,
	personality_traits			varchar(200),
	ideals									varchar(200),
	bonds										varchar(200),
	flaws										varchar(200),
	appearance							varchar(400),
	*/
	organizations						varchar(2000),
	allies									varchar(2000),
	enemies									varchar(2000),
	backstory								varchar(2000),
	other										varchar(2000)
);



/*
------------------------------------------------------------------------
Supporting Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS ability (
	abilityid						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	abilityname					varchar(14),
	abilityabbrev				char(3),
	abilitydescription		varchar(2000)
);

/*
 Str, Dex, Con, Int, Wis, Cha (the base abilities)
*/


CREATE TABLE IF NOT EXISTS skill (
	skillid				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	skillname			varchar(24),
	abilityid			integer REFERENCES ability(abilityid) NOT NULL,
	skilldescription			varchar(2000)
);
/*
 ~18 rows, one for each skill (Acrobatics, Animal Handling, etc) 
*/

CREATE TABLE IF NOT EXISTS saving_throw (
	savingthrowid			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	savingthrowname		varchar(20),
	abilityid					integer REFERENCES ability(abilityid) NOT NULL
);

/*
Str, Dex, Con, Int, Wis, Cha (the saving throw versions)
*/


CREATE TABLE IF NOT EXISTS defense (
	defenseid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	defensename						varchar(24),
	defensedescription		varchar(200)
);


CREATE TABLE IF NOT EXISTS proficiency_type (
	proficiencytypeid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	proficiencytypename						varchar(20),
	proficiencytypedescription		varchar(2000)
);
/*
Armor, Weapons, Tools, Languages 
*/


CREATE TABLE IF NOT EXISTS proficiency (
	proficiencyid 							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	proficiencyname							varchar(30),
	proficiencytypeid						integer REFERENCES proficiencytype(proficiencytypeid),
	proficiencydescription			varchar(200)
);



/*
------------------------------------------------------------------------
Feature Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS feature (
	featureid							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	featurename						varchar(20),
	featuredescription		varchar(2000)
);

CREATE TABLE IF NOT EXISTS proficiency_feature (
	proficiencyfeatureid		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	featureid								integer REFERENCES feature(featureid) NOT NULL,
	proficiencyid						integer REFERENCES proficiency(proficiencyid) NOT NULL
);

CREATE TABLE IF NOT EXISTS action_feature (
	action_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL,
	uses									integer,
	uses_per_level				integer,
	recovery							integer
);

CREATE TABLE IF NOT EXISTS speed_feature (
	speed_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL,
	speed									integer
);

CREATE TABLE IF NOT EXISTS ability_score_feature (
	ability_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id							integer REFERENCES feature(feature_id) NOT NULL,
	ability_id							integer REFERENCES ability(ability_id) NOT NULL,
	score_bonus							integer
);

CREATE TABLE IF NOT EXISTS ability_action_feature (
	ability_action_feature_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id									integer REFERENCES feature(feature_id) NOT NULL,
	ability_id									integer REFERENCES ability(ability_id) NOT NULL,
	uses												integer
);

CREATE TABLE IF NOT EXISTS class_action_feature (
	class_action_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id									integer REFERENCES feature(feature_id) NOT NULL,
	level												integer,
	uses												integer,
	recovery										integer
);


CREATE TABLE IF NOT EXISTS manual_feature (
	manual_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS defense_feature (
	defense_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id							integer REFERENCES feature(feature_id) NOT NULL,
	defense_id							integer REFERENCES defense(defense_id) NOT NULL
);





/*
------------------------------------------------------------------------
Character Supporting Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS character_ability (
	character_ability_id	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id					integer REFERENCES player_character(character_id) NOT NULL,
  ability_id        		integer REFERENCES ability(ability_id) NOT NULL,
	score									integer,
	modifier							integer
);
/*
Str for Jerome, score of 16, mod 3
*/

CREATE TABLE IF NOT EXISTS character_skill (
	character_skill_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id						integer REFERENCES player_character(character_id) NOT NULL,
	skill_id								integer REFERENCES skill(skill_id) NOT NULL,
	proficient							boolean,
	bonus										integer
);
/*
Animal Handling for Jerome
*/

CREATE TABLE IF NOT EXISTS character_saving_throw (
	character_saving_throw_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id									integer REFERENCES player_character(character_id) NOT NULL,
	saving_throw_id								integer REFERENCES skill(skill_id) NOT NULL,
	proficient										boolean,
	bonus													integer
);

CREATE TABLE IF NOT EXISTS character_passive_ability (
	character_passive_ability_id	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id									integer REFERENCES player_character(character_id) NOT NULL,
	passive_perception						integer,
	passive_investigation					integer,
	passive_insight								integer
);

/*
TODO consider moving the contents of this table to the main player_character table
*/

CREATE TABLE IF NOT EXISTS character_defense (
	character_defense		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id				integer REFERENCES player_character(character_id) NOT NULL,
	defense_id					integer REFERENCES defense(defense_id) NOT NULL
);

CREATE TABLE IF NOT EXISTS character_language (
	character_language_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id						integer REFERENCES player_character(character_id) NOT NULL,
	language_id 						integer REFERENCES language(language_id) NOT NULL
);

CREATE TABLE IF NOT EXISTS character_proficiency (
	character_proficiency_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id								integer REFERENCES player_character(character_id) NOT NULL,
	proficiency									integer REFERENCES proficiency(proficiency_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS character_feature (
	character_feature_id				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id								integer REFERENCES player_character(character_id) NOT NULL,
	feature_id									integer REFERENCES feature(feature_id) NOT NULL
);


/*
------------------------------------------------------------------------
Class Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS class (
	class_id									integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	class_name								varchar(20),
	hit_dice									integer,
	hit_points_1st_level			integer,
	hit_points_higher_level		integer,
	description								varchar(2000),
	spellcasting_ability_id		integer REFERENCES ability(ability_id) NOT NULL
);
/*
How would we deal with non-spellcasting classes? We need to fix this somehow
*/


CREATE TABLE IF NOT EXISTS subclass (
	subclass_id				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	class_id 					integer REFERENCES class(class_id) NOT NULL,
	subclass_name			varchar(20),
	description				integer REFERENCES ability(ability_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS class_feature (
	class_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	class_id							integer REFERENCES class(class_id) NOT NULL,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL,
	character_level				integer							
);


CREATE TABLE IF NOT EXISTS subclass_feature (
	subclass_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	subclass_id							integer REFERENCES subclass(subclass_id) NOT NULL,
	feature_id							integer REFERENCES feature(feature_id) NOT NULL,
	character_level					integer							
);


CREATE TABLE IF NOT EXISTS class_proficiency (
	class_proficiency_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	class_id								integer REFERENCES class(class_id) NOT NULL,
	proficiency_id					integer REFERENCES proficiency(proficiency_id) NOT NULL
);


/*
------------------------------------------------------------------------
Monster Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS encounter (
	encounter_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	encounter_name		varchar(20)
);


CREATE TABLE IF NOT EXISTS monster_type (
	monster_type_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	type_name						varchar(20),
	description					varchar(2000)
);


CREATE TABLE IF NOT EXISTS monster_group (
	monster_group_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	encounter_id					integer REFERENCES encounter(encounter_id) NOT NULL,
	creature_size					integer REFERENCES creature_size(size_id) NOT NULL,
	monster_type_id				integer REFERENCES monster_type(monster_type_id) NOT NULL,
	alignment							integer REFERENCES alignment(alignment_id) NOT NULL,
	group_name						varchar(20),
	description						varchar(2000),
	hit_die								integer,
	hit_die_num						integer,
	challenge_rating			integer,
	xp										integer,
	armor_class						integer,
	speed									integer,
	initiative						integer,
	/*passive_perception		integer,*/
	skills								varchar(500),
	features							varchar(500),
	notes									varchar(2000)
);

CREATE TABLE IF NOT EXISTS monster_instance (
	monster_instance_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monster_group_id			integer REFERENCES monster_group(monster_group_id) NOT NULL,
	max_health						integer,
	current_health				integer
);


CREATE TABLE IF NOT EXISTS monster_ability (
	monster_ability_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monster_group_id			integer REFERENCES monster_group(monster_group_id) NOT NULL,
	ability_id						integer REFERENCES ability(ability_id) NOT NULL,
	score									integer,
	modifier							integer
);

/*
TODO should we store modifiers for things that have scores, or should we calculate the modifiers on the fly from the scores? 
*/

/*
CREATE TABLE IF NOT EXISTS monster_feature (
	monster_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id							integer REFERENCES feature(feature_id) NOT NULL,
	monster_id							integer REFERENCES monster_group(monster_group_id) NOT NULL
);
*/


/*
------------------------------------------------------------------------
Race Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS race (
	race_id				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	creature_size					integer REFERENCES creature_size(size_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS subrace (
	subrace_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	race_id				integer REFERENCES race(race_id) NOT NULL,
	name		 			varchar(30)
);


CREATE TABLE IF NOT EXISTS race_feature (
	race_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	race_id							integer REFERENCES race(race_id) NOT NULL,
	feature_id					integer REFERENCES feature(feature_id) NOT NULL				
);


CREATE TABLE IF NOT EXISTS subrace_feature (
	subrace_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	subrace_id							integer REFERENCES subrace(subrace_id) NOT NULL,
	feature_id							integer REFERENCES feature(feature_id) NOT NULL						
);


/*
------------------------------------------------------------------------
Spell Tables
------------------------------------------------------------------------
*/


CREATE TABLE IF NOT EXISTS spell (
	spell_id						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spell_name					varchar(40),
	description					varchar(500),
	cast_time 					integer,
	ritual							boolean,
	duration						integer,
	components					varchar(100),
	/*specific_materials	varchar(50),*/
	save_ability				integer REFERENCES ability(ability_id),
	range								integer
);


CREATE TABLE IF NOT EXISTS diceroll_spell (
	diceroll_spell_id 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spell_id 							integer REFERENCES spell(spell_id) NOT NULL,
	effect_dice_num				integer,
	effect_dice_type			integer REFERENCES dice(dice_id) NOT NULL,
	effect_type						integer REFERENCES effect_type(effect_type_id) NOT NULL
);

CREATE TABLE IF NOT EXISTS spell_feature (
	spell_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL,
	spell_id							integer REFERENCES spell(spell_id) NOT NULL
);

/*
CREATE TABLE IF NOT EXISTS manual_spell (
	manual_spell_id 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spell_id 						integer REFERENCES spell(spell_id) NOT NULL
);
*/
/*
TODO Do we need this table? We could just do a check if a spell is a dice roll spell, and render as manual if not, instead of using this additional table 
*/


CREATE TABLE IF NOT EXISTS spell_list (
	spell_list_id 		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	spell_id 					integer REFERENCES spell(spell_id) NOT NULL,
	class_id					integer REFERENCES class(class_id) NOT NULL,
	subclass_id				integer REFERENCES subclass(subclass_id),
	character_level		integer
);





/*
------------------------------------------------------------------------
Item Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS rarity (
	rarity_id				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	rarity_name  		varchar(50),
	description			varchar(100)												
);
/*
Common, Uncommon, Rare, Very Rare 
*/


CREATE TABLE IF NOT EXISTS item (
	item_id 					integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	item_name 				varchar(50),
	item_value				integer,
	description				varchar(500),
	weight						integer,
	rarity_id					integer REFERENCES rarity(rarity_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS armor (
	armor_id							integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	item_id 							integer REFERENCES item(item_id) NOT NULL,
	armor_class						integer,
	dex_modifier					boolean,
	dex_modifier_max			integer,
	strength_requirement	integer,
	stealth_disadvantage	boolean		
);


CREATE TABLE IF NOT EXISTS weapon (
	weapon_id 				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	item_id						integer REFERENCES item(item_id) NOT NULL,
	range_short				integer,
	range_long				integer,
	damage_bonus			integer			
);


CREATE TABLE IF NOT EXISTS possible_weapon_property (
	possible_weapon_property_id				integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	possible_weapon_property_name  		varchar(50),
	description												varchar(100)												
);
/*
Finesse, Thrown, Light 
*/


CREATE TABLE IF NOT EXISTS weapon_property (
	weapon_property_id 						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	weapon_id											integer REFERENCES weapon(weapon_id) NOT NULL,
	possible_weapon_property_id		integer REFERENCES possible_weapon_property(possible_weapon_property_id) NOT NULL
);

CREATE TABLE IF NOT EXISTS character_inventory (
	character_inventory_id	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id						integer REFERENCES player_character(character_id) NOT NULL,
	item_id									integer REFERENCES item(item_id) NOT NULL,
	quantity								integer
);

/*
------------------------------------------------------------------------
Attack Tables
------------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS attack (
	attack_id						integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 								varchar(40) NOT NULL,
	range								integer,
	attack_modifier_id	integer REFERENCES ability(ability_id) NOT NULL,
	damage_modifier_id	integer REFERENCES ability(ability_id) NOT NULL,
	damage_die					integer REFERENCES dice(dice_id) NOT NULL,
	num_damage_die			integer,
	effect_type_id			integer REFERENCES effect_type(effect_type_id) NOT NULL,
	description 				varchar(300)
);
/*
For this, we will need to join the ability FKs with entries in character_ability associated with the character id
*/


CREATE TABLE IF NOT EXISTS monster_attack (
	monster_attack_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	monster_group_id			integer REFERENCES monster_group(monster_group_id) NOT NULL,
	attack_id							integer REFERENCES attack(attack_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS character_attack (
	character_attack_id		integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	character_id					integer REFERENCES player_character(character_id) NOT NULL,
	attack_id							integer REFERENCES attack(attack_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS weapon_attack (
	weapon_attack_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	weapon_id							integer REFERENCES weapon(weapon_id) NOT NULL,
	attack_id							integer REFERENCES attack(attack_id) NOT NULL
);


CREATE TABLE IF NOT EXISTS attack_feature (
	attack_feature_id			integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	feature_id						integer REFERENCES feature(feature_id) NOT NULL,
	attack_id							integer REFERENCES attack(attack_id) NOT NULL
);
















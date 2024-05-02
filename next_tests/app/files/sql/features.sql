/*
'None', 'Proficiency', 'Action', 'Speed', 'Ability Score', 'Ability Action', 'Defense', 'Condition', 'Skill', 'Class Action');
*/

-- Race and Subrace Features into feature
INSERT INTO feature (name, displayname, description, featuretype) VALUES 
('Dwarf Ability Score Increase', 'Ability Score Increase', 'Your Constitution score increases by 2.', 'Ability Score'),
('Dwarf Speed', 'Speed', 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.', 'Ability Score'),
('Darkvision', 'Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray..', 'None'),
('Dwarf Languages', 'Languages', 'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.', 'Proficiency')
('Dwarven Resilience', 'Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.', 'Defense'),
('Dwarven Combat Training', 'Dwarven Combat Training', 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.', 'Proficiency'),
('Dwarven Tool Proficiency', 'Tool Proficiency', 'You gain proficiency with the artisan''s tools of your choice: smith''s tools, brewer''s supplies, or mason''s tools.', 'Proficiency'), -- TODO
('Stonecutting', 'Stonecutting', 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.', 'Proficiency'),
('Hill Dwarf Ability Score Increase', 'Ability Score Increase', 'Your Wisdom score increases by 1.', 'Ability Score'),
('Dwarven Toughness', 'Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.', 'None'), -- 
('Mountain Dwarf Ability Score Increase', 'Ability Score Increase', 'Your Strength score increases by 2.', 'Ability Score'),
('Dwarven Armor Training', 'Dwarven Armor Training', 'You have proficiency with light and medium armor.', 'Proficiency'),
('Elf Ability Score Increase', 'Ability Score Increase', 'Your Dexterity score increases by 2.', 'Ability Score'),
('Elf Speed', 'Speed', 'Your base walking speed is 30 feet.', 'Speed'),
('Elf Languages', 'Languages', 'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.', 'Proficiency')
('Keen Senses', 'Keen Senses', 'You have proficiency in the Perception skill.', 'Proficiency'),
('Fey Ancestry', 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can''t put you to sleep.', 'None'),
('Trance', 'Trance', 'Elves don''t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.', 'None'),
('High Elf Ability Score Increase', 'Ability Score Increase', 'Your Intelligence score increases by 1.', 'Ability Score'),
('Elf Weapon Training', 'Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.', 'Proficiency'),
('High Elf Cantrip', 'Cantrip', 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.', 'Spell'), -- TODO
('Extra Language', 'Extra Language', 'Your Wisdom score increases by 1.', 'You can speak, read, and write one extra language of your choice.', 'Proficiency'), -- TODO
('Wood Elf Ability Score Increase', 'Ability Score Increase', 'Your Wisdom score increases by 1.', 'Ability Score'),
('Fleet of Foot', 'Fleet of Foot', 'Your base walking speed increases to 35 feet.', 'Speed'),
('Mask of the Wild', 'Mask of the Wild', 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, or other natural phenomena', 'None'),
('Gnome Ability Score Increase', 'Ability Score Increase', 'Your Intelligence score increases by 2.', 'Ability Score'),
('Gnome Speed', 'Speed', 'Your base walking speed is 25 feet', 'Speed'),
('Gnome Languages', 'Languages', 'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.', 'Proficiency'),
('Gnome Cunning', 'Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.', 'None'),
('Forest Gnome Ability Score Increase', 'Ability Score Increase', 'Your Dexterity score increases by 1.', 'Ability Score'),
('Natural Illusionist', 'Natural Illusionist', 'You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.', 'Spell'),
('Speak with Small Beasts', 'Speak with Small Beasts', 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.', 'None'),
('Rock Gnome Ability Score Increase', 'Ability Score Increase', 'Your Constitution score increases by 1.', 'Ability Score'),
('Artificer''s Lore', 'Artificer''s Lore', 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.', 'None'),
('Tinker', 'Tinker', 'You have proficiency with artisan''s tools (tinker''s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: \nClockwork Toy. This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents. \nFire Starter. The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action. \nMusic Box. When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song''s end or when it is closed.', 'None'),
('Half-Elf Ability Score Increase', 'Ability Score Increase', 'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.', 'Ability Score')
('Half-Elf Speed', 'Speed', 'Your base walking speed is 30 feet.', 'Speed'),
('Half-Elf Languages', 'Languages', 'You can speak, read, and write Common, Elvish, and one extra language of your choice.', 'Proficiency'),
('Skill Versatility', 'Skill Versatility', 'You gain proficiency in two skills of your choice.', 'Proficiency'),
('Half-Orc Ability Score Increase', 'Ability Score Increase', 'Your Strength score increases by 2, and your Constitution score increases by 1.', 'Ability Score')
('Half-Orc Speed', 'Speed', 'Your base walking speed is 30 feet.', 'Speed'),
('Half-Orc Languages', 'Languages', 'You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.', 'Proficiency'),
('Menacing', 'Menacing', 'You gain proficiency in the Intimidation skill.', 'Proficiency'),
('Relentless Endurance', 'Relentless Endurance', 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can''t use this feature again until you finish a long rest.', 'Action'),
('Savage Attacks', 'Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon''s damage dice one additional time and add it to the extra damage of the critical hit.', 'None'),
('Halfling Ability Score Increase', 'Ability Score Increase', 'Your Dexterity score increases by 2.', 'Ability Score'),
('Halfling Speed', 'Speed', 'Your base walking speed is 25 feet.', 'Speed'),
('Halfling Languages', 'Languages', 'You can speak, read, and write Common and Halfling. The Halfling language isn''t secret, but halflings are loath to share it with others. They write very little, so they don''t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.', 'Proficiency'),
('Lucky', 'Lucky', 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.', 'None'),
('Brave', 'Brave', 'You have advantage on saving throws against being frightened.', 'None'),
('Halfling Nimbleness', 'Halfling Nimbleness', 'You can move through the space of any creature that is of a size larger than yours.', 'None'),
('Lightfoot Ability Score Increase', 'Ability Score Increase', 'Your Charisma score increases by 1', 'Ability Score'),
('Naturally Stealthy', 'Naturally Stealthy', 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.', 'None'),
('Stout Ability Score Increase', 'Ability Score Increase', 'Your Constitution score increases by 1', 'Ability Score'),
('Stout Resilience', 'Stout Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.', 'Defense'),
('Human Ability Score Increase', 'Ability Score Increase', 'Your ability scores each increase by 1', 'Ability Score'),
('Human Speed', 'Speed', 'Your base walking speed is 30 feet.', 'Speed'),
('Human Languages', 'Languages', 'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.', 'Proficiency');


-- Class and Subclass Features into feature
INSERT INTO feature (name, displayname, description, featuretype) VALUES 
('Barbarian Proficiencies', 'Proficiencies', '', 'Proficiency')
('Barbarian Rage', 'Rage', 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. ;;While raging, you gain the following benefits if you aren''t wearing heavy armor: ;;You have advantage on Strength checks and Strength saving throws. ;;When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. ;;You have resistance to bludgeoning, piercing, and slashing damage. ;;If you are able to cast spells, you can''t cast them or concentrate on them while raging. ;;Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. ;;Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.', ''),
('Unarmored Defense', 'Unarmored Defense', 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.', 'None'),
('Reckless Attack', 'Reckless Attack', 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.', 'None'),
('Danger Sense', 'Danger Sense', 'At 2nd level, you gain an uncanny sense of when things nearby aren''t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can''t be blinded, deafened, or incapacitated.', 'None'),
('Primal Path', 'Primal Path', 'At 3rd level, you choose a path that shapes the nature of your rage. Choose the Path of the Berserker or the Path of the Totem Warrior, both detailed at the end of the class description. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.', 'None'),
('Barbarian Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 'None'),
('Extra Attack', 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', 'None'),
('Fast Movement', 'Fast Movement', 'Starting at 5th level, your speed increases by 10 feet while you aren''t wearing heavy armor.', 'None'),
('Berserker Frenzy', 'Frenzy', 'Starting when you choose this path at 3rd level, you can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.', 'None'), 
('Spellcasting', '', '', ''),
('Bardic Inspiration', 'Bardic Inspiration', 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. ;;Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the GM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time. ;;You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest. ;;Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.', ''),
('Jack of All Trades', 'Jack of All Trades', 'Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn''t already include your proficiency bonus. ', 'None'),
('Song of Rest', 'Song of Rest', 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points. ;;The extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level. ', 'None'),
('Bard College', 'Bard College', 'At 3rd level, you delve into the advanced techniques of a bard college of your choice: the College of Lore or the College of Valor, both detailed at the end of the class description. Your choice grants you features at 3rd level and again at 6th and 14th level. ', 'None'),
('Bard Expertise', 'Expertise', '', ''),
('Spellcasting', '', '', ''),
('', '', '', '');



INSERT INTO abilityactionfeature (featureid, abilityid, uses) VALUES 
(),


INSERT INTO abilityscorefeature (featureid, abilityid, scorebonus) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Con'), 2),
((SELECT featureid FROM feature WHERE name = 'Hill Dwarf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), 1),
((SELECT featureid FROM feature WHERE name = 'Mountain Dwarf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Str'), 2),
((SELECT featureid FROM feature WHERE name = 'Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), 2),
((SELECT featureid FROM feature WHERE name = 'High Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Int'), 1),
((SELECT featureid FROM feature WHERE name = 'Wood Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), 1),
((SELECT featureid FROM feature WHERE name = 'Gnome Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Int'), 2),
((SELECT featureid FROM feature WHERE name = 'Forest Gnome Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), 1),
((SELECT featureid FROM feature WHERE name = 'Rock Gnome Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Con'), 1),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), 2),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Non'), 1),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Non'), 1),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Str'), 2),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Con'), 1),
((SELECT featureid FROM feature WHERE name = 'Lightfoot Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), 1),
((SELECT featureid FROM feature WHERE name = 'Stout Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Con'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Str'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Int'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Dex'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Con'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Wis'), 1),
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), 1),


-- Recovery of 1 means short rest, recovery of 2 means long rest
INSERT INTO actionfeature (featureid, uses, usesperlevel, recovery) VALUES 
((SELECT featureid FROM feature WHERE name = 'Relentless Endurance'), 1, 0, 1),


INSERT INTO attackfeature (featureid, attackid) VALUES 
(),


INSERT INTO classactionfeature (featureid, level, uses, recovery) VALUES 
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 1, 2, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 2, 2, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 3, 3, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 4, 3, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 5, 3, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 6, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 7, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 8, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 9, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 10, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 11, 4, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 12, 5, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 13, 5, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 14, 5, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 15, 5, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 16, 5, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 17, 6, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 18, 6, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 19, 6, 2),
((SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 20, 0, 2),



INSERT INTO conditionfeature (featureid, conditionid) VALUES 
(),


INSERT INTO defensefeature (featureid, defenseid, defensestatus) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarven Resilience'), (SELECT defenseid FROM defense WHERE name = 'Poison'), 'Resistant'),
((SELECT featureid FROM feature WHERE name = 'Stout Resilience'), (SELECT defenseid FROM defense WHERE name = 'Poison'), 'Resistant'),


INSERT INTO proficiencyfeature (featureid, proficiencyid) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Dwarf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dwarvish')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Battleaxe')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Handaxe')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Hammer')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Warhammer')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Armor Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Dwarven Armor Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'Elf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Elf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Elvish')),
((SELECT featureid FROM feature WHERE name = 'Keen Senses'), (SELECT proficiencyid FROM proficiency WHERE name = 'Perception')),
((SELECT featureid FROM feature WHERE name = 'Elf Weapon Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Longsword')),
((SELECT featureid FROM feature WHERE name = 'Elf Weapon Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shortsword')),
((SELECT featureid FROM feature WHERE name = 'Elf Weapon Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shortbow')),
((SELECT featureid FROM feature WHERE name = 'Elf Weapon Training'), (SELECT proficiencyid FROM proficiency WHERE name = 'Longbow')),
((SELECT featureid FROM feature WHERE name = 'Extra Language'), (SELECT proficiencyid FROM proficiency WHERE name = 'Extra Language')),
((SELECT featureid FROM feature WHERE name = 'Gnome Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Gnome Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Gnomish')),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Elvish')),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Extra Language')),
((SELECT featureid FROM feature WHERE name = 'Skill Versatility'), (SELECT proficiencyid FROM proficiency WHERE name = 'Choose Skill Proficiency 1')),
((SELECT featureid FROM feature WHERE name = 'Skill Versatility'), (SELECT proficiencyid FROM proficiency WHERE name = 'Choose Skill Proficiency 2')),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Orc')),
((SELECT featureid FROM feature WHERE name = 'Menacing'), (SELECT proficiencyid FROM proficiency WHERE name = 'Intimidation')),
((SELECT featureid FROM feature WHERE name = 'Human Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Common')),
((SELECT featureid FROM feature WHERE name = 'Human Languages'), (SELECT proficiencyid FROM proficiency WHERE name = 'Extra Language')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shields')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapons')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Martial Weapons')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Strength')),
((SELECT featureid FROM feature WHERE name = 'Barbarian Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Constitution')),



INSERT INTO speedfeature (featureid, speed) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarf Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Elf Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Fleet of Foot', 35)),
((SELECT featureid FROM feature WHERE name = 'Gnome Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Halfling Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Human Speed', 30)),


INSERT INTO spellfeature (featureid, level, spellid) VALUES 
(),







INSERT INTO classfeature (classid, featureid, characterlevel) VALUES 
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 1),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Unarmored Defense'), 1),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Reckless Attack'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Danger Sense'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Primal Path'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Barbarian Ability Score Improvement'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Extra Attack'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Fast Movement'), 2),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Fast Movement'), 2),


INSERT INTO subclassfeature (subclassid, featureid, characterlevel) VALUES 
((SELECT subclassid FROM subclass WHERE name = 'Path of the Berserker'), (SELECT featureid FROM feature WHERE name = 'Fast Movement'), 2),


INSERT INTO racefeature (raceid, featureid) VALUES 
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarf Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarf Speed')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Darkvision')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Resilience')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Tool Proficiency')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Stonecutting')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Speed')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Darkvision')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Keen Senses')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Fey Ancestry')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Trance')),
((SELECT raceid FROM race WHERE name = 'Gnome'), (SELECT featureid FROM feature WHERE name = 'Gnome Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Gnome'), (SELECT featureid FROM feature WHERE name = 'Gnome Speed')),
((SELECT raceid FROM race WHERE name = 'Gnome'), (SELECT featureid FROM feature WHERE name = 'Darkvision')), 
((SELECT raceid FROM race WHERE name = 'Gnome'), (SELECT featureid FROM feature WHERE name = 'Gnome Languages')),
((SELECT raceid FROM race WHERE name = 'Gnome'), (SELECT featureid FROM feature WHERE name = 'Gnome Cunning')),
((SELECT raceid FROM race WHERE name = 'Half-Elf'), (SELECT featureid FROM feature WHERE name = 'Half-Elf Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Half-Elf'), (SELECT featureid FROM feature WHERE name = 'Half-Elf Speed')),
((SELECT raceid FROM race WHERE name = 'Half-Elf'), (SELECT featureid FROM feature WHERE name = 'Darkvision')),
((SELECT raceid FROM race WHERE name = 'Half-Elf'), (SELECT featureid FROM feature WHERE name = 'Half-Elf Languages')),
((SELECT raceid FROM race WHERE name = 'Half-Elf'), (SELECT featureid FROM feature WHERE name = 'Fey Ancestry')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Half-Orc Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Half-Orc Speed')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Darkvision')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Half-Orc Languages')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Menacing')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Relentless Endurance')),
((SELECT raceid FROM race WHERE name = 'Half-Orc'), (SELECT featureid FROM feature WHERE name = 'Savage Attacks')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Halfling Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Halfling Speed')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Halfling Languages')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Lucky')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Brave')),
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Halfing Nimbleness')),


INSERT INTO subracefeature (subraceid, featureid) VALUES 
((SELECT subraceid FROM subrace WHERE name = 'Hill Dwarf'), (SELECT featureid FROM feature WHERE name = 'Hill Dwarf Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Hill Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Toughness')),
((SELECT subraceid FROM subrace WHERE name = 'Mountain Dwarf'), (SELECT featureid FROM feature WHERE name = 'Mountain Dwarf Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Mountain Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Armor Training')),
((SELECT subraceid FROM subrace WHERE name = 'High Elf'), (SELECT featureid FROM feature WHERE name = 'High Elf Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'High Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Weapon Training')),
((SELECT subraceid FROM subrace WHERE name = 'High Elf'), (SELECT featureid FROM feature WHERE name = 'High Elf Cantrip')),
((SELECT subraceid FROM subrace WHERE name = 'High Elf'), (SELECT featureid FROM feature WHERE name = 'Extra Language')),
((SELECT subraceid FROM subrace WHERE name = 'Wood Elf'), (SELECT featureid FROM feature WHERE name = 'Wood Elf Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Wood Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Weapon Training')),
((SELECT subraceid FROM subrace WHERE name = 'Wood Elf'), (SELECT featureid FROM feature WHERE name = 'Fleet of Foot')),
((SELECT subraceid FROM subrace WHERE name = 'Wood Elf'), (SELECT featureid FROM feature WHERE name = 'Mask of the Wild')),
((SELECT subraceid FROM subrace WHERE name = 'Forest Gnome'), (SELECT featureid FROM feature WHERE name = 'Forest Gnome Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Forest Gnome'), (SELECT featureid FROM feature WHERE name = 'Natural Illusionist')),
((SELECT subraceid FROM subrace WHERE name = 'Forest Gnome'), (SELECT featureid FROM feature WHERE name = 'Speak with Small Beasts')),
((SELECT subraceid FROM subrace WHERE name = 'Rock Gnome'), (SELECT featureid FROM feature WHERE name = 'Rock Gnome Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Rock Gnome'), (SELECT featureid FROM feature WHERE name = 'Artificer''s Lore')),
((SELECT subraceid FROM subrace WHERE name = 'Rock Gnome'), (SELECT featureid FROM feature WHERE name = 'Tinker')),
((SELECT subraceid FROM subrace WHERE name = 'Lightfoot'), (SELECT featureid FROM feature WHERE name = 'Lightfoot Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Lightfoot'), (SELECT featureid FROM feature WHERE name = 'Naturally Stealthy')),
((SELECT subraceid FROM subrace WHERE name = 'Stout'), (SELECT featureid FROM feature WHERE name = 'Stout Ability Score Increase')),
((SELECT subraceid FROM subrace WHERE name = 'Stout'), (SELECT featureid FROM feature WHERE name = 'Stout Resilience')),

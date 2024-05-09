/*
'None', 'Proficiency', 'Action', 'Speed', 'Ability Score', 'Ability Action', 'Defense', 'Condition', 'Skill', 'Class Action');
*/

/*
Most feature info grabbed from https://open5e.com
*/

-- Race and Subrace Features into feature
INSERT INTO feature (name, displayname, description, featuretype) VALUES 
('Dwarf Ability Score Increase', 'Ability Score Increase', 'Your Constitution score increases by 2.', 'Ability Score'),
('Dwarf Speed', 'Speed', 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.', 'Ability Score'),
('Darkvision', 'Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray..', 'None'),
('Dwarf Languages', 'Languages', 'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.', 'Proficiency'),
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
('Elf Languages', 'Languages', 'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.', 'Proficiency'),
('Keen Senses', 'Keen Senses', 'You have proficiency in the Perception skill.', 'Proficiency'),
('Fey Ancestry', 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can''t put you to sleep.', 'None'),
('Trance', 'Trance', 'Elves don''t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.', 'None'),
('High Elf Ability Score Increase', 'Ability Score Increase', 'Your Intelligence score increases by 1.', 'Ability Score'),
('Elf Weapon Training', 'Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.', 'Proficiency'),
('High Elf Cantrip', 'Cantrip', 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.', 'Spell'), -- TODO
('Extra Language', 'Extra Language', 'Your Wisdom score increases by 1. You can speak, read, and write one extra language of your choice.', 'Proficiency'), -- TODO
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
('Half-Elf Ability Score Increase', 'Ability Score Increase', 'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.', 'Ability Score'),
('Half-Elf Speed', 'Speed', 'Your base walking speed is 30 feet.', 'Speed'),
('Half-Elf Languages', 'Languages', 'You can speak, read, and write Common, Elvish, and one extra language of your choice.', 'Proficiency'),
('Skill Versatility', 'Skill Versatility', 'You gain proficiency in two skills of your choice.', 'Proficiency'),
('Half-Orc Ability Score Increase', 'Ability Score Increase', 'Your Strength score increases by 2, and your Constitution score increases by 1.', 'Ability Score'),
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
('Barbarian Proficiencies', 'Proficiencies', 'Armor: Light armor, medium armor, shields;;Weapons: Simple weapons, martial weapons;;Tools: None;;Saving Throws: Strength, Constitution;;Skills: Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival', 'Proficiency')
('Barbarian Rage', 'Rage', 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. ;;While raging, you gain the following benefits if you aren''t wearing heavy armor: ;;You have advantage on Strength checks and Strength saving throws. ;;When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. ;;You have resistance to bludgeoning, piercing, and slashing damage. ;;If you are able to cast spells, you can''t cast them or concentrate on them while raging. ;;Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. ;;Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.', ''),
('Barbarian Unarmored Defense', 'Unarmored Defense', 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.', 'None'),
('Reckless Attack', 'Reckless Attack', 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.', 'None'),
('Danger Sense', 'Danger Sense', 'At 2nd level, you gain an uncanny sense of when things nearby aren''t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can''t be blinded, deafened, or incapacitated.', 'None'),
('Primal Path', 'Primal Path', 'At 3rd level, you choose a path that shapes the nature of your rage. Choose the Path of the Berserker or the Path of the Totem Warrior, both detailed at the end of the class description. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.', 'None'),
('Barbarian Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 'None'),
('Extra Attack', 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', 'None'),
('Fast Movement', 'Fast Movement', 'Starting at 5th level, your speed increases by 10 feet while you aren''t wearing heavy armor.', 'None'),
('Berserker Frenzy', 'Frenzy', 'Starting when you choose this path at 3rd level, you can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.', 'None'), 
('Bard Spellcasting', 'Spellcasting', '', ''),
('Bard Proficiencies', 'Proficiencies', 'Armor: Light armor;;Weapons: Simple weapons, hand crossbows, longswords, rapiers, shortswords;;Tools: Three musical instruments of your choice;;Saving Throws: Dexterity, Charisma;;Skills: Choose any three', 'Proficiency')
('Bardic Inspiration', 'Bardic Inspiration', 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. ;;Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the GM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time. ;;You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest. ;;Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.', ''),
('Jack of All Trades', 'Jack of All Trades', 'Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn''t already include your proficiency bonus. ', 'None'),
('Song of Rest', 'Song of Rest', 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points. ;;The extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level. ', 'None'),
('Bard College', 'Bard College', 'At 3rd level, you delve into the advanced techniques of a bard college of your choice: the College of Lore or the College of Valor, both detailed at the end of the class description. Your choice grants you features at 3rd level and again at 6th and 14th level. ', 'None'),
('Bard Expertise', 'Expertise', 'At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies. ;;At 10th level, you can choose another two skill proficiencies to gain this benefit. ', ''),
('Bard Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature. ', 'None'),
('Font of Inspiration', 'Font of Inspiration', 'Beginning when you reach 5th level, you regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.', 'None'),
('College of Valor Bonus Proficiencies', 'Bonus Proficiencies', 'When you join the College of Valor at 3rd level, you gain proficiency with medium armor, shields, and martial weapons.', 'Proficiency'),
('Combat Inspiration', 'Combat Inspiration', 'Also at 3rd level, you learn to inspire others in battle. A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to any weapon damage roll it just made. Alternatively, when an attack roll is made against the creature, it can use its reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, after seeing the roll but before knowing whether it hits or misses.', 'None'),
('Cleric Proficiencies', 'Proficiencies', 'Armor: Light armor, medium armor, shields;;Weapons: Simple weapons;;Tools: None;;Saving Throws: Wisdom, Charisma;;Skills: Choose two from History, Insight, Medicine, Persuasion, and Religion', 'Proficiency'),
('Cleric Spellcasting', 'Spellcasting', '', ''),
('Cleric Divine Domain', 'Divine Domain', 'Domain Spells ;;Each domain has a list of spells-its domain spells- that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn''t count against the number of spells you can prepare each day. If you have a domain spell that doesn''t appear on the cleric spell list, the spell is nonetheless a cleric spell for you. ;;Domain Spells ;;Each domain has a list of spells-its domain spells- that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn''t count against the number of spells you can prepare each day. ;;If you have a domain spell that doesn''t appear on the cleric spell list, the spell is nonetheless a cleric spell for you. ', 'None')
('Channel Divinity', 'Channel Divinity', 'At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels, as noted in the domain description.;;When you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.;; Some Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC. ;;Beginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests. When you finish a short or long rest, you regain your expended uses.', 'Class Action'),
('Channel Divinity Turn Undead', 'Channel Divinity: Turn Undead', 'As an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.;;A turned creature must spend its turns trying to move as far away from you as it can, and it can''t willingly move to a space within 30 feet of you. It also can''t take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there''s nowhere to move, the creature can use the Dodge action. ', 'None'),
('Cleric Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature. ', 'None'),
('Destroy Undead', 'Destroy Undead', 'Starting at 5th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold, as shown in the Destroy Undead table. ;;5th: 1/2 or lower ;;8th: 1 or lower ;;11th: 2 or lower ;;14th: 3 or lower ;;17th: 4 or lower', 'None'),
('Life Domain Bonus Proficiency', 'Bonus Proficiency', 'When you choose this domain at 1st level, you gain proficiency with heavy armor.', 'Proficiency'),
('Disciple of Life', 'Disciple of Life', 'Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell''s level. ', 'None'),
('Channel Divinity Preserve Life', 'Channel Divinity: Preserve Life', 'Starting at 2nd level, you can use your Channel Divinity to heal the badly injured. ;;As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can''t use this feature on an undead or a construct. ', 'None');

INSERT INTO feature (name, displayname, description, featuretype) VALUES 
--Fighter--
('Fighter Proficiencies', 'Proficiencies', 'Armor: Light armor, Medium armor, Heavy armor, shields;;Weapons: Simple weapons, martial weapons;;Tools: None;;Saving Throws: Strength, Constitution;;Skills: Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival', 'Proficiency'),
('Fighter Fighing Style', 'Fighting Style' 'Archery
You gain a +2 bonus to attack rolls you make with ranged weapons.;;Defense While you are wearing armor, you gain a +1 bonus to AC.;;Dueling When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.;;Great Weapon Fighting When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.;;Protection When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.;;Two-Weapon Fighting When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.
S', 'None'),
('Second Wind', 'Second Wind', 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.', 'Action'),
('Action Surge', 'Action Surge', 'Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action. Once you use this feature, you must finish a short or long rest before you can use it again.', 'Action'),
('Martial Archetype', 'Martial Archetype', 'At 3rd level, you choose an archetype that you strive to emulate in your combat styles and techniques. Choose Champion, Battle Master, or Eldritch Knight, all detailed at the end of the class description. The archetype you choose grants you features at 3rd level.', 'None'),
('Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 'Ability Score'),
('Extra Attack', 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', 'None'),
('Improved Critical', 'Improved Crtical','Beginning when you choose this archetype at 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20.','None'),
--Monk-- 
('Unarmored Defense', 'Unarmored Defense', 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.', 'Class Action'),
('Martial Arts', 'Martial Arts', 'At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don''t have the two-handed or heavy property. You gain the following benefits while you are unarmed or wielding only monk weapons and you aren''t wearing armor or wielding a shield:;;- You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.;;- You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.;;- When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven''t already taken a bonus action this turn.;;Certain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama). Whatever name you use for a monk weapon, you can use the game statistics provided for the weapon.', 'Class Feature'),
('Ki', 'Ki', 'Starting at 2nd level, your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points. Your monk level determines the number of points you have, as shown in the Ki Points column of the Monk table. You can spend these points to fuel various ki features. You start knowing three such features: Flurry of Blows, Patient Defense, and Step of the Wind. You learn more ki features as you gain levels in this class. When you spend a ki point, it is unavailable until you finish a short or long rest, at the end of which you draw all of your expended ki back into yourself. You must spend at least 30 minutes of the rest meditating to regain your ki points. Some of your ki features require your target to make a saving throw to resist the feature''s effects. The saving throw DC is calculated as follows: Ki save DC = 8 + your proficiency bonus + your Wisdom modifier.;;Flurry of Blows Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action;;Patient Defense You can spend 1 ki point to take the Dodge action as a bonus action on your turn.;; Step of the Wind;;You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn.', 'Class Action'),
('Unarmored Movement', 'Unarmored Movement', 'Starting at 2nd level, your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases when you reach certain monk levels, as shown in the Monk table. At 9th level, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the move.', 'Class Action'),
('Monastic Tradition', 'Monastic Tradition', 'When you reach 3rd level, you commit yourself to a monastic tradition: the Way of the Open Hand, the Way of Shadow, or the Way of the Four Elements, all detailed at the end of the class description. Your tradition grants you features at 3rd level and again at 6th, 11th, and 17th level.', 'Class Feature'),
('Deflect Missiles', 'Deflect Missiles', 'Starting at 3rd level, you can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack with the weapon or piece of ammunition you just caught, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and the missile counts as a monk weapon for the attack, which has a normal range of 20 feet and a long range of 60 feet.', 'Class Feature'),
('Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 'Class Feature'),
('Slow Fall', 'Slow Fall', 'Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.', 'None'),
('Extra Attack', 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', 'None'),
('Stunning Strike', 'Stunning Strike', 'Starting at 5th level, you can interfere with the flow of ki in an opponent''s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.', 'Action');
('Open Hand Technique', 'Open Hand Technique', 'Starting when you choose this tradition at 3rd level, you can manipulate your enemy''s ki when you harness your own. Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of the following effects on that target:;;It must succeed on a Dexterity saving throw or be knocked prone.;;It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.;;It can''t take reactions until the end of your next turn.', 'None');
-- Druid
('Druid Proficiencies', 'Proficiencies', 'Armor: Light armor, medium armor, shields (druids will not wear armor or use shields made of metal) ;;Weapons: Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears ;;Tools: Herbalism kit ;;Saving Throws: Intelligence, Wisdom', 'Proficiency'),
('Druid Spellcasting', 'Spellcasting', '', ''),
('Druid Spellcasting Ability', 'Spellcasting Ability', '', 'None'),
('Druid Ritual Casting', 'Ritual Casting', 'You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared. ;;Spellcasting Focus ;;You can use a druidic focus (see chapter 5, “Equipment”) as a spellcasting focus for your druid spells. ', 'None'),
('Wild Shape', 'Wild Shape', 'Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.;;Your druid level determines the beasts you can transform into, as shown in the Beast Shapes table. At 2nd level, for example, you can transform into any beast that has a challenge rating of 1/4 or lower that doesn''t have a flying or swimming speed. ', 'Action'),
('Druid Circle', 'Druid Circle', 'At 2nd level, you choose to identify with a circle of druids: the Circle of the Land or the Circle of the Moon, both detailed at the end of the class description. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level. ', 'None'),
('Druid Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature. ', 'None'),
('Combat Wild Shape', 'Combat Wild Shape', 'When you choose this circle at 2nd level, you gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action. ;;Additionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended.', 'None')
('Circle Forms', 'Circle Forms', 'The rites of your circle grant you the ability to transform into more dangerous animal forms. Starting at 2nd level, you can use your Wild Shape to transform into a beast with a challenge rating as high as 1 (you ignore the Max. CR column of the Beast Shapes table, but must abide by the other limitations there).;;Starting at 6th level, you can transform into a beast with a challenge rating as high as your druid level divided by 3, rounded down.', 'None')
-- Wizard
('Wizard Proficiencies', 'Proficiencies', 'Armor: None ;;Weapons: Daggers, darts, slings, quarterstaffs, light crossbows ;;Tools: None ;;Saving Throws: Intelligence, Wisdom ;;Skills: Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion', 'Proficiency'),
('Wizard Spellcasting', 'Spellcasting', '', 'None'),
('Arcane Recovery', 'Arcane Recovery', 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher. ;;For example, if you''re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots. ', 'Action'),
('Arcane Tradition', 'Arcane Tradition', 'When you reach 2nd level, you choose an arcane tradition, shaping your practice of magic through one of eight schools: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, or Transmutation, all detailed at the end of the class description. ;;Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level. ', 'None'),
('Wizard Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature. ', 'None'),
('Evocation Savant', 'Evocation Savant', 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy an evocation spell into your spellbook is halved. ', 'None'),
('Sculpt Spells', 'Sculpt Spells', 'Beginning at 2nd level, you can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell''s level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save. ', 'None');
-- Warlock
('Warlock Proficiencies', 'Proficiencies', 'Armor: Light armor ;;Weapons: Simple weapons ;;Tools: None ;;Saving Throws: Wisdom, Charisma ;;Skills: Choose two skills from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion', 'Proficiency'),
('Otherworldly Patron', 'Otherworldly Patron', 'At 1st level, you have struck a bargain with an otherworldly being of your choice: the Archfey, the Fiend, or the Great Old One, each of which is detailed at the end of the class description. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.', 'None'),
('Pact Magic', 'Pact Magic', 'Cantrips;;You know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table. ;;Spell Slots ;;The Warlock table shows how many spell slots you have. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest. ;;For example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell thunderwave, you must spend one of those slots, and you cast it as a 3rd-level spell. ;;Spells Known of 1st Level and Higher ;;At 1st level, you know two 1st-level spells of your choice from the warlock spell list. ;;The Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level and higher. A spell you choose must be of a level no higher than what''s shown in the table''s Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level. ;;Additionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots. ;;Spellcasting Ability: ;;Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one. ;;Spell save DC = 8 + your proficiency bonus + your Charisma modifier ;;Spell attack modifier = your proficiency bonus + your Charisma modifier ;;Spellcasting Focus ;;You can use an arcane focus as a spellcasting focus for your warlock spells. ', 'None'),
('Eldritch Invocations', 'Eldritch Invocations', 'In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability. ;;At 2nd level, you gain two eldritch invocations of your choice. Your invocation options are detailed at the end of the class description. When you gain certain warlock levels, you gain additional invocations of your choice, as shown in the Invocations Known column of the Warlock table. ;;Additionally, when you gain a level in this class, you can choose one of the invocations you know and replace it with another invocation that you could learn at that level. ', 'None'),
('Pact Boon', 'Pact Boon', 'Pact of the Chain ;;You learn the find familiar spell and can cast it as a ritual. The spell doesn''t count against your number of spells known. ;;When you cast the spell, you can choose one of the normal forms for your familiar or one of the following special forms: imp, pseudodragon, quasit, or sprite. ;;Additionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to make one attack of its own with its reaction. ;;Pact of the Blade ;;You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it. You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. ;;Your pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die. ;;You can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can''t affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks. ;;Pact of the Tome ;;Your patron gives you a grimoire called a Book of Shadows. When you gain this feature, choose three cantrips from any class''s spell list (the three needn''t be from the same list). While the book is on your person, you can cast those cantrips at will. They don''t count against your number of cantrips known. If they don''t appear on the warlock spell list, they are nonetheless warlock spells for you. ;;If you lose your Book of Shadows, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous book. The book turns to ash when you die.', 'None'),
('Warlock Ability Score Improvement', 'Ability Score Improvement', 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature. ', 'None'),
('Fiend Expanded Spell List', 'Expanded Spell List', 'The Fiend lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you. ;;Spell Level	Spells ;;1st: burning hands, command ;;2nd: blindness/deafness, scorching ray ;;3rd: fireball, stinking cloud ;;4th: fire shield, wall of fire ;;5th: flame strike, hallow',  'None'),
('Dark One''s Blessing', 'Dark One''s Blessing', 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).', 'None'),






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
((SELECT featureid FROM feature WHERE name = 'Human Ability Score Increase'), (SELECT abilityid FROM ability WHERE abbrev = 'Cha'), 1);

-- Recovery of 1 means short rest, recovery of 2 means long rest
INSERT INTO actionfeature (featureid, uses, usesperlevel, recovery) VALUES 
((SELECT featureid FROM feature WHERE name = 'Relentless Endurance'), 1, 0, 1),
((SELECT featureid FROM feature WHERE name = 'Wild Shape'), 2, 0, 1),
((SELECT featureid FROM feature WHERE name = 'Arcane Recovery'), 1, 0, 1);


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
((SELECT featureid FROM feature WHERE name = 'Ki'), 2, 2, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 3, 3, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 4, 4, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 5, 5, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 6, 6, 1)
((SELECT featureid FROM feature WHERE name = 'Ki'), 7, 7, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 8, 8, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 9, 9, 1),
((SELECT featureid FROM feature WHERE name = 'Ki'), 10, 10, 1);







INSERT INTO conditionfeature (featureid, conditionid) VALUES 
(),


INSERT INTO defensefeature (featureid, defenseid, defensestatus) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarven Resilience'), (SELECT defenseid FROM defense WHERE name = 'Poison'), 'Resistant'),
((SELECT featureid FROM feature WHERE name = 'Stout Resilience'), (SELECT defenseid FROM defense WHERE name = 'Poison'), 'Resistant');


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
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapons')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Hand Crossbow')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Longsword')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Rapier')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shortsword')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dexterity')),
((SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Charisma')),
((SELECT featureid FROM feature WHERE name = 'College of Valor Bonus Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'College of Valor Bonus Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shields')),
((SELECT featureid FROM feature WHERE name = 'College of Valor Bonus Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Martial Weapons')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shields')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapons')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Wisdom')),
((SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Charisma')),
((SELECT featureid FROM feature WHERE name = 'Life Domain Bonus Proficiency'), (SELECT proficiencyid FROM proficiency WHERE name = 'Heavy Armor')),
--Fighter--
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Heavy Armor')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shields')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapons')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Martial Weapons')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Strength')),
((SELECT featureid FROM feature WHERE name = 'Fighter Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Constitution')),
--Monk--
((SELECT featureid FROM feature WHERE name = 'Monk'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapons')),
((SELECT featureid FROM feature WHERE name = 'Monk'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shortswords')),
((SELECT featureid FROM feature WHERE name = 'Monk'), (SELECT proficiencyid FROM proficiency WHERE name = 'Strength')),
((SELECT featureid FROM feature WHERE name = 'Monk'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dexterity')),
-- Druid
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Medium Armor')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Shields')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Club')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dagger')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dart')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Javelin')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Mace')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Quarterstaff')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Scimitar')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Sickle')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Sling')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Spear')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Herbalism Kit')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Intelligence')),
((SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Wisdom')),
-- Wizard
((SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dagger')),
((SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Dart')),
((SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Sling')),
((SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Quarterstaff')),
((SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Crossbow'));
-- Warlock
((SELECT featureid FROM feature WHERE name = 'Warlock Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Light Armor')),
((SELECT featureid FROM feature WHERE name = 'Warlock Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Simple Weapon')),
((SELECT featureid FROM feature WHERE name = 'Warlock Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Wisdom')),
((SELECT featureid FROM feature WHERE name = 'Warlock Proficiencies'), (SELECT proficiencyid FROM proficiency WHERE name = 'Charisma')),



INSERT INTO speedfeature (featureid, speed) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarf Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Elf Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Fleet of Foot', 35)),
((SELECT featureid FROM feature WHERE name = 'Gnome Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Half-Elf Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Half-Orc Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Halfling Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Human Speed', 30));


INSERT INTO spellfeature (featureid, level, spellid) VALUES 
(),







INSERT INTO classfeature (classid, featureid, characterlevel) VALUES 
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Barbarian Rage'), 1),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Barbarian Unarmored Defense'), 1),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Reckless Attack'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Danger Sense'), 2),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Primal Path'), 3),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Barbarian Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Extra Attack'), 5),
((SELECT classid FROM class WHERE name = 'Barbarian'), (SELECT featureid FROM feature WHERE name = 'Fast Movement'), 5),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Bard Proficiencies'), 1),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Bardic Inspiration'), 1),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Jack of All Trades'), 2),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Song of Rest'), 2),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Bard College'), 3),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Bard Expertise'), 3),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Bard Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Bard'), (SELECT featureid FROM feature WHERE name = 'Font of Inspiration'), 5),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Font of Inspiration'), 5),
--Fighter--
((SELECT classid FROM class WHERE name = 'Fighter'), (SELECT featureid FROM feature WHERE name = 'Second Wind'), 2),
((SELECT classid FROM class WHERE name = 'Fighter'), (SELECT featureid FROM feature WHERE name = 'Action Surge'), 2),
((SELECT classid FROM class WHERE name = 'Fighter'), (SELECT featureid FROM feature WHERE name = 'Fighter Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Fighter'), (SELECT featureid FROM feature WHERE name = 'Extra Attack'), 5),
--Monk--
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Monk Unarmored Defense'), 1),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Martial Arts'), 1),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Ki'), 2),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Unarmored Movement'), 2),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Monastic Tradation'), 3),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Delect Missiles'), 3),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Monk Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Slow Fall'), 4),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Extra Attack'), 5),
((SELECT classid FROM class WHERE name = 'Monk'), (SELECT featureid FROM feature WHERE name = 'Stunning Strike'), 5),

((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Cleric Proficiencies'), 1),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Cleric Spellcasting'), 1),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Channel Divinity'), 2),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Channel Divinity Turn Undead'), 2),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Cleric Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Cleric'), (SELECT featureid FROM feature WHERE name = 'Destroy Undead'), 5),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Proficiencies'), 1),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Spellcasting'), 1),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Spellcasting Ability'), 1),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Ritual Casting'), 1),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Wild Shape'), 2),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Circle'), 2),
((SELECT classid FROM class WHERE name = 'Druid'), (SELECT featureid FROM feature WHERE name = 'Druid Ability Score Improvement'), 4),
((SELECT classid FROM class WHERE name = 'Wizard'), (SELECT featureid FROM feature WHERE name = 'Wizard Proficiencies'), 1),
((SELECT classid FROM class WHERE name = 'Wizard'), (SELECT featureid FROM feature WHERE name = 'Wizard Spellcasting'), 1),
((SELECT classid FROM class WHERE name = 'Wizard'), (SELECT featureid FROM feature WHERE name = 'Arcane Recovery'), 1),
((SELECT classid FROM class WHERE name = 'Wizard'), (SELECT featureid FROM feature WHERE name = 'Arcane Tradition'), 2),
((SELECT classid FROM class WHERE name = 'Wizard'), (SELECT featureid FROM feature WHERE name = 'Wizard Ability Score Improvement'), 4);
((SELECT classid FROM class WHERE name = 'Warlock'), (SELECT featureid FROM feature WHERE name = 'Warlock Proficiencies'), 1),



INSERT INTO subclassfeature (subclassid, featureid, characterlevel) VALUES 
((SELECT subclassid FROM subclass WHERE name = 'Path of the Berserker'), (SELECT featureid FROM feature WHERE name = 'Berserker Frenzy'), 3),
((SELECT subclassid FROM subclass WHERE name = 'College of Valor'), (SELECT featureid FROM feature WHERE name = 'College of Valor Bonus Proficiencies'), 3),
((SELECT subclassid FROM subclass WHERE name = 'College of Valor'), (SELECT featureid FROM feature WHERE name = 'Combat Inspiration'), 3),
((SELECT subclassid FROM subclass WHERE name = 'Life Domain'), (SELECT featureid FROM feature WHERE name = 'Life Domain Bonus Proficiency'), 1),
((SELECT subclassid FROM subclass WHERE name = 'Life Domain'), (SELECT featureid FROM feature WHERE name = 'Disciple of Life'), 1),
((SELECT subclassid FROM subclass WHERE name = 'Life Domain'), (SELECT featureid FROM feature WHERE name = 'Channel Divinity Preserve Life'), 2),
((SELECT subclassid FROM subclass WHERE name = 'Life Domain'), (SELECT featureid FROM feature WHERE name = 'Channel Divinity Preserve Life'), 2),
((SELECT subclassid FROM subclass WHERE name = 'Champion'), (SELECT featureid FROM feature WHERE name = 'Improved Critical'), 3),
((SELECT subclassid FROM subclass WHERE name = 'Circle of the Moon'), (SELECT featureid FROM feature WHERE name = 'Combat Wild Shape'), 2),
((SELECT subclassid FROM subclass WHERE name = 'Circle of the Moon'), (SELECT featureid FROM feature WHERE name = 'Circle Forms'), 2),
((SELECT subclassid FROM subclass WHERE name = 'School of Evocation'), (SELECT featureid FROM feature WHERE name = 'Evocation Savant'), 2),
((SELECT subclassid FROM subclass WHERE name = 'School of Evocation'), (SELECT featureid FROM feature WHERE name = 'Sculpt Spells'), 2);



INSERT INTO racefeature (raceid, featureid) VALUES 
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarf Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarf Speed')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Darkvision')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Resilience')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Combat Training')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Dwarven Tool Proficiency')),
((SELECT raceid FROM race WHERE name = 'Dwarf'), (SELECT featureid FROM feature WHERE name = 'Stonecutting')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Ability Score Increase')),
((SELECT raceid FROM race WHERE name = 'Elf'), (SELECT featureid FROM feature WHERE name = 'Elf Languages')),
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
((SELECT raceid FROM race WHERE name = 'Halfling'), (SELECT featureid FROM feature WHERE name = 'Halfling Nimbleness'));


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
((SELECT subraceid FROM subrace WHERE name = 'Stout'), (SELECT featureid FROM feature WHERE name = 'Stout Resilience'));

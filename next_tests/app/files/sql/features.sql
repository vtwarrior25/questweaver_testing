/*
'None', 'Proficiency', 'Action', 'Speed', 'Ability Score', 'Ability Action', 'Defense', 'Condition', 'Skill');
*/
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
('Dwarven Toughness', 'Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.', 'None'), -- TODO
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


INSERT INTO actionfeature (featureid, uses, usesperlevel, recovery) VALUES 
(),


INSERT INTO attackfeature (featureid, attackid) VALUES 
(),


INSERT INTO classactionfeature (featureid, level, uses, recovery) VALUES 
(),


INSERT INTO conditionfeature (featureid, conditionid) VALUES 
(),


INSERT INTO defensefeature (featureid, defenseid, defensestatus) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarven Resilience'), (SELECT defenseid FROM defense WHERE name = 'Poison'), 'Resistant'),


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


INSERT INTO speedfeature (featureid, speed) VALUES 
((SELECT featureid FROM feature WHERE name = 'Dwarf Speed', 25)),
((SELECT featureid FROM feature WHERE name = 'Elf Speed', 30)),
((SELECT featureid FROM feature WHERE name = 'Fleet of Foot', 35)),
((SELECT featureid FROM feature WHERE name = 'Gnome Speed', 25)),


INSERT INTO spellfeature (featureid, spellid) VALUES 
(),







INSERT INTO classfeature (classid, featureid, characterlevel) VALUES 
((SELECT classid FROM class WHERE name = ''), );


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




INSERT INTO subclassfeature (subclassid, featureid, characterlevel) VALUES 
();


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

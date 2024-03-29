# QuestWeaver
QuestWeaver is a DnD server.

## How to Install
Look at [Next Instructions](./next.md) for installation help.


## Style Guidelines

### Text
- Tab = 2 spaces

### Naming

#### HTML Classes, IDs, and Names
- Camelcase, first letter of first word is lowercase, first letter of subsequent words is uppercase, no spaces (ie. camelCase, not CamelCase or camelcase or camel case). 
- Names of fields are all lower case with no spaces, dashes, or underscores.

#### Javascript
- Function names are camelcase
- Variable names are all lowercase.

#### SQL
- Table names and col names are all lowercase with no spaces.
- Primary keys are named `tablenameid`, where `tablename` is the name of the containing table. For example, the primary key of the `race` table is `raceid`.
- Foreign key columns are named the same as the primary key they are referencing. For example, a FK column would be called `defenseid` if it contains references to the PK `defenseid` of the table `defense` 
- All other columns are named after what they contain without the table name. For example, the name column of the table defense is called `name`, not `defensename`.



## TODO

### UI (Lead: Nick)
- [ ] How can I make it so that when the checkbox of a weapon is checked, it not only sends an update to the server, but it also causes the Actions section to grab the actions from the server again, or to somehow get the new action.
- [x] How can I make it so that information is pushed to the player, such as chat messages, log messages, and other similar things?  
- [x] Should the turn order controls be hidden for all players who aren't the DM?
  - Don't hide them (they aren't hidden)
- [ ] Map
  - [ ] Look into different solutions for making an interactive map (currently using HTML5/JS Canvas, which sucks)
    - [ ] PixiJS 
      - [ ] [Tutorial](https://blog.logrocket.com/getting-started-pixijs-react-create-canvas/)
      - [ ] [Pixi Dragging Example](https://pixijs.com/examples/events/dragging)
      - [ ] [PixiReact](https://pixijs.io/pixi-react/)
      - [ ] [Dragging in ReactPixi](https://roxgarage.medium.com/react-pixi-pt-1-dragging-a99f8e78f486)
      - [ ] [ReactPixi Dragging Example](https://codepen.io/inlet/pen/qBdjvdP) 
- [ ] Make the formatting of things look good
  - [ ] Character sheet layout
  - [ ] Map section layout
- [x] How will we make the page load differently for the DM vs normal players
- [x] Fix roll results
- [ ] Monster Group Form
  - [ ] Working on making the form update state anytime something changes, so that we can replace the state when duplicating another monster group
    - [x] Each field in the form should be tied to one of the fields in the `formdata` state object
- [ ] Character Creator
  - [ ] Grab the race/class features for each and show them in the character creator sections
    - [ ] Will be implemented in [getcharactercreatorinfo.js](app\lib\getcharactercreatorinfo.js)
    - [ ] Tables within features will be written in HTML and within the feature description
  - [x] Create equipment section
  - [x] Create description section (copy from [notesmenu.jsx](./app/main/NotesMenu.jsx))


### Server (Lead: Stirling) 
- [x] How do we want to organize server functions? 
  - [ ] Should we put them all in one file?
  - [x] Should the file/files be within the `/app/main` folder, within the `/app` folder, or within the `/app/lib` folder?
    - [x] Move the server files to `/app/lib`
  - [ ] Group categories of functions into the same file (eg. spell actions)
- [ ] Login
  - [ ] Figure out how to pass characterid, userid, and isDM to client/React (specifically `/app/main/page.jsx`)
- [ ] Optimization
  - [ ] How will server actions be optimized to reduce both client and server resources?
  - [ ] How will smaller data structures such as turn order get pushed between multiple clients when the DM ends a turn?

#### Specific Functions
- [x] setHealth
- [x] diceRoll
- [x] addLogEntry/getLogEntries
- [x] addChatEntry/getChatEntries
- [x] getCharacterInfo
- [x] addItemToInventory (to character inventory)
- [x] createItem
- [x] createWeapon
- [x] prepareSpell
- [x] unprepareSpell
- [x] getInventory
- [x] getPreparedSpells
- [x] getAllItems
- [ ] addMonsterGroupFromForm

### Database (Lead: Carter)
- [ ] Set database tables which don't need to be modified at runtime (class, race, skill) to immutable
- [ ] Finish creating init info for tables (list of tables to make data for in [`dbinit.sql`](./app/files/sql/dbinitdata.sql)`)
- [ ] Where should we store prepared spells for a character?
- [x] How will we store race/subrace and class/subclass info about a character?
  - **In the playercharacter table?**
  - In seperate tables for each (race, subrace, class, subclass)?
  - In a single seperate table with columns for playercharacter id and for each item
- [ ] Consider making `ability` and `skill` tables into enums
  - [ ] *Do that!*
  - [ ] **We aren't doing that anymore**


### Administrative

#### Login Process
- Login Page
  - They enter username and password
  - If they enter a valid set of credentials, they are brought to character selection screen
  - User ID is passed on
- Character Selection Screen
  - They can select from the list of existing characters that they have created, or create a new character
  - User ID and Character ID are passed on 
- Main Window
  - Loads up the character sheet with their data
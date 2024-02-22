# QuestWeaver
QuestWeaver is a DnD server.

## How to Install
Place all of the files in a folder, then navigate to "./CharacterSheet.html" with your web browser, or double-click on "CharacterSheet.html" to open it.


## Style Guidelines

### Text
- Tab = 2 spaces

### Naming

#### HTML Classes, IDs, and Names
Camelcase, first letter of first word is lowercase, first letter of subsequent words is uppercase, no spaces (ie. camelCase, not CamelCase or camelcase or camel case). 
Names of fields are all lower case with no spaces, dashes, or underscores.

#### Javascript
Function names are camelcase, variable names are all lowercase.

#### SQL
Table names and row names are all lowercase, underscores for spaces 


## TODO

### UI (Lead: Nick)
- [ ]  

### Server (Lead: Stirling) 
- [ ] How do we want to organize server functions? 
  - [ ] Should we put them all in one file?
  - [ ] Should the file/files be within the `/app/main` folder, within the `/app` folder, or within the `/app/lib` folder?

#### Specific Functions
- [ ] setHealth
- [ ] diceRoll
- [ ] addLogEntry
- [x] getCharacterInfo
- [ ] 

### Database (Lead: Carter)
- [ ] Set database tables which don't need to be modified at runtime (class, race, skill) to immutable
- [ ] Finish creating init info for tables (list of tables to make data for in [`dbinit.sql`](./app/files/sql/dbinitdata.sql)`)

### Administrative
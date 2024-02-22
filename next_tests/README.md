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
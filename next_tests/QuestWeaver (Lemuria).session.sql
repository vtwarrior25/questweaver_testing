SELECT c.playerid, c.playercharacterid, c.name AS charname, r.name AS charrace, cl.name AS charclassname, c.characterlevel AS charlevel FROM playercharacter c
    JOIN race r ON c.race = r.raceid
    JOIN class cl ON c.class = cl.classid
WHERE c.playerid = 10;

SELECT * from playercharacter;
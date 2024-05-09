import React, { useState, useEffect, useContext} from 'react';
import { PlayerCharacterContext } from './Contexts';
import { setCharacterNotes } from '../lib/setcharacterinfo';
import { getCharacterNotes } from '../lib/getcharacterinfo';

function NotesMenu() {
  const playercharacterid = useContext(PlayerCharacterContext);
  const [sectionorder, setSectionOrder] = useState(["Organizations", "Allies", "Enemies", "Backstory", "Other"])

  const [notessections, setNotesSections] = useState([
    {
      order: 0,
      sectionname: "Organizations",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      order: 1,
      sectionname: "Allies",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      order: 2,
      sectionname: "Enemies",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      order: 3,
      sectionname: "Backstory",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      order: 4,
      sectionname: "Other",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
  ])

  useEffect(() => {
    console.log("Getting character notes!");
    getCharacterNotes(playercharacterid)
    .then((result) => {
      console.log(result);
      setNotesSections([...result]);
    })
    .catch((error) => {
      console.error("Error retrieving notes from server: " + error);
    })
  }, [playercharacterid]
  );

  
  /*
  useEffect(() => {
    console.log("Setting notes on server!");
    console.log(notessections);
    setCharacterNotes(playercharacterid, notessections)
    .catch((error) => {
      console.error("Error setting notes on server: " + error);
    });
  }, [notessections]
  );
  */
  


  const updateTextArea = (sectionname, text) => {
    let sections = notessections.filter((section) => section.sectionname !== sectionname);
    let order = notessections.filter((section) => section.sectionname === sectionname)[0].order;
    let modsection = {
      order: order,
      sectionname: sectionname,
      sectiontext: text,
    }
    setNotesSections([...sections, modsection].sort((a,b) => {return a.order - b.order}));
    // Set notes on server
    setCharacterNotes(playercharacterid, notessections)
    .catch((error) => {
      console.error("Error setting notes on server: " + error);
    });
  }


  return ( 
    <div className="notesMenu characterInventoryAreaSection">
      {notessections.map((notessection, index) =>
      <div key={index} className="notesSection">
        <span>{notessection.sectionname}</span>
        <textarea onChange={(e) => updateTextArea(notessection.sectionname, e.target.value)} value={notessection.sectiontext}></textarea>
      </div>
      )}
    </div>
  );
}

export default NotesMenu;
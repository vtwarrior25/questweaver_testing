import React, { useState, useEffect } from 'react';

function NotesMenu() {

  const [sectionorder, setSectionOrder] = useState(["Organizations", "Allies", "Enemies", "Backstory", "Other"])

  const [notessections, setNotesSections] = useState([
    {
      sectionname: "Organizations",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      sectionname: "Allies",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      sectionname: "Enemies",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      sectionname: "Backstory",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
    {
      sectionname: "Other",
      sectiontext: "Epic beans action to the maximum moments scenario",
    },
  ])

  useEffect(() => {
    getNotes();
  }, []
  );


  const updateTextArea = (sectionname, text) => {
    let sections = notessections.filter((section) => section.sectionname !== sectionname);
    let modsection = {
      sectionname: sectionname,
      sectiontext: text,
    }
    console.log(sections);
    setNotesSections([...sections, modsection]);
  }

  // Gets spells from the server
  const getNotes = () => {
    console.log("Getting spells!");
  }

  return ( 
    <div className="notesMenu characterInventoryAreaSection">
      {notessections.map((notessection, index) =>
      <div key={index} className="notesSection">
        <span>{notessection.sectionname}</span>
        <textarea onChange={(e) => updateTextArea(notessection.sectionname, e.target.value)} defaultValue={notessection.sectiontext}></textarea>
      </div>
      )}
    </div>
  );
}

export default NotesMenu;
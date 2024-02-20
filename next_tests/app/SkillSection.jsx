import React, { useEffect, useState} from "react";
import SkillRow from './SkillRow'

function SkillSection (setRollResults){
    
  const[skills, setSkills] = useState([
    {
      skillname: "Acrobatics",
      skillmod: "Dex",
      skillprof: false,
      skillbonus: 2,
    }, 
    {
      skillname: "Animal Handling",
      skillmod: "Wis",
      skillprof: true,
      skillbonus: 3,
    }, 
    {
      skillname: "Arcana",
      skillmod: "Int",
      skillprof: false,
      skillbonus: -1,
    }, 
    {
      skillname: "Athletics",
      skillmod: "Str",
      skillprof: false,
      skillbonus: 3,
    }, 
    {
      skillname: "Deception",
      skillmod: "Cha",
      skillprof: false,
      skillbonus: 0,
    }, 
    {
      skillname: "History",
      skillmod: "Int",
      skillprof: false,
      skillbonus: -1,
    }, 
    {
      skillname: "Insight",
      skillmod: "Wis",
      skillprof: true,
      skillbonus: 1,
    }, 
    {
      skillname: "Intimidation",
      skillmod: "Cha",
      skillprof: false,
      skillbonus: 0,
    }, 
    {
      skillname: "Investigation",
      skillmod: "Int",
      skillprof: false,
      skillbonus: -1,
    }, 
    {
      skillname: "Medicine",
      skillmod: "Wis",
      skillprof: false,
      skillbonus: +1,
    }, 
    {
      skillname: "Nature",
      skillmod: "Int",
      skillprof: false,
      skillbonus: -1,
    }, 
    {
      skillname: "Perception",
      skillmod: "Wis",
      skillprof: true,
      skillbonus: +3,
    }, 
    {
      skillname: "Performance",
      skillmod: "Cha",
      skillprof: false,
      skillbonus: 0,
    }, 
    {
      skillname: "Persuasion",
      skillmod: "Cha",
      skillprof: false,
      skillbonus: 0,
    }, 
    {
      skillname: "Religion",
      skillmod: "Int",
      skillprof: false,
      skillbonus: 0,
    }, 
    {
      skillname: "Sleight of Hand",
      skillmod: "Dex",
      skillprof: false,
      skillbonus: +2
    }, 
    {
      skillname: "Stealth",
      skillmod: "Dex",
      skillprof: true,
      skillbonus: 2,
    }, 
    {
      skillname: "Survival",
      skillmod: "Wis",
      skillprof: false,
      skillbonus: 3,
    },
  ]);
  const[alignments, setAlignments] = useState([]);
    
  const getSkills = () => {
    fetch(`http://localhost:3000/api/getcharacterinfo?infotype=skill`)
        .then(res => res.json())
        .then(res => setSkills(res.skills));
    fetch(`http://localhost:3000/api/testdb`)
    .then(res => res.json())
    .then(res => setAlignments(res));
  }

  useEffect(() => {
    getSkills();
  }, []
  );
    
  return (
    <div className="skillsBox frontElement">
      <table className="skillsTable">
        <thead>
          <tr>
            <th>Prof</th>
            <th>Mod</th>
            <th>Skill</th>
            <th>Bonus</th>
          </tr>
        </thead>
        <tbody>
          {skills && skills.length > 0 && skills.map((skill) => <SkillRow key={skill.skillname} name={skill.skillname} mod={skill.skillmod} prof={skill.skillprof} bonus={skill.skillbonus} setRollResults={setRollResults}/>)}
          {alignments && alignments.length > 0 && alignments.map((alignment, index) => 
            <tr key={index}>
              <td>{alignment.alignment_name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SkillSection;
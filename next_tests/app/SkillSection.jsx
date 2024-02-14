import React, { useEffect, useState} from "react";
import SkillRow from './SkillRow'

function SkillSection (setRollResults){
    
  const[skills, setSkills] = useState([]);
    
  const getSkills = () => {
    fetch(`http://localhost:3000/api/getcharacterinfo?infotype=skill`)
        .then(res => res.json())
        .then(res => setSkills(res.skills));
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
          {skills.map((skill) => <SkillRow key={skill.skillname} name={skill.skillname} mod={skill.skillmod} prof={skill.skillprof} bonus={skill.skillbonus} setRollResults={setRollResults}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default SkillSection;
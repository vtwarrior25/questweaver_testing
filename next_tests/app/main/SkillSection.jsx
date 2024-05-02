import React, { useContext, useEffect, useState} from "react";
import SkillRow from './SkillRow'
import { getSkills, getProfBonus } from "../lib/getcharacterinfo";
import { PlayerCharacterContext } from "./Contexts";

function SkillSection (setRollResults){

  const playercharacterid = useContext(PlayerCharacterContext);
    
  const [profbonus, setProfBonus] = useState(0); 

  const[skills, setSkills] = useState([
    {
      name: "Acrobatics",
      mod: "Dex",
      prof: false,
      bonus: 2,
    }, 
    {
      name: "Animal Handling",
      mod: "Wis",
      prof: true,
      bonus: 3,
    }, 
    {
      name: "Arcana",
      mod: "Int",
      prof: false,
      bonus: -1,
    }, 
    {
      name: "Athletics",
      mod: "Str",
      prof: false,
      bonus: 3,
    }, 
    {
      name: "Deception",
      mod: "Cha",
      prof: false,
      bonus: 0,
    }, 
    {
      name: "History",
      mod: "Int",
      prof: false,
      bonus: -1,
    }, 
    {
      name: "Insight",
      mod: "Wis",
      prof: true,
      bonus: 1,
    }, 
    {
      name: "Intimidation",
      mod: "Cha",
      prof: false,
      bonus: 0,
    }, 
    {
      name: "Investigation",
      mod: "Int",
      prof: false,
      bonus: -1,
    }, 
    {
      name: "Medicine",
      mod: "Wis",
      prof: false,
      bonus: +1,
    }, 
    {
      name: "Nature",
      mod: "Int",
      prof: false,
      bonus: -1,
    }, 
    {
      name: "Perception",
      mod: "Wis",
      prof: true,
      bonus: +3,
    }, 
    {
      name: "Performance",
      mod: "Cha",
      prof: false,
      bonus: 0,
    }, 
    {
      name: "Persuasion",
      mod: "Cha",
      prof: false,
      bonus: 0,
    }, 
    {
      name: "Religion",
      mod: "Int",
      prof: false,
      bonus: 0,
    }, 
    {
      name: "Sleight of Hand",
      mod: "Dex",
      prof: false,
      bonus: +2
    }, 
    {
      name: "Stealth",
      mod: "Dex",
      prof: true,
      bonus: 2,
    }, 
    {
      name: "Survival",
      mod: "Wis",
      prof: false,
      bonus: 3,
    },
  ]);
  const[alignments, setAlignments] = useState([]);
    

  useEffect(() => {
    getSkills(playercharacterid)
    .then((results) => {
      setSkills([...results])
    }).catch((error) => {
      console.error("Error retrieving skills: " + error);
    });
    getProfBonus(playercharacterid)
    .then((results) => {
      setProfBonus(results);
    }).catch((error) => {
      console.error("Error retrieving skills: " + error);
    });
  }, [playercharacterid]
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
          {skills && skills.length > 0 && skills.map((skill, index) => <SkillRow key={index} name={skill.name} mod={skill.mod} prof={skill.prof} bonus={skill.bonus} profbonus={profbonus} setRollResults={setRollResults}/>)}
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
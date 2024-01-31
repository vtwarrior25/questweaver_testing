import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import DiceRollButton from "./DiceRollButton";


function ActionsMenu({setRollResults}) {

  useEffect(() => {
    getActions();
  }, []
  );

  // Gets actions from the server
  const getActions = () => {
    console.log("Getting actions!");
  }

  const modPos = (bonus) => {
    if (bonus > 0) {
      return `+ ${bonus}`;
    } else if (bonus < 0) {
      return `- ${bonus}`;
    } else {
      return "";
    }
  }

  const [actions, setActions] = useState([
    {
      name: "Mace",
      range: "5 ft",
      hitdc: 5,
      effectdie: 12,
      effectdienum: 1,
      effectbonus: 3,
      notes: "Simple",
    },
    {
      name: "Dagger",
      range: "20 (60)",
      hitdc: 6,
      effectdie: 4,
      effectdienum: 1,
      effectbonus: 3,
      notes: "Simple, Light, Thrown",
    },
    {
      name: "Unarmed Strike",
      range: "5 ft",
      hitdc: 5,
      effectdie: 0,
      effectdienum: 0,
      effectbonus: 4,
      notes: "",
    },
  ])

  return ( 
    <div class="actionsMenu characterInventoryAreaSection">
      <div className="actionsSection">
        <Table size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Range</th>
              <th>Hit/DC</th>
              <th>Effect</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => 
              <tr>
                <td>{action.name}</td>
                <td>{action.range}</td>
                <td>{action.hitdc}</td>
                <td><DiceRollButton name={action.name} rolltype={"Attack"} die={20} num={1} mod={action.hitdc} setRollResults={setRollResults} text={action.hitdc}></DiceRollButton></td>
                <td><DiceRollButton name={action.name} rolltype={"Damage"} die={action.effectdie} num={action.effectdienum} mod={action.effectbonus} setRollResults={setRollResults} text={`${action.effectdienum}d${action.effectdie} ${modPos(action.effectbonus)} `}></DiceRollButton></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="bonusActionsSection"></div>
    </div>
  );
}

export default ActionsMenu;
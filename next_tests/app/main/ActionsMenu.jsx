import { Table } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import DiceRollButton from "./DiceRollButton";
import { ModPosContext } from "./Contexts";


function ActionsMenu({setRollResults}) {

  const modPos = useContext(ModPosContext);

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
  ]);


  useEffect(() => {
    getActions();
  }, []
  );

  // Gets actions from the server
  const getActions = () => {
    console.log("Getting actions!");
  }


  return ( 
    <div className="actionsMenu characterInventoryAreaSection">
      <div className="actionsSection">
        <span className="characterSheetSectionTitle">Actions</span>
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
            {actions.map((action, index) => 
              <tr key={index}>
                <td>{action.name}</td>
                <td>{action.range}</td>
                <td><DiceRollButton name={action.name} rolltype={"Attack"} die={20} num={1} mod={action.hitdc} setRollResults={setRollResults} text={modPos(action.hitdc)} advantage={true}></DiceRollButton></td>
                <td><DiceRollButton name={action.name} rolltype={"Damage"} die={action.effectdie} num={action.effectdienum} mod={action.effectbonus} setRollResults={setRollResults} text={`${action.effectdienum}d${action.effectdie} ${modPos(action.effectbonus, true)} `} advantage={true}></DiceRollButton></td>
                <td>{action.notes}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="bonusActionsSection">
        <span className="characterSheet">Actions</span>

      </div>
    </div>
  );
}

export default ActionsMenu;
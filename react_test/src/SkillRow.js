import React, { Component } from "react";
import DiceRollButton from "./DiceRollButton";

class SkillRow extends Component {
  constructor(props) {
    super(props);
    }


  render () {
    return (
    <tr>
      <td><input type="checkbox" readOnly={true} checked={this.props.prof}></input></td>
      <td className="skillMod">{this.props.mod}</td>
      <td className="skillName">{this.props.name}</td>
      <td className="skillBonus">
        <DiceRollButton name={this.props.name} rolltype="Skill" die="20" num="1" mod={this.props.bonus} />
      </td>
    </tr>
    );
  }
};

export default SkillRow;
import React, { Component } from "react";
import DiceRollButton from "./DiceRollButton";

class SkillRow extends Component {
  constructor(props) {
    super(props);
    }


  render () {
    return (
      <div className="abilityBox">
        <div className="abilityLabel">{this.props.abbrev}</div>
        <DiceRollButton className="abilityModifierBox" name={this.props.name} rolltype="Ability" die="20" num="1" mod={this.props.bonus} />
        <div class="oval">
          <h4>{this.props.score}</h4>
        </div>
      </div>
    );
  }
};

export default SkillRow;
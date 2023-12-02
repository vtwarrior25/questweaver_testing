import React, { Component, memo } from "react";
import AbilityBox from './AbilityBox'

class AbilitySection extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.getAbilities.bind(this);
    this.state = {
      checkResponse: {
        abilities: []
        }
      }
    }

  getAbilities() {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=ability`)
        .then(res => res.json())
        .then(res => this.setState({ checkResponse: res }));
  }

  componentDidMount () {
    this.getAbilities();
  }
  
  render () {
    return (
        <div className="abilityContainer frontElement">
          {this.state.checkResponse.abilities.map((ability) => <AbilityBox name={ability.abilityname} abbrev={ability.abilityabbrev} score={ability.abilityscore} bonus={ability.abilitybonus} setRollResults={this.props.setRollResults} rollresults={this.props.rollresults}/>)}
        </div>
    );
  }
};

export default memo(AbilitySection);
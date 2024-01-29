import React, { Component, memo } from "react";
import SkillRow from './SkillRow'

class SkillSection extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.getSkills.bind(this);
    this.state = {
      checkResponse: {
        skills: []
        }
      }
    }

  getSkills() {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=skill`)
        .then(res => res.json())
        .then(res => this.setState({ checkResponse: res }));
  }

  componentDidMount () {
    this.getSkills();
  }
  
  render () {
    //console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
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
              {this.state.checkResponse.skills.map((skill) => <SkillRow key={skill.skillmod} name={skill.skillname} mod={skill.skillmod} prof={skill.skillprof} bonus={skill.skillbonus} setRollResults={this.props.setRollResults}/>)}
            </tbody>
          </table>
        </div>
    );
  }
};

export default memo(SkillSection);
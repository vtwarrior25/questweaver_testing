import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AbilitySection from './AbilitySection';
import HealthSection from './HealthSection';
import SkillSection from './SkillSection';
import StaticStatsBox from './StaticStatsBox';
import RollResultsSection from './RollResultsSection';
import ManualDiceRoller from './ManualDiceRoller';
import CharacterInventoryArea from './CharacterInventoryArea';
import SavingThrowSection from './SavingThrowSection'
import DefensesConditionsBox from './DefensesConditionsBox';

function CharacterSheet({showboxes, setShowBoxes, setRollResults, rollresults}) {
  
  useEffect(() => {
    console.log('Updating visibility');
  }, [showboxes]);
  
  return ( 
    <div>
      <Row>
        <Col>
          {showboxes.showAbilitySection && <AbilitySection show={showboxes.AbilitySection} setRollResults={setRollResults} rollresults={rollresults}/>}
        </Col>
        <Col>
          <HealthSection></HealthSection>
        </Col>
      </Row>
      <Row>
        <Col>
          <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults}></StaticStatsBox>
        </Col>
      </Row>
      <Row>
        <Col>
          <DefensesConditionsBox></DefensesConditionsBox>
          <ManualDiceRoller setRollResults={setRollResults}></ManualDiceRoller>
        </Col> 
        <Col>
          <SavingThrowSection setRollResults={setRollResults} rollresults={rollresults}></SavingThrowSection>
        </Col>
      </Row>    
      <Row>
        <Col>
          <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
        </Col>
        <Col>
          <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>
        </Col>
      </Row>
    </div>
  );
}

export default CharacterSheet;
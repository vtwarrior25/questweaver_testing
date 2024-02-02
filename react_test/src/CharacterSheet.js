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
          {showboxes.showabilitysection && <AbilitySection show={showboxes.AbilitySection} setRollResults={setRollResults} rollresults={rollresults}/>}
        </Col>
        <Col>
          {showboxes.showhealthsection && <HealthSection></HealthSection>}
        </Col>
      </Row>
      <Row>
        <Col>
          {showboxes.showDefensesConditions && <DefensesConditionsBox></DefensesConditionsBox>}
          <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults}></StaticStatsBox>
          <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
        </Col>
        <Col>
          <SavingThrowSection setRollResults={setRollResults} rollresults={rollresults}></SavingThrowSection>
          <ManualDiceRoller setRollResults={setRollResults}></ManualDiceRoller>
          <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>
        </Col>
      </Row>
      <Row>
        <Col>
          
        </Col> 
        <Col>
          
        </Col>
      </Row>    
      <Row>
        <Col>
          
        </Col>
        <Col>
         
        </Col>
      </Row>
    </div>
  );
}

export default CharacterSheet;
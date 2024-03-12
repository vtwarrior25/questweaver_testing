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
    <div className='characterSheet'>
    {/*
      {showboxes.showabilitysection && <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>}
      {showboxes.showhealthsection && <HealthSection></HealthSection>}
      {showboxes.showsavingthrowsection && <SavingThrowSection setRollResults={setRollResults} rollresults={rollresults}></SavingThrowSection>}
      {showboxes.showstaticstatsbox && <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults} collapse="yes"></StaticStatsBox>}
      {showboxes.showmanualdiceroller && <ManualDiceRoller setRollResults={setRollResults} vertical={true} nice={true}></ManualDiceRoller>}
      {showboxes.showskillsection && <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>}
      {showboxes.showcharacterinventoryarea && <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>}
    */}
      <Row>
        <Col>
          {showboxes.showabilitysection && <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>}
        </Col>
        <Col>
          {showboxes.showhealthsection && <HealthSection></HealthSection>}
        </Col>
        <Col>
          {showboxes.showsavingthrowsection&& <SavingThrowSection></SavingThrowSection>}
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Row>
            <Col xs={7}>
              {showboxes.showstaticstatsbox && <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults} collapse="yes"></StaticStatsBox>}
            </Col>
            <Col xs={5}>
              {showboxes.showmanualdiceroller && <ManualDiceRoller setRollResults={setRollResults} vertical={true} nice={true}></ManualDiceRoller>}
            </Col>
          </Row>
          <Row>
            {showboxes.showcharacterinventoryarea && <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>}
          </Row>
        </Col>
        <Col>
          {showboxes.showskillsection && <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>}
        </Col>
      </Row>
    </div>
  );
}

export default CharacterSheet;
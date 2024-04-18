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
    {/*
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
            <Col>
              {showboxes.showstaticstatsbox && <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults} collapse="yes"></StaticStatsBox>}
            </Col>
            <Col>
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
  */}
  {/*
      <div className='characterSheetRow'>
        <div className='characterSheetCol'>
          {showboxes.showabilitysection && <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>}
        </div>
        <div className='characterSheetCol'>
          {showboxes.showhealthsection && <HealthSection></HealthSection>}
        </div>
        <div className='characterSheetCol'>
          {showboxes.showsavingthrowsection&& <SavingThrowSection></SavingThrowSection>}
        </div>
      </div>
      <div className='characterSheetRow'>
        <div className='characterSheetCol'>
          <div className='characterSheetRow'>
            <div className='characterSheetCol'>
              {showboxes.showstaticstatsbox && <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults} collapse="yes"></StaticStatsBox>}
            </div>
            <div className='characterSheetCol'>
              {showboxes.showmanualdiceroller && <ManualDiceRoller setRollResults={setRollResults} vertical={true} nice={true}></ManualDiceRoller>}
            </div>
          </div>
          <div className='characterSheetRow'>
            {showboxes.showcharacterinventoryarea && <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>}
          </div>
        </div>
        <div className='characterSheetCol'>
          {showboxes.showskillsection && <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>}
        </div>
      </div>
      */}
      <div className='characterSheetCol'>
        <div className='characterSheetRow'>
          {showboxes.showabilitysection && <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>}
          {showboxes.showhealthsection && <HealthSection></HealthSection>}
        </div>
        <div className='characterSheetRow'>
          {showboxes.showstaticstatsbox && <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults} collapse="yes"></StaticStatsBox>}
          {showboxes.showmanualdiceroller && <ManualDiceRoller setRollResults={setRollResults} vertical={true} nice={true}></ManualDiceRoller>}
        </div>
        {showboxes.showcharacterinventoryarea && <CharacterInventoryArea setRollResults={setRollResults}></CharacterInventoryArea>}
      </div>
      <div className='characterSheetCol'>
        {showboxes.showsavingthrowsection&& <SavingThrowSection></SavingThrowSection>}
        {showboxes.showskillsection && <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>}
      </div>
    </div>

    
  
  );
}

export default CharacterSheet;
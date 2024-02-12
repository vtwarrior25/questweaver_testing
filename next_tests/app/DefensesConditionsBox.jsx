import { Button } from 'react-bootstrap';

function DefensesConditionsBox() {
  return ( 
    <div className="defensesConditionsBox frontElement">
      <div className="defensesSection defenseConditionsSubSection">
        <Button variant='secondary' size='sm'>Short Rest</Button>
        <div className='defenseConditionsInfo'>
          <span className='characterSheetSectionTitle'>Defenses</span>
          <div>
            Magical Sleep
          </div>
        </div>
      </div>
      <div className='conditionsSection defenseConditionsSubSection'>
        <div className='restButtons'>
          <Button variant='secondary' size='sm'>Long Rest</Button>
        </div>
        <div className='defenseConditionsInfo'>
          <span className='characterSheetSectionTitle'>Conditions</span>
          <div>
            Dry Heaving
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefensesConditionsBox;
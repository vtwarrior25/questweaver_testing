import { Row, Col } from 'react-bootstrap';
import AbilitySection from './AbilitySection';
import HealthSection from './HealthSection';

function CharacterSheet({setRollResults, rollresults}) {
  return ( 
    <div>
      <Row>
        <Col>
          <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>
        </Col>
        <Col>
          <HealthSection></HealthSection>
        </Col>
      </Row>
    </div>
  );
}

export default CharacterSheet;
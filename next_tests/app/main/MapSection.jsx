import { Row, Col } from 'react-bootstrap';
import Map from "./Map";
import PixiMap from './PixiMap';
import TurnOrder from "./TurnOrderBox";
import Chat from "./Chatbox";

function MapSection({showboxes, setShowBoxes}) {
  return ( 
    <div className="mapSection">
      <Row>
        <Col>
          {showboxes.showturnorderbox &&<TurnOrder></TurnOrder>}
        </Col>
        <Col>
          <PixiMap></PixiMap>
        </Col>
        <Col>
          <Chat></Chat>
        </Col>
      </Row>
    </div>
   );
}

export default MapSection;
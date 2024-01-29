import { Row, Col } from 'react-bootstrap';
import Map from "./Map.js";
import TurnOrder from "./TurnOrderBox.js";
import Chat from "./Chatbox.js";

function MapSection() {
  return ( 
    <div className="mapSection">
      <Row>
        <Col>
          <TurnOrder></TurnOrder>
        </Col>
        <Col>
          <Map></Map>
        </Col>
        <Col>
          <Chat></Chat>
        </Col>
      </Row>
    </div>
   );
}

export default MapSection;
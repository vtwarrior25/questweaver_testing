import { Row, Col } from 'react-bootstrap';
import Map from "./Map";
import PixiMap from './PixiMap';
import TurnOrder from "./TurnOrderBox";
import Chat from "./Chatbox";
import RollResultsSection from "./RollResultsSection";

function MapSection({showboxes, setShowBoxes, rollresults}) {
  /*
  return ( 
    <div className="mapSection">
      {/*
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
      <Row>
        <RollResultsSection rollresults={rollresults}/>
      </Row>
      }
      {showboxes.showturnorderbox &&<TurnOrder/>}
      {showboxes.showmap && <PixiMap/>}
      {showboxes.showchat && <Chat/>}
      {showboxes.showrollresults && <RollResultsSection rollresults={rollresults}/>}
    </div>
  );
  */
  /*
  return (
    <div className="mapSectionFlex">
      {showboxes.showturnorderbox &&<TurnOrder/>}
      {showboxes.showmap && <PixiMap/>}
      {showboxes.showchat && <Chat/>}
      {showboxes.showrollresults && <RollResultsSection rollresults={rollresults}/>}
    </div>
  );
  */

  return (
    <div className="mapSectionFlexBetter">
      <div className='mapSectionCol'>
        {showboxes.showturnorderbox &&<TurnOrder/>}
      </div>
      <div className='mapSectionCol'>
        {showboxes.showmap && <PixiMap/>}
      </div>
      <div className='mapSectionCol'>
        {showboxes.showchat && <Chat/>}
        {showboxes.showrollresults && <RollResultsSection rollresults={rollresults}/>}
      </div>
    </div>
  );
}

export default MapSection;
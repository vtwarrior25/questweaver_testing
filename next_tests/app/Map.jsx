/*
Overall code structure and ideas from this repo:
https://github.com/TheMartinCrabtree/react-canvas-demo
*/

import React, { useState } from 'react';
import { useCanvas } from './useCanvas';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function Map(){

  const [coords, setCoords, zoom, setZoom, canvasRef, canvasWidth, canvasHeight] = useCanvas();
  const [selectedtool, setSelectedTool] = useState("select");


  const handleCanvasClick = (event, tool) => {
    const currentcoord = {x: event.clientX, y: event.clientY, tool: tool}
    setCoords([...coords, currentcoord]);
  }

  const handleClearCanvas = () => {
    setCoords([]);
    console.log("Cleared map canvas");
  }

  return ( 
    <div className="mapCanvasWrapper">
      <div className='mapToolButtons'>
        <ToggleButtonGroup type="radio" name="maptoolbuttons">
          <ToggleButton variant="secondary" value={0} onClick={() => setSelectedTool("color")}>C</ToggleButton>
          <ToggleButton variant="secondary" value={1} onClick={() => setSelectedTool("select")}>S</ToggleButton>
          <ToggleButton variant="secondary" value={2} onClick={() => setSelectedTool("square")}>■</ToggleButton>
          <ToggleButton variant="secondary" value={3} onClick={() => setSelectedTool("circle")}>●</ToggleButton>
          <ToggleButton variant="secondary" value={4} onClick={() => setSelectedTool("ellipse")}>⬬</ToggleButton>
          <ToggleButton variant="secondary" value={5} onClick={() => setSelectedTool("text")}>T</ToggleButton>
        </ToggleButtonGroup>
        <div className='mapZoomButtons'>
          <Button onClick={() => setZoom(zoom-5)}>-</Button>
          <input type="text" size={4} value={zoom} onChange={(e) => setZoom(Number(e.target.value))}></input>
          <Button onClick={() => setZoom(zoom+5)}>+</Button>
        </div>
        <Button variant="danger" onClick={() => handleClearCanvas()}>X</Button>
      </div>
      <canvas
        className='mapCanvas frontElement'
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={(e) => handleCanvasClick(e, selectedtool)}
      />
    </div>
  );
}

export default Map;
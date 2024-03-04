import { useState, useContext, useEffect, useCallback } from 'react';
import { MapScaleContext, PlayerCharacterContext } from './Contexts';
import { Stage, Container, Sprite, Graphics, Text} from '@pixi/react';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { MapRectangle, MapCircle, MapEllipse, MapText } from './Shapes'; 


function PixiMap() {

  const [mapshapes, setMapShapes] = useState([
    {
      shape: "rectangle",
      color: 0xff0000,
      x: 300,
      y: 300,
      width: 50,
      height: 50,
    },
    {
      shape: "rectangle",
      color: 0x00ff00,
      x: 200,
      y: 300,
      width: 50,
      height: 50,
    },
    {
      shape: "circle",
      color: 0x00ff00,
      x: 100,
      y: 100,
      radius: 40,
    },
    {
      shape: "ellipse",
      color: 0x00ff00,
      x: 400,
      y: 400,
      width: 60,
      height: 40,
    },
    {
      shape: "text",
      text: "8==D",
      x: 20,
      y: 20,
      anchor: 0.7,
    },
  ]);
  const [selectedtool, setSelectedTool] = useState("select");
  const [currentcolor, setCurrentColor] = useState();
  const [mapsize, setMapSize] = useState({
    width: 0,
    height: 0,
    scale: 100,
    backgroundcolor: 0xefd1ef
  })
  const playercharacterid = useContext(PlayerCharacterContext);

  useEffect(() => {
    setMapSize({width: 500, height: 500, scale: 100});
    }, []
  );

  useEffect(() => {

  })

  const scaleMap = (scale) => {
    setMapSize({...mapsize, scale: scale});
    console.log(scale);
  }


  const addShape = (e) => {
    let newobject;
    switch (selectedtool) {
      case "rectangle":
        newobject = {
          shape: "rectangle",
          color: currentcolor,
          x: 1,
          y: 1,
          width: 1,
          height: 1
        }
        break;
      case "circle":
        newobject = {
          shape: "circle",
          color: currentcolor,
          x: 1,
          y: 1,
          radius: 1
        }
        break;
      case "ellipse":
        newobject = {
          shape: "ellipse",
          color: currentcolor,
          x: 1,
          y: 1,
          width: 1,
          height: 1
        }
        break;
      case "text":
        newobject = {
          shape: "text",
          color: currentcolor,
          x: 1,
          y: 1,
          width: 1,
          height: 1
        }
        break;
      default:
        newobject = {
          shape: "rectangle",
          color: currentcolor,
          x: 1,
          y: 1,
          width: 1,
          height: 1
        }
        break;
    }
    return newobject;
  }
  

  const handleClick = (e) => {
    if (selectedtool === "select") {
      // Allow for dragging elements around
    } else {
      // All for click and drag to create shapes
      let object = addShape(e);

    }
  }




  return ( 
    <div className="mapCanvasWrapper">
    <div className='mapToolButtons'>
      <ToggleButtonGroup type="radio" name="maptoolbuttons">
        <ToggleButton variant="secondary" value={0} onClick={() => setSelectedTool("color")}>C</ToggleButton>
        <ToggleButton variant="secondary" value={1} onClick={() => setSelectedTool("select")}>S</ToggleButton>
        <ToggleButton variant="secondary" value={2} onClick={() => setSelectedTool("rectangle")}>■</ToggleButton>
        <ToggleButton variant="secondary" value={3} onClick={() => setSelectedTool("circle")}>●</ToggleButton>
        <ToggleButton variant="secondary" value={4} onClick={() => setSelectedTool("ellipse")}>⬬</ToggleButton>
        <ToggleButton variant="secondary" value={5} onClick={() => setSelectedTool("text")}>T</ToggleButton>
      </ToggleButtonGroup>
      <div className='mapZoomButtons'>
        <Button onClick={() => scaleMap(mapsize.scale - 5)}>-</Button>
        <input type="text" size={4} value={String(mapsize.scale)} onChange={(e) => scaleMap(Number(e.target.value))}></input>
        <Button onClick={() => scaleMap(mapsize.scale + 5)}>+</Button>
      </div>
      <Button variant="danger" onClick={() => handleClearCanvas()}>X</Button>
    </div>
    <MapScaleContext.Provider value={mapsize.scale}>
      <Stage
        width={mapsize.width}
        height={mapsize.height}
        options={{backgroundColor: mapsize.backgroundcolor}}
      >
        {mapshapes.map((shape, index) => {
          console.log(shape);
          if (shape.shape === "rectangle") {
            return <MapRectangle key={index} shapeinfo={shape}></MapRectangle>
          } else if (shape.shape === "circle") {
            return <MapCircle key={index} shapeinfo={shape}></MapCircle>
          } else if (shape.shape === "ellipse") {
            return <MapEllipse key={index} shapeinfo={shape}></MapEllipse>
          } else if (shape.shape === "text") {
            return <MapText key={index} shapeinfo={shape}></MapText>
          }
        })}
        <Text text="Beans" anchor={0.5} x={150} y={150}></Text>
      </Stage>
    </MapScaleContext.Provider>
    </div>
  );
}

export default PixiMap;
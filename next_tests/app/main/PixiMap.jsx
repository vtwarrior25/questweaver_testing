import { useState, useContext, useEffect, useCallback } from 'react';
import { MapScaleContext, PlayerCharacterContext } from './Contexts';
import { Stage, Container, Sprite, Graphics, Text} from '@pixi/react';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { MapRectangle, MapCircle, MapEllipse, MapText, MapSprite} from './Shapes'; 


function PixiMap() {
  //const [dragTarget, setDragTarget] = useState(null);
  const [mapshapes, setMapShapes] = useState([
    {
      id: 0,
      shape: "rectangle",
      color: 0xff0000,
      x: 300,
      y: 300,
      width: 50,
      height: 50,
    },
    {
      id: 1,
      shape: "rectangle",
      color: 0x00ff00,
      x: 200,
      y: 300,
      width: 50,
      height: 50,
    },
    {
      id: 2,
      shape: "circle",
      color: 0x00ff00,
      x: 100,
      y: 100,
      radius: 40,
    },
    {
      id: 3,
      shape: "ellipse",
      color: 0x00ff00,
      x: 400,
      y: 400,
      width: 60,
      height: 40,
    },
    { 
      id: 4,
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

  /*
  const onDragMove = (e) => {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  const onDragStart = (e) => {
    this.alpha = 0.5;
    setDragTarget(e.event.target);
    app.stage.on('pointermove', onDragMove);
  }

  const onDragEnd = () => {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        setDragTarget(null);
    }
  }
*/
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

  const onDragStart = (event) => {
    console.log("dragstart");
    let sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
  };

  const onDragEnd = (event) => {
    console.log("dragend");
    let sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
  };

  const onDragMove = (event) => {
    console.log("dragmove");
    let sprite = event.currentTarget;
    if (sprite.dragging) {
      const newPosition = sprite.data.getLocalPosition(sprite.parent);
      console.log(newPosition);
      console.log(sprite);
      console.log(sprite.data);
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
      
    }
  };


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
            return <MapRectangle key={index} shapeinfo={shape} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}></MapRectangle>
          } else if (shape.shape === "circle") {
            return <MapCircle key={index} shapeinfo={shape}></MapCircle>
          } else if (shape.shape === "ellipse") {
            return <MapEllipse key={index} shapeinfo={shape}></MapEllipse>
          } else if (shape.shape === "text") {
            return <MapText key={index} shapeinfo={shape}></MapText>
          } else if (shape.shape === "sprite") {
            return <MapSprite key={index} shapeinfo={shape}></MapSprite>
          }
        })}
        <Text text="Beans" anchor={0.5} x={150} y={150} interactive={true} pointerdown={onDragStart} pointerup={onDragEnd} pointerupoutside={onDragEnd} pointermove={onDragMove}></Text>
        <Sprite image="../files/icon.jpg" anchor={0.5} scale={{x: 0.25, y: 0.25}} x={100} y={100} interactive={true} pointerdown={onDragStart} pointerup={onDragEnd} pointerupoutside={onDragEnd} pointermove={onDragMove}/>
      </Stage>
    </MapScaleContext.Provider>
    </div>
  );
}

export default PixiMap;
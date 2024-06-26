import { useState, useContext, useEffect, useCallback } from 'react';
import { MapScaleContext, PlayerCharacterContext } from './Contexts';
import { Stage, Container, Sprite, Graphics, Text} from '@pixi/react';
import { Button, Offcanvas, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { MapRectangle, MapCircle, MapEllipse, MapText, MapSprite} from './Shapes'; 
import { getMapData, updateMapData, updateAvatar, addMapData, getMapStats, updateMapStats, getBackgrounds } from '../lib/mapactions';

function PixiMap() {
  //const [dragTarget, setDragTarget] = useState(null);
  //<Sprite id={3} image="../files/icon.jpg" anchor={0.5} scale={{x: 0.25, y: 0.25}} x={100} y={100} interactive={true} pointerdown={onDragStart} pointerup={onDragEnd} pointerupoutside={onDragEnd} pointermove={onDragMove}/>
  const [mapshapes, setMapShapes] = useState([
    /*{
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
      text: "beans",
      x: 20,
      y: 20,
      anchor: 0.7,
    },
    */
    {
      mapdataid: 0,
      shape: 'sprite',
      image: '/avatars/bloke.jpg',
      scale: 0.25,
      x: 100,
      y: 100,
      visible: true,
      //text: '10',
    }
  ]);
  const [selectedtool, setSelectedTool] = useState("select");
  //const [currentcolor, setCurrentColor] = useState();
  const [mapsize, setMapSize] = useState({
    width: 500,
    height: 500,
    scale: 100,
    backgroundcolor: 0xefd1ef
  });


  const playercharacterid = useContext(PlayerCharacterContext);
  const [dragging, setDragging] = useState(false);
  const [draggingid, setDraggingID] = useState(0);
  const [pauseupdate, setPauseUpdate] = useState(false);
  const [storedtimerid, setTimerID] = useState(null);

  //const [mapbackground, setMapBackground] = useState("/backgrounds/wrfzdfc34u931-2013313820.jpg");
  const [mapbackgroundsize, setMapBackgroundSize] = useState( {
    background: "/backgrounds/wrfzdfc34u931-2013313820.jpg",
    x: 500,
    y: 500,
    scale: 100,
  });
  const [mapbackgroundlist, setMapBackgroundList] = useState([]);
  const [showmapsettings, setShowMapSettings] = useState(false);

  useEffect(() => {
    //setMapSize({width: 500, height: 500, scale: 100});
    }, []
  );

  useEffect(() => { 
    retrieveMapData();
    retrieveMapStats();
    retrieveBackgroundList();
    /*
    let timerid = setInterval(() => {
      retrieveMapStats();
      retrieveMapData(); 
    }, 3000);
    setTimerID(timerid);
    */
    toggleMapUpdates(false);
    }, []
  );

  const toggleMapUpdates = (toggle) => {
    //console.log("toggle map updates" + toggle);
    setPauseUpdate(toggle);
    if (toggle === true) {
      // Map updates are paused
      console.log("This should pause map updates");
      clearInterval(storedtimerid);
    } else {
      // Map updates are resumed
      console.log("This should resume map updates");
      let timerid = setInterval(() => {
        //retrieveMapStats();
        retrieveMapData(); 
      }, 3000);
      setTimerID(timerid);
    }
  }


  const retrieveBackgroundList = () => {
    getBackgrounds()
    .then((results) => {
      console.log(results);
      setMapBackgroundList([...results]);
      /*
      if (results.length > 0) {
        setMapBackgroundSize({...mapbackgroundsize, background: `/backgrounds/${results[0]}`});
      }
      */
    }).catch((error) => {
      console.error('Error retrieving map background list: ' + error);
    })
  }

  const retrieveMapData = () => {
    //if (pauseupdate !== true) {
      //console.log('Gaming');
      //console.log('Pauseupdate = ' + update);
      //console.log("retrieving map data");
      getMapData()
      .then((result) => {
        if (draggingid !== 0) {
          let resultexcludingdragging = result.filter((avatar) => avatar.mapdataid !== draggingid);
          console.log(resultexcludingdragging);
          setMapShapes([...resultexcludingdragging]);
        } else {
          setMapShapes([...result]);
        }
      }).catch((error) => {
        console.error("Error retrieving map data: " + error);
      });
    //}
  }

  const retrieveMapStats = () => {
    //if (pauseupdate !== true) {
      //console.log("retrieving map stats");
      getMapStats()
      .then((result) => {
        //setMapBackground(result.mapbackground);
        console.log(JSON.stringify(result, null, 4)); 
        setMapBackgroundSize({...result});
        //setMapSize({...result.mapsize});
      }).catch((error) => {
        console.error("Error retrieving map data: " + error);
      });
    //}
  }


  /*
  const pauseMapUpdates = () => {
    console.log("map updates should be pausing, beans");
    clearTimeout(storedtimerid);
    setPauseUpdate(true);
    let timerid = setTimeout(() => {setPauseUpdate(false); console.log("Setting the thing brothers beans")}, 2000);
    setTimerID(timerid);
  }
  */


  /*
  const scaleMap = (scale) => {
    setMapSize({...mapsize, scale: scale});
    //console.log(scale);
  }
  */


  const modifyMapStats = (mapstats) =>  {
    //pauseMapUpdates();    
    console.log("Updating map stats");
    console.log(mapstats.x);
    console.log(mapstats.y);
    console.log(mapstats.scale);
    console.log(mapstats.background);
    updateMapStats(mapstats.x, mapstats.y, mapstats.scale, mapstats.background)
    .catch((error) => {
      console.error("Error updating map stats: " + error);
    })
    /*
    updateMapStats(mapbackgroundsize.x, mapbackgroundsize.y, mapbackgroundsize.scale, mapbackgroundsize.background)
    .catch((error) => {
      console.error("Error updating map stats: " + error);
    })
    */
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
/*
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
*/

/*
  const handleClick = (e) => {
    if (selectedtool === "select") {
      // Allow for dragging elements around
    } else {
      // All for click and drag to create shapes
      let object = addShape(e);

    }
  }
*/

  const onDragStart = (event) => {
    //console.log("dragstart");
    let sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
    setDragging(true);
  };

  const onDragEnd = (event) => {
    //console.log("dragend");
    let sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
    
    //updateState(sprite.id, sprite.x, sprite.y);
    //setTimeout(setDraggingID(0));
    //setDragging(false);
  };

  const onDragMove = (event) => {
    //console.log("dragmove");
    //setDragging(true);
    let sprite = event.currentTarget;
    if (sprite.dragging) {
      //console.log(sprite);
      //console.log(sprite.id);
      const newPosition = sprite.data.getLocalPosition(sprite.parent);
      //console.log(newPosition);
      //console.log(sprite);
      //console.log(sprite.data);
      setDraggingID(sprite.id);
      
      if (sprite.x > mapsize.width) {
        sprite.x = mapsize.width;
      } else if (sprite.x <  0){
        sprite.x = 0;
      } else {
        sprite.x = newPosition.x;
      }
      if (sprite.y > mapsize.height) {
        sprite.x = mapsize.height;
      } else if (sprite.y <  0){
        sprite.y = 0;
      } else {
        sprite.y = newPosition.y;
      }
      console.log("Updating " + sprite.id);
      //sprite.x = newPosition.x;
      //sprite.y = newPosition.y;
      updateState(sprite.id, sprite.x, sprite.y);
      
    }
  };

  const updateState = (id, x, y) => {
    let statetoupdate = mapshapes.filter((mapshape) => mapshape.mapdataid === id);
    let statenottoupdate = mapshapes.filter((mapshape) => mapshape.mapdataid !== id);
    console.log('statetoupdate');
    console.log(JSON.stringify(statetoupdate, null, 4));
    console.log(JSON.stringify(statenottoupdate, null, 4));
    if (statetoupdate.length > 0) {
      console.log("ID = " + statetoupdate[0].mapdataid);
      let objecttoupdate = statetoupdate[0];
      objecttoupdate.x = x;
      objecttoupdate.y = y;
      setMapShapes([...statetoupdate, ...statenottoupdate]);
      updateMapData(id, x, y);
      //pauseMapUpdates();
    }
  } 


  return ( 
    <div className="mapCanvasWrapper">
      {/*
      <div className='mapToolButtons'>
      <ToggleButtonGroup type="radio" name="maptoolbuttons">
        <ToggleButton variant="secondary" value={0} onClick={() => setSelectedTool("color")}>C</ToggleButton>
        <ToggleButton variant="secondary" value={1} onClick={() => setSelectedTool("select")}>S</ToggleButton>
        <ToggleButton variant="secondary" value={2} onClick={() => setSelectedTool("rectangle")}>■</ToggleButton>
        <ToggleButton variant="secondary" value={3} onClick={() => setSelectedTool("circle")}>●</ToggleButton>
        <ToggleButton variant="secondary" value={4} onClick={() => setSelectedTool("ellipse")}>⬬</ToggleButton>
        <ToggleButton variant="secondary" value={5} onClick={() => setSelectedTool("text")}>T</ToggleButton>
      </ToggleButtonGroup>
      <div className='updateMapToggle frontElement'>
        <span>Freeze Map </span>
        <input type='checkbox' value={pauseupdate} onChange={() => setPauseUpdate(!pauseupdate)}></input>
      </div>
      <div className='mapZoomButtons'>
        <Button onClick={() => scaleMap(mapsize.scale - 5)}>-</Button>
        <input type="text" size={4} value={String(mapsize.scale)} onChange={(e) => scaleMap(Number(e.target.value))}></input>
        <Button onClick={() => scaleMap(mapsize.scale + 5)}>+</Button>
      </div>
      <Button variant="danger" onClick={() => handleClearCanvas()}>X</Button>
      </div>
      */}
      <Offcanvas show={showmapsettings} onHide={() => setShowMapSettings(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Map Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='mapSettingsSection'>
          {/*
          <label for="mapbackgroundselector">Map Background</label>
          <select name="mapbackgroundselector" value={mapbackgroundsize.background} onChange={(e) => {setMapBackgroundSize({...mapbackgroundsize, background:`/backgrounds/${e.target.value}`}); modifyMapStats({...mapbackgroundsize, background:`/backgrounds/${e.target.value}`})}}>
            {mapbackgroundlist.map((background, index) => 
              <option key={index} value={background}>{background}</option>
            )}
          </select>
          */}
          {/*
          <div className='mapSettingsItem'>
            <label for="mapwidth">Map Width</label>
            <input name="mapwidth" type="number" step="10" value={mapsize.width} onChange={(e) => {setMapSize({...mapsize, width: Number(e.target.value)}); modifyMapStats()}}></input>
          </div>
          <div className='mapSettingsItem'>
            <label for="mapheight">Map Height</label>
            <input name="mapheight" type="number" step="10" value={mapsize.height} onChange={(e) => {setMapSize({...mapsize, height: Number(e.target.value)}); modifyMapStats()}}></input>
          </div>
          */}
          <div className='mapSettingsItem'>
            <label for="backgroundsize">Background X</label>
            <input name="mapheight" type="number" step="10" value={mapbackgroundsize.x} onChange={(e) => {setMapBackgroundSize({...mapbackgroundsize, x: Number(e.target.value)}); modifyMapStats({...mapbackgroundsize, x: Number(e.target.value)})}}></input>
          </div>
          <div className='mapSettingsItem'>
            <label for="backgroundsize">Background Y</label>
            <input name="mapheight" type="number" step="10" value={mapbackgroundsize.y} onChange={(e) => {setMapBackgroundSize({...mapbackgroundsize, y: Number(e.target.value)}); modifyMapStats({...mapbackgroundsize, y: Number(e.target.value)})}}></input>
          </div>
          <div className='mapSettingsItem'>
            <label for="backgroundsize">Background Scale</label>
            <input name="mapheight" type="number" step="10" value={mapbackgroundsize.scale} onChange={(e) => {setMapBackgroundSize({...mapbackgroundsize, scale: Number(e.target.value)}); modifyMapStats({...mapbackgroundsize, scale: Number(e.target.value)})}}></input>
          </div>
          <div className='mapSettingsItem'>
            <span>Move Background</span>
            <table>
              <tr>
                <td></td>
                <td><Button onClick={() => {setMapBackgroundSize({...mapbackgroundsize, y: mapbackgroundsize.y + 10}); modifyMapStats({...mapbackgroundsize, y: mapbackgroundsize.y + 10})}}>↑</Button></td>
                <td></td>
              </tr>
              <tr>
                <td><Button onClick={() => {setMapBackgroundSize({...mapbackgroundsize, x: mapbackgroundsize.x + 10}); modifyMapStats({...mapbackgroundsize, x: mapbackgroundsize.x + 10})}}>←</Button></td>
                <td></td>
                <td><Button onClick={() => {setMapBackgroundSize({...mapbackgroundsize, x: mapbackgroundsize.x - 10}); modifyMapStats({...mapbackgroundsize, x: mapbackgroundsize.x - 10})}}>→</Button></td>
              </tr>
              <tr>
                <td></td>
                <td><Button onClick={() => {setMapBackgroundSize({...mapbackgroundsize, y: mapbackgroundsize.y - 10}); modifyMapStats({...mapbackgroundsize, y: mapbackgroundsize.y - 10})}}>↓</Button></td>
                <td></td>
              </tr>
            </table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="frontElement mapTopBar">
        <Button className="mapSettingsButton" size="sm" onClick={() => setShowMapSettings(true)}>Map Settings</Button>
        {/*<div>
          <label htmlFor="toggleMapUpdates">Pause Map Updates</label>
          <input type="checkbox" name='toggleMapUpdates' checked={pauseupdate} onChange={e => toggleMapUpdates(e.target.checked)}></input>
        </div>*/}
        <Button className="mapBackgroundRefreshButton" size="sm" onClick={() => {retrieveMapStats(); retrieveBackgroundList(); retrieveMapData();}}>Refresh Map</Button>
      </div>
      <MapScaleContext.Provider value={mapsize.scale}>
        <Stage
          width={mapsize.width}
          height={mapsize.height}
          options={{backgroundColor: mapsize.backgroundcolor}}
        >
          <Sprite
            image={mapbackgroundsize.background}
            scale={{x: mapbackgroundsize.scale/100, y: mapbackgroundsize.scale/100}}
            anchor={0.5}
            x={mapbackgroundsize.x}
            y={mapbackgroundsize.y}
          />
          {mapshapes.map((shape, index) => {
            //console.log(shape);
            /*
            if (shape.shape === "rectangle") {
              return <MapRectangle key={index} shapeinfo={shape} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}></MapRectangle>
            } else if (shape.shape === "circle") {
              return <MapCircle key={index} shapeinfo={shape}></MapCircle>
            } else if (shape.shape === "ellipse") {
              return <MapEllipse key={index} shapeinfo={shape}></MapEllipse>
            } else if (shape.shape === "text") {
              return <MapText key={index} shapeinfo={shape}></MapText>
              *
            } else */ if (shape.shape === "sprite" && shape.visible == true) {
              return <MapSprite key={index} shapeinfo={shape} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}></MapSprite>
            }
          })}
          {/*<Text text="Beans" anchor={0.5} x={150} y={150} interactive={true} pointerdown={onDragStart} pointerup={onDragEnd} pointerupoutside={onDragEnd} pointermove={onDragMove}></Text>*/}
        </Stage>
      </MapScaleContext.Provider>
    </div>
  );
}

export default PixiMap;
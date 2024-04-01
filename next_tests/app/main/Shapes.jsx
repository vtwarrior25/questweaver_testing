import React, { useCallback } from 'react';
import { Graphics, Text, Sprite } from '@pixi/react';
import { Color } from 'pixi.js';
//import { onDragStart } from '/app/main/PixiMap';


export function MapRectangle({shapeinfo, onDragStart, onDragMove, onDragEnd}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(shapeinfo.color);
      g.drawRect(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height);
      g.endFill();
    },
    [shapeinfo],
  );

  return <Graphics draw={draw} eventMode='static' interactive={true} pointerdown={onDragStart} pointerup={onDragEnd} pointerupoutside={onDragEnd} pointermove={onDragMove}/>;
}


export function MapCircle({shapeinfo}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(shapeinfo.color);
      g.drawCircle(shapeinfo.x, shapeinfo.y, shapeinfo.radius);
      /*
      g.beginFill(0x00ff00);
      console.log(shapeinfo);
      console.log(`${shapeinfo.x} ${shapeinfo.y} ${shapeinfo.radius}`)
      g.drawCircle(100, 100, 50);
      */
      g.endFill();
    },
    [shapeinfo],
  );

  return <Graphics draw={draw} eventMode='static'/>;
}


export function MapEllipse({shapeinfo}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(shapeinfo.color);
      g.drawEllipse(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height);
      g.endFill();
    },
    [shapeinfo],
  );

  //return <Graphics draw={draw} eventMode='static' cursor='pointer' onPointerDown={(onDragStart, this)}/>;
  return <Graphics draw={draw} eventMode='static' cursor='pointer'/>;
}


export function MapSprite({shapeinfo, onDragStart, onDragEnd, onDragMove}) {
  return <Sprite
    id={shapeinfo.id}
    image={shapeinfo.image}
    anchor={0.5}
    scale={{x: shapeinfo.scale, y: shapeinfo.scale}} 
    x={shapeinfo.x}
    y={shapeinfo.y}
    interactive={true}
    pointerdown={onDragStart} 
    pointerup={onDragEnd} 
    pointerupoutside={onDragEnd} 
    pointermove={onDragMove}
  />
}

export function MapText(shapeinfo) {
  return <Text
    text={shapeinfo.text}
    anchor={shapeinfo.anchor}
    x={shapeinfo.x}
    y={shapeinfo.y}
    eventMode='static'
  />;
}
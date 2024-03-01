import React, { useCallback } from 'react';
import { Graphics, Text } from '@pixi/react';
import { Color } from 'pixi.js';


export function MapRectangle({shapeinfo}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(shapeinfo.color);
      g.drawRect(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height);
      g.endFill();
    },
    [shapeinfo],
  );

  return <Graphics draw={draw} eventMode='static'/>;
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

  return <Graphics draw={draw} eventMode='static' onPointerDown={(onDragStart, this)}/>;
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

let dragTarget = null;

function onDragMove(event)
{
    if (dragTarget)
    {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart()
{
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd()
{
    if (dragTarget)
    {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}
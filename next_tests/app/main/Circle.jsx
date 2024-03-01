import React, { useCallback } from 'react';
import { Graphics } from '@pixi/react';

function Circle(props) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(props.color);
      g.drawCircle(props.x, props.y, props.radius);
      g.endFill();
    },
    [props],
  );

  return <Graphics draw={draw} />;
}

export default Circle;
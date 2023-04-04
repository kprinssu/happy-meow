import React from 'react';

import Led from '../led';

type GridProps = {
  frames: string[];
};

export default (props: GridProps) => {
  return (
    <div className="led-display">
      {props.frames.map((color, index) => (
        Led({ color: color })
      ))}
    </div>
  );
};

import React from 'react';

import Led from '../Led';

type GridProps = {
  frames: string[];
};

export default (props: GridProps) => {
  return (
    <div className="led-display">
      {props.frames.map((color) => (
        Led({ color: color })
      ))}
    </div>
  );
};

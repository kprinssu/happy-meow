import React from 'react';

import './Grid.css';
import Led from '../Led';

type GridProps = {
  frames: string[];
  frameNumber: number;
};

export default (props: GridProps) => {
  return (
    <div className="led-display" data-testid="display-led-grid" data-test-frame-number={props.frameNumber}>
      {props.frames.map((color) => (
        Led({ color: color })
      ))}
    </div>
  );
};

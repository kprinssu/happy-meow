import React from 'react';

import './Grid.css';
import Led from '../Led';

type GridProps = {
  frames: string[];
  frameNumber: number;
  gridClick: (ledIndex: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
};

export default (props: GridProps) => {
  return (
    <div className="led-display" data-testid="display-led-grid" data-test-frame-number={props.frameNumber}>
      {props.frames.map((color, index) => (
        Led({ color: color, index: index, gridClick: props.gridClick })
      ))}
    </div>
  );
};

import React from 'react';
import { v4 as uuid } from 'uuid';

import './Led.css';

type LedProps = {
  color: string;
  index: number;
  gridClick: (ledIndex: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => void;
};

export default (props: LedProps) => {
  return (
    <button key={uuid()} className="led" style={{backgroundColor: props.color,}} onClick={(e) => props.gridClick(e, props.index)} data-testid={`display-led-${props.index}`}>
    </button>
  );
};

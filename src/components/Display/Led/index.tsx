import React from 'react';
import { v4 as uuid } from 'uuid';

import './Led.css';

type LedProps = {
  color: string;
  index: number;
  gridClick: (ledIndex: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
};

export default (props: LedProps) => {
  return (
    <div key={uuid()} className="led" style={{backgroundColor: props.color}} onClick={(e) => props.gridClick(e, props.index)}>

    </div>
  );
};

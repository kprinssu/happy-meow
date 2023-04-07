import React from 'react';
import { v4 as uuid } from 'uuid';

import './index.css';

type LedProps = {
  color: string;
};

export default (props: LedProps) => {
  return (
    <div key={uuid()} className="led" style={{backgroundColor: props.color}}>

    </div>
  );
};

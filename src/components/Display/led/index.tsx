import React from 'react';
import './index.css';

type LedProps = {
  color: string;
};

export default (props: LedProps) => {
  return (
    <div className="led" style={{backgroundColor: props.color}}>

    </div>
  );
};

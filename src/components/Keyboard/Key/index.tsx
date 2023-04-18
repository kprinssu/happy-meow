import React from 'react';

import './Key.css';

type KeyProps = {
  label: string;
  size?: number;
  style?: React.CSSProperties;
};

export default (props: KeyProps) => {
  const size = props.size || 1;
  const style = {
    ...props.style,
    height: `${size} em`,
    width: `${size}em`,
  };

  return (
    <div id={`key-${props.label}`} className="key" style={style}>
    </div>
  );
};

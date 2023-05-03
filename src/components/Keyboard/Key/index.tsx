import React from 'react';

import './Key.css';

export interface KeyProps {
  label: string;
  value: string;
  led?: string;
  clickFn?: () => void;
  size?: string;
  style?: React.CSSProperties;
}

export default (props: KeyProps) => {
  const size = props.size || 1;
  const style = {
    ...props.style,
    height: `${size} em`,
    width: `${size}em`,
  };

  return (
    <div id={`key-${props.label}`} className="key" style={style} data-key-value={props.value}>
      <div className="key-label">{props.label}</div>
    </div>
  );
};

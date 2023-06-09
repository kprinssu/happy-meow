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

  const ledStyle = (): React.CSSProperties => {
    const newStyle = {
      ...props.style,
      height: `${size} em`,
      width: `${size}em`,
    };

    if (props.led) {
      newStyle.backgroundColor = props.led;
    }

    return newStyle;
  };

  return (
    <div id={`key-${props.label}`} className="key" style={ledStyle()} data-key-value={props.value} onClick={props?.clickFn} data-testid={`key-${props.label || props.value}`}>
      <div className="key-label">{props.label}</div>
    </div>
  );
};

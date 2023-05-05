import React, { useState, useRef, useEffect } from 'react';
import { ColorResult, SliderPicker } from '@hello-pangea/color-picker';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { KeyProps } from '../Keyboard/Key';
import Keyboard, { setupLedProperties, KeyboardProps } from '../Keyboard';


export default () => {
  const dispatch = useAppDispatch();
  const keyboardLeds = useAppSelector(state => state.keyboardLeds);

  const MAX_FRAMES = 100;
``;
  const frame = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameSlider = useRef<HTMLInputElement>(null);
  const speedSlider = useRef<HTMLInputElement>(null);

  const [currentLayer, setCurrentLayer] = useState<number>(0);
  const [paused, setPaused] = useState(true);
  const [frames, setFrames] = useState(keyboardLeds.layers[currentLayer].frames[frame.current].frame_RGB);
  const [speed, setSpeed] = useState(250);
  const [color, setColor] = useState('#ffffff');
  const [maxFrame, setMaxFrame] = useState(Math.min(keyboardLeds.layers[currentLayer].frames.length - 1, MAX_FRAMES));

  const handleKeyClick = (index: number) => {
    console.log(`Key ${index} clicked`);
  };

  const keyProperties = setupLedProperties(frames, handleKeyClick);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };

  const changeSelectedColor = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sliderFrame = parseInt(event.target.value);
    frame.current = sliderFrame;
    setFrames(keyboardLeds.layers[currentLayer].frames[sliderFrame].frame_RGB);
  };

  useEffect(() => {
    // TODO: Set up the animation clear and start functions
  }, [paused, speed]);

  return (
    <div className="keyboard-led">
      <Keyboard {...keyboardProps} />

      <div className="keyboard-led-controls">

        <input type="range" name="frame-slider" min="1" max={maxFrame} ref={frameSlider} data-testid="display-frame-slider" className="w-full" onChange={handleFrameChange} />


        <div className="color-picker my-0 mt-4 mx-auto">
          <SliderPicker color={color} onChangeComplete={changeSelectedColor} />
          <label htmlFor="color-picker-input" className="mr-1">Hex Color</label>
          <input type="text" id="color-picker-input" name="color-picker-input" data-testid="display-colour-input"  value={color} onChange={handleColorChange} />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { ColorResult, SliderPicker } from '@hello-pangea/color-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLayer } from '../../store/keyboardLed/actions';

import Keyboard, { setupLedProperties, KeyboardProps } from '../Keyboard';

import './KeyboardLed.css';
import { layer } from '@fortawesome/fontawesome-svg-core';


export default () => {
  const dispatch = useAppDispatch();
  const keyboardLeds = useAppSelector(state => state.keyboardLeds);

  const MAX_FRAMES = 100;

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
    const newLedLayer = JSON.parse(JSON.stringify(keyboardLeds.layers[currentLayer]));
    newLedLayer.frames[frame.current].frame_RGB[index] = color;

    dispatch(setLayer(newLedLayer));
    setFrames(newLedLayer.frames[frame.current].frame_RGB);
  };

  const keyProperties = setupLedProperties(frames, handleKeyClick);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };

  const changeLayer = (layer: number) => {
    setCurrentLayer(layer);
    setFrames(keyboardLeds.layers[layer].frames[frame.current].frame_RGB);
    setMaxFrame(Math.min(keyboardLeds.layers[layer].frames.length - 1, MAX_FRAMES));
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

  const handlePausePlayClick = () => {
    setPaused(!paused);
  };

  const clearAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = null;
  };

  const startAnimation = () => {
    const ref = setInterval(() => {
      nextFrame();
    }, speed);

    intervalRef.current = ref;
  };

  const nextFrame = () => {
    let currentFrame = frame.current + 1;

    if (currentFrame >= keyboardLeds.layers[currentLayer].frames.length) {
      currentFrame = 0;
    }

    frame.current = currentFrame;
    //setFrameNumber(currentFrame);
    setFrames(keyboardLeds.layers[currentLayer].frames[frame.current].frame_RGB);
  };

  useEffect(() => {
    // TODO: Set up the animation clear and start functions
    clearAnimation();

    if (!paused) {
      startAnimation();
    }
  }, [paused, speed, currentLayer]);

  return (
    <div className="keyboard-led">
      <ul className='inline-block'>
        <li onClick={() => changeLayer(0)} data-testid="display-layer-frame-1" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 1</li>
        <li onClick={() => changeLayer(1)} data-testid="display-layer-frame-2" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 2</li>
        <li onClick={() => changeLayer(2)} data-testid="display-layer-frame-3" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 3</li>
      </ul>

      <Keyboard {...keyboardProps} />

      <div className="keyboard-frame-infobar w-full">
        <div></div>
        <div className='keyboard-frame-infobar-controls'>
          <button onClick={() => handlePausePlayClick()} data-testid="display-pause-play" className="my-0 mx-auto">{paused ?
            <FontAwesomeIcon icon={faPlay} className="h-4 w-4" /> :
            <FontAwesomeIcon icon={faPause} className="h-4 w-4" />}
          </button>

          <input type="range" name="frame-slider" min="1" max={maxFrame} ref={frameSlider} value={frame.current} data-testid="keyboard-led-frame-slider" className="w-full" onChange={handleFrameChange} />
        </div>

        <div></div>
      </div>

      <div className="color-picker my-0 mt-4 mx-auto">
        <SliderPicker color={color} onChangeComplete={changeSelectedColor} />
        <label htmlFor="color-picker-input" className="mr-1">Hex Color</label>
        <input type="text" id="color-picker-input" name="color-picker-input" data-testid="display-colour-input" value={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

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
  const [frames, setFrames] = useState(keyboardLeds.layers[currentLayer].frames[0].frame_RGB);
  const [speed, setSpeed] = useState(250);
  const [color, setColor] = useState('#ffffff');
  const [maxFrame, setMaxFrame] = useState(keyboardLeds.layers[currentLayer].frames.length);

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
    setMaxFrame(keyboardLeds.layers[layer].frames.length);
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
    setFrames(keyboardLeds.layers[currentLayer].frames[frame.current].frame_RGB);
  };

  const addFrame = () => {
    if (keyboardLeds.layers[currentLayer].frames.length >= MAX_FRAMES) {
      return;
    }

    const newFrame = keyboardLeds.layers[currentLayer].frames[frame.current].frame_RGB;
    const newLedLayer = JSON.parse(JSON.stringify(keyboardLeds.layers[currentLayer]));
    newLedLayer.frames.splice(frame.current + 1, 0, { frame_RGB: newFrame });
    dispatch(setLayer(newLedLayer));
    setFrames(newFrame);
    setMaxFrame(newLedLayer.frames.length);
  };

  const removeFrame = () => {
    if (keyboardLeds.layers[currentLayer].frames.length < 2) {
      return;
    }

    const newLedLayer = JSON.parse(JSON.stringify(keyboardLeds.layers[currentLayer]));

    newLedLayer.frames.splice(frame.current, 1);
    frame.current = Math.max(frame.current - 1, 0);

    dispatch(setLayer(newLedLayer));
    setMaxFrame(newLedLayer.frames.length);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const speed = (100 - parseInt(event.target.value)) * 2;
    setSpeed(speed);
  };

  useEffect(() => {
    clearAnimation();

    if (!paused) {
      startAnimation();
    }
  }, [paused, speed, currentLayer, frame]);

  return (
    <div className="keyboard-led mt-2 ml-1 text-sm" data-testid="keyboard-led" data-test-frame-number={frame.current} data-test-frame-count={maxFrame}>
      <ul className='inline-block'>
        <li onClick={() => changeLayer(0)} data-testid="keyboard-led-layer-frame-1" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 1</li>
        <li onClick={() => changeLayer(1)} data-testid="keyboard-led-layer-frame-2" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 2</li>
        <li onClick={() => changeLayer(2)} data-testid="keyboard-led-layer-frame-3" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 3</li>
      </ul>

      <div className="keyboard-frame-infobar keyboard-top-infobar mb-2 mt-2 text-base">
        <span data-testid="keyboard-layer">Layer {currentLayer + 1}</span>
        <div className="keyboard-frame-infobar-speed">
          <span>Speed</span>
          <input type="range" name="play-speed" min="1" max="100" data-testid="keyboard-speed-slider" ref={speedSlider}  onChange={handleSpeedChange} />
        </div>
        <span data-testid="keyboard-frame" className="text-right">Frame {frame.current + 1}</span>
      </div>

      <Keyboard {...keyboardProps} />

      <div className="keyboard-frame-infobar w-full">
        <div></div>
        <div className='keyboard-frame-infobar-controls'>
          <button onClick={() => handlePausePlayClick()} data-testid="keyboard-pause-play" className="my-0 mx-auto">{paused ?
            <FontAwesomeIcon icon={faPlay} className="h-4 w-4" /> :
            <FontAwesomeIcon icon={faPause} className="h-4 w-4" />}
          </button>

          <div className='flex w-full'>
            <button onClick={removeFrame}><FontAwesomeIcon icon={faMinus} data-testid="keyboard-remove-frame" /></button>
            <input type="range" name="frame-slider" min="1" max={maxFrame - 1} ref={frameSlider} value={frame.current} data-testid="keyboard-led-frame-slider" className="w-full" onChange={handleFrameChange} />
            <button onClick={addFrame}><FontAwesomeIcon icon={faPlus} data-testid="keyboard-insert-frame" /></button>
          </div>
        </div>

        <div></div>
      </div>

      <div className="color-picker my-0 mt-4 mx-auto">
        <SliderPicker color={color} onChangeComplete={changeSelectedColor} />
        <label htmlFor="color-picker-input" className="mr-1">Hex Color</label>
        <input type="text" id="color-picker-input" name="color-picker-input" data-testid="keyboard-colour-input" value={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

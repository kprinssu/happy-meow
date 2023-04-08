import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorResult, SliderPicker } from '@hello-pangea/color-picker';
import {
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from '../../hooks';

import './Display.css';
import Grid from './Grid';


let frame = 0;
let currentLayer = 0;

export default () => {
  const displayLayers = useAppSelector(state => state.keyboardDisplay);

  const width = 40;
  const height = 5;

  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(true);
  const [frames, setFrames] = useState(displayLayers.layers[currentLayer].frames[0].frame_RGB);
  const [speed, setSpeed] = useState(250);
  const [color, setColor] = useState('#ffffff');
  const [frameNumber, setFrameNumber] = useState(0);
  const [maxFrame, setMaxFrame] = useState(displayLayers.layers[currentLayer].frames.length - 1);

  const frameSlider = useRef<HTMLInputElement>(null);

  const nextFrame = () => {
    frame += 1;

    if (frame >= displayLayers.layers[currentLayer].frames.length) {
      frame = 0;
    }

    setFrameNumber(frame);
    setFrames(displayLayers.layers[currentLayer].frames[frame].frame_RGB);
  };

  const playAnimation = (): NodeJS.Timeout => {
    return setInterval(() => {
      nextFrame();
    }, speed);
  };

  const startAnimation = () => {
    const ref = playAnimation();
    setIntervalRef(ref);
    setPaused(true);
  };

  const clearAnimation = () => {
    if (intervalRef !== null) {
      clearInterval(intervalRef);
    }
    setIntervalRef(null);
    setPaused(false);
  };

  const handlePausePlay = () => {
    setPaused(!paused);

    if (paused) {
      clearAnimation();
    }

    if (!paused) {
      startAnimation();
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const speed = (100 - parseInt(event.target.value)) * 2;
    setSpeed(speed);
    clearAnimation();
    startAnimation();
  };

  const changeLayer = (layer: number) => {
    currentLayer = layer;
    setMaxFrame(displayLayers.layers[currentLayer].frames.length - 1);
    clearAnimation();
    startAnimation();
  };

  const handleChange = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
  };

  const handleFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    frame = event.target.valueAsNumber;

    if (frame >= displayLayers.layers[currentLayer].frames.length) {
      frame = displayLayers.layers[currentLayer].frames.length - 1;
    }

    setFrameNumber(frame);
    clearAnimation();
    setFrames(displayLayers.layers[currentLayer].frames[frame].frame_RGB);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  useEffect(() => {
    handlePausePlay();
  }, []);

  return (
    <div className="display-editor ml-1 mt-2 text-sm" data-testid="display-editor">
      <ul className='inline-block'>
        <li onClick={() => changeLayer(0)} data-testid="display-layer-frame-1" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 1</li>
        <li onClick={() => changeLayer(1)} data-testid="display-layer-frame-2" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 2</li>
        <li onClick={() => changeLayer(2)} data-testid="display-layer-frame-3" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Frame: 3</li>
      </ul>

      <div className="display-editor-view text-base mt-2">
        <div className="display-editor-infobar mb-2">
          <span data-testid="display-layer">Layer {currentLayer + 1}</span>
          <div className="display-editor-infobar-speed">
            <span>Speed</span>
            <input type="range" name="play-speed" min="1" max="100" data-testid="display-speed-slider" onChange={handleSpeedChange} />
          </div>
          <span data-testid="display-frame" className="text-right">Frame {frameNumber + 1}</span>
        </div>

        <Grid frames={frames} frameNumber={frame} />
      </div>
      <div className="display-frame-infobar w-full">
        <div></div>
        <div className="display-frame-infobar-controls">
          <button onClick={() => handlePausePlay()} data-testid="display-pause-play" className="my-0 mx-auto">{paused ?
            <FontAwesomeIcon icon={faPause}/> :
            <FontAwesomeIcon icon={faPlay} />}
          </button>
          <input type="range" name="frame-slider" min="1" max={maxFrame} ref={frameSlider} data-testid="display-frame-slider" onChange={handleFrameChange} />
        </div>
        <div></div>
      </div>

      <div className="color-picker my-0 mt-4 mx-auto">
        <SliderPicker color={color} onChangeComplete={handleChange} />
        <label htmlFor="color-picker-input">Hex Color</label>
        <input type="text" id="color-picker-input" name="color-picker-input" value={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

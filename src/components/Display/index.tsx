import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorResult, SliderPicker } from '@hello-pangea/color-picker';
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLayer } from '../../store/keyboardDisplay/actions';

import './Display.css';
import Grid from './Grid';

export default () => {
  const dispatch = useAppDispatch();
  const displayLayers = useAppSelector(state => state.keyboardDisplay);

  const MAX_FRAME_COUNT = 100;

  const [currentLayer, setCurrentLayer] = useState(0);
  const [paused, setPaused] = useState(true);
  const [frames, setFrames] = useState(displayLayers.layers[currentLayer].frames[0].frame_RGB);
  const [speed, setSpeed] = useState(250);
  const [color, setColor] = useState('#ffffff');
  const [frameNumber, setFrameNumber] = useState(0);
  const [maxFrame, setMaxFrame] = useState(displayLayers.layers[currentLayer].frames.length - 1);

  const frame = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameSlider = useRef<HTMLInputElement>(null);
  const speedSlider = useRef<HTMLInputElement>(null);

  const nextFrame = () => {
    let currentFrame = frame.current + 1;

    if (currentFrame >= displayLayers.layers[currentLayer].frames.length) {
      currentFrame = 0;
    }

    frame.current = currentFrame;
    setFrameNumber(currentFrame);
    setFrames(displayLayers.layers[currentLayer].frames[currentFrame].frame_RGB);
  };

  const startAnimation = () => {
    const ref = setInterval(() => {
      nextFrame();
    }, speed);

    intervalRef.current = ref;
  };

  const clearAnimation = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = null;
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const speed = (100 - parseInt(event.target.value)) * 2;
    setSpeed(speed);
  };

  const changeLayer = (layer: number) => {
    setCurrentLayer(layer);
    setMaxFrame(displayLayers.layers[currentLayer].frames.length - 1);
  };

  const changeSelectedColor = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
  };

  const handleFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newFrame = event.target.valueAsNumber;

    if (newFrame >= displayLayers.layers[currentLayer].frames.length) {
      newFrame = displayLayers.layers[currentLayer].frames.length - 1;
    }

    frame.current = newFrame;
    setFrameNumber(newFrame);
    setFrames(displayLayers.layers[currentLayer].frames[newFrame].frame_RGB);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const addFrame = () => {
    if (displayLayers.layers[currentLayer].frames.length > MAX_FRAME_COUNT) {
      return;
    }

    const newFrame = displayLayers.layers[currentLayer].frames[frame.current];
    const newDisplayLayer = JSON.parse(JSON.stringify(displayLayers.layers[currentLayer]));

    newDisplayLayer.frames.splice(frame.current + 1, 0, newFrame);
    dispatch(setLayer(newDisplayLayer));
    setMaxFrame(Math.min(displayLayers.layers[currentLayer].frames.length - 1, MAX_FRAME_COUNT));
  };

  const removeFrame = () => {
    const newDisplayLayer = JSON.parse(JSON.stringify(displayLayers.layers[currentLayer]));
    newDisplayLayer.frames.splice(frame, 1);
    dispatch(setLayer(newDisplayLayer));
    setMaxFrame(displayLayers.layers[currentLayer].frames.length);
  };

  const handlePausePlayClick = () => {
    setPaused(!paused);
  };

  const handleGridClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
    const newDisplayLayer = JSON.parse(JSON.stringify(displayLayers.layers[currentLayer]));
    newDisplayLayer.frames[frame.current].frame_RGB[index] = color;
    dispatch(setLayer(newDisplayLayer));
    setFrames(newDisplayLayer.frames[frame.current].frame_RGB);
  };

  useEffect(() => {
    clearAnimation();

    if (!paused) {
      startAnimation();
    }

  }, [paused, speed, currentLayer]);

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
            <input type="range" name="play-speed" min="1" max="100" data-testid="display-speed-slider" ref={speedSlider}  onChange={handleSpeedChange} />
          </div>
          <span data-testid="display-frame" className="text-right">Frame {frameNumber + 1}</span>
        </div>

        <Grid frames={frames} frameNumber={frame.current} gridClick={handleGridClick} />
      </div>
      <div className="display-frame-infobar w-full">
        <div></div>
        <div className="display-frame-infobar-controls mt-2">
          <button onClick={() => handlePausePlayClick()} data-testid="display-pause-play" className="my-0 mx-auto">{paused ?
            <FontAwesomeIcon icon={faPlay} className="h-4 w-4" /> :
            <FontAwesomeIcon icon={faPause} className="h-4 w-4" />}
          </button>
          <div className="flex w-full">
            <button data-testid="display-remove-frame" onClick={removeFrame}><FontAwesomeIcon icon={faMinus} /></button>
            <input type="range" name="frame-slider" min="1" max={maxFrame} ref={frameSlider} value={frame.current} data-testid="display-frame-slider" className="w-full" onChange={handleFrameChange} />
            <button data-testid="display-insert-frame" onClick={addFrame}><FontAwesomeIcon icon={faPlus} /></button>
          </div>
        </div>
        <div></div>
      </div>

      <div className="color-picker my-0 mt-4 mx-auto">
        <SliderPicker color={color} onChangeComplete={changeSelectedColor} />
        <label htmlFor="color-picker-input" className="mr-1">Hex Color</label>
        <input type="text" id="color-picker-input" name="color-picker-input" data-testid="display-colour-input"  value={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

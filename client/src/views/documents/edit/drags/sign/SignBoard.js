import React, { useState, useContext, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Download } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function SignBoard({ item, handleDisabled }) {
  const drag = useRef();
  // ** Contexts
  const { setOpenProps, setSelectedItem, setBoardAll, scale } = useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top - item.offset
  });

  const onStart = (e, ui) => {
    handleDisabled();
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
    handleDisabled();
  };

  useEffect(() => {
    setSelectedItem(state);
    setBoardAll((boardAll) => [...boardAll, state]);
  }, [state]);
  useEffect(() => {
    const xOffset = (70 * scale - 70) / 2;
    const yOffset = (50 * scale - 50) / 2;
    let position = {};
    if (defaultZoom.scale >= 1) {
      position.x = (state.left * scale) / defaultZoom.zoom - xOffset;
      position.y = ((state.top - state.offset) * scale) / defaultZoom.zoom - yOffset;
    } else {
      position.x = (state.left * scale) / defaultZoom.zoom - xOffset;
      position.y = ((state.top - state.offset) * scale) / defaultZoom.zoom - yOffset;
    }

    drag.current.state.y = position.y;
    drag.current.state.x = position.x;
    //calculate sizing offset
    //if scale = 1 -> width 70px
    //if scale = 1.45 -> width 101.5px

    const temp = state;
    setState({
      ...state,
      top: (temp.top * scale) / defaultZoom.zoom - yOffset,
      left: (temp.left * scale) / defaultZoom.zoom - xOffset,
      formatting: scale * 100
    });
  }, [scale]);

  return (
    <Draggable
      defaultPosition={defaultPosition}
      // position={{ x: item.left, y: item.top}}
      id={item.id}
      onStop={onStop}
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
      ref={drag}
    >
      <div className="box" style={{ width: '70px' }}>
        <div
          className=" border border-dark text-center"
          style={{
            backgroundColor: item.recipient.color,
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${state.formatting / 100})`,
            //scale: item.formatting/100,
            width: '70px',
            height: '50px'
          }}
        >
          Sign
          <br />
          <Download />
        </div>
      </div>
    </Draggable>
  );
}

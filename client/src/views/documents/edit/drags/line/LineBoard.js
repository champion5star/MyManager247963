import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { Circle, PlusSquare } from 'react-feather';
import { Button } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function LineBoard({ item, handleDisabled }) {
  const drag = useRef();
  // ** Contexts
  const { setOpenProps, setSelectedItem, setBoardAll } = useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top - item.offset
  });
  const [size, setSize] = useState({ width: 100, height: 3 });
  const [deltaX, setDeltaX] = useState(0);
  const onStart = (e, ui) => {
    handleDisabled();
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
    handleDisabled();
  };

  const onStartcb = (e, ui) => {
    e.stopPropagation();
  };

  const onDragcb = (e, ui) => {
    const temp = size;
    setSize({
      width: temp.width + ui.deltaX,
      height: temp.height
    });
    setDeltaX(deltaX + ui.deltaX);
  };

  const onStopcb = (e, ui) => {
    //setSize({width:ui.x,height:ui.height})
    setOpenProps(true);
    setState({
      ...item,
      top: ui.y,
      left: ui.x,
      _type: 'board',
      width: size.width
    });
  };
  useEffect(() => {
    setSelectedItem(state);
    setBoardAll((boardAll) => [...boardAll, state]);
  }, [state]);

  return (
    <Draggable
      defaultPosition={defaultPosition}
      id={item.id}
      onStop={onStop}
      onDrag={() => setOpenProps(true)}
      ref={drag}
      onStart={onStart}
    >
      <div
        className="box"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          backgroundColor: 'black',
          transform: `scale(${item.formatting / 100})`
        }}
      >
        <Draggable onStart={onStartcb} onDrag={onDragcb} onStop={onStopcb}>
          <Circle
            className="text-primary"
            style={{
              position: 'absolute',
              top: `0px,`,
              left: `${size.width - deltaX - 1}px`,
              marginTop: '-2px'
            }}
            size={8}
          />
        </Draggable>
      </div>
    </Draggable>
  );
}

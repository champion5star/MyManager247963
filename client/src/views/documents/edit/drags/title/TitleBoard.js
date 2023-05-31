import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function TitleBoard({ item, handleDisabled }) {
  const drag = useRef();
  // ** Contexts
  const { setOpenProps, setSelectedItem, setBoardAll } = useContext(DocumentContext);

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

  return (
    <Draggable
      defaultPosition={defaultPosition}
      //position={{x:item.left,y:item.top}}
      id={item.id}
      onStop={onStop}
      onStart={onStart}
      ref={drag}
      onDrag={() => setOpenProps(true)}
    >
      <div className="box" style={{ width: '100px' }}>
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
            //transform: `scale(${state.formatting / 100})`,
            height: '25px',
            zoom: `${scale}`
          }}
        >
          Title
        </div>
      </div>
    </Draggable>
  );
}

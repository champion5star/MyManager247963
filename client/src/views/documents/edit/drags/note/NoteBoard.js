import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { AlignLeft, Check } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function NoteBoard({ item, handleDisabled }) {
  // ** Contexts
  const { setOpenProps, setSelectedItem, setBoardAll } = useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top - item.offset
  });

  const drag = useRef();

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
      id={item.id}
      onStop={onStop}
      //position={{x:item.left,y:item.top}}
      //bounds="parent"
      ref={drag}
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
    >
      <div className="box" style={{ width: '100px' }}>
        <div
          className=" border border-dark"
          style={{
            backgroundColor: item.recipient.color,
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${state.formatting / 100})`,
            width: '100px',
            height: '50px'
          }}
        >
          <AlignLeft /> Note
        </div>
      </div>
    </Draggable>
  );
}

import React, { useState, useContext, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Download, Paperclip } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function AttachmentBoard({ item, handleDisabled }) {
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
      onStart={onStart}
      onStop={onStop}
      onDrag={() => setOpenProps(true)}
      ref={drag}
    >
      <div className="box" style={{ width: '80px' }}>
        <div
          className=" border border-dark  text-center"
          style={{
            backgroundColor: item.recipient.color,
            paddingBottom: '5px',
            paddingTop: '5px',
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${state.formatting / 100})`,
            width: '80px',
            height: '70px'
          }}
        >
          <Download />
          <br />
          <Paperclip />
        </div>
      </div>
    </Draggable>
  );
}

import React, { useState, useContext, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { Check } from 'react-feather'
import { DocumentContext } from '../../../../../utility/context/Document'

export default function TextBoard({item,zoom}) {
    // ** Contexts
    const { setOpenProps, setSelectedItem,setBoardAll } = useContext(DocumentContext)

    // ** States
    const [state, setState] = useState(item)
    const [defaultPosition, setDefaultPosition] = useState({
        x: item.left,
        y: item.top - item.offset
    })

    const onStop = (e, position) => {
        setOpenProps(true)
        setState({ ...item, top: position.y, left: position.x , _type:"board"})
    }

    useEffect(() => {
        setSelectedItem(state)
        setBoardAll((boardAll) => [...boardAll, state])
    }, [state])
    return (
        <Draggable
            defaultPosition={defaultPosition}
            //position={{x:item.left,y:item.top}}
            id={item.id}
            onStop={onStop}
            style={{transform:`scale(${zoom})`}} onDrag={()=>setOpenProps(true)}
            
        >
            <div className="box" style={{ width: '100px' }}>
                <p
                    className=" border border-dark text-center"
                    style={{
                        backgroundColor: item.recipient.color,
                        color: item.fontColor,
                        font: item.font,
                        fontSize: `${item.fontSize}px`,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        fontWeight: item.bold ? 'bold' : 'normal',
                        textDecoration: item.underline ? 'underline' : 'normal',
                        transform: `scale(${item.formatting/100})`,
                    }}
                >
                    {item?.addText || "Text"}
                </p>
            </div>
        </Draggable>
    )
}

import React, { useState } from 'react'
import { Button } from 'reactstrap'
import DeclineModal from './DeclineModal'

export default function Decline({ item, zoom,isDone }) {
    const [open, setOpen] = useState(item.isDone || false)

    const toggle = () => {
        setOpen(!open)
    }
    return (
        <>
            <div style={{ transform: `scale(${zoom})`, position: 'absolute' }}>
                <Button
                    color="primary"
                    outline
                    className=" border border-dark px-2 rounded "
                    style={{
                        left: `${item.left}px`,
                        top: `${
                            item._type === 'btn'
                                ? item.top
                                : item.top + item.offset
                        }px`,
                        width: '100px',
                        color: item.fontColor,
                        font: item.font,
                        fontSize: `${item.fontSize}px`,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        fontWeight: item.bold ? 'bold' : 'normal',
                        textDecoration: item.underline ? 'underline' : 'normal',
                        transform: `scale(${item.formatting / 100})`,
                        position: 'absolute'
                    }}
                    onClick={toggle}
                    disabled={isDone}
                >
                    Decline
                </Button>
            </div>
            <DeclineModal open={open} toggle={toggle} item={item} />
        </>
    )
}

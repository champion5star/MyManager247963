import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import { DocumentContext } from '../../../../utility/context/Document'

export default function Company({ item, zoom, isDone }) {
    // ** State
    const [state, setState] = useState(item)

    const { board, setBoard } = useContext(DocumentContext)

    const handleStateChanged = (e) => {
        setState({ ...state, addText: e.target.value })
    }
    useEffect(() => {
        if (item.addText === undefined) {
            setState({ ...state, addText: 'Company' })
        }
    }, [])
    useEffect(() => {
        setBoard((board) =>
            board.map((b) => {
                let x = b
                if (b.id === item.id && b.type === item.type) {
                    if (state.addText != 'Company') {
                        x.addText = state.addText
                        x.isDone = true
                    } else {
                        x.addText = state.addText
                        x.isDone = false
                    }
                }
                return x
            })
        )
    }, [state])
    return (
        <div
            style={{
                transform: `scale(${zoom})`,
                position: 'absolute',
                width: '150px',
                left: `${item.left}px`,
                top: `${
                    item._type === 'btn' ? item.top : item.top + item.offset
                }px`
            }}
            id={`${item.type}-${item.DataLabel}-${item.id}`}
        >
            {isDone === true ? (
                <p
                    style={{
                        color: item.fontColor,
                        font: item.font,
                        fontSize: `${item.fontSize}px`,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        fontWeight: item.bold ? 'bold' : 'normal',
                        textDecoration: item.underline ? 'underline' : 'normal',
                        transform: `scale(${item.formatting / 100})`
                    }}
                >
                    {state.addText}
                </p>
            ) : (
                <Input
                    className=" border border-dark text-center"
                    style={{
                        color: item.fontColor,
                        font: item.font,
                        fontSize: `${item.fontSize}px`,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        fontWeight: item.bold ? 'bold' : 'normal',
                        textDecoration: item.underline ? 'underline' : 'normal',
                        transform: `scale(${item.formatting / 100})`
                    }}
                    value={state.addText}
                    onChange={handleStateChanged}
                />
            )}
        </div>
    )
}

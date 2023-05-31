import React from 'react'

export default function Name({ item, zoom }) {
    return (
        <div
            style={{
                transform: `scale(${zoom})`,
                position: 'absolute',
                width: '100px',
                left: `${item.left}px`,
                top: `${(item._type==="btn"?item.top:item.top + item.offset)}px`
            }}
        >
            <div
                className="text-center"
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
                {item.recipient.name}
            </div>
        </div>
    )
}

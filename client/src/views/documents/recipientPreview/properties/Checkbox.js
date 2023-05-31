import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import { DocumentContext } from '../../../../utility/context/Document'

export default function Checkbox({ zoom, item,isDone }) {

    const {setBoard} = useContext(DocumentContext)
    const handleCheckChanged = (checkItem)=>{
        setBoard((board)=>board.map((b)=>{
            let x = b
            if(x.id===item.id && x.type===item.type){
                x.list.map((lst)=>{
                    if(lst.id===checkItem.id){
                        lst.checked=!lst.checked
                    }
                })
                x.isDone=true
            }
            return x
        }))
    }
    return (
        <div
            style={{
                transform: `scale(${zoom})`,
                position: 'absolute',
                left: `${item.left}px`,
                top: `${(item._type==="btn"?item.top:item.top + item.offset)}px`
            }}
        >
            {item.list.map((x) => {
                return (
                    <Input
                        name={item.dataLabel}
                        type="checkbox"
                        style={{ left: x.x, top: x.y, position: 'relative' }}
                        value={x.value}
                        onChange={()=>handleCheckChanged(x)}
                        checked={x.checked}
                        disabled={isDone}
                    />
                )
            })}
        </div>
    )
}

import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import { DocumentContext } from '../../../../utility/context/Document'

export default function Radio({ item, zoom,isDone }) {
    const {setBoard} = useContext(DocumentContext)
    const handleCheckChanged = (checkItem)=>{
        checkItem.checked = !checkItem.checked
        setBoard((board)=>board.map((b)=>{
            let x = b
            if(x.id===item.id && x.type===item.type){
                x.list.map((lst)=>{
                    
                    if(lst.id===checkItem.id){
                        lst.checked=checkItem.checked
                    }
                    else{
                        if(checkItem.checked===true){
                            lst.checked = false
                        }
                    }
                })
                x.isDone = true
            }
            return x
        }))
    }
    return (
        <div
        id={`${item.type}-${item.DataLabel}-${item.id}`}
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
                        type="radio"
                        style={{
                            left: `${x.x}px`,
                            top: `${x.y}px`,
                            position: 'relative'
                        }}
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

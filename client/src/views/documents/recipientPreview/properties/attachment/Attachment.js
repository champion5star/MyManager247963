import React, { useContext, useEffect, useRef, useState } from 'react'
import { Paperclip } from 'react-feather'
import { DocumentContext } from '../../../../../utility/context/Document'
import AttachmentModal from './AttachmentModal'

export default function Attachment({ item, zoom,attachments,setAttachments,isDone }) {
    const [files,setFiles] = useState([])
    const[open,setOpen] = useState(false)

    const fileUpload = useRef()
    const{setBoard} = useContext(DocumentContext)

    const toggleOpen = ()=>{
        setOpen(!open)
    }
    const handleUploadChanged = (e)=>{
        if(e.target.files.length>0){
            setFiles(e.target.files)
        }
    }
    const handleFileUpload = ()=>{
        if(isDone===false){
            if(item.list && item.list.length>0){
                toggleOpen()
            }
            else{
                fileUpload.current.click()
            }
        }
       
    }
    const handleUploadNew = ()=>{
        fileUpload.current.click()
    }

    useEffect(()=>{
        if(files.length>0)
        {
            if(attachments.find((x)=>x.id===item.id)){
                const temp = attachments.filter((x)=>x.id!=item.id)
                setAttachments([...temp,{id:item.id,files:files}])
                setBoard((board)=>board.map((b)=>{
                    if(b.id===item.id && b.type===item.type){
                        b.isDone = true
                    }
                    return b
                }))
            }
            else{
                setAttachments([...attachments,{id:item.id,files:files}])
                setBoard((board)=>board.map((b)=>{
                    if(b.id===item.id && b.type===item.type){
                        b.isDone = true
                    }
                    return b
                }))
            }
        }
    },[files])
   
    
    
    return (
        <>
            <div
                style={{
                    transform: `scale(${zoom})`,
                    left: `${item.left}px`,
                    top: `${
                        item._type === 'btn' ? item.top : item.top + item.offset
                    }px`,
                    width: '80px',
                    height: '70px',
                    position: 'absolute',
                    
                }}
            >
                <input type="file" className='hidden' ref={fileUpload} multiple onChange={handleUploadChanged} id={item.id}/>
                <div
                    className=" border border-dark text-center bg-primary"
                    style={{
                        paddingBottom: '5px',
                        paddingTop: '5px',
                        color: item.fontColor,
                        font: item.font,
                        fontSize: `${item.fontSize}px`,
                        fontStyle: item.italic ? 'italic' : 'normal',
                        fontWeight: item.bold ? 'bold' : 'normal',
                        textDecoration: item.underline ? 'underline' : 'normal',
                        transform: `scale(${item.formatting / 100})`,
                        id: `${item.type}-${item.DataLabel}-${item.id}`,
                        cursor: 'pointer'
                    }}
                    onClick={handleFileUpload}
                >
                    Attachment
                    <br />
                    <Paperclip />
                </div>
            </div>
           <AttachmentModal open={open} toggle={toggleOpen} files={item?.list} handleFileUpload={handleUploadNew}/>
        </>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Plus, X } from 'react-feather'
import SlideDown from 'react-slidedown'
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Table
} from 'reactstrap'
import { useGetSignatureAndInitial } from '../../../../../requests/documents/recipient-doc'
import { DocumentContext } from '../../../../../utility/context/Document'
import AddSignatureModal from './AddSignatureModal'

export default function SignModal({ toggle, open,type,item }) {
    // ** States

    const [isAddOpen, setIsAddOpen] = useState(false)
    const [editItem, setEditItem] = useState({})

    // ** Contexts
    const {
        recipients,
        hashcode,
        signatures,
        setSignatures,
        setStamps,
        setSignatureId,
        setSignature,
        setSelectedItem
    } = useContext(DocumentContext)

    // ** Functions
    const toggleAdd = (item) => {
        setEditItem(item)
        toggle()
        setIsAddOpen(!isAddOpen)
    }
    const handleSelectedChange = (i) => {
        let temps = []
        for (const item of signatures) {
            let temp = item
            if (temp.id === i.id) {
                temp.isSelected = true
            } else {
                temp.isSelected = false
            }
            temps.push(temp)
        }
        
        setSignatures(temps)
    }

    const handleShowSignature = () => {
        // get signature isSelectedTrue
        const sign = signatures.find((x) => (x.isSelected === true))
        setSignature(sign)
    
        setSelectedItem(item)
        toggle()
    }

    const handleRemove = (id) => {
        setSignatures(signatures.filter((x) => x.id != id))
    }

    useEffect(() => {
        //get initials for specific email
        if (recipients.length > 0) {
            const recipient = recipients.find((x) => x.hashCode === hashcode)
            const email = recipient.email
            useGetSignatureAndInitial(email).then((res) => {
                if (res.success === 'true') {
                    setSignatures(res.details[0].signatures)
                    setStamps(res.details[0].stamps)
                    setSignatureId(res.details[0]._id)
                }
            })
        }
    }, [recipients])
    

    return (
        <>
            <Modal isOpen={open} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>
                    My Signiture & Initials
                </ModalHeader>
                <ModalBody>
                    <p>
                        Choose a saved signature and initials or adopt new ones
                        to use when signing the documents in this envelope.
                    </p>
                    <Button color="link" onClick={()=>toggleAdd({id:0,fullName:'',initials:{initial:''}})}>
                        <Plus className="align-middle ms-sm-25 ms-0"></Plus>
                        <span className="align-middle d-sm-inline-block d-none">
                            ADD
                        </span>
                    </Button>
                    <Table className="w-100">
                        <tbody>
                            {signatures &&
                                signatures.map((i) => {
                                    return (
                                        <tr key={i.id}>
                                            <td>
                                                <FormGroup
                                                    check
                                                    className="my-auto"
                                                >
                                                    <Input
                                                        id={i.id}
                                                        type="radio"
                                                        name="selected"
                                                        checked={i.isSelected}
                                                        onChange={() =>
                                                            handleSelectedChange(
                                                                i
                                                            )
                                                        }
                                                    />{' '}
                                                    <Label check={i.isSelected}>
                                                        {i.fullName}
                                                    </Label>
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <img src={i.path}  height="80" width={100}/>
                                            </td>
                                            <td>
                                                <img src={i.initials?.path} height="70" width={70} />
                                            </td>
                                            <td className="text-end">
                                                <Button
                                                    color="link"
                                                    onClick={() => toggleAdd(i)}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                            <td className="text-end">
                                                <X
                                                    onClick={() =>
                                                        handleRemove(i.id)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-start">
                        <Button
                            color="primary"
                            className=" me-2"
                            onClick={handleShowSignature}
                        >
                            <span className="align-middle d-sm-inline-block d-none">
                                Adopt
                            </span>
                        </Button>
                        <Button color="primary" outline onClick={toggle}>
                            <span className="align-middle d-sm-inline-block d-none">
                                Close
                            </span>
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <AddSignatureModal
                toggle={()=>toggleAdd({id:0,fullName:'',initials:{initial:''}})}
                open={isAddOpen}
                item={editItem}
                type={type}
            />
        </>
    )
}
